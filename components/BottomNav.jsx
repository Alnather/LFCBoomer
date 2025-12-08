import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiInfo, FiMessageCircle,FiUsers } from 'react-icons/fi';
import { IoCarSport } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { db, auth } from '../lib/firebase';
import { collection, query, where, onSnapshot, orderBy, limit, doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function BottomNav({ user, isAuthPage }) {
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
    const messageUnsubscribers = new Map(); // Track message listeners per thread
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
        

        // Skip if this is a null value from pending serverTimestamp
        if (lastReadTimestamp === null) {
          return;
        }
        
        const threadKey = 'ride_' + rideDoc.id;
        
        // If listener exists, unsubscribe it first (lastRead may have changed)
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
        
        // Skip if this is a null value from pending serverTimestamp
        if (lastReadTimestamp === null) {
          return;
        }
        
        const threadKey = 'direct_' + threadDoc.id;
        
        // If listener exists, unsubscribe it first (lastRead may have changed)
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

  // Define navigation items based on auth state
  const navItems = user ? [
    { id: 'campus', label: 'Campus', icon: FiInfo, path: '/campus' },
    { id: 'marketplace', label: 'Market', icon: FiShoppingBag, path: '/marketplace' },
    { id: 'rides', label: 'Rides', icon: IoCarSport, path: '/rides' },
    { id: 'messages', label: 'Messages', icon: FiMessageCircle, path: '/messages', badge: unreadCount },
  ] : [
    { id: 'home', label: 'Home', icon: FiInfo, path: '/' },
    { id: 'signup', label: 'Sign Up', icon: FiUsers, path: '/signup' },
    { id: 'login', label: 'Sign In', icon: FiMessageCircle, path: '/login' },
  ];

  const isActive = (path) => currentPath === path;

  return (
    <nav className="md:hidden sticky bottom-0 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-lg border-t border-white/10 z-50" style={{paddingBottom: "env(safe-area-inset-bottom)"}}>
      <div className="flex justify-center">
        <div className="flex justify-around items-center h-20 w-full max-w-2xl px-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(item.path)}
            className="flex flex-col items-center justify-center flex-1 relative"
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1 relative"
            >
              <div className="relative">
                <item.icon
                  size={26}
                  className={`transition-colors ${
                    isActive(item.path)
                      ? 'text-primary drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                      : 'text-gray-500'
                  }`}
                />
                {item.badge > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                    {item.badge > 9 ? '9+' : item.badge}
                  </div>
                )}
              </div>
              <span
                className={`text-xs font-semibold ${
                  isActive(item.path)
                    ? 'text-white'
                    : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </motion.div>
            {isActive(item.path) && (
              <motion.div
                layoutId="activeTab"
                className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-b-full shadow-lg shadow-primary/50"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
        </div>
      </div>
    </nav>
  );
}
