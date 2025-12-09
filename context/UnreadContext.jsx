import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, orderBy, doc, limit } from 'firebase/firestore';

const UnreadContext = createContext({ 
  unreadCount: 0, 
  rideUnreadCount: 0,
  directUnreadCount: 0,
  latestMessage: null 
});

export function useUnread() {
  return useContext(UnreadContext);
}

export function UnreadProvider({ user, children }) {
  const [rideUnreadCount, setRideUnreadCount] = useState(0);
  const [directUnreadCount, setDirectUnreadCount] = useState(0);
  const [latestMessage, setLatestMessage] = useState(null);
  
  // Use refs for Maps to persist across re-renders and prevent listener leaks
  const threadDataRef = useRef(new Map());
  const messageUnsubscribersRef = useRef(new Map());
  const docUnsubscribersRef = useRef(new Map());
  const processedMessagesRef = useRef(new Set());

  useEffect(() => {
    if (!user) {
      setRideUnreadCount(0);
      setDirectUnreadCount(0);
      setLatestMessage(null);
      return;
    }

    const threadData = threadDataRef.current;
    const messageUnsubscribers = messageUnsubscribersRef.current;
    const docUnsubscribers = docUnsubscribersRef.current;
    const processedMessages = processedMessagesRef.current;
    const unsubscribers = [];

    const calculateUnreadForThread = (threadKey) => {
      const data = threadData.get(threadKey);
      if (!data || !data.messages) return 0;
      
      const lastReadTime = data.lastReadTimestamp?.toDate ? data.lastReadTimestamp.toDate() : new Date(0);
      
      return data.messages.filter(msg => {
        const msgTime = msg.timestamp?.toDate ? msg.timestamp.toDate() : new Date(0);
        if (data.type === 'ride') {
          return msgTime > lastReadTime && msg.senderId !== user.uid;
        } else {
          return msgTime > lastReadTime && msg.senderId === data.otherUserId;
        }
      }).length;
    };

    const updateCategoryUnread = () => {
      let rideTotal = 0;
      let directTotal = 0;
      
      threadData.forEach((data, threadKey) => {
        const count = calculateUnreadForThread(threadKey);
        if (data.type === 'ride') {
          rideTotal += count;
        } else {
          directTotal += count;
        }
      });
      
      setRideUnreadCount(rideTotal);
      setDirectUnreadCount(directTotal);
    };

    const checkForNewMessage = (threadKey, messages, data) => {
      if (!messages || messages.length === 0) return;
      
      const latestMsg = messages[0]; // Already sorted desc by timestamp
      if (!latestMsg || !latestMsg.timestamp) return;
      
      const msgId = `${threadKey}_${latestMsg.timestamp?.seconds || 0}`;
      
      // Skip if already processed
      if (processedMessages.has(msgId)) return;
      processedMessages.add(msgId);
      
      const msgTime = latestMsg.timestamp?.toDate ? latestMsg.timestamp.toDate() : new Date(0);
      const lastReadTime = data.lastReadTimestamp?.toDate ? data.lastReadTimestamp.toDate() : new Date(0);
      
      // Check if it's a new unread message from someone else
      const isFromOther = data.type === 'ride' 
        ? latestMsg.senderId !== user.uid
        : latestMsg.senderId === data.otherUserId;
      
      if (msgTime > lastReadTime && isFromOther) {
        // Only show notification for messages received in the last 30 seconds
        const now = new Date();
        const thirtySecondsAgo = new Date(now.getTime() - 30000);
        
        if (msgTime > thirtySecondsAgo) {
          setLatestMessage({
            threadKey,
            threadId: threadKey.replace('ride_', '').replace('direct_', ''),
            type: data.type,
            senderName: latestMsg.senderName || 'Someone',
            text: latestMsg.text || '',
            timestamp: msgTime
          });
        }
      }
    };

    // Track rides
    const ridesRef = collection(db, 'rides');
    const ridesQuery = query(ridesRef, where('participants', 'array-contains', user.uid));
    
    const unsubRides = onSnapshot(ridesQuery, (snapshot) => {
      snapshot.docs.forEach((rideDoc) => {
        const rideData = rideDoc.data();
        const threadKey = 'ride_' + rideDoc.id;
        
        // Initialize or update thread data
        if (!threadData.has(threadKey)) {
          threadData.set(threadKey, {
            type: 'ride',
            lastReadTimestamp: rideData[`lastRead_${user.uid}`],
            messages: []
          });
        } else {
          const existing = threadData.get(threadKey);
          const newLastRead = rideData[`lastRead_${user.uid}`];
          if (newLastRead !== null && newLastRead !== undefined) {
            existing.lastReadTimestamp = newLastRead;
          }
        }
        
        // Set up document listener for lastRead changes
        if (!docUnsubscribers.has(threadKey)) {
          const rideDocRef = doc(db, 'rides', rideDoc.id);
          const unsubDoc = onSnapshot(rideDocRef, (updatedDoc) => {
            const data = threadData.get(threadKey);
            if (!data) return;
            
            const updatedData = updatedDoc.data();
            if (updatedData) {
              const newLastRead = updatedData[`lastRead_${user.uid}`];
              if (newLastRead !== null && newLastRead !== undefined) {
                data.lastReadTimestamp = newLastRead;
                updateCategoryUnread();
              }
            }
          });
          docUnsubscribers.set(threadKey, unsubDoc);
        }
        
        // Set up messages listener (only once per thread)
        if (!messageUnsubscribers.has(threadKey)) {
          const messagesRef = collection(db, 'rides', rideDoc.id, 'messages');
          const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'), limit(10));
          
          const unsubMsg = onSnapshot(messagesQuery, (msgSnap) => {
            const data = threadData.get(threadKey);
            if (data) {
              const messages = msgSnap.docs.map(d => d.data());
              data.messages = messages;
              updateCategoryUnread();
              checkForNewMessage(threadKey, messages, data);
            }
          });
          
          messageUnsubscribers.set(threadKey, unsubMsg);
        }
      });
    });

    // Track direct messages
    const directRef = collection(db, 'directMessages');
    const directQuery = query(directRef, where('participants', 'array-contains', user.uid));
    
    const unsubDirect = onSnapshot(directQuery, (snapshot) => {
      snapshot.docs.forEach((threadDoc) => {
        const dmData = threadDoc.data();
        const otherUserId = dmData.participants.find(id => id !== user.uid);
        const threadKey = 'direct_' + threadDoc.id;
        
        // Initialize or update thread data
        if (!threadData.has(threadKey)) {
          threadData.set(threadKey, {
            type: 'direct',
            lastReadTimestamp: dmData[`lastRead_${user.uid}`],
            otherUserId: otherUserId,
            messages: []
          });
        } else {
          const existing = threadData.get(threadKey);
          const newLastRead = dmData[`lastRead_${user.uid}`];
          if (newLastRead !== null && newLastRead !== undefined) {
            existing.lastReadTimestamp = newLastRead;
          }
        }
        
        // Set up document listener for lastRead changes
        if (!docUnsubscribers.has(threadKey)) {
          const threadDocRef = doc(db, 'directMessages', threadDoc.id);
          const unsubDoc = onSnapshot(threadDocRef, (updatedDoc) => {
            const data = threadData.get(threadKey);
            if (!data) return;
            
            const updatedData = updatedDoc.data();
            if (updatedData) {
              const newLastRead = updatedData[`lastRead_${user.uid}`];
              if (newLastRead !== null && newLastRead !== undefined) {
                data.lastReadTimestamp = newLastRead;
                updateCategoryUnread();
              }
            }
          });
          docUnsubscribers.set(threadKey, unsubDoc);
        }
        
        // Set up messages listener (only once per thread)
        if (!messageUnsubscribers.has(threadKey)) {
          const messagesRef = collection(db, 'directMessages', threadDoc.id, 'messages');
          const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'), limit(10));
          
          const unsubMsg = onSnapshot(messagesQuery, (msgSnap) => {
            const data = threadData.get(threadKey);
            if (data) {
              const messages = msgSnap.docs.map(d => d.data());
              data.messages = messages;
              updateCategoryUnread();
              checkForNewMessage(threadKey, messages, data);
            }
          });
          
          messageUnsubscribers.set(threadKey, unsubMsg);
        }
      });
    });

    unsubscribers.push(unsubRides, unsubDirect);

    return () => {
      unsubscribers.forEach(unsub => unsub());
      messageUnsubscribers.forEach(unsub => unsub());
      docUnsubscribers.forEach(unsub => unsub());
    };
  }, [user]);

  // Compute total for backward compatibility
  const unreadCount = rideUnreadCount + directUnreadCount;

  return (
    <UnreadContext.Provider value={{ unreadCount, rideUnreadCount, directUnreadCount, latestMessage }}>
      {children}
    </UnreadContext.Provider>
  );
}
