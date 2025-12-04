import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiMapPin, FiCalendar, FiClock, FiUsers, FiMessageCircle, FiChevronLeft } from 'react-icons/fi';
import { MdFlight, MdShoppingCart, MdLocationCity, MdArrowRightAlt, MdArrowBack, MdKeyboardArrowLeft } from 'react-icons/md';
import { IoArrowBack, IoChevronBack } from 'react-icons/io5';
import { HiArrowLeft } from 'react-icons/hi';

const destinationThemes = {
  'Airport': {
    icon: MdFlight,
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    iconColor: 'text-cyan-400',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/50',
    bgColor: 'bg-cyan-500/20'
  },
  'Target': {
    icon: MdShoppingCart,
    gradient: 'from-red-500/20 via-pink-500/10 to-transparent',
    iconColor: 'text-pink-400',
    accentColor: 'text-pink-400',
    borderColor: 'border-pink-500/50',
    bgColor: 'bg-pink-500/20'
  },
  'Downtown': {
    icon: MdLocationCity,
    gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    iconColor: 'text-indigo-400',
    accentColor: 'text-indigo-400',
    borderColor: 'border-indigo-500/50',
    bgColor: 'bg-indigo-500/20'
  }
};

export default function RideDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [ride, setRide] = useState(null);

  useEffect(() => {
    if (id) {
      // Mock data - replace with API call
      const mockRide = {
        id: id,
        destination: 'Airport',
        date: '2025-12-05',
        time: '08:00',
        organizer: 'Sarah M.',
        organizerId: '123',
        seats: 3,
        members: 2,
        description: 'Heading to LAX for an early morning flight. Happy to pick up anyone along the way from campus. I have space for luggage too!',
        meetingPoint: 'Main Campus Parking Lot',
        route: 'Campus → Highway 101 → LAX Terminal B'
      };
      setRide(mockRide);
    }
  }, [id]);

  if (!ride) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-lg">Loading...</div>
      </div>
    );
  }

  const theme = destinationThemes[ride.destination] || destinationThemes['Airport'];
  const DestIcon = theme.icon;
  const seatsLeft = ride.seats - ride.members;

  const handleRequestJoin = () => {
    // Handle join request
    console.log('Join request for ride:', ride.id);
  };

  const handleMessageHost = () => {
    // Navigate to chat with host
    router.push(`/chat/${ride.organizerId}`);
  };

  return (
    <div className="pb-32">
      {/* Header with Back Button */}
      <div className="backdrop-blur-2xl " style={{marginTop:"2vh",marginBottom:"2vh"}}>
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-6">
          {/* Arrow - HiArrowLeft */}
          <motion.button
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-white/5 transition-all"
          >
            <HiArrowLeft size={28} className="text-white" />
          </motion.button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 pt-8">
        {/* Destination Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative p-8 rounded-3xl overflow-hidden"
          style={{ marginBottom: '24px', minHeight: '15vh' }}
        >
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-50 rounded-3xl`} />
          
          <div className="relative h-full flex flex-col justify-between" style={{ minHeight: '15vh' , padding:"2vw"}}>
            {/* Icon and Destination */}
            <div className="flex items-center gap-6" style={{ marginBottom: '32px' }}>
              <div className="p-6">
                <DestIcon className={theme.iconColor} size={56} />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-white mb-2">{ride.destination}</h2>
                <p className="text-gray-400 text-lg">{ride.meetingPoint}</p>
              </div>
            </div>

            {/* Date, Time, Seats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <FiCalendar className="text-gray-400" size={20} />
                <div>
                  {/* <p className="text-xs text-gray-500">Date</p> */}
                  <p className="text-white font-semibold">
                    {new Date(ride.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiClock className="text-gray-400" size={20} />
                <div>
                  {/* <p className="text-xs text-gray-500">Time</p> */}
                  <p className="text-white font-semibold">{ride.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiUsers className="text-gray-400" size={20} />
                <div>
                  {/* <p className="text-xs text-gray-500">Seats</p> */}
                  <p className="text-white font-semibold">{ride.members}/{ride.seats}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10" style={{ marginBottom: '24px' }} />

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6"
          style={{ marginBottom: '24px' }}
        >
          <h3 className="text-lg font-bold text-white mb-3">Description</h3>
          <p className="text-gray-300 leading-relaxed">{ride.description}</p>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10" style={{ marginBottom: '24px' }} />

        {/* Route */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6"
          style={{ marginBottom: '24px' }}
        >
          <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <FiMapPin className={theme.accentColor} size={20} />
            Route
          </h3>
          <p className="text-gray-300">{ride.route}</p>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10" style={{ marginBottom: '24px' }} />

        {/* Organizer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6"
          style={{ marginBottom: '24px' }}
        >
          <h3 className="text-lg font-bold text-white mb-4" style={{marginBottom:"1vh"}}>Organizer</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                {ride.organizer.charAt(0)}
              </div>
              <div>
                <p className="text-white font-semibold">{ride.organizer}</p>
                <p className="text-gray-400 text-sm">Ride Host</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMessageHost}
              className="p-3 rounded-full hover:bg-white/5 transition-all"
            >
              <FiMessageCircle className="text-gray-300" size={20} />
            </motion.button>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-white/10" style={{ marginBottom: '24px' }} />

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-4 pt-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleMessageHost}
            className="py-4 rounded-full text-white font-semibold hover:bg-white/5 transition-all flex items-center justify-center gap-2"
          >
            <FiMessageCircle size={20} />
            Message Host
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRequestJoin}
            className="py-4 rounded-full  from-primary to-accent text-white font-bold hover:shadow-lg hover:shadow-primary/50 transition-all flex items-center justify-center gap-2"
          >
            Request to Join
            <MdArrowRightAlt size={32} strokeWidth={2} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
