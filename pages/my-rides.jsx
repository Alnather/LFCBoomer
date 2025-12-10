import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi';
import { FiMapPin, FiEdit2, FiTrash2, FiUsers, FiCheck, FiX, FiCalendar, FiClock } from 'react-icons/fi';
import { MdFlight, MdShoppingCart, MdLocationCity, MdSchool } from 'react-icons/md';
import { db, auth } from '../lib/firebase';
import { collection, query, where, onSnapshot, doc, deleteDoc, updateDoc, arrayRemove } from 'firebase/firestore';
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

export default function MyRides() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [myCreatedRides, setMyCreatedRides] = useState([]);
  const [myJoinedRides, setMyJoinedRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('created'); // 'created' or 'joined'
  const [deleteModal, setDeleteModal] = useState({ show: false, rideId: null, rideName: '' });
  const [removeParticipantModal, setRemoveParticipantModal] = useState({ show: false, rideId: null, participantId: null, participantName: '' });
  const [usersData, setUsersData] = useState({}); // Store user data by uid

  // Check authentication
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

  // Fetch user's created rides
  useEffect(() => {
    if (!user) return;

    const ridesRef = collection(db, 'rides');
    const q = query(ridesRef, where('organizerId', '==', user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rides = snapshot.docs.map(doc => {
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
          ...data,
          date: dateStr
        };
      });
      setMyCreatedRides(rides);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Fetch rides user has joined
  useEffect(() => {
    if (!user) return;

    const ridesRef = collection(db, 'rides');
    const q = query(ridesRef, where('participants', 'array-contains', user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const rides = snapshot.docs.map(doc => {
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
          ...data,
          date: dateStr
        };
      }).filter(ride => ride.organizerId !== user.uid); // Exclude rides they created
      
      setMyJoinedRides(rides);
    });

    return () => unsubscribe();
  }, [user]);

  // Fetch user data for participants
  useEffect(() => {
    const fetchUsersData = async () => {
      const allRides = [...myCreatedRides, ...myJoinedRides];
      const allParticipantIds = new Set();
      
      allRides.forEach(ride => {
        ride.participants?.forEach(pid => allParticipantIds.add(pid));
      });

      const { collection: firestoreCollection, getDocs } = await import('firebase/firestore');
      const usersRef = firestoreCollection(db, 'users');
      
      try {
        const usersSnapshot = await getDocs(usersRef);
        
        const userData = {};
        usersSnapshot.docs.forEach(doc => {
          if (allParticipantIds.has(doc.id)) {
            userData[doc.id] = doc.data();
          }
        });
        
        setUsersData(userData);
      } catch (error) {
        // Silently handle permission errors - they're temporary on page load
        if (error.code !== 'permission-denied') {
          console.error('Error fetching user data:', error);
        }
      }
    };

    if (myCreatedRides.length > 0 || myJoinedRides.length > 0) {
      fetchUsersData();
    }
  }, [myCreatedRides, myJoinedRides]);

  // Helper function to get user display name
  const getUserDisplayName = (uid) => {
    if (uid === user?.uid) return 'You';
    const userData = usersData[uid];
    if (!userData) return 'Rider';
    
    const firstName = userData.firstName || userData.name?.split(' ')[0] || 'Rider';
    const lastName = userData.lastName || userData.name?.split(' ')[1] || '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() + '.' : '';
    
    return `${firstName} ${lastInitial}`.trim();
  };

  // Helper function to get user initials for avatar
  const getUserInitials = (uid) => {
    if (uid === user?.uid) return 'You'.substring(0, 2).toUpperCase();
    const userData = usersData[uid];
    if (!userData) return 'R';
    
    const firstName = userData.firstName || userData.name?.split(' ')[0] || 'R';
    const lastName = userData.lastName || userData.name?.split(' ')[1] || '';
    
    return (firstName.charAt(0) + (lastName.charAt(0) || '')).toUpperCase();
  };

  const confirmDelete = (rideId, rideName) => {
    setDeleteModal({ show: true, rideId, rideName });
  };

  const handleDeleteRide = async () => {
    try {
      await deleteDoc(doc(db, 'rides', deleteModal.rideId));
      setDeleteModal({ show: false, rideId: null, rideName: '' });
    } catch (error) {
      console.error('Error deleting ride:', error);
      alert('Failed to delete ride');
    }
  };

  const handleLeaveRide = async (rideId) => {
    try {
      const rideRef = doc(db, 'rides', rideId);
      await updateDoc(rideRef, {
        participants: arrayRemove(user.uid)
      });
    } catch (error) {
      console.error('Error leaving ride:', error);
      alert('Failed to leave ride');
    }
  };

  const confirmRemoveParticipant = (rideId, participantId, participantName) => {
    setRemoveParticipantModal({ show: true, rideId, participantId, participantName });
  };

  const handleRemoveParticipant = async () => {
    try {
      const rideRef = doc(db, 'rides', removeParticipantModal.rideId);
      await updateDoc(rideRef, {
        participants: arrayRemove(removeParticipantModal.participantId)
      });
      setRemoveParticipantModal({ show: false, rideId: null, participantId: null, participantName: '' });
    } catch (error) {
      console.error('Error removing participant:', error);
      alert('Failed to remove participant');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <div className="text-gray-400 text-lg">Loading your rides...</div>
        </div>
      </div>
    );
  }

  const displayRides = activeTab === 'created' ? myCreatedRides : myJoinedRides;

  return (
    <div className="min-h-screen pb-32 custom-app-layout-mobile" >
      {/* Header */}
      <div className="backdrop-blur-2xl border-b border-white/10" style={{marginTop:"2vh",marginBottom:"2vh"}}>
        <div className="max-w-2xl md:max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <HiArrowLeft size={24} className="text-white" />
          </motion.button>
          <h1 className="text-3xl font-bold text-white">My Rides</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-2xl md:max-w-7xl mx-auto px-6 mb-6" style={{marginBottom:"3vh"}}>
        <div className="flex gap-4 bg-white/5 p-1 rounded-2xl backdrop-blur-xl" style={{height:"6vh"}}>
          <button
            onClick={() => setActiveTab('created')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'created'
                ? 'bg-gradient-to-r from-primary to-accent text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Created ({myCreatedRides.length})
          </button>
          <button
            onClick={() => setActiveTab('joined')}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'joined'
                ? 'bg-gradient-to-r from-primary to-accent text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Joined ({myJoinedRides.length})
          </button>
        </div>
      </div>

      {/* Rides List */}
      <div className="max-w-2xl md:max-w-7xl mx-auto px-6">
        {displayRides.length === 0 ? (
          <div className="text-center py-20">
            <FiMapPin className="mx-auto mb-4 text-gray-500" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">No rides yet</h3>
            <p className="text-gray-400">
              {activeTab === 'created' 
                ? 'Create a ride to get started' 
                : 'Join a ride to see it here'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {displayRides.map((ride, index) => {
              const themeKey = detectTheme(ride.destination);
              const theme = destinationThemes[themeKey];
              const DestIcon = theme.icon;
              
              return (
                <motion.div
                  key={ride.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative cursor-pointer"
                  style={{marginBottom:"2vh"}}
                  onClick={() => router.push(`/ride/${ride.id}`)}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Card */}
                  <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-visible shadow-2xl group-hover:border-white/20 transition-all duration-300 flex flex-col" style={{ minHeight: '18vh' }}>
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-50 rounded-3xl`} />
                    
                    {/* Top Section - Icon, Location, Date, Time */}
                    <div className="relative flex items-center" style={{ minHeight: '12vh', padding: '1.5rem' }}>
                      {/* Icon */}
                      <div className="flex items-center justify-center flex-shrink-0" style={{paddingRight:"2rem"}}>
                        <DestIcon className={theme.iconColor} size={48} />
                      </div>

                      {/* Text Content */}
                      <div className="flex-1 flex flex-col justify-center space-y-2">
                        <h3 className="text-2xl font-bold text-white">
                          {ride.destination}
                        </h3>
                        
                        {ride.city && (
                          <p className="text-sm text-gray-400">
                            {ride.city}
                          </p>
                        )}
                        
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

                    {/* Participants and Actions Section */}
                    {ride.participants && ride.participants.length > 0 && (
                      <div className="relative border-t border-white/10 px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between gap-4">
                          {/* Participants Section - 3/4 width */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center flex-wrap gap-3" style={{paddingLeft:"1vw"}}>
                              {ride.participants.map((participantId, idx) => (
                                <div key={participantId} className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10" style={{paddingRight:"1vw"}}>
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center flex-shrink-0">
                                    <span className="text-white font-semibold text-xs">{getUserInitials(participantId)}</span>
                                  </div>
                                  <span className="text-sm text-white font-medium hidden md:inline-block">
                                    {getUserDisplayName(participantId)}
                                  </span>
                                  {participantId !== user.uid && activeTab === 'created' && (
                                    <motion.button
                                      whileHover={{ scale: 1.2, rotate: 90 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        confirmRemoveParticipant(ride.id, participantId, getUserDisplayName(participantId));
                                      }}
                                      className="hover:text-red-400 transition-colors ml-1"
                                    >
                                      <FiX size={16} className="text-gray-400" />
                                    </motion.button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Action Buttons Section - 1/4 width */}
                          <div className="flex gap-3 flex-shrink-0">
                          {activeTab === 'created' ? (
                            <>
                              <motion.button
                                style={{paddingRight: "1vw", paddingLeft: "1vw", height: "4vh",marginTop: "1vh", marginBottom: "1vh"}}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`/edit-ride/${ride.id}`);
                                }}
                                className="px-4 py-2 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-all flex items-center gap-2"
                              >
                                
                                <FiEdit2 className="text-blue-400" size={18} />
                                <span className="text-blue-400 font-semibold text-sm">Edit</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  confirmDelete(ride.id, ride.destination);
                                }}
                                style={{paddingRight: "1vw", paddingLeft: "1vw", height: "4vh",marginRight:"1vw", marginTop: "1vh", marginBottom: "1vh"}}
                                className="px-4 py-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-all flex items-center gap-2"
                              >
                                <FiTrash2 className="text-red-400" size={18} />
                                <span className="text-red-400 font-semibold text-sm">Delete</span>
                              </motion.button>
                            </>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLeaveRide(ride.id);
                              }}
                              style={{paddingRight: "1vw", paddingLeft: "1vw", height: "4vh",marginRight:"1vw", marginTop: "1vh", marginBottom: "1vh"}}
                              className="px-4 py-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-all flex items-center gap-2"
                            >
                              <FiX className="text-red-400" size={18} />
                              <span className="text-red-400 font-semibold text-sm">Leave</span>
                            </motion.button>
                          )}
                        </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 custom-app-layout-mobile">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{padding:"2vw"}}
            className="bg-gray-900/95 backdrop-blur-xl rounded-3xl border border-white/10 p-8 max-w-md w-full"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <FiTrash2 className="text-red-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Delete Ride?</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete <span className="text-white font-semibold">{deleteModal.rideName}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{height:"6vh"}}
                  onClick={() => setDeleteModal({ show: false, rideId: null, rideName: '' })}
                  className="flex-1 py-3 rounded-full bg-white/5 text-white font-semibold hover:bg-white/10 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                    style={{height:"6vh"}}
                  onClick={handleDeleteRide}
                  className="flex-1 py-3 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition-all"
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Remove Participant Modal */}
      {removeParticipantModal.show && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{padding:"2vw"}}
            className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-3xl border border-red-500/30 max-w-md w-full shadow-2xl"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4" style={{marginBottom:"3vh"}}>
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <FiX className="text-red-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Remove Participant?</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Remove <span className="text-white font-semibold">{removeParticipantModal.participantName}</span> from this ride?
              </p>
              <p className="text-gray-400 mb-6">
                <br />
                They will need to join again if they wish to participate in the ride.
              </p>
              <div className="flex gap-3" style={{marginTop:"2vh"}}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{height:"6vh"}}
                  onClick={() => setRemoveParticipantModal({ show: false, rideId: null, participantId: null, participantName: '' })}
                  className="flex-1 py-3 rounded-full bg-white/5 text-white font-semibold hover:bg-white/10 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{height:"6vh"}}
                  onClick={handleRemoveParticipant}
                  className="flex-1 py-3 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition-all"
                >
                  Remove
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
