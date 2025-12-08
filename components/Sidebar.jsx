import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiUsers, FiInfo, FiMessageCircle } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function Sidebar({ user }) {
  const router = useRouter();
  const currentPath = router.pathname;
  const [currentUser, setCurrentUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setCurrentUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  // Track unread messages from all threads
  useEffect(() => {
    if (!currentUser) {
      setUnreadCount(0);
      return;
    }

    const threadCounts = new Map();
    const messageUnsubscribers = new Map();
    const unsubscribers = [];

    const updateTotalUnread = () => {
      const total = Array.from(threadCounts.values()).reduce((sum, count) => sum + count, 0);
      setUnreadCount(total);
    };

    // Track rides
    const ridesRef = collection(db, 'rides');
    const ridesQuery = query(ridesRef, where('participants', 'array-contains', currentUser.uid));
    
    const unsubRides = onSnapshot(ridesQuery, (snapshot) => {
      snapshot.docs.forEach(async (rideDoc) => {
        const rideData = rideDoc.data();
        const lastReadTimestamp = rideData[`lastRead_${currentUser.uid}`];
        
        if (lastReadTimestamp === null) return;
        
        const threadKey = 'ride_' + rideDoc.id;
        
        if (messageUnsubscribers.has(threadKey)) {
          messageUnsubscribers.get(threadKey)();
          messageUnsubscribers.delete(threadKey);
        } 
        
        const messagesRef = collection(db, 'rides', rideDoc.id, 'messages');
        let messagesQuery;
        
        if (lastReadTimestamp) {
          messagesQuery = query(
            messagesRef,
            where('timestamp', '>', lastReadTimestamp),
            where('senderId', '!=', currentUser.uid)
          );
        } else {
          messagesQuery = query(messagesRef, where('senderId', '!=', currentUser.uid));
        }
        
        const unsubMsg = onSnapshot(messagesQuery, (msgSnap) => {
          threadCounts.set(threadKey, msgSnap.size);
          updateTotalUnread();
        });
        
        messageUnsubscribers.set(threadKey, unsubMsg);
      });
    });

    // Track direct messages
    const directRef = collection(db, 'directMessages');
    const directQuery = query(directRef, where('participants', 'array-contains', currentUser.uid));
    
    const unsubDirect = onSnapshot(directQuery, (snapshot) => {
      snapshot.docs.forEach(async (threadDoc) => {
        const threadData = threadDoc.data();
        const lastReadTimestamp = threadData[`lastRead_${currentUser.uid}`];
        const otherUserId = threadData.participants.find(id => id !== currentUser.uid);
        
        if (lastReadTimestamp === null) return;
        
        const threadKey = 'direct_' + threadDoc.id;
        
        if (messageUnsubscribers.has(threadKey)) {
          messageUnsubscribers.get(threadKey)();
          messageUnsubscribers.delete(threadKey);
        }
        
        const messagesRef = collection(db, 'directMessages', threadDoc.id, 'messages');
        let messagesQuery;
        
        if (lastReadTimestamp) {
          messagesQuery = query(
            messagesRef,
            where('timestamp', '>', lastReadTimestamp),
            where('senderId', '==', otherUserId)
          );
        } else {
          messagesQuery = query(messagesRef, where('senderId', '==', otherUserId));
        }
        
        const unsubMsg = onSnapshot(messagesQuery, (msgSnap) => {
          threadCounts.set(threadKey, msgSnap.size);
          updateTotalUnread();
        });
        
        messageUnsubscribers.set(threadKey, unsubMsg);
      });
    });

    unsubscribers.push(unsubRides, unsubDirect);

    return () => {
      unsubscribers.forEach(unsub => unsub());
      messageUnsubscribers.forEach(unsub => unsub());
    };
  }, [currentUser]);

  const navItems = user ? [
    { id: 'campus', label: 'Campus', icon: FiInfo, path: '/campus' },
    { id: 'marketplace', label: 'Market', icon: FiShoppingBag, path: '/marketplace' },
    { id: 'rides', label: 'Rides', icon: FiUsers, path: '/rides' },
    { id: 'messages', label: 'Messages', icon: FiMessageCircle, path: '/messages', badge: unreadCount },
  ] : [
    { id: 'home', label: 'Home', icon: FiInfo, path: '/' },
    { id: 'signup', label: 'Sign Up', icon: FiUsers, path: '/signup' },
    { id: 'login', label: 'Sign In', icon: FiMessageCircle, path: '/login' },
  ];

  const isActive = (path) => currentPath === path;

  return (
    <aside className="hidden md:flex md:flex-col fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-[#171717]/95 backdrop-blur-lg border-r border-white/10 z-30">
      <nav className="flex flex-col gap-2 p-4">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => router.push(item.path)}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all relative ${
              isActive(item.path)
                ? 'bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30'
                : 'hover:bg-white/5'
            }`}
          >
            <div className="relative">
              <item.icon
                size={24}
                className={`transition-colors ${
                  isActive(item.path)
                    ? 'text-primary drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                    : 'text-gray-400'
                }`}
              />
              {item.badge > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {item.badge > 9 ? '9+' : item.badge}
                </div>
              )}
            </div>
            <span
              className={`text-sm font-semibold ${
                isActive(item.path) ? 'text-white' : 'text-gray-400'
              }`}
            >
              {item.label}
            </span>
            {isActive(item.path) && (
              <motion.div
                layoutId="activeSidebarTab"
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent rounded-r-full"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </nav>
    </aside>
  );
}
