import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiUsers, FiUser, FiSend, FiMoreVertical } from 'react-icons/fi';
import { HiArrowLeft } from 'react-icons/hi';
import { MdFlight, MdShoppingCart, MdLocationCity, MdSchool } from 'react-icons/md';
import { db, auth } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy, limit, addDoc, serverTimestamp, getDoc, doc, updateDoc, setDoc, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Utility function to capitalize first letters
const capitalizeName = (name) => {
  if (!name) return '';
  return name.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

// Destination themes for ride group chats
const destinationThemes = {
  'airport': { icon: MdFlight, color: 'text-cyan-400', bg: 'from-cyan-500/20 to-blue-500/20', bgSolid: 'bg-cyan-500/20' },
  'shopping': { icon: MdShoppingCart, color: 'text-pink-400', bg: 'from-pink-500/20 to-red-500/20', bgSolid: 'bg-pink-500/20' },
  'downtown': { icon: MdLocationCity, color: 'text-indigo-400', bg: 'from-indigo-500/20 to-purple-500/20', bgSolid: 'bg-indigo-500/20' },
  'college': { icon: MdSchool, color: 'text-emerald-400', bg: 'from-emerald-500/20 to-green-500/20', bgSolid: 'bg-emerald-500/20' },
  'default': { icon: FiMessageCircle, color: 'text-gray-400', bg: 'from-gray-500/20 to-gray-600/20', bgSolid: 'bg-gray-500/20' }
};

const detectTheme = (destination) => {
  const lowerDest = destination.toLowerCase();
  if (lowerDest.includes('airport') || lowerDest.includes('ord') || lowerDest.includes('mdw')) return 'airport';
  if (['target', 'walmart', 'costco', 'mall'].some(shop => lowerDest.includes(shop))) return 'shopping';
  if (['downtown', 'chicago'].some(keyword => lowerDest.includes(keyword))) return 'downtown';
  if (['college', 'university', 'campus'].some(keyword => lowerDest.includes(keyword))) return 'college';
  return 'default';
};

export default function Messages() {
  const router = useRouter();
  const { category: urlCategory, userId: urlUserId } = router.query; // Get URL parameters
  const [user, setUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState('rides'); // 'rides', 'marketplace', 'direct'
  const [threads, setThreads] = useState([]);
  const [selectedThread, setSelectedThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [usersData, setUsersData] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState({}); // Track unread counts per thread
  const messagesEndRef = useRef(null);
  const threadsRef = useRef(threads); // Ref to access latest threads state in listeners
  
  // Keep threadsRef in sync with threads state
  useEffect(() => {
    threadsRef.current = threads;
  }, [threads]);

  const categories = [
    { id: 'rides', label: 'Rides', icon: MdFlight },
    { id: 'marketplace', label: 'Marketplace', icon: MdShoppingCart },
    { id: 'direct', label: 'Direct', icon: FiUser }
  ];

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Handle URL parameters (for "Message Host" feature)
  useEffect(() => {
    if (urlCategory && user) {
      setActiveCategory(urlCategory);
      
      // If userId is provided, create/find direct message thread
      if (urlCategory === 'direct' && urlUserId) {
        // Create a direct message thread with the user
        const directThreadId = [user.uid, urlUserId].sort().join('_');
        
        // Fetch the other user's name
        const fetchOtherUserName = async () => {
          try {
            const otherUserDoc = await getDoc(doc(db, 'users', urlUserId));
            const otherUserName = otherUserDoc.exists() 
              ? capitalizeName(otherUserDoc.data().name || otherUserDoc.data().email || 'User')
              : 'User';
            
            setSelectedThread({
              id: directThreadId,
              type: 'direct',
              title: otherUserName,
              subtitle: '',
              participants: [user.uid, urlUserId],
              participantCount: 2,
              lastMessage: 'Start a conversation',
              lastMessageSenderId: null,
              lastMessageTime: new Date(),
              themeKey: 'default',
              unreadCount: 0
            });
          } catch (error) {
            console.error('Error fetching user:', error);
            setSelectedThread({
              id: directThreadId,
              type: 'direct',
              title: 'Direct Message',
              subtitle: '',
              participants: [user.uid, urlUserId],
              participantCount: 2,
              lastMessage: 'Start a conversation',
              lastMessageSenderId: null,
              lastMessageTime: new Date(),
              themeKey: 'default',
              unreadCount: 0
            });
          }
        };
        
        fetchOtherUserName();
      }
    }
  }, [urlCategory, urlUserId, user]);

  // Check screen width for mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint is 768px
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch user display names
  useEffect(() => {
    if (!user) return;

    const fetchUserData = async (userId) => {
      if (usersData[userId]) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists()) {
          setUsersData(prev => ({
            ...prev,
            [userId]: {
              name: capitalizeName(userDoc.data().name || userDoc.data().email || 'Anonymous'),
              email: userDoc.data().email
            }
          }));
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    // Fetch user data for all participants when threads change
    threads.forEach(thread => {
      if (thread.participants) {
        thread.participants.forEach(participantId => {
          if (participantId !== 'system') {
            fetchUserData(participantId);
          }
        });
      }
      if (thread.lastMessageSenderId && thread.lastMessageSenderId !== 'system') {
        fetchUserData(thread.lastMessageSenderId);
      }
    });
  }, [threads, user]);

  // Fetch threads based on active category
  useEffect(() => {
    if (!user) return;

    if (activeCategory === 'rides') {
      // Fetch ride threads
      const ridesRef = collection(db, 'rides');
      const q = query(ridesRef, where('participants', 'array-contains', user.uid));

      const messageUnsubscribers = [];
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        // Unsubscribe from previous message listeners
        messageUnsubscribers.forEach(unsub => unsub());
        messageUnsubscribers.length = 0;
        
        const rideThreadsMap = new Map();
        
        snapshot.docs.forEach((rideDoc) => {
          const rideData = rideDoc.data();
          
          // Get lastRead value, ignoring null (pending serverTimestamp)
          const lastReadValue = rideData[`lastRead_${user.uid}`];
          let initialLastRead = null;
          
          if (lastReadValue !== null && lastReadValue !== undefined) {
            initialLastRead = lastReadValue;
          } else if (lastReadValue === null) {
            // If null (pending serverTimestamp), try to get existing value from current state
            const existingThread = threadsRef.current.find(t => t.id === rideDoc.id);
            if (existingThread?.lastReadTimestamp) {
              initialLastRead = existingThread.lastReadTimestamp;
            }
          }
          
          // Initialize thread data
          rideThreadsMap.set(rideDoc.id, {
            id: rideDoc.id,
            type: 'ride',
            title: rideData.destination,
            subtitle: rideData.city || '',
            participants: rideData.participants || [],
            participantCount: rideData.participants?.length || 0,
            lastMessage: 'No messages yet',
            lastMessageSenderId: null,
            lastMessageTime: new Date(0),
            themeKey: detectTheme(rideData.destination),
            unreadCount: 0,
            lastReadTimestamp: initialLastRead
          });
          
          // Listen to the ride document itself for lastRead updates
          const rideDocRef = doc(db, 'rides', rideDoc.id);
          const unsubRideDoc = onSnapshot(rideDocRef, (updatedRideDoc) => {
            const thread = rideThreadsMap.get(rideDoc.id);
            if (!thread) return;
            
            const updatedRideData = updatedRideDoc.data();
            
            if (updatedRideData) {
              const newLastRead = updatedRideData[`lastRead_${user.uid}`];
              // Update lastReadTimestamp - keep existing value if new value is null (pending serverTimestamp)
              if (newLastRead !== undefined && newLastRead !== null) {
                thread.lastReadTimestamp = newLastRead;
                
                // Force threads state update with the new timestamp
                const updatedThreads = Array.from(rideThreadsMap.values())
                  .sort((a, b) => b.lastMessageTime - a.lastMessageTime);
                setThreads(updatedThreads);
              }
            }
          });
          
          messageUnsubscribers.push(unsubRideDoc);
          
          // Set up real-time listener for messages
          const messagesRef = collection(db, 'rides', rideDoc.id, 'messages');
          const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'));
          
          const unsubMsg = onSnapshot(messagesQuery, 
            (msgSnapshot) => {
              const thread = rideThreadsMap.get(rideDoc.id);
              if (!thread) return;

              const lastMessage = msgSnapshot.docs[0]?.data();
              if (lastMessage) {
                thread.lastMessage = lastMessage.text || 'No messages yet';
                thread.lastMessageSenderId = lastMessage.senderId || null;
                thread.lastMessageTime = lastMessage.timestamp?.toDate ? lastMessage.timestamp.toDate() : new Date(0);
              }

              // Calculate unread count using the current lastReadTimestamp from thread object
              if (thread.lastReadTimestamp) {
                const lastReadTime = thread.lastReadTimestamp.toDate ? thread.lastReadTimestamp.toDate() : new Date(0);
                thread.unreadCount = msgSnapshot.docs.filter(doc => {
                  const msgData = doc.data();
                  const msgTime = msgData.timestamp?.toDate ? msgData.timestamp.toDate() : new Date(0);
                  return msgTime > lastReadTime && msgData.senderId !== user.uid;
                }).length;
              } else {
                // No lastRead timestamp means all messages are unread
                thread.unreadCount = msgSnapshot.docs.filter(doc => 
                  doc.data().senderId !== user.uid
                ).length;
              }
              
              // Update threads state
              const updatedThreads = Array.from(rideThreadsMap.values())
                .sort((a, b) => b.lastMessageTime - a.lastMessageTime);
              setThreads(updatedThreads);
            },
            (error) => {
              if (error.code !== 'permission-denied') {
                console.error('Error fetching messages:', error);
              }
            }
          );
          
          messageUnsubscribers.push(unsubMsg);
        });
        
        setLoading(false);
      }, (error) => {
        console.error('Error fetching rides:', error);
        setLoading(false);
      });

      return () => {
        unsubscribe();
        messageUnsubscribers.forEach(unsub => unsub());
      };
    } else if (activeCategory === 'direct') {
      // Fetch direct message threads
      const directMessagesRef = collection(db, 'directMessages');
      const q = query(directMessagesRef, where('participants', 'array-contains', user.uid));

      const messageUnsubscribers = [];
      const directThreadsMap = new Map();

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        
        for (const threadDoc of snapshot.docs) {
          const threadData = threadDoc.data();
          const otherUserId = threadData.participants.find(id => id !== user.uid);
          
          // Get lastRead value, ignoring null (pending serverTimestamp)
          const lastReadValue = threadData[`lastRead_${user.uid}`];
          let initialLastRead = null;
          
          if (lastReadValue !== null && lastReadValue !== undefined) {
            initialLastRead = lastReadValue;
          } else if (lastReadValue === null) {
            // If null (pending serverTimestamp), try to get existing value from current state
            const existingThread = threadsRef.current.find(t => t.id === threadDoc.id);
            if (existingThread?.lastReadTimestamp) {
              initialLastRead = existingThread.lastReadTimestamp;
            }
          }
          
          // Fetch other user's name
          let otherUserName = 'User';
          try {
            const otherUserDoc = await getDoc(doc(db, 'users', otherUserId));
            if (otherUserDoc.exists()) {
              otherUserName = capitalizeName(otherUserDoc.data().name || otherUserDoc.data().email || 'User');
            }
          } catch (error) {
            console.error('Error fetching user:', error);
          }

          // Initialize thread data
          directThreadsMap.set(threadDoc.id, {
            id: threadDoc.id,
            type: 'direct',
            title: otherUserName,
            subtitle: '',
            participants: threadData.participants || [],
            participantCount: 2,
            lastMessage: threadData.lastMessage || 'No messages yet',
            lastMessageSenderId: null,
            lastMessageTime: threadData.lastMessageTime?.toDate ? threadData.lastMessageTime.toDate() : new Date(0),
            themeKey: 'default',
            unreadCount: 0,
            lastReadTimestamp: initialLastRead,
            otherUserId: otherUserId
          });

          // Listen to the thread document for lastRead updates
          const threadDocRef = doc(db, 'directMessages', threadDoc.id);
          const unsubThreadDoc = onSnapshot(threadDocRef, (updatedThreadDoc) => {
            const thread = directThreadsMap.get(threadDoc.id);
            if (!thread) return;
            
            const updatedThreadData = updatedThreadDoc.data();
            
            if (updatedThreadData) {
              const newLastRead = updatedThreadData[`lastRead_${user.uid}`];
              // Update lastReadTimestamp - keep existing value if new value is null (pending serverTimestamp)
              if (newLastRead !== undefined && newLastRead !== null) {
                thread.lastReadTimestamp = newLastRead;
                
                // Force threads state update with the new timestamp
                const updatedThreads = Array.from(directThreadsMap.values())
                  .sort((a, b) => b.lastMessageTime - a.lastMessageTime);
                setThreads(updatedThreads);
              }
              
              // Always update message metadata
              thread.lastMessage = updatedThreadData.lastMessage || 'No messages yet';
              thread.lastMessageTime = updatedThreadData.lastMessageTime?.toDate ? updatedThreadData.lastMessageTime.toDate() : new Date(0);
            }
          });

          messageUnsubscribers.push(unsubThreadDoc);

          // Listen to messages for unread count calculation
          const messagesRef = collection(db, 'directMessages', threadDoc.id, 'messages');
          const messagesQuery = query(messagesRef, orderBy('timestamp', 'desc'));
          
          const unsubMsg = onSnapshot(messagesQuery, (msgSnapshot) => {
            const thread = directThreadsMap.get(threadDoc.id);
            if (!thread) return;

            // Calculate unread count using the current lastReadTimestamp from thread object
            if (thread.lastReadTimestamp) {
              const lastReadTime = thread.lastReadTimestamp.toDate ? thread.lastReadTimestamp.toDate() : new Date(0);
              thread.unreadCount = msgSnapshot.docs.filter(doc => {
                const msgData = doc.data();
                const msgTime = msgData.timestamp?.toDate ? msgData.timestamp.toDate() : new Date(0);
                return msgTime > lastReadTime && msgData.senderId === thread.otherUserId;
              }).length;
            } else {
              // No lastRead timestamp means all messages from other user are unread
              thread.unreadCount = msgSnapshot.docs.filter(doc => 
                doc.data().senderId === thread.otherUserId
              ).length;
            }

            // Update threads state
            const updatedThreads = Array.from(directThreadsMap.values())
              .sort((a, b) => b.lastMessageTime - a.lastMessageTime);
            setThreads(updatedThreads);
          });

          messageUnsubscribers.push(unsubMsg);
        }
        
        setLoading(false);
      }, (error) => {
        console.error('Error fetching direct messages:', error);
        setLoading(false);
      });

      return () => {
        unsubscribe();
        messageUnsubscribers.forEach(unsub => unsub());
      };
    } else {
      // Marketplace category - placeholder for now
      setThreads([]);
      setLoading(false);
    }
  }, [user, activeCategory]);

  // Fetch messages for selected thread
  useEffect(() => {
    if (!selectedThread || !user) return;

    let messagesRef;
    
    // Determine the correct Firestore path based on thread type
    if (selectedThread.type === 'ride') {
      messagesRef = collection(db, 'rides', selectedThread.id, 'messages');
    } else if (selectedThread.type === 'direct') {
      messagesRef = collection(db, 'directMessages', selectedThread.id, 'messages');
    } else {
      return;
    }

    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    });

    return () => unsubscribe();
  }, [selectedThread, user]);

  // Separate effect to update lastRead timestamp when viewing messages
  useEffect(() => {
    if (!selectedThread || !user || messages.length === 0) return;

    // Update lastReadTimestamp for this user in the thread
    const updateLastRead = async () => {
      try {
        if (selectedThread.type === 'direct') {
          const threadRef = doc(db, 'directMessages', selectedThread.id);
          await setDoc(threadRef, {
            [`lastRead_${user.uid}`]: serverTimestamp()
          }, { merge: true });
        } else if (selectedThread.type === 'ride') {
          const threadRef = doc(db, 'rides', selectedThread.id);
          await setDoc(threadRef, {
            [`lastRead_${user.uid}`]: serverTimestamp()
          }, { merge: true });
        }
      } catch (error) {
        console.error('Error updating lastRead timestamp:', error);
      }
    };

    updateLastRead();
  }, [selectedThread, user, messages.length]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedThread || !user) return;

    try {
      let messagesRef;
      
      // Determine the correct Firestore path based on thread type
      if (selectedThread.type === 'ride') {
        messagesRef = collection(db, 'rides', selectedThread.id, 'messages');
      } else if (selectedThread.type === 'direct') {
        // For direct messages, ensure the thread document exists first
        const threadRef = doc(db, 'directMessages', selectedThread.id);
        const threadDoc = await getDoc(threadRef);
        
        if (!threadDoc.exists()) {
          // Create the thread document if it doesn't exist
          await setDoc(threadRef, {
            participants: selectedThread.participants,
            createdAt: serverTimestamp(),
            lastMessageTime: serverTimestamp(),
            lastMessage: newMessage.trim()
          });
        } else {
          // Update existing thread using setDoc with merge to avoid permission issues
          await setDoc(threadRef, {
            lastMessageTime: serverTimestamp(),
            lastMessage: newMessage.trim()
          }, { merge: true });
        }
        
        messagesRef = collection(db, 'directMessages', selectedThread.id, 'messages');
      } else {
        throw new Error('Invalid thread type');
      }
      
      await addDoc(messagesRef, {
        text: newMessage.trim(),
        senderId: user.uid,
        senderName: capitalizeName(user.displayName || user.email || 'Anonymous'),
        timestamp: serverTimestamp()
      });
      
      // Note: We can't update other user's unread count due to security rules
      // Unread counts will be calculated based on lastRead timestamps instead
      
      setNewMessage('');
    } catch (error) {
      console.error('❌ Error sending message:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      alert('Failed to send message: ' + error.message);
    }
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    let date;
    
    // Handle Firestore Timestamp object
    if (timestamp?.toDate && typeof timestamp.toDate === 'function') {
      date = timestamp.toDate();
    }
    // Handle Date object
    else if (timestamp instanceof Date) {
      date = timestamp;
    }
    // Handle timestamp with seconds (Firestore Timestamp-like object)
    else if (timestamp?.seconds) {
      date = new Date(timestamp.seconds * 1000);
    }
    // Handle number timestamp
    else if (typeof timestamp === 'number') {
      date = new Date(timestamp);
    }
    else {
      return '';
    }
    
    if (!date || isNaN(date.getTime()) || date.getTime() === 0) return '';
    
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m`;
    if (diffHours < 24) return `${diffHours}h`;
    if (diffDays < 7) return `${diffDays}d`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatMessageTime = (timestamp) => {
    if (!timestamp?.toDate) return '';
    const date = timestamp.toDate();
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const getUserDisplayName = (userId) => {
    if (userId === 'system') return 'System';
    if (userId === user?.uid) return 'You';
    return usersData[userId]?.name || 'Loading...';
  };

  const getLastMessagePreview = (thread) => {
    const senderName = thread.lastMessageSenderId ? getUserDisplayName(thread.lastMessageSenderId) : '';
    const preview = thread.lastMessage.length > 40 ? thread.lastMessage.substring(0, 40) + '...' : thread.lastMessage;
    
    if (senderName && senderName !== 'System') {
      return `${senderName}: ${preview}`;
    }
    return preview;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] ">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <div className="text-gray-400 text-lg">Loading messages...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-[#0A0A0A] " style={{ height: '90vh' }}>
      {/* Header */}
      <div className="flex-none border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur-lg ">
        <div className="px-6 py-4">
          <div className="backdrop-blur-2xl border-b border-white/10" style={{marginTop:"2vh",marginBottom:"2vh"}}>
            <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (selectedThread) {
                    setSelectedThread(null); // On mobile, go back to thread list
                  } else {
                    router.back(); // If no thread selected, go back to previous page
                  }
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <HiArrowLeft size={24} className="text-white" />
              </motion.button>
              <h1 className="text-3xl font-bold text-white">
                {'Messages'}
              </h1>
            </div>
          </div>

          {/* Category Tabs - Hide on mobile when thread is selected */}
          {(!selectedThread || !isMobile) && (
            <div className="flex gap-4 bg-white/5 p-1 rounded-2xl backdrop-blur-xl bg-[#0A0A0A]" style={{height:"6vh", marginTop:"5vh",background:"#0A0A0A"}}>
              {categories.map(category => {
                const Icon = category.icon;
                // Calculate unread count for this category
                const categoryUnread = activeCategory === category.id 
                  ? threads.reduce((sum, thread) => sum + (thread.unreadCount || 0), 0)
                  : 0;
                
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setSelectedThread(null);
                    }}
                    className={`bg-[#0A0A0A] flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 relative ${
                      activeCategory === category.id
                        ? 'bg-gradient-to-r from-primary to-accent text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{category.label}</span>
                    {categoryUnread > 0 && (
                      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1.5">
                        {categoryUnread > 99 ? '99+' : categoryUnread}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column - Thread List - Hide on mobile when thread selected */}
        <div 
          style={{
            width: isMobile ? '100vw' : '15vw',
            paddingLeft: isMobile ? '2vw' : '0',
            paddingRight: isMobile ? '2vw' : '0'
          }} 
          className={`border-r border-white/10 flex flex-col bg-[#0A0A0A]  ${
            selectedThread ? 'hidden md:block' : 'block'
          }`}
        >
          <div className="flex-1 overflow-y-auto">
            {threads.length === 0 ? (
              <div className="p-8 text-center">
                <FiMessageCircle className="mx-auto text-gray-600 mb-3" size={48} />
                <p className="text-gray-500 text-sm">No {activeCategory} messages yet</p>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {threads.map((thread) => {
                  const theme = destinationThemes[thread.themeKey];
                  const Icon = theme.icon;
                  const isSelected = selectedThread?.id === thread.id;
                  const hasUnread = thread.unreadCount > 0;
                  
                  const handleThreadClick = async () => {
                    
                    // Optimistically update the thread's lastReadTimestamp in state
                    const updatedThreads = threads.map(t => {
                      if (t.id === thread.id) {
                        return {
                          ...t,
                          lastReadTimestamp: { toDate: () => new Date() },
                          unreadCount: 0
                        };
                      }
                      return t;
                    });
                    setThreads(updatedThreads);
                    
                    // Update selectedThread with optimistic timestamp
                    setSelectedThread({
                      ...thread,
                      lastReadTimestamp: { toDate: () => new Date() },
                      unreadCount: 0
                    });
                    
                    
                    // Update lastRead timestamp in Firestore (will trigger real update)
                    try {
                      if (thread.type === 'direct') {
                        const threadRef = doc(db, 'directMessages', thread.id);
                        await setDoc(threadRef, {
                          [`lastRead_${user.uid}`]: serverTimestamp()
                        }, { merge: true });
                      } else if (thread.type === 'ride') {
                        const threadRef = doc(db, 'rides', thread.id);
                        await setDoc(threadRef, {
                          [`lastRead_${user.uid}`]: serverTimestamp()
                        }, { merge: true });
                      }
                    } catch (error) {
                      console.error('❌ Error updating lastRead on click:', error);
                    }
                  };
                  
                  return (
                    <motion.div
                      key={thread.id}
                      style={{marginBottom:"1vh",marginTop:"1vh"}}
                      whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                      onClick={handleThreadClick}
                      className={`p-4 cursor-pointer transition-all relative ${
                        isSelected ? 'bg-white/10 border-l-4 border-primary' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Icon/Avatar */}
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${theme.bg} flex items-center justify-center flex-shrink-0 relative`}>
                          <Icon className={theme.color} size={24} />
                          {hasUnread && (
                            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg">
                              {thread.unreadCount > 9 ? '9+' : thread.unreadCount}
                            </div>
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`text-sm font-bold truncate ${hasUnread ? 'text-white' : 'text-white'}`}>
                              {thread.title}
                            </h3>
                            <span className="text-xs text-gray-500 ml-2 flex-shrink-0" style={{marginRight:"1vw"}}>
                              {formatTime(thread.lastMessageTime)}
                            </span>
                          </div>
                          <p className={`text-xs truncate ${hasUnread ? 'text-gray-300 font-semibold' : 'text-gray-400'}`}>
                            {getLastMessagePreview(thread)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Chat View - Show on mobile when thread selected, always show on desktop */}
        <div className={`flex-1 flex flex-col bg-[#0A0A0A] bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10  ${
          selectedThread ? 'block' : 'hidden md:flex'
        }`}>
          {!selectedThread ? (
            // Skeleton Placeholder
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center max-w-md">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
                >
                  <FiMessageCircle className="text-gray-600" size={64} />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">Select a conversation</h3>
                <p className="text-gray-400">Choose a thread from the left to start messaging</p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="flex-none border-b border-white/10 p-4 bg-[#0A0A0A]/95 backdrop-blur-lg bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const theme = destinationThemes[selectedThread.themeKey];
                      const Icon = theme.icon;
                      return (
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${theme.bg} flex items-center justify-center`}>
                          <Icon className={theme.color} size={20} />
                        </div>
                      );
                    })()}
                    <div>
                      <h2 className="text-lg font-bold text-white">{selectedThread.title}</h2>
                      <p className="text-xs text-gray-400">{selectedThread.participantCount} participants</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/5 rounded-full transition-all">
                    <FiMoreVertical className="text-gray-400" size={20} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar" style={{padding:"1vw"}}>
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <FiMessageCircle className="text-purple-400" size={32} />
                    </div>
                    <p className="text-sm text-gray-400">No messages yet</p>
                    <p className="text-xs mt-1 text-gray-500">Be the first to say hi! 👋</p>
                  </div>
                ) : (
                  messages.map((message, index) => {
                    const isOwn = message.senderId === user?.uid;
                    const isSystem = message.senderId === 'system';
                    
                    // Check if we need to show timestamp (if >30 mins since last message)
                    let showTimestamp = index === 0;
                    
                    if (index > 0 && messages[index - 1].timestamp && message.timestamp) {
                      // Convert timestamps to milliseconds for comparison
                      let currentTime, previousTime;
                      
                      // Handle Firestore Timestamp objects
                      if (message.timestamp?.toDate) {
                        currentTime = message.timestamp.toDate().getTime();
                      } else if (message.timestamp?.seconds) {
                        currentTime = message.timestamp.seconds * 1000;
                      } else if (message.timestamp instanceof Date) {
                        currentTime = message.timestamp.getTime();
                      } else {
                        currentTime = 0;
                      }
                      
                      if (messages[index - 1].timestamp?.toDate) {
                        previousTime = messages[index - 1].timestamp.toDate().getTime();
                      } else if (messages[index - 1].timestamp?.seconds) {
                        previousTime = messages[index - 1].timestamp.seconds * 1000;
                      } else if (messages[index - 1].timestamp instanceof Date) {
                        previousTime = messages[index - 1].timestamp.getTime();
                      } else {
                        previousTime = 0;
                      }
                      
                      const timeDiff = currentTime - previousTime;
                      showTimestamp = timeDiff > 30 * 60 * 1000; // 30 minutes in milliseconds
                    }
                    
                    if (isSystem) {
                      return (
                        <div key={message.id}>
                          {/* Timestamp Divider */}
                          {showTimestamp && message.timestamp && (
                            <div className="flex items-center justify-center my-4">
                              <span className="text-xs px-3 py-1 rounded-full text-gray-500">
                                {(() => {
                                  let date;
                                  if (message.timestamp?.toDate) {
                                    date = message.timestamp.toDate();
                                  } else if (message.timestamp?.seconds) {
                                    date = new Date(message.timestamp.seconds * 1000);
                                  } else if (message.timestamp instanceof Date) {
                                    date = message.timestamp;
                                  }
                                  return date?.toLocaleString([], { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  }) || '';
                                })()}
                              </span>
                            </div>
                          )}
                          <div className="flex justify-center my-4">
                            <div className="bg-white/5 px-4 py-2 rounded-full max-w-md">
                              <p className="text-xs text-gray-400 text-center">{message.text}</p>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={message.id}>
                        {/* Timestamp Divider */}
                        {showTimestamp && message.timestamp && (
                          <div className="flex items-center justify-center my-4">
                            <span className="text-xs px-3 py-1 rounded-full text-gray-500">
                              {(() => {
                                let date;
                                if (message.timestamp?.toDate) {
                                  date = message.timestamp.toDate();
                                } else if (message.timestamp?.seconds) {
                                  date = new Date(message.timestamp.seconds * 1000);
                                } else if (message.timestamp instanceof Date) {
                                  date = message.timestamp;
                                }
                                return date?.toLocaleString([], { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                }) || '';
                              })()}
                            </span>
                          </div>
                        )}
                        
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex items-end gap-2 ${isOwn ? 'justify-end' : 'justify-start'}`}
                        >
                          {/* Avatar for other users */}
                          {!isOwn && (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center flex-shrink-0 mb-1">
                              <span className="font-semibold text-xs text-white">
                                {message.senderName?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                          
                          <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                            {/* Sender Name - Only show for others' messages */}
                            {!isOwn && (
                              <p className="text-xs mb-1 ml-2 text-gray-400">{message.senderName}</p>
                            )}
                            
                            {/* Message Bubble */}
                            <div 
                              className={`rounded-2xl backdrop-blur-sm ${
                                isOwn
                                  ? 'bg-gradient-to-br from-primary via-primary/90 to-accent text-white rounded-br-md shadow-lg shadow-primary/20'
                                  : 'bg-white/10 text-white border border-white/10 rounded-bl-md'
                              } ${message.imageUrl ? 'p-2' : 'px-5 py-3.5'}`}
                              style={message.imageUrl ? {} : {
                                paddingLeft: '3vw',
                                paddingRight: '3vw',
                                textAlign: 'center',
                                paddingTop: '0.5vh',
                                paddingBottom: '0.5vh',
                                marginBottom: '0.5vh'
                              }}
                            >
                              {message.imageUrl ? (
                                <div className="max-w-xs">
                                  <img 
                                    src={message.imageUrl} 
                                    alt="Shared image" 
                                    className="rounded-xl w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                                    onClick={() => window.open(message.imageUrl, '_blank')}
                                  />
                                </div>
                              ) : (
                                <p className="text-sm leading-relaxed break-words">{message.text}</p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 backdrop-blur-xl bg-black/20">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 focus-within:border-primary/50 transition-all"
                  style={{paddingRight:"1vw",paddingLeft:"1vw"}}>
                  <input
                    type="text"
                    value={newMessage}
                    style={{height:"6vh",paddingLeft:"1vw"}}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage(e)}
                    placeholder="Message..."
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm py-1 text-white placeholder-gray-400"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className={`flex-shrink-0 transition-all ${
                      newMessage.trim()
                        ? 'text-primary'
                        : 'text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
