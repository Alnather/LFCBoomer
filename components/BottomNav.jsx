import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiShoppingBag, FiUsers, FiInfo } from 'react-icons/fi';

export default function BottomNav() {
  const router = useRouter();
  const currentPath = router.pathname;

  const navItems = [
    { id: 'marketplace', label: 'Marketplace', icon: FiShoppingBag, path: '/marketplace' },
    { id: 'rides', label: 'Rides', icon: FiUsers, path: '/rides' },
    { id: 'campus', label: 'Campus', icon: FiInfo, path: '/campus' },
  ];

  const isActive = (path) => currentPath === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#171717]/95 backdrop-blur-lg border-t border-white/10 z-50" style={{paddingBottom: "env(safe-area-inset-bottom)"}}>
      <div className="flex justify-around items-center h-20 max-w-2xl mx-auto px-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(item.path)}
            className="flex flex-col items-center justify-center flex-1 relative"
          >
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1"
            >
              <item.icon
                size={26}
                className={`transition-colors ${
                  isActive(item.path)
                    ? 'text-primary drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                    : 'text-gray-500'
                }`}
              />
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
    </nav>
  );
}
