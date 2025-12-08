import { motion } from 'framer-motion';
import { FiUser, FiLogOut, FiMail, FiSettings } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function Profile({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="w-full min-h-[calc(100vh-10rem)] bg-transparent flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400">Please log in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-10rem)] bg-transparent px-6 py-8 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/30 border-4 border-white/10">
            <FiUser size={56} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">{user.displayName || 'User'}</h2>
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-3">
            <FiMail size={18} />
            <span className="text-sm">{user.email}</span>
          </div>
          {user.emailVerified && (
            <span className="inline-block px-4 py-1.5 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30">
              ✓ Verified
            </span>
          )}
        </motion.div>

        {/* Profile Options */}
        <div className="space-y-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            disabled
            className="w-full flex items-center gap-5 bg-gradient-to-br from-[#1C1C1C] to-[#171717] rounded-3xl p-5 border border-white/10 opacity-50 cursor-not-allowed transition-all shadow-lg"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <FiSettings size={24} className="text-primary" />
            </div>
            <div className="flex-1 text-left">
              <span className="text-white font-semibold text-lg block">Settings</span>
              <span className="text-gray-500 text-xs">Coming Soon</span>
            </div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-5 bg-gradient-to-br from-[#1C1C1C] to-[#171717] rounded-3xl p-5 border border-white/10 hover:border-primary/30 transition-all shadow-lg hover:shadow-xl"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <FiLogOut size={24} className="text-primary" />
            </div>
            <span className="text-white font-semibold text-lg">Logout</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
