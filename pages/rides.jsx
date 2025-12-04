import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FiPlus, FiMapPin, FiCalendar, FiClock, FiUsers, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { MdFlight, MdShoppingCart, MdLocationCity, MdArrowRightAlt } from 'react-icons/md';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const destinationThemes = {
  'Airport': {
    icon: MdFlight,
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    iconColor: 'text-cyan-400',
    glow: 'shadow-cyan-500/20'
  },
  'Target': {
    icon: MdShoppingCart,
    gradient: 'from-red-500/20 via-pink-500/10 to-transparent',
    iconColor: 'text-pink-400',
    glow: 'shadow-pink-500/20'
  },
  'Downtown': {
    icon: MdLocationCity,
    gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    iconColor: 'text-indigo-400',
    glow: 'shadow-indigo-500/20'
  }
};

export default function Rides() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [showFABWiggle, setShowFABWiggle] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Mock data
  const mockRides = [
    {
      id: 1,
      destination: 'Airport',
      date: '2025-12-05',
      time: '08:00 AM',
      organizer: 'Sarah M.',
      seats: 3,
      members: 2,
    },
    {
      id: 2,
      destination: 'Target',
      date: '2025-12-04',
      time: '02:30 PM',
      organizer: 'Mike R.',
      seats: 4,
      members: 1,
    },
  ];

  useEffect(() => {
    // Load rides - replace with actual API call
    setRides(mockRides);
    setFilteredRides(mockRides);
  }, []);

  useEffect(() => {
    // Filter rides based on criteria
    let filtered = rides;

    if (destination) {
      filtered = filtered.filter((ride) =>
        ride.destination.toLowerCase().includes(destination.toLowerCase())
      );
    }

    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      filtered = filtered.filter((ride) => ride.date === dateStr);
    }

    if (selectedTime) {
      filtered = filtered.filter((ride) => ride.time.startsWith(selectedTime));
    }

    setFilteredRides(filtered);

    // Show wiggle animation if no results
    if (filtered.length === 0 && (destination || selectedDate || selectedTime)) {
      setTimeout(() => setShowFABWiggle(true), 1000);
      setTimeout(() => setShowFABWiggle(false), 2000);
    }
  }, [destination, selectedDate, selectedTime, rides]);

  const handleCreateRide = () => {
    // Navigate to create ride page
    console.log('Create ride clicked');
  };

  const handleJoinRide = (rideId) => {
    // Handle join ride logic
    console.log('Join ride:', rideId);
  };

  const getDestinationTheme = (dest) => {
    return destinationThemes[dest] || {
      icon: FiMapPin,
      gradient: 'from-gray-500/20 via-gray-500/10 to-transparent',
      iconColor: 'text-gray-400',
      glow: 'shadow-gray-500/20'
    };
  };

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
      <div className="sticky top-0 z-30 backdrop-blur-2xl border-b border-white/5 pb-8">
        <div className="max-w-2xl mx-auto px-6 pt-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Single Destination Input - Uber Style */}
            <motion.div
              whileFocus={{ scale: 1.005 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[3rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <FiMapPin className="absolute left-4 top-9 transform -translate-y-1/2 text-gray-200 group-focus-within:text-primary transition-colors duration-300" size={24} />
                <input
                  type="text"
                  placeholder="Where to?"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  style={{ height: '7vh',paddingLeft: '4.5rem' ,marginTop:"1vh", background: '#5a6f8226' }}
                  className="w-full pl-16 pr-12 backdrop-blur-xl border-2 border-white/20 rounded-[3rem] text-white text-x font-bold placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Rides Grid with Parallax */}
      <motion.div style={{ y }} className="w-full pl-5 pr-5 pt-8 pb-32">
        <div className="max-w-2xl mx-auto">
        {filteredRides.length === 0 ? (
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
          <div style={{marginTop:"4vh"}}>
            
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
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
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                          className="h-full flex items-center justify-start flex-shrink-0 pl-3"
                          style={{paddingLeft:"2vw",paddingRight:"6vw"}}
                        >
                          <DestIcon className={theme.iconColor} size={48} />
                        </motion.div>

                        {/* Text Content */}
                        <div className="flex-1 px-4 flex flex-col justify-center space-y-2">
                          {/* Location Name */}
                          <h3 className="text-2xl font-bold text-white">
                            {ride.destination}
                          </h3>
                          
                          {/* Date and Time */}
                          <div className="flex items-center gap-3">
                            <p className="text-lg text-gray-300 font-medium">
                              {new Date(ride.date).toLocaleDateString('en-US', { 
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
                      <div className="relative flex items-center justify-between px-6" style={{ height: '30%' }}>
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
                          Join
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
      </motion.div>

      {/* Floating Action Button */}
      <motion.button
        animate={showFABWiggle ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleCreateRide}
        className="fixed bottom-28 right-6 w-16 h-16 bg-gradient-to-r from-primary via-accent to-primary rounded-full shadow-2xl shadow-primary/50 flex items-center justify-center z-50 border-2 border-white/20 backdrop-blur-xl"
        style={{ backgroundSize: '200% 200%', animation: 'gradient 3s ease infinite' }}
      >
        <FiPlus size={16} className="text-white" strokeWidth={3} />
      </motion.button>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      </div>
    </>
  );
}
