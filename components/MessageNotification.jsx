import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX } from 'react-icons/fi';
import { useUnread } from '@/context/UnreadContext';

// Utility function to capitalize first letters
const capitalizeName = (name) => {
  if (!name) return '';
  return name.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

export default function MessageNotification({ user }) {
  const router = useRouter();
  const [notification, setNotification] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);
  const processedRef = useRef(new Set());
  const { latestMessage } = useUnread();

  // Check if user is currently viewing a specific thread
  const isOnMessagesPage = router.pathname === '/messages';
  const isOnRidePage = router.pathname.startsWith('/ride/');
  const currentRideId = isOnRidePage ? router.query.id : null;

  // Handle new messages from context
  useEffect(() => {
    if (!latestMessage || !user) return;
    
    const msgKey = `${latestMessage.threadKey}_${latestMessage.timestamp?.getTime() || 0}`;
    
    // Skip if already processed
    if (processedRef.current.has(msgKey)) return;
    processedRef.current.add(msgKey);
    
    // Don't show if on messages page or viewing this specific ride
    if (isOnMessagesPage) return;
    if (latestMessage.type === 'ride' && currentRideId === latestMessage.threadId) return;
    
    // Clear any existing timeout
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setNotification({
      type: latestMessage.type,
      threadId: latestMessage.threadId,
      title: latestMessage.type === 'ride' ? 'Ride Chat' : capitalizeName(latestMessage.senderName),
      message: latestMessage.text.length > 50 ? latestMessage.text.substring(0, 50) + '...' : latestMessage.text,
      senderName: latestMessage.senderName,
    });
    setIsVisible(true);

    // Auto-hide after 1.5 seconds
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 1500);
  }, [latestMessage, user, isOnMessagesPage, currentRideId]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = () => {
    if (!notification) return;
    
    setIsVisible(false);
    
    if (notification.type === 'ride') {
      router.push(`/ride/${notification.threadId}`);
    } else {
      router.push(`/messages?category=direct`);
    }
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && notification && (
        <motion.div
          initial={{ opacity: 0, y: -100, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -100, x: '-50%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={handleClick}
          className="fixed top-4 left-1/2 z-[100] cursor-pointer"
          style={{ maxWidth: '90vw', width: '400px' }}
        >
          <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
            <div className="flex items-center gap-3 p-4">
              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0">
                <FiMessageCircle className="text-primary" size={20} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-white font-semibold text-sm truncate">
                    {notification.title}
                  </p>
                  <span className="text-xs text-gray-500">now</span>
                </div>
                <p className="text-gray-400 text-xs truncate">
                  {notification.message}
                </p>
              </div>

              {/* Dismiss button */}
              <button
                onClick={handleDismiss}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
              >
                <FiX className="text-gray-400" size={16} />
              </button>
            </div>

            {/* Progress bar */}
            <motion.div
              initial={{ width: '100%' }}
              animate={{ width: '0%' }}
              transition={{ duration: 1.5, ease: 'linear' }}
              className="h-0.5 bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
