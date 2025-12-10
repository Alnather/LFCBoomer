import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMapPin, FiCalendar, FiClock, FiUsers, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { MdFlight, MdShoppingCart, MdLocationCity, MdArrowRightAlt, MdSchool, MdEdit } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { db, auth } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Utility function to capitalize first letters
const capitalizeName = (name) => {
  if (!name) return '';
  return name.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

// Shopping destinations
const shoppingLocations = ['target', 'walmart', 'costco', 'whole foods', 'trader joe', 'jewel', 'mariano', 'mall', 'outlet'];

// Downtown keywords
const downtownKeywords = ['downtown', 'city center', 'downtown chicago', 'magnificent mile', 'loop','chicago'];

// College keywords
const collegeKeywords = ['lake forest', 'college', 'university', 'campus', 'northwestern', 'depaul', 'loyola', 'uic', 'uchicago'];

const destinationThemes = {
  'airport': {
    icon: MdFlight,
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    iconColor: 'text-cyan-400',
    glow: 'shadow-cyan-500/20'
  },
  'shopping': {
    icon: MdShoppingCart,
    gradient: 'from-red-500/20 via-pink-500/10 to-transparent',
    iconColor: 'text-pink-400',
    glow: 'shadow-pink-500/20'
  },
  'downtown': {
    icon: MdLocationCity,
    gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    iconColor: 'text-indigo-400',
    glow: 'shadow-indigo-500/20'
  },
  'college': {
    icon: MdSchool,
    gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
    iconColor: 'text-emerald-400',
    glow: 'shadow-emerald-500/20'
  },
  'default': {
    icon: FiMapPin,
    gradient: 'from-gray-500/20 via-gray-500/10 to-transparent',
    iconColor: 'text-gray-400',
    glow: 'shadow-gray-500/20'
  }
};

// Function to detect theme based on destination name
const detectTheme = (destination) => {
  const lowerDest = destination.toLowerCase();
  
  // Check for airport
  if (lowerDest.includes('airport') || lowerDest.includes('ord') || lowerDest.includes('mdw')) {
    return 'airport';
  }
  
  // Check for shopping
  if (shoppingLocations.some(shop => lowerDest.includes(shop))) {
    return 'shopping';
  }
  
  // Check for downtown
  if (downtownKeywords.some(keyword => lowerDest.includes(keyword))) {
    return 'downtown';
  }
  
  // Check for college
  if (collegeKeywords.some(keyword => lowerDest.includes(keyword))) {
    return 'college';
  }
  
  return 'default';
};

export default function Rides() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFABWiggle, setShowFABWiggle] = useState(false);
  const [hoveredFAB, setHoveredFAB] = useState(null);
  const [dateFilter, setDateFilter] = useState(null); // For date picker filter
  const [showDateModal, setShowDateModal] = useState(false); // For date picker modal
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const containerRef = useRef(null);

  // Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
        setAuthLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fuzzy search function
  const fuzzyMatch = (str, pattern) => {
    if (!pattern) return true;
    const patternLower = pattern.toLowerCase();
    const strLower = str.toLowerCase();
    
    // Direct includes for simplicity
    if (strLower.includes(patternLower)) return true;
    
    // Fuzzy matching: check if all pattern characters appear in order
    let patternIdx = 0;
    for (let i = 0; i < strLower.length && patternIdx < patternLower.length; i++) {
      if (strLower[i] === patternLower[patternIdx]) {
        patternIdx++;
      }
    }
    return patternIdx === patternLower.length;
  };

  // Fetch rides from Firestore in real-time
  useEffect(() => {
    const ridesRef = collection(db, 'rides');
    const q = query(
      ridesRef,
      where('status', '==', 'active')
      // Note: orderBy requires a composite index. Create it in Firebase Console or remove this line.
      // orderBy('date', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ridesData = snapshot.docs.map(doc => {
        const data = doc.data();
        // Convert Firestore Timestamp to local date string (YYYY-MM-DD)
        let dateStr = '';
        if (data.date?.toDate) {
          const d = data.date.toDate();
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          dateStr = `${year}-${month}-${day}`;
        }
        return {
          id: doc.id,
          destination: data.destination,
          city: data.city || '',
          fullAddress: data.fullAddress || data.destination,
          date: dateStr,
          time: data.time,
          organizer: capitalizeName(data.organizerName),
          organizerId: data.organizerId,
          seats: data.seats,
          members: data.participants?.length || 1,
          description: data.description,
          participants: data.participants || [],
          createdAt: data.createdAt
        };
      });

      // Sort by date on the client side
      ridesData.sort((a, b) => new Date(a.date) - new Date(b.date));

      setRides(ridesData);
      setFilteredRides(ridesData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching rides:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Filter rides based on criteria
    let filtered = rides;

    if (destination) {
      filtered = filtered.filter((ride) =>
        fuzzyMatch(ride.destination, destination) ||
        fuzzyMatch(ride.city || '', destination) ||
        fuzzyMatch(ride.fullAddress || '', destination)
      );
    }

    if (dateFilter) {
      // Convert date filter to local date string (YYYY-MM-DD)
      const year = dateFilter.getFullYear();
      const month = String(dateFilter.getMonth() + 1).padStart(2, '0');
      const day = String(dateFilter.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      filtered = filtered.filter((ride) => ride.date === dateStr);
    }

    if (selectedTime) {
      filtered = filtered.filter((ride) => ride.time.startsWith(selectedTime));
    }

    setFilteredRides(filtered);

    // Show wiggle animation if no results
    if (filtered.length === 0 && (destination || dateFilter || selectedTime)) {
      setTimeout(() => setShowFABWiggle(true), 1000);
      setTimeout(() => setShowFABWiggle(false), 2000);
    }
  }, [destination, dateFilter, selectedTime, rides]);

  const handleCreateRide = () => {
    // Navigate to create ride page
    router.push('/create-ride');
  };

  const handleJoinRide = (rideId) => {
    // Handle join ride logic - navigate to ride detail page
  };

  const getDestinationTheme = (dest) => {
    const themeKey = detectTheme(dest);
    return destinationThemes[themeKey];
  };

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <div className="text-gray-400 text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta name="theme-color" content="#0A0A0A" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#F9FAFB" media="(prefers-color-scheme: light)" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <div ref={containerRef} className="w-full pb-32">
      {/* Filters Section - Uber Style */}
      <div className=" top-0 z-30 border-b border-white/5 pb-6 rounded-[3rem] md:place-self-center">
        <div className="max-w-2xl md:max-w-6xl mx-auto px-6 pt-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{marginTop:"2vh",marginBottom:"1vh"}}
              className="text-4xl font-bold text-white mb-6 text-center bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent"
            >
              Find Your Ride
            </motion.h1>

            {/* Single Destination Input with Date Picker - Uber Style */}
            <motion.div
              whileFocus={{ scale: 1.005 }}
              className="relative group mb-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[3rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <FiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-200 group-focus-within:text-primary transition-colors duration-300 z-10" size={24} />
                <input
                  type="text"
                  placeholder="Where to?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  style={{ height: '7vh', paddingLeft: '3.5rem', paddingRight: '3.5rem', background: '#5a6f8226' }}
                  className="w-full border-2 border-white/20 rounded-[3rem] text-white text-lg font-bold placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 shadow-2xl"
                />
                
                {/* Date Picker Icon - Opens Modal */}
                <button 
                  onClick={() => {
                    if (dateFilter) {
                      setDateFilter(null); // Reset if already selected
                    } else {
                      setShowDateModal(true); // Open modal if not selected
                    }
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-0 bg-transparent border-none cursor-pointer"
                >
                  <FiCalendar 
                    className={`transition-colors duration-300 ${
                      dateFilter ? 'text-primary' : 'text-gray-200 hover:text-primary'
                    }`} 
                    size={24} 
                  />
                </button>
              </div>
            </motion.div>

            {/* Popular Destinations */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2 justify-center mt-4"
              style={{marginBottom:"1vh",marginTop:"2vh"}}
            >
              <span className="text-gray-400 text-sm mr-2">Popular:</span>
              {[
                { name: "O'Hare Airport", icon: MdFlight },
                { name: "Chicago Downtown", icon: MdLocationCity },
                { name: "Lake Forest College", icon: MdSchool }
              ].map((dest, idx) => {
                const Icon = dest.icon;
                return (
                  <motion.button
                  
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDestination(dest.name)}
                    style={{background:"none",border:"none"}}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 rounded-full text-white text-sm font-medium transition-all duration-300 flex items-center gap-2"
                  >
                    <Icon size={16} />
                    {dest.name}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Rides Grid */}
      <div className="w-full pl-5 pr-5 pt-8 pb-32 custom-app-layout-mobile" >
        <div className="max-w-2xl md:max-w-6xl mx-auto"  >
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            <p className="text-gray-400 text-lg">Loading rides...</p>
          </motion.div>
        ) : filteredRides.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-2xl"
            >
              <FiMapPin size={48} className="text-gray-400" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-3">No rides found</h3>
            <p className="text-gray-400 text-lg">Create a new ride to get started!</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6" style={{marginTop:"4vh"}}>
            
            <AnimatePresence>
              {filteredRides.map((ride, index) => {
                const theme = getDestinationTheme(ride.destination);
                const DestIcon = theme.icon;
                const seatsLeft = ride.seats - ride.members;
                
                const handleCardClick = () => {
                  router.push(`/ride/${ride.id}`);
                };

                const handleJoinClick = async (e) => {
                  e.stopPropagation(); // Prevent card click
                  // Quick animation before navigation
                  await new Promise(resolve => setTimeout(resolve, 150));
                  router.push(`/ride/${ride.id}`);
                };
                
                return (
                  <motion.div
                    key={ride.id}
                    layout
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ 
                      delay: index * 0.08,
                      duration: 0.4,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.2 } }}
                    className="group relative cursor-pointer"
                    style={{marginBottom:"1vh"}}
                    onClick={handleCardClick}
                  >
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Card */}
                    <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-visible shadow-2xl group-hover:border-white/20 transition-all duration-300 flex flex-col" style={{ height: '18vh' }}>
                      {/* Gradient Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-50 rounded-3xl`} />
                      
                      {/* Top Section - 70% - Icon, Location, Date, Time */}
                      <div className="relative flex items-center pl-0" style={{ height: '70%' }}>
                        {/* Icon */}
                        <div
                          className="h-full flex items-center justify-start flex-shrink-0"
                          style={{paddingLeft: isMobile ? "6vw" : "2vw", paddingRight:"6vw"}}
                        >
                          <DestIcon className={theme.iconColor} size={48} style={{ minWidth: '48px', minHeight: '48px' }} />
                        </div>

                        {/* Text Content */}
                        <div className="flex-1 px-4 flex flex-col justify-center space-y-2">
                          {/* Location Name */}
                          <h3 className={`font-bold text-white ${
                            ride.destination.length > 25 ? 'text-lg' : 
                            ride.destination.length > 20 ? 'text-xl' : 
                            'text-2xl'
                          }`}>
                            {ride.destination}
                          </h3>
                          
                          {/* City */}
                          {ride.city && (
                            <p className="text-sm text-gray-400">
                              {ride.city}
                            </p>
                          )}
                          
                          {/* Date and Time */}
                          <div className="flex items-center gap-3">
                            <p className="text-lg text-gray-300 font-medium">
                              {new Date(ride.date + 'T12:00:00').toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </p>
                            <span className="text-gray-500">•</span>
                            <p className="text-lg text-gray-400 font-medium">
                              {ride.time}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Section - 30% - Created by & Join Button */}
                      <div className="relative flex items-center justify-between px-6 border-t border-white/10" style={{ height: '30%' }}>
                        {/* Created By & Seats */}
                        <div className="flex items-center gap-3" style={{marginLeft:"2vw"}}>
                          <span className="text-gray-400 text-sm">{ride.organizer}</span>
                          <span className="text-gray-500 text-xs">{ride.members}/{ride.seats} Seats</span>
                        </div>

                        {/* Join Button */}
                        <motion.button
                          whileHover={{ scale: 1.05, x: 5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleJoinClick}
                          className="flex items-center gap-0 px-4 py-2  text-primary font-semibold text-sm transition-all"
                          style={{paddingRight:"1vw"}}
                        >
                          Ride
                          <MdArrowRightAlt size={30} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-28 right-6 flex flex-col gap-4 z-50 items-end">
        {/* My Rides FAB */}
        <motion.button
          onHoverStart={() => setHoveredFAB('myRides')}
          onHoverEnd={() => setHoveredFAB(null)}
          initial={{ width: '64px' }}
          animate={{
            width: hoveredFAB === 'myRides' ? 'auto' : '64px'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/my-rides')}
          className="h-16 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 rounded-full shadow-2xl shadow-purple-500/50 flex items-center overflow-hidden border-2 border-white/20 backdrop-blur-xl"
          style={{ backgroundSize: '200% 200%', animation: 'gradient 3s ease infinite', minWidth: '64px' }}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center justify-center flex-shrink-0" style={{ width: hoveredFAB === 'myRides' ? '48px' : '64px', transition: 'width 0.2s' }}>
              <MdEdit size={24} className="text-white" />
            </div>
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: hoveredFAB === 'myRides' ? 1 : 0,
                width: hoveredFAB === 'myRides' ? 'auto' : 0
              }}
              transition={{ duration: 0.2 }}
              className="text-white font-bold text-base whitespace-nowrap pr-4"
            >
              My Rides
            </motion.span>
          </div>
        </motion.button>

        {/* Create Ride FAB */}
        <motion.button
          initial={{ width: '64px' }}
          animate={showFABWiggle ? { rotate: [0, -10, 10, -10, 10, 0], width: '64px' } : {
            width: hoveredFAB === 'create' ? 'auto' : '64px',
            rotate: 0
          }}
          onHoverStart={() => setHoveredFAB('create')}
          onHoverEnd={() => setHoveredFAB(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCreateRide}
          className="h-16 bg-gradient-to-r from-primary via-accent to-primary rounded-full shadow-2xl shadow-primary/50 flex items-center overflow-hidden border-2 border-white/20 backdrop-blur-xl"
          style={{ backgroundSize: '200% 200%', animation: 'gradient 3s ease infinite', minWidth: '64px' }}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center justify-center flex-shrink-0" style={{ width: hoveredFAB === 'create' ? '48px' : '64px', transition: 'width 0.2s' }}>
              <FiPlus size={28} className="text-white" strokeWidth={3} />
            </div>
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: hoveredFAB === 'create' ? 1 : 0,
                width: hoveredFAB === 'create' ? 'auto' : 0
              }}
              transition={{ duration: 0.2 }}
              className="text-white font-bold text-base whitespace-nowrap pr-4"
            >
              Create Ride
            </motion.span>
          </div>
        </motion.button>
      </div>

      {/* Date Picker Modal */}
      {showDateModal && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowDateModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1a1a1a] rounded-3xl border border-white/10 p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-white mb-4 text-center" style={{marginBottom:"1vh",marginTop:"1vh"}}>Select Date</h3>
            <div className="flex justify-center">
              <DatePicker
                selected={dateFilter}
                onChange={(date) => {
                  setDateFilter(date);
                  setShowDateModal(false);
                }}
                inline
                minDate={new Date()}
              />
            </div>
            <button
              onClick={() => setShowDateModal(false)}
              style={{height:"4vh",marginTop:"2vh",marginBottom:"1vh"}}
              className="w-full mt-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-semibold transition-all"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      
      <style jsx global>{`
        .date-picker-icon-wrapper {
          display: inline-block;
        }
        
        .date-picker-icon-wrapper .react-datepicker-wrapper {
          display: inline-block;
        }
        
        .date-picker-icon-wrapper .react-datepicker__input-container {
          display: inline-block;
        }
        
        .react-datepicker {
          background-color: #1a1a1a !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 1rem !important;
        }
        
        .react-datepicker__header {
          background-color: #2a2a2a !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 1rem 1rem 0 0 !important;
        }
        
        .react-datepicker__current-month,
        .react-datepicker__day-name {
          color: white !important;
        }
        
        .react-datepicker__day {
          color: #9ca3af !important;
        }
        
        .react-datepicker__day:hover {
          background-color: rgba(139, 92, 246, 0.2) !important;
          color: white !important;
        }
        
        .react-datepicker__day--selected {
          background-color: #8b5cf6 !important;
          color: white !important;
        }
        
        .react-datepicker__day--keyboard-selected {
          background-color: rgba(139, 92, 246, 0.5) !important;
        }
        
        .react-datepicker__day--disabled {
          color: #4b5563 !important;
        }
        
        .react-datepicker__close-icon::after {
          background-color: #8b5cf6 !important;
          color: white !important;
        }
      `}</style>
      </div>
    </>
  );
}
