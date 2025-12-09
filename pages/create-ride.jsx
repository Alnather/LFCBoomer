import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi';
import { FiMapPin, FiCalendar, FiClock, FiUsers, FiAlignLeft, FiInfo } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Utility function to capitalize first letters
const capitalizeName = (name) => {
  if (!name) return '';
  return name.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

export default function CreateRide() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [seats, setSeats] = useState(4);
  const [description, setDescription] = useState('');
  const [pickup, setPickup] = useState('Lake Forest College');
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        // Redirect to login if not authenticated
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Generate next 7 days
  const getNextDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const dateObj = new Date();
      dateObj.setDate(dateObj.getDate() + i);
      days.push({
        date: dateObj,
        label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
        full: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      });
    }
    return days;
  };

  const days = getNextDays();
  
  // Detect if mobile (screen width < 768px)
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Get visible days based on screen size
  const visibleDays = isMobile ? days.slice(0, 3) : days;

  // Fetch location suggestions using Google Places Autocomplete
  // Centered around Lake Forest, Illinois
  const fetchLocationSuggestions = async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      // Keep loading state true to show skeleton while typing
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const response = await fetch(
        `/api/autocomplete?input=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSuggestions(data.suggestions || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Debounce location search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (destination) {
        fetchLocationSuggestions(destination);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [destination]);

  const handleDestinationSelect = (suggestion) => {
    const fullText = suggestion.placePrediction?.text?.text || suggestion.description || '';
    const mainText = suggestion.placePrediction?.structuredFormat?.mainText?.text || fullText.split(',')[0];
    const secondaryText = suggestion.placePrediction?.structuredFormat?.secondaryText?.text || '';
    
    // Extract city (usually first part of secondary text)
    const city = secondaryText.split(',')[0].trim();
    
    setDestination(fullText); // Store full for form display
    // We'll store parsed data separately when submitting
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Check if a date matches one of the next 7 days
  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  };

  // Handle day button click
  const handleDayClick = (index) => {
    setSelectedDay(index);
    setDate(days[index].date);
  };

  // Handle date picker change
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    // Check if selected date matches any of the 7 days
    const matchingDayIndex = days.findIndex(day => isSameDay(day.date, selectedDate));
    setSelectedDay(matchingDayIndex !== -1 ? matchingDayIndex : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!destination || !date || !time) {
      alert('Please fill in all required fields');
      return;
    }

    if (!user) {
      alert('You must be logged in to create a ride');
      router.push('/login');
      return;
    }

    setSubmitting(true);

    try {
      // Combine date and time into a single timestamp
      const rideDateTime = new Date(date);
      const timeDate = new Date(time);
      rideDateTime.setHours(timeDate.getHours());
      rideDateTime.setMinutes(timeDate.getMinutes());

      // Parse destination into components
      const destParts = destination.split(',').map(s => s.trim());
      const locationName = destParts[0]; // Main location name
      const city = destParts[1] || ''; // City
      const fullAddress = destination; // Full address

      // Create ride document in Firestore
      const rideData = {
        destination: locationName, // Short name for display
        city: city,
        fullAddress: fullAddress,
        pickup: pickup,
        date: rideDateTime,
        time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        seats: Number(seats),
        description: description || '',
        organizerId: user.uid,
        organizerName: capitalizeName(user.displayName || user.email || 'Anonymous'),
        organizerEmail: user.email,
        status: 'active',
        createdAt: serverTimestamp(),
        participants: [user.uid], // Organizer is automatically a participant
      };

      const docRef = await addDoc(collection(db, 'rides'), rideData);
      
      // Add system welcome message to the ride
      const messagesRef = collection(db, 'rides', docRef.id, 'messages');
      await addDoc(messagesRef, {
        text: `🚗 Welcome to the ride! ${capitalizeName(user.displayName || user.email || 'The organizer')} has created this ride to ${locationName}. Feel free to chat and coordinate pickup details!`,
        senderId: 'system',
        senderName: 'System',
        timestamp: serverTimestamp(),
        type: 'system'
      });
      
      // Navigate to rides page
      router.push('/rides');
    } catch (error) {
      console.error('Error creating ride:', error);
      alert('Failed to create ride. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <meta name="theme-color" content="#0A0A0A" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#F9FAFB" media="(prefers-color-scheme: light)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      <div className="w-full min-h-screen pb-32 flex justify-center" style={isMobile ? {paddingLeft:"4vw",paddingRight:"4vw"} : {}}>
        <div className="w-full max-w-2xl md:max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{marginTop:"2vh"}}
          className="sticky top-0 z-30 backdrop-blur-2xl border-b border-white/5 pb-6"
        >
          <div className="px-6 pt-8">
            <div className="flex items-center gap-4 mb-6">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => router.back()}
                className="w-10 h-10 rounded-full backdrop-blur-xl  flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <HiArrowLeft size={24} className="text-white" />
              </motion.button>
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                // style={{marginBottom:"2vh"}}
                className="text-3xl font-bold text-white"
              >
                Create Ride
              </motion.h1>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="max-w-2xl md:max-w-4xl mx-auto px-6 pt-8"
          style={{marginTop:"5vh"}}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Destination */}
            <motion.div
              whileFocus={{ scale: 1.002 }}
              className="relative group"
              style={{ marginBottom: '4vh' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[1rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <FiMapPin className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-300 z-10" size={22} />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => {
                    setShowSuggestions(true);
                    setIsLoadingSuggestions(true);
                  }}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Destination"
                  style={{ height: '8vh', paddingLeft: '4rem', background: '#5a6f8226'  }}
                  className="w-full pr-6 backdrop-blur-xl border-2 border-white/20 rounded-[1rem] text-white text-lg font-semibold placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 shadow-xl"
                  required
                />
                
                {/* Suggestions Dropdown */}
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl z-50 overflow-hidden"
                    style={{ maxHeight: '240px', minHeight: isLoadingSuggestions && suggestions.length === 0 ? '180px' : '100px' ,paddingLeft:"2vw",paddingRight:"2vw",paddingTop:"1vh",paddingBottom:"2vh"}}
                  >
                    <div className="overflow-y-auto max-h-[240px] overflow-x-hidden">
                      {isLoadingSuggestions && suggestions.length === 0 ? (
                        // Skeleton loader
                        <>
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="px-4 py-3 border-b border-white/5 last:border-b-0">
                              <div className="flex flex-col gap-2">
                                <div className="h-4 bg-white/10 rounded animate-pulse w-3/4"></div>
                                <div className="h-3 bg-white/5 rounded animate-pulse w-1/2"></div>
                              </div>
                            </div>
                          ))}
                        </>
                      ) : suggestions.length > 0 ? (
                        suggestions.slice(0, 3).map((suggestion, index) => (
                          <motion.button
                            key={suggestion.placePrediction?.placeId || index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            type="button"
                            onClick={() => handleDestinationSelect(suggestion)}
                            className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0"
                          >
                            <div className="flex flex-col gap-1">
                              <p className="text-white text-sm font-semibold truncate">
                                {suggestion.placePrediction?.structuredFormat?.mainText?.text || suggestion.placePrediction?.text?.text || ''}
                              </p>
                              <p className="text-gray-400 text-xs truncate">
                                {suggestion.placePrediction?.structuredFormat?.secondaryText?.text || ''}
                              </p>
                            </div>
                          </motion.button>
                        ))
                      ) : null}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Day Selector */}
            <div style={{ marginBottom: '2vh' }}>
              <div className={`grid gap-2 ${isMobile ? 'grid-cols-3' : 'grid-cols-7'}`}>
                {visibleDays.map((day, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDayClick(index)}
                    className={`py-3 px-2 rounded-xl text-center transition-all ${
                      selectedDay === index
                        ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg'
                        : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-xs font-semibold">{day.label}</div>
                    <div className="text-xs mt-1 opacity-70">{day.full.split(' ')[1]}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Date, Time, and Seats Row */}
            <div className="grid grid-cols-3 gap-3">
              {/* Date */}
              <motion.div
                whileFocus={{ scale: 1.002 }}
                className="relative group"
                style={{ marginBottom: '4vh' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[1rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <FiCalendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-300 z-10 pointer-events-none" size={20} />
                  <DatePicker
                    selected={date}
                    onChange={handleDateChange}
                    minDate={new Date()}
                    dateFormat="MMM d"
                    placeholderText="Date"
                    style={{ paddingLeft: '4rem !important' }}
                    className="w-full pl-11 pr-3 py-4 backdrop-blur-xl border-2 border-white/20 rounded-[1rem] text-white text-sm font-semibold placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 shadow-xl pl-3 h-5 form_background"
                    required
                  />
                </div>
              </motion.div>

              {/* Time */}
              <motion.div
                whileFocus={{ scale: 1.002 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[1rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <FiClock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-300 z-10 pointer-events-none" size={20} />
                  <DatePicker
                    selected={time}
                    onChange={(time) => setTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    placeholderText="Time"
                    className="w-full pl-11 pr-3 py-4 backdrop-blur-xl border-2 border-white/20 rounded-[1rem] text-white text-sm font-semibold placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 shadow-xl pl-3 h-5 form_background"
                    required
                  />
                </div>
              </motion.div>

              {/* Seats */}
              <motion.div
                whileFocus={{ scale: 1.002 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[1rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <FiUsers className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-300 z-10" size={20} />
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[1-8]"
                    value={seats}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^1-8]/g, '');
                      if (val === '') setSeats('');
                      else setSeats(Math.max(1, Math.min(8, parseInt(val) || 1)));
                    }}
                    onBlur={(e) => {
                      if (!seats || seats === '') setSeats(4);
                    }}
                    onFocus={(e) => e.target.select()}
                    placeholder="Seats"
                    style={{ background: '#5a6f8226' }}
                    className="w-full pl-11 pr-3 py-4 backdrop-blur-xl border-2 border-white/20 rounded-[1rem] text-white text-sm font-semibold placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 shadow-xl pl-3 h-5"
                  />
                </div>
              </motion.div>
            </div>

            {/* Description */}
            <motion.div
              whileFocus={{ scale: 1.002 }}
              className="relative group"
              style={{ marginBottom: '4vh' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[1rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <FiAlignLeft className="absolute left-5 top-6 text-gray-400 group-focus-within:text-primary transition-colors duration-300 z-10" size={20} />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add details about your ride... (optional)"
                  rows={5}
                  style={{ background: '#5a6f8226' , padding: '1rem', paddingLeft: '3.5rem' }}
                  className="w-full pl-14 pr-6 py-5 backdrop-blur-xl border-2 border-white/20 rounded-[1rem] text-white text-base placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 resize-none shadow-xl"
                />
              </div>
            </motion.div>

            {/* Pickup Location */}
            <motion.div
              whileFocus={{ scale: 1.002 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[1rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <FiMapPin className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-300 z-10" size={22} />
                <input
                  type="text"
                  value={pickup === 'Lake Forest College' ? '' : pickup}
                  onChange={(e) => setPickup(e.target.value || 'Lake Forest College')}
                  placeholder="Pickup Location (LFC by default)"
                  style={{ height: '8vh', paddingLeft: '4rem', background: '#5a6f8226' }}
                  className="w-full pr-6 backdrop-blur-xl border-2 border-white/20 rounded-[1rem] text-white text-lg font-semibold placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 shadow-xl"
                  
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={submitting}
              className="w-full py-5 mt-8 bg-gradient-to-r from-primary to-accent rounded-[1rem] text-white font-bold text-lg shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundSize: '200% 200%', animation: submitting ? 'none' : 'gradient 3s ease infinite' , height: '6vh',marginTop:"2vh"}}
            >
              {submitting ? 'Creating Ride...' : 'Create Ride'}
            </motion.button>

          </form>
        </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </>
  );
}
