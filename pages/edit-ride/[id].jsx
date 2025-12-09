import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi';
import { FiMapPin, FiCalendar, FiClock, FiUsers, FiAlignLeft, FiInfo, FiCheck } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { db, auth } from '../../lib/firebase';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Utility function to capitalize first letters
const capitalizeName = (name) => {
  if (!name) return '';
  return name.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

export default function EditRide() {
  const router = useRouter();
  const { id } = router.query;
  const [destination, setDestination] = useState('');
  const [city, setCity] = useState('');
  const [fullAddress, setFullAddress] = useState('');
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
  const [loading, setLoading] = useState(true);
  const [minSeats, setMinSeats] = useState(1);

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Fetch ride data
  useEffect(() => {
    if (!id || !user) return;

    const fetchRide = async () => {
      try {
        const rideRef = doc(db, 'rides', id);
        const rideSnap = await getDoc(rideRef);

        if (rideSnap.exists()) {
          const data = rideSnap.data();
          
          // Check if user is the organizer
          if (data.organizerId !== user.uid) {
            alert('You are not authorized to edit this ride');
            router.push('/my-rides');
            return;
          }

          setDestination(data.destination || '');
          setCity(data.city || '');
          setFullAddress(data.fullAddress || data.destination || '');
          setPickup(data.pickup || 'Lake Forest College');
          setSeats(data.seats || 4);
          setMinSeats(data.participants?.length || 1);
          setDescription(data.description || '');
          
          // Parse time string to Date object for DatePicker
          if (data.time) {
            const [time, period] = data.time.split(' ');
            const [hours, minutes] = time.split(':');
            let hour = parseInt(hours);
            if (period === 'PM' && hour !== 12) hour += 12;
            if (period === 'AM' && hour === 12) hour = 0;
            const timeDate = new Date();
            timeDate.setHours(hour, parseInt(minutes), 0, 0);
            setTime(timeDate);
          } else {
            setTime(null);
          }
          
          if (data.date?.toDate) {
            setDate(data.date.toDate());
            setSelectedDay(data.date.toDate());
          }
          
          setLoading(false);
        } else {
          alert('Ride not found');
          router.push('/my-rides');
        }
      } catch (error) {
        console.error('Error fetching ride:', error);
        alert('Failed to load ride data');
        router.push('/my-rides');
      }
    };

    fetchRide();
  }, [id, user, router]);

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
  
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const visibleDays = isMobile ? days.slice(0, 3) : days;

  const fetchDestinationSuggestions = async (input) => {
    if (input.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const response = await fetch(`/api/autocomplete?input=${encodeURIComponent(input)}`);
      const data = await response.json();
      
      if (data.suggestions) {
        setSuggestions(data.suggestions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (destination) {
        fetchDestinationSuggestions(destination);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [destination]);

  const handleSuggestionClick = (suggestion) => {
    setDestination(suggestion.shortName);
    setCity(suggestion.city);
    setFullAddress(suggestion.fullText);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please log in to update this ride');
      router.push('/login');
      return;
    }

    if (!destination || !selectedDay || !time || !seats) {
      alert('Please fill in all required fields');
      return;
    }

    if (seats < minSeats) {
      alert(`Cannot reduce seats below ${minSeats} (current number of participants)`);
      return;
    }

    setSubmitting(true);

    try {
      const rideRef = doc(db, 'rides', id);
      
      // Convert time Date object back to formatted string
      const formattedTime = time instanceof Date 
        ? time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
        : time;
      
      await updateDoc(rideRef, {
        destination,
        city,
        fullAddress: fullAddress || destination,
        date: Timestamp.fromDate(selectedDay),
        time: formattedTime,
        seats: parseInt(seats),
        description: description || '',
        pickup: pickup || 'Lake Forest College',
        updatedAt: Timestamp.now()
      });

    //   alert('Ride updated successfully!')


      router.push('/my-rides');
    } catch (error) {
      console.error('Error updating ride:', error);
      alert('Failed to update ride. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <div className="text-gray-400 text-lg">Loading ride...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <meta name="theme-color" content="#0A0A0A" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#F9FAFB" media="(prefers-color-scheme: light)" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>Edit Ride - Boomer</title>
      </Head>

      <div className="w-full pb-32" style={{minHeight: 'var(--available-height)'}}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{marginTop:"2vh", marginBottom: "2vh"}}
          className="backdrop-blur-2xl"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-4">
            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.back()}
                className="p-2 rounded-full transition-all hover:bg-white/5 text-white"
              >
                <HiArrowLeft size={28} />
              </motion.button>
              
              {/* Page Title - Next to Arrow */}
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl md:text-3xl font-bold text-white"
              >
                Edit Ride
              </motion.h1>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full mx-auto px-6 md:px-12 custom-app-layout-mobile"
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
                    if (destination) {
                      fetchDestinationSuggestions(destination);
                    }
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
                    style={{ maxHeight: '240px', minHeight: isLoadingSuggestions && suggestions.length === 0 ? '180px' : '100px' }}
                  >
                    <div className="overflow-y-auto max-h-[240px] overflow-x-hidden">
                      {isLoadingSuggestions && suggestions.length === 0 ? (
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
                            key={suggestion.shortName || index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            type="button"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full px-4 py-3 text-left hover:bg-white/10 transition-colors border-b border-white/5 last:border-b-0"
                          >
                            <div className="flex flex-col gap-1">
                              <p className="text-white text-sm font-semibold truncate">
                                {suggestion.shortName || ''}
                              </p>
                              <p className="text-gray-400 text-xs truncate">
                                {suggestion.fullText || ''}
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
            <div style={{ marginBottom: '4vh' }}>
              <div className={`grid gap-2 ${isMobile ? 'grid-cols-3' : 'grid-cols-7'}`}>
                {visibleDays.map((day, index) => (
                  <motion.button
                    key={index}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedDay(day.date);
                      setDate(day.date);
                    }}
                    className={`py-3 px-2 rounded-xl text-center transition-all ${
                      selectedDay?.toDateString() === day.date.toDateString()
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
                    onChange={(newDate) => setDate(newDate)}
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
                    onChange={(newTime) => setTime(newTime)}
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
                    type="number"
                    value={seats}
                    onChange={(e) => {
                      const newValue = Math.max(minSeats, Math.min(8, parseInt(e.target.value) || minSeats));
                      setSeats(newValue);
                    }}
                    min={minSeats}
                    max="8"
                    placeholder="Seats"
                    style={{ background: '#5a6f8226' }}
                    className="w-full pl-11 pr-3 py-4 backdrop-blur-xl border-2 border-white/20 rounded-[1rem] text-white text-sm font-semibold placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 shadow-xl pl-3 h-5"
                    title={`Minimum seats: ${minSeats}`}
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
                  style={{ background: '#5a6f8226', padding: '1rem', paddingLeft: '3.5rem' }}
                  className="w-full pl-14 pr-6 py-5 backdrop-blur-xl border-2 border-white/20 rounded-[1rem] text-white text-base placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 resize-none shadow-xl"
                />
              </div>
            </motion.div>

            {/* Pickup Location */}
            {/* add label Pickup location*/}
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
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Pickup Location (optional)"
                  style={{ height: '8vh', paddingLeft: '4rem', background: '#5a6f8226' }}
                  className="w-full pr-6 backdrop-blur-xl border-2 border-white/20 rounded-[1rem] text-white text-lg font-semibold placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 shadow-xl"
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
            //   style={{ marginBottom: '10vh' }}
              className={`relative w-full py-6 rounded-full text-white font-bold text-lg transition-all overflow-hidden ${
                submitting ? 'cursor-not-allowed' : ''
              }`}
            >
              {/* Animated Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary"
                animate={{
                  backgroundPosition: submitting ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%',
                }}
                transition={{
                  duration: 2,
                  repeat: submitting ? Infinity : 0,
                  ease: 'linear',
                }}
                style={{
                  backgroundSize: '200% 100%',
                }}
              />
              
              {/* Button Content */}
              <span style={{height:"6vh"}}className="relative z-10 flex items-center justify-center gap-3">
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Updating Ride...
                  </>
                ) : (
                  <>
                    <FiCheck size={20} />
                    Update Ride
                  </>
                )}
              </span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
}
