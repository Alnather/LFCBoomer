import { motion } from 'framer-motion';
import { FiInfo, FiCalendar, FiCoffee, FiActivity, FiClock, FiMapPin } from 'react-icons/fi';

export default function Campus() {
  const facilities = [
    { name: 'Cafeteria', icon: FiCoffee, status: 'Open', hours: '7:00 AM - 9:00 PM', capacity: 65 },
    { name: 'Gym', icon: FiActivity, status: 'Open', hours: '6:00 AM - 11:00 PM', capacity: 42 },
    { name: 'Library', icon: FiInfo, status: 'Open', hours: '8:00 AM - 12:00 AM', capacity: 78 },
    { name: 'Student Center', icon: FiMapPin, status: 'Closed', hours: 'Opens at 9:00 AM', capacity: 0 },
  ];

  const events = [
    { name: 'Basketball Game', time: '6:00 PM', location: 'Sports Center', attendees: 45 },
    { name: 'Study Group', time: '7:30 PM', location: 'Library Room 204', attendees: 12 },
    { name: 'Movie Night', time: '8:00 PM', location: 'Student Lounge', attendees: 38 },
  ];

  const categories = ['All', 'Dining', 'Fitness', 'Events', 'Services'];

  return (
    <div className="w-full bg-transparent pb-24 relative">
      {/* Background skeleton - blurred */}
      <div className="blur-sm opacity-25 pointer-events-none max-h-[90vh] overflow-hidden flex ">
        {/* Left sidebar - Categories */}
        <div className="hidden md:block w-64 min-h-screen border-r border-white/5 pt-8 px-4">
          <h3 className="text-lg font-bold text-white mb-4 px-2">Categories</h3>
          <div className="space-y-2">
            {categories.map((cat, index) => (
              <button
                key={cat}
                className={`w-full text-left px-4 rounded-2xl text-sm font-medium transition-all duration-300 ${
                  index === 0 
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20' 
                    : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-primary/50'
                }`}
                style={{ height: '6vh' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1">
          {/* Header with time */}
          <div className="sticky top-0 z-20 backdrop-blur-2xl bg-gradient-to-b from-black/20 to-transparent border-b border-white/5 pb-4 pt-8 px-6">
            <div className="max-w-full mx-auto">
              <h2 className="text-2xl font-bold text-white mb-2">Campus Info</h2>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <FiClock size={16} />
                Today, December 8, 2025 • 2:45 PM
              </p>

              {/* Categories - mobile only */}
              <div className="flex md:hidden gap-2 overflow-x-auto pb-2 scrollbar-hide" style={{ marginTop: '2vh' }}>
                {categories.map((cat, index) => (
                  <button
                    key={cat}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                      index === 0
                        ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20'
                        : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-primary/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="px-6 mt-6 max-w-6xl mx-auto">
            {/* Facilities Grid */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FiMapPin className="text-primary" />
                Facilities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {facilities.map((facility) => {
                  const Icon = facility.icon;
                  return (
                    <div
                      key={facility.name}
                      className="bg-gradient-to-br from-[#1C1C1C] to-[#171717] rounded-2xl p-5 border border-white/10"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                            <Icon size={24} className="text-primary" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white">{facility.name}</h4>
                            <p className="text-sm text-gray-400 flex items-center gap-1">
                              <FiClock size={12} />
                              {facility.hours}
                            </p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          facility.status === 'Open' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                          {facility.status}
                        </span>
                      </div>
                      
                      {/* Capacity bar */}
                      {facility.status === 'Open' && (
                        <div>
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Capacity</span>
                            <span>{facility.capacity}%</span>
                          </div>
                          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all"
                              style={{ width: `${facility.capacity}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Events Section */}
            <div>
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FiCalendar className="text-primary" />
                Today's Events
              </h3>
              <div className="space-y-3">
                {events.map((event, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-[#1C1C1C] to-[#171717] rounded-2xl p-4 border border-white/10 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <FiCalendar size={24} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white mb-1">{event.name}</h4>
                        <p className="text-sm text-gray-400 flex items-center gap-2">
                          <FiClock size={12} />
                          {event.time}
                          <span className="text-gray-600">•</span>
                          <FiMapPin size={12} />
                          {event.location}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">{event.attendees} attending</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coming soon overlay - centered on top */}
      <div className="fixed inset-0 flex items-center justify-center px-6 pointer-events-none" style={{ maxHeight: '100vh' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{padding:"4vw"}}
          className="text-center max-w-md backdrop-blur-xl bg-white/5 p-8 rounded-3xl shadow-2xl pointer-events-auto flex flex-col items- bg-gradient-to-b from-black/40 to-black/20"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            className="w-32 h-32 mb-8 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-primary/10"
          >
            <FiInfo size={64} className="text-primary" />
          </motion.div>
          
          <h2 className="text-4xl font-bold text-white mb-4">
            Campus Info
          </h2>
          <p className="text-2xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">Coming Soon</p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Get real-time information about campus facilities. Stay tuned!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
