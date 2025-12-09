import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiInfo, FiMessageCircle, FiUsers } from 'react-icons/fi';
import { IoCarSport } from 'react-icons/io5';
import { useUnread } from '@/context/UnreadContext';

export default function BottomNav({ user, isAuthPage }) {
  const router = useRouter();
  const currentPath = router.pathname;
  const { unreadCount } = useUnread();

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
