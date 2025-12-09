import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiUser, FiShoppingBag, FiInfo, FiMessageCircle, FiUsers, FiLogIn } from 'react-icons/fi';
import { IoCarSport } from 'react-icons/io5';
import Link from 'next/link';
import { db, auth } from '../lib/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const colorPalettes = {
  "Midnight Red": {
    primary: "#EF4444",
    accent: "#FB923C",
    background: "#0A0A0A",
    navbar: "#171717",
    text: "#F5F5F5"
  },
  // "Ocean Blue": {
  //   primary: "#3B82F6",
  //   accent: "#0EA5E9",
  //   background: "#0F172A",
  //   navbar: "#1E293B",
  //   text: "#F1F5F9"
  // }
  // },
  // "Forest Green": {
  //   primary: "#10B981",
  //   accent: "#34D399",
  //   background: "#064E3B",
  //   navbar: "#065F46",
  //   text: "#ECFCCB"
  // },
  // "Purple Haze": {
  //   primary: "#8B5CF6",
  //   accent: "#EC4899",
  //   background: "#1E1B4B",
  //   navbar: "#312E81",
  //   text: "#F5F3FF"
  // },
  "Sunset Orange": {
    primary: "#F97316",
    accent: "#FACC15",
    background: "#1C1917",
    navbar: "#292524",
    text: "#FEF3C7"
  },
  // "Deep Ocean": {
  //   primary: "#06B6D4",
  //   accent: "#0284C7",
  //   background: "#164E63",
  //   navbar: "#155E75",
  //   text: "#E0F2FE"
  // },
  // "Cherry Blossom": {
  //   primary: "#EC4899",
  //   accent: "#F472B6",
  //   background: "#FDF2F8",
  //   navbar: "#FCE7F3",
  //   text: "#831843"
  // },
  "Arctic Blue": {
    primary: "#0EA5E9",
    accent: "#38BDF8",
    background: "#F0F9FF",
    navbar: "#E0F2FE",
    text: "#0C4A6E"
  },
  // "Lime Fresh": {
  //   primary: "#84CC16",
  //   accent: "#BEF264",
  //   background: "#F7FEE7",
  //   navbar: "#ECFCCB",
  //   text: "#365314"
  // },
  // "Royal Purple": {
  //   primary: "#7C3AED",
  //   accent: "#A78BFA",
  //   background: "#FAF5FF",
  //   navbar: "#F3E8FF",
  //   text: "#4C1D95"
  // },
  // "Charcoal": {
  //   primary: "#64748B",
  //   accent: "#94A3B8",
  //   background: "#020617",
  //   navbar: "#0F172A",
  //   text: "#F1F5F9"
  // },
  // "Campus Core": {
  //   primary: "#2563EB",
  //   accent: "#F97316",
  //   background: "#F9FAFB",
  //   navbar: "#E5E7EB",
  //   text: "#0F172A"
  // },
  // "Eco Ride": {
  //   primary: "#16A34A",
  //   accent: "#22C55E",
  //   background: "#F0FDF4",
  //   navbar: "#DCFCE7",
  //   text: "#052E16"
  // },
  // "Night Shuttle": {
  //   primary: "#0EA5E9",
  //   accent: "#FACC15",
  //   background: "#020617",
  //   navbar: "#020817",
  //   text: "#F9FAFB"
  // },
  // "Marketplace Sunset": {
  //   primary: "#FB923C",
  //   accent: "#EC4899",
  //   background: "#FFFBEB",
  //   navbar: "#FEF3C7",
  //   text: "#1F2937"
  // },
  // "Social Grape": {
  //   primary: "#6366F1",
  //   accent: "#E11D48",
  //   background: "#EEF2FF",
  //   navbar: "#E0E7FF",
  //   text: "#020617"
  // },
  // "Tech Minimal": {
  //   primary: "#0F172A",
  //   accent: "#3B82F6",
  //   background: "#FFFFFF",
  //   navbar: "#F3F4F6",
  //   text: "#020617"
  // },
  // "Cafe Commons": {
  //   primary: "#65A30D",
  //   accent: "#EA580C",
  //   background: "#F5F5F4",
  //   navbar: "#E7E5E4",
  //   text: "#1C1917"
  // },
  // "Pastel Campus": {
  //   primary: "#38BDF8",
  //   accent: "#F472B6",
  //   background: "#FDF2FF",
  //   navbar: "#FCE7F3",
  //   text: "#0F172A"
  // },
  // "Urban Transit": {
  //   primary: "#111827",
  //   accent: "#F97316",
  //   background: "#E5E7EB",
  //   navbar: "#D1D5DB",
  //   text: "#020617"
  // },
  // "Library Calm": {
  //   primary: "#0284C7",
  //   accent: "#14B8A6",
  //   background: "#ECFEFF",
  //   navbar: "#CFFAFE",
  //   text: "#082F49"
  // }
};

export default function TopBar({ user, isAuthPage }) {
  const router = useRouter();
  const currentPath = router.pathname;
  const [selectedPalette, setSelectedPalette] = useState("Midnight Red");
  const [currentUser, setCurrentUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setCurrentUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  // Track unread messages
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
    { id: 'rides', label: 'Rides', icon: IoCarSport, path: '/rides' },
    { id: 'messages', label: 'Messages', icon: FiMessageCircle, path: '/messages', badge: unreadCount },
  ] : [
    { id: 'home', label: 'Home', icon: FiInfo, path: '/' },
    { id: 'signup', label: 'Sign Up', icon: FiUsers, path: '/signup' },
    { id: 'login', label: 'Sign In', icon: FiLogIn, path: '/login' },
  ];

  const isActive = (path) => currentPath === path;

  const handlePaletteChange = (e) => {
    const paletteName = e.target.value;
    setSelectedPalette(paletteName);
    const palette = colorPalettes[paletteName];
    
    // Update CSS variables for Tailwind @theme
    const root = document.documentElement;
    root.style.setProperty('--color-primary', palette.primary);
    root.style.setProperty('--color-accent', palette.accent);
    
    // Update body background
    const isDark = palette.background.toLowerCase().includes('#0') || palette.background.toLowerCase().includes('#1');
    if (isDark) {
      document.body.style.background = `linear-gradient(to bottom, ${palette.background} 0%, ${palette.background} 50%, ${palette.background} 100%)`;
    } else {
      document.body.style.background = palette.background;
    }
    
    // Update background color for all pages
    document.body.style.backgroundColor = palette.background;
    
    // Update theme-color meta tag for Safari UI blending
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', palette.background);
    }
    
    // Create style element to override Tailwind text colors and backgrounds
    let styleEl = document.getElementById('theme-override');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'theme-override';
      document.head.appendChild(styleEl);
    }
    
    styleEl.textContent = `
      .text-white, h1, h2, h3, h4, h5, h6, p {
        color: ${palette.text} !important;
      }
      .text-gray-300 {
        color: ${palette.text}CC !important;
      }
      .text-gray-400 {
        color: ${palette.text}99 !important;
      }
      .text-gray-500 {
        color: ${palette.text}66 !important;
      }
      .text-gray-200 {
        color: ${palette.text}DD !important;
      }
      /* Update icon colors */
      svg {
        color: ${palette.text} !important;
      }
      .text-primary svg {
        color: ${palette.primary} !important;
      }
      /* Update navbar backgrounds using navbar color */
      header {
        background: ${palette.navbar} !important;
        backdrop-filter: blur(12px) !important;
      }
      nav {
        background: ${palette.navbar} !important;
        backdrop-filter: blur(12px) !important;
      }
    `;
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0A0A0A]/95 backdrop-blur-lg border-b border-white/10 z-40 group" style={{paddingTop: "env(safe-area-inset-top)"}}>
      <div className="flex justify-center">
        <div 
          className="flex items-center h-16 w-full max-w-7xl justify-between"
          style={{ 
            paddingLeft: isMobile ? '2.5vw' : '0', 
            paddingRight: isMobile ? '2.5vw' : '0' 
          }}
        >
          
          <h1 className="text-2xl font-bold">
            <Link href="/">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Boomer</span>
            </Link>
          </h1>
          
          {/* Desktop Navigation */}
          <nav className={`hidden md:flex items-center h-16 ${!user ? 'flex-1 justify-center' : ''}`}>
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => router.push(item.path)}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center relative h-full px-[2vw]"
                style={{paddingLeft:"3vw",paddingRight:"3vw"}}
              >
                <div className="flex flex-col items-center transition-transform duration-300 ease-in-out translate-y-2 group-hover:translate-y-0">
                  <div className="relative">
                    <item.icon
                      size={32}
                      className={`transition-colors ${
                        isActive(item.path)
                          ? 'text-primary drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    />
                    {item.badge > 0 && (
                      <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                        {item.badge > 9 ? '9+' : item.badge}
                      </div>
                    )}
                  </div>
                  
                  {/* Label appears on group hover */}
                  <span
                    className={`text-xs font-medium mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out ${
                      isActive(item.path) ? 'text-white' : 'text-gray-400'
                    }`}
                    style={{ display: 'block', minHeight: '1rem' }}
                  >
                    {item.label}
                  </span>
                </div>
                
                {/* Active indicator - red underline */}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-t-full shadow-lg shadow-primary/50"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </nav>
          
          {user && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => router.push('/profile')}
              className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center hover:border-primary transition-all"
            >
              <FiUser size={20} className="text-primary" />
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
}
