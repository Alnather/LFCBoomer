import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiMapPin, FiCalendar, FiClock, FiUsers, FiMessageCircle, FiChevronLeft, FiTrash2, FiCheck, FiX, FiCamera, FiShare2, FiMoon, FiSun } from 'react-icons/fi';
import { MdFlight, MdShoppingCart, MdLocationCity, MdArrowRightAlt, MdArrowBack, MdKeyboardArrowLeft, MdSchool, MdEdit, MdVerified } from 'react-icons/md';
import { IoArrowBack, IoChevronBack } from 'react-icons/io5';
import { HiArrowLeft } from 'react-icons/hi';
import { db, auth, storage } from '../../lib/firebase';
import { doc, getDoc, onSnapshot, collection, query, orderBy, setDoc, serverTimestamp, updateDoc, addDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

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
const downtownKeywords = ['downtown', 'city center', 'downtown chicago', 'magnificent mile', 'loop'];

// College keywords
const collegeKeywords = ['lake forest', 'college', 'university', 'campus', 'northwestern', 'depaul', 'loyola', 'uic', 'uchicago'];

const destinationThemes = {
  'airport': {
    icon: MdFlight,
    gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
    iconColor: 'text-cyan-400',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/50',
    bgColor: 'bg-cyan-500/20'
  },
  'shopping': {
    icon: MdShoppingCart,
    gradient: 'from-red-500/20 via-pink-500/10 to-transparent',
    iconColor: 'text-pink-400',
    accentColor: 'text-pink-400',
    borderColor: 'border-pink-500/50',
    bgColor: 'bg-pink-500/20'
  },
  'downtown': {
    icon: MdLocationCity,
    gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    iconColor: 'text-indigo-400',
    accentColor: 'text-indigo-400',
    borderColor: 'border-indigo-500/50',
    bgColor: 'bg-indigo-500/20'
  },
  'college': {
    icon: MdSchool,
    gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
    iconColor: 'text-emerald-400',
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/50',
    bgColor: 'bg-emerald-500/20'
  },
  'default': {
    icon: FiMapPin,
    gradient: 'from-gray-500/20 via-gray-500/10 to-transparent',
    iconColor: 'text-gray-400',
    accentColor: 'text-gray-400',
    borderColor: 'border-gray-500/50',
    bgColor: 'bg-gray-500/20'
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

export default function RideDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [ride, setRide] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [deleteModal, setDeleteModal] = useState({ show: false, rideId: null, rideName: '' });
  const [usersData, setUsersData] = useState({});
  const [isHoveringJoined, setIsHoveringJoined] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [colorTheme, setColorTheme] = useState('midnight'); // 'midnight' or 'arctic'
  const [uploadingImage, setUploadingImage] = useState(false);

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch ride data in real-time
  useEffect(() => {
    if (!id) return;

    const rideRef = doc(db, 'rides', id);
    const unsubscribe = onSnapshot(rideRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Convert Firestore Timestamp to local date string (YYYY-MM-DD)
        let dateStr = '';
        if (data.date?.toDate) {
          const d = data.date.toDate();
          const year = d.getFullYear();
          const month = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          dateStr = `${year}-${month}-${day}`;
        }
        setRide({
          id: docSnap.id,
          destination: data.destination,
          city: data.city || '',
          fullAddress: data.fullAddress || data.destination,
          date: dateStr,
          time: data.time,
          organizer: capitalizeName(data.organizerName),
          organizerId: data.organizerId,
          seats: data.seats,
          members: data.participants?.length || 1,
          description: data.description || 'No description provided',
          pickup: data.pickup || 'To be determined',
          participants: data.participants || [],
          status: data.status
        });
      } else {
        console.error('Ride not found');
        router.push('/rides');
      }
      setLoading(false);
    }, (error) => {
      // Silently handle permission errors
      if (error.code !== 'permission-denied') {
        console.error('Error fetching ride:', error);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id, router]);

  // Fetch chat messages in real-time (only for participants)
  // Using JSON.stringify for participants to avoid object reference changes causing re-renders
  const participantsString = JSON.stringify(ride?.participants || []);
  const isUserParticipant = ride?.participants?.includes(user?.uid);
  
  useEffect(() => {
    if (!id || !user || !isUserParticipant) return;

    const messagesRef = collection(db, 'rides', id, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    let retryTimeout;
    let unsubscribe;

    const setupListener = () => {
      unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate ? doc.data().timestamp.toDate() : new Date()
        }));
        setMessages(msgs);
      }, (error) => {
        // Handle permission errors with retry
        if (error.code === 'permission-denied') {
          // Retry after 1.5 seconds - user was just added as participant
          retryTimeout = setTimeout(() => {
            if (unsubscribe) unsubscribe();
            setupListener();
          }, 1500);
        } else {
          console.error('Error fetching messages:', error);
        }
      });
    };

    setupListener();

    return () => {
      if (unsubscribe) unsubscribe();
      if (retryTimeout) clearTimeout(retryTimeout);
    };
  }, [id, user?.uid, isUserParticipant]);

  // Mark messages as read when chat is opened
  useEffect(() => {
    if (!id || !user?.uid || !isChatOpen || !isUserParticipant) return;

    const markAsRead = async () => {
      try {
        const rideRef = doc(db, 'rides', id);
        await updateDoc(rideRef, {
          [`lastRead_${user.uid}`]: serverTimestamp()
        });
      } catch (error) {
        // Silently handle errors - non-critical operation
      }
    };

    markAsRead();
  }, [id, user?.uid, isChatOpen, isUserParticipant]);

  // Fetch user data for participants - use participantsString to avoid re-running on every ride update
  useEffect(() => {
    const fetchUsersData = async () => {
      const participants = JSON.parse(participantsString);
      if (!participants || participants.length === 0) {
        return;
      }

      const userData = {};

      for (const uid of participants) {
        // Skip if we already have this user's data
        if (usersData[uid]) {
          userData[uid] = usersData[uid];
          continue;
        }
        
        try {
          const userDocRef = doc(db, 'users', uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            userData[uid] = data;
          }
        } catch (error) {
          // Silently handle permission errors - they're temporary on page load
          if (error.code !== 'permission-denied') {
            console.error(`Error fetching user ${uid}:`, error);
          }
        }
      }

      setUsersData(prev => ({ ...prev, ...userData }));
    };

    fetchUsersData();
  }, [participantsString]);

  const getUserDisplayName = (uid) => {
    if (uid === user?.uid) return 'You';
    const userData = usersData[uid];
    if (!userData) return 'Rider';

    const firstName = userData.firstName || userData.name?.split(' ')[0] || 'Rider';
    const lastName = userData.lastName || userData.name?.split(' ')[1] || '';
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() + '.' : '';

    return `${firstName} ${lastInitial}`.trim();
  };

  const getUserInitials = (uid) => {
    if (uid === user?.uid) return 'You'.substring(0, 2).toUpperCase();
    const userData = usersData[uid];
    if (!userData) return 'R';

    const firstName = userData.firstName || userData.name?.split(' ')[0] || 'R';
    const lastName = userData.lastName || userData.name?.split(' ')[1] || '';

    return (firstName.charAt(0) + (lastName.charAt(0) || '')).toUpperCase();
  };

  const confirmDelete = () => {
    setDeleteModal({ show: true, rideId: ride.id, rideName: ride.destination });
  };

  const handleDeleteRide = async () => {
    try {
      await deleteDoc(doc(db, 'rides', deleteModal.rideId));
      setDeleteModal({ show: false, rideId: null, rideName: '' });
      router.push('/my-rides');
    } catch (error) {
      console.error('Error deleting ride:', error);
      alert('Failed to delete ride');
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    try {
      const messagesRef = collection(db, 'rides', id, 'messages');
      
      // Get sender name and capitalize first letters
      const senderEmail = user.email?.split('@')[0] || 'Anonymous';
      const senderName = user.displayName || senderEmail;
      const capitalizedName = senderName.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ');
      
      await addDoc(messagesRef, {
        text: newMessage,
        senderId: user.uid,
        senderName: capitalizedName,
        timestamp: serverTimestamp()
      });
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file || !user) return;

    setUploadingImage(true);
    try {
      // Create a unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}_${file.name}`;
      const fileRef = storageRef(storage, `ride-images/${id}/${filename}`);
      
      // Upload the file with resumable upload
      const uploadTask = uploadBytesResumable(fileRef, file);
      
      // Wait for upload to complete
      await new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            // Progress monitoring available: (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          },
          (error) => {
            reject(error);
          },
          () => {
            resolve();
          }
        );
      });
      
      // Get download URL
      const downloadURL = await getDownloadURL(fileRef);
      
      // Get sender name and capitalize first letters
      const senderEmail = user.email?.split('@')[0] || 'Anonymous';
      const senderName = user.displayName || senderEmail;
      const capitalizedName = senderName.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ');
      
      // Send message with image URL
      const messagesRef = collection(db, 'rides', id, 'messages');
      await addDoc(messagesRef, {
        text: '',
        imageUrl: downloadURL,
        senderId: user.uid,
        senderName: capitalizedName,
        timestamp: serverTimestamp()
      });
      
      setToast({ show: true, message: 'Image sent successfully!', type: 'success' });
    } catch (error) {
      console.error('Error uploading image:', error);
      setToast({ show: true, message: 'Failed to upload image', type: 'error' });
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading || !ride) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <div className="text-gray-400 text-lg">Loading ride details...</div>
        </div>
      </div>
    );
  }

  const themeKey = detectTheme(ride.destination);
  const theme = destinationThemes[themeKey];
  const DestIcon = theme.icon;
  const seatsLeft = ride.seats - ride.members;
  const isOrganizer = user && ride.organizerId === user.uid;
  const isParticipant = user && ride.participants.includes(user.uid);
  const isFull = ride.members >= ride.seats;

  // Theme-aware color helpers
  const getTextColor = (opacity = 'primary') => {
    if (colorTheme === 'arctic') {
      return opacity === 'primary' ? 'text-gray-900' : 
             opacity === 'secondary' ? 'text-gray-700' : 
             'text-gray-500';
    }
    return opacity === 'primary' ? 'text-white' : 
           opacity === 'secondary' ? 'text-gray-300' : 
           'text-gray-400';
  };

  const getBgColor = () => colorTheme === 'arctic' ? 'bg-white' : 'bg-white/5';
  const getBorderColor = () => colorTheme === 'arctic' ? 'border-gray-200' : 'border-white/10';
  const getHoverBg = () => colorTheme === 'arctic' ? 'hover:bg-gray-100' : 'hover:bg-white/5';

  const handleRequestJoin = async () => {
    if (!user) {
      setToast({ show: true, message: 'Please log in to join this ride', type: 'error' });
      setTimeout(() => router.push('/login'), 1500);
      return;
    }

    if (isParticipant) {
      setToast({ show: true, message: 'You are already part of this ride', type: 'info' });
      return;
    }

    if (isFull) {
      setToast({ show: true, message: 'This ride is full', type: 'error' });
      return;
    }

    try {
      const rideRef = doc(db, 'rides', ride.id);

      await updateDoc(rideRef, {
        participants: arrayUnion(user.uid)
      });

      setToast({ show: true, message: 'Successfully joined the ride!', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: `Failed to join: ${error.message}`, type: 'error' });
    }
  };

  const handleLeaveRide = async () => {
    if (!user) return;

    try {
      const rideRef = doc(db, 'rides', ride.id);

      await updateDoc(rideRef, {
        participants: arrayRemove(user.uid)
      });

      setToast({ show: true, message: 'You have left the ride', type: 'success' });
    } catch (error) {
      setToast({ show: true, message: `Failed to leave: ${error.message}`, type: 'error' });
    }
  };

  const handleMessageHost = () => {
    // Navigate to messages page with query params to open direct message with host
    router.push({
      pathname: '/messages',
      query: { category: 'direct', userId: ride.organizerId }
    });
  };

  return (
    <div className={`pb-32 transition-colors duration-300 ${
      colorTheme === 'arctic' ? 'bg-gray-50' : ''
    }`} style={{ minHeight: 'var(--available-height)' }}>
      {/* Header with Back Button and Title */}
      <div className="backdrop-blur-2xl" style={{ marginTop: "2vh", marginBottom: "2vh" }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex items-center gap-4">
          {/* Back Button */}
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
            Ride Details
          </motion.h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full mx-auto px-6 md:px-12 custom-app-layout-mobile">
        
        {/* Destination Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`relative p-8 rounded-3xl overflow-hidden ${
            colorTheme === 'arctic' ? 'bg-white shadow-lg' : ''
          }`}
          style={{ marginBottom: '24px', minHeight: '15vh' }}
        >
          {/* Gradient Background */}
          <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} ${
            colorTheme === 'arctic' ? 'opacity-20' : 'opacity-50'
          } rounded-3xl`} />

          <div className="relative h-full flex flex-col justify-between" style={{ minHeight: '15vh', padding: "2vw" }}>
            {/* Icon and Destination */}
            <div className="flex items-center gap-6" style={{ marginBottom: '32px' }}>
              <div className="p-6">
                <DestIcon className={theme.iconColor} size={56} />
              </div>
              <div className="flex-1">
                <h2 className={`text-4xl font-bold mb-2 ${getTextColor('primary')}`}>{ride.destination}</h2>
                {ride.city && (
                  <p className={`text-lg mb-1 ${getTextColor('secondary')}`}>{ride.city}</p>
                )}
                <p className={`text-sm ${getTextColor('tertiary')}`}>{ride.fullAddress}</p>
              </div>
              {/* Share Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={async () => {
                  const shareData = {
                    title: `Ride to ${ride.destination}`,
                    text: `Join me on a ride to ${ride.destination} on ${new Date(ride.date + 'T12:00:00').toLocaleDateString()} at ${ride.time}`,
                    url: window.location.href
                  };
                  if (navigator.share) {
                    try {
                      await navigator.share(shareData);
                    } catch (err) {
                      if (err.name !== 'AbortError') {
                        console.error('Error sharing:', err);
                      }
                    }
                  } else {
                    // Fallback: Copy to clipboard
                    navigator.clipboard.writeText(window.location.href);
                    setToast({ show: true, message: 'Link copied to clipboard!', type: 'success' });
                  }
                }}
                className={`p-3 rounded-full transition-all backdrop-blur-sm flex-shrink-0 `}
                style={{padding:"1vh"}}
              >
                <FiShare2 className={colorTheme === 'arctic' ? 'text-gray-900' : 'text-white'} size={"4vh"} />
              </motion.button>
            </div>

            {/* Date, Time, Seats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <FiCalendar className={getTextColor('tertiary')} size={20} />
                <div>
                  <p className={`font-semibold ${getTextColor('primary')}`}>
                    {new Date(ride.date + 'T12:00:00').toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiClock className={getTextColor('tertiary')} size={20} />
                <div>
                  <p className={`font-semibold ${getTextColor('primary')}`}>{ride.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiUsers className={getTextColor('tertiary')} size={20} />
                <div>
                  <p className={`font-semibold ${getTextColor('primary')}`}>{ride.members}/{ride.seats}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Group Chat Section - Only for Participants - FIRST SECTION */}
        {isParticipant && (
          <>
            {/* Divider */}
            <div className={`border-t ${getBorderColor()}`} style={{ marginBottom: '24px' }} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`relative rounded-2xl border overflow-hidden ${
                colorTheme === 'arctic'
                  ? 'bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 border-purple-200'
                  : 'bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border-white/10'
              }`}
              style={{ marginBottom: '24px'}}
            >
              {/* Chat Header with Collapse Toggle */}
              <motion.button
                onClick={() => setIsChatOpen(!isChatOpen)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                style={{padding:"1vw"}}
                className="w-full p-6 hover:bg-white/5 transition-all relative"
              >
                {/* Subtle pulse animation on new messages */}
                {!isChatOpen && messages.length > 0 && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ rotate: isChatOpen ? 0 : [0, -10, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: isChatOpen ? 0 : Infinity, repeatDelay: 3 }}
                    >
                      <FiMessageCircle className="text-purple-400" size={24} />
                    </motion.div>
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-white">Group Chat</h3>
                      <p className="text-sm text-gray-400">
                        {messages.length === 0 ? 'Start the conversation' : `${messages.length} message${messages.length !== 1 ? 's' : ''}`}
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isChatOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </motion.div>
                </div>
              </motion.button>

              {/* Collapsible Chat Content */}
              <motion.div
                initial={false}
                animate={{
                  height: isChatOpen ? 'auto' : 0,
                  opacity: isChatOpen ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className={`bg-gradient-to-br backdrop-blur-xl border-t ${
                  colorTheme === 'arctic'
                    ? 'from-gray-50/80 via-white/80 to-gray-50/80 border-gray-200'
                    : 'from-black/40 via-gray-900/40 to-black/40 border-white/10'
                }`}>
                  {/* Messages List */}
                  <div className="p-6 space-y-4 max-h-96 overflow-y-auto custom-scrollbar" style={{padding:"1vw"}}>
                    {messages.length === 0 ? (
                      <div className="text-center py-12">
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br flex items-center justify-center ${
                          colorTheme === 'arctic'
                            ? 'from-purple-200/60 to-pink-200/60'
                            : 'from-purple-500/20 to-pink-500/20'
                        }`}>
                          <FiMessageCircle className={colorTheme === 'arctic' ? 'text-purple-600' : 'text-purple-400'} size={32} />
                        </div>
                        <p className={`text-sm ${getTextColor('tertiary')}`}>No messages yet</p>
                        <p className={`text-xs mt-1 ${colorTheme === 'arctic' ? 'text-gray-400' : 'text-gray-500'}`}>Be the first to say hi! 👋</p>
                      </div>
                    ) : (
                      messages.map((msg, index) => {
                        // Check if we need to show timestamp (if >30 mins since last message)
                        const showTimestamp = index === 0 || 
                          (messages[index - 1].timestamp && msg.timestamp && 
                           (msg.timestamp - messages[index - 1].timestamp) > 30 * 60 * 1000);
                        
                        return (
                          <div key={msg.id}>
                            {/* Timestamp Divider */}
                            {showTimestamp && (
                              <div className="flex items-center justify-center my-4">
                                <span className={`text-xs px-3 py-1 rounded-full ${
                                  colorTheme === 'arctic'
                                    ? 'text-gray-600 bg-gray-200/60'
                                    : 'text-gray-500'
                                }`}>
                                  {msg.timestamp?.toLocaleString([], { 
                                    month: 'short', 
                                    day: 'numeric', 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </span>
                              </div>
                            )}
                            
                            <div
                              className={`flex items-end gap-2 ${msg.senderId === user?.uid ? 'justify-end' : 'justify-start'}`}
                            >
                              {/* Avatar for other users - clickable to profile */}
                              {msg.senderId !== user?.uid && (
                                <div 
                                  className={`w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center flex-shrink-0 mb-1 cursor-pointer hover:opacity-80 transition-opacity relative ${
                                    colorTheme === 'arctic'
                                      ? 'from-purple-300/70 to-pink-300/70'
                                      : 'from-purple-500/30 to-pink-500/30'
                                  }`}
                                  onClick={() => router.push(`/profile/${msg.senderId}`)}
                                >
                                  <span className={`font-semibold text-xs ${
                                    colorTheme === 'arctic' ? 'text-purple-900' : 'text-white'
                                  }`}>
                                    {msg.senderName?.charAt(0).toUpperCase()}
                                  </span>
                                  {/* Verified badge */}
                                  {usersData[msg.senderId]?.emailVerified && (
                                    <div className="absolute -bottom-0.5 -right-0.5 bg-[#0A0A0A] rounded-full p-0.5">
                                      <MdVerified className="text-primary" size={10} />
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              <div className={`flex flex-col ${msg.senderId === user?.uid ? 'items-end' : 'items-start'}`}>
                                {/* Sender Name - Only show for others' messages */}
                                {msg.senderId !== user?.uid && (
                                  <p className={`text-xs mb-1 ml-2 ${getTextColor('tertiary')}`}>{msg.senderName}</p>
                                )}
                                
                                {/* Message Bubble */}
                                <div 
                                  className={`rounded-2xl ${
                                    msg.senderId === user?.uid
                                      ? 'bg-gradient-to-br from-primary via-primary/90 to-accent text-white rounded-br-md shadow-lg shadow-primary/20'
                                      : (colorTheme === 'arctic'
                                        ? 'bg-gray-200 text-gray-900 border border-gray-300 rounded-bl-md'
                                        : 'bg-white/10 text-white border border-white/10 rounded-bl-md')
                                  } ${msg.imageUrl ? 'p-2' : 'px-5 py-3.5'}`}
                                  style={msg.imageUrl ? {} : {
                                    paddingLeft: '3vw',
                                    paddingRight: '3vw',
                                    textAlign: 'center',
                                    paddingTop: '0.5vh',
                                    paddingBottom: '0.5vh',
                                    marginBottom: '0.5vh'
                                  }}
                                >
                                  {msg.imageUrl ? (
                                    <div className="max-w-xs">
                                      <img 
                                        src={msg.imageUrl} 
                                        alt="Shared image" 
                                        className="rounded-xl w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                                        onClick={() => window.open(msg.imageUrl, '_blank')}
                                      />
                                    </div>
                                  ) : (
                                    <p className="text-sm leading-relaxed break-words">{msg.text}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Message Input - Sticky at Bottom */}
                  <div className={`p-4 backdrop-blur-xl ${
                    colorTheme === 'arctic' ? 'bg-gray-100/80' : 'bg-black/20'
                  }`}>
                    <div className={`flex items-center gap-2 px-4 py-2 focus-within:border-primary/50 transition-all ${
                      colorTheme === 'arctic' ? 'bg-white border border-gray-300' : 'bg-white/5'
                    }`}
                    style={{paddingRight:"1vw",paddingLeft:"1vw"}}>
                      {/* Camera Button - DISABLED */}
                      {/* <motion.button ... camera button code ... </motion.button> */}
                      
                      <input
                        type="text"
                        value={newMessage}
                        style={{height:"6vh",paddingLeft:"1vw"}}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                        placeholder="Message..."
                        className={`flex-1 bg-transparent border-none focus:outline-none text-sm py-1 ${
                          colorTheme === 'arctic'
                            ? 'text-gray-900 placeholder-gray-500'
                            : 'text-white placeholder-gray-400'
                        }`}
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className={`flex-shrink-0 transition-all ${
                          newMessage.trim()
                            ? 'text-primary'
                            : (colorTheme === 'arctic' ? 'text-gray-400 cursor-not-allowed' : 'text-gray-500 cursor-not-allowed')
                        }`}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}

        {/* Description - Only show if exists */}
        {ride.description && ride.description !== 'No description provided' && (
          <>
            {/* Divider */}
            <div className={`border-t ${getBorderColor()}`} style={{ marginBottom: '24px' }} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6"
              style={{ marginBottom: '24px' }}
            >
              <h3 className={`text-lg font-bold mb-3 ${getTextColor('primary')}`}>Description</h3>
              <p className={`leading-relaxed ${getTextColor('secondary')}`}>{ride.description}</p>
            </motion.div>
          </>
        )}

        {/* Divider */}
        <div className={`border-t ${getBorderColor()}`} style={{ marginBottom: '24px' }} />

        {/* Pickup Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6"
          style={{ marginBottom: '24px' }}
        >
          <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${getTextColor('primary')}`}>
            <FiMapPin className={theme.accentColor} size={20} />
            Pickup Location
          </h3>
          <p className={getTextColor('secondary')}>{ride.pickup}</p>
        </motion.div>

        {/* Divider */}
        <div className={`border-t ${getBorderColor()}`} style={{ marginBottom: '24px' }} />

        {/* Participants List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6"
          style={{ marginBottom: '24px' }}
        >
          <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${getTextColor('primary')}`} style={{ marginBottom: "1vh" }}>
            <FiUsers className={theme.accentColor} size={20} />
            Participants ({ride.members}/{ride.seats})
          </h3>
          <div className="flex flex-wrap gap-3">
            {ride.participants.map((participantId) => {
              const participantData = usersData[participantId];
              const isCurrentUser = participantId === user?.uid;
              
              return (
                <div 
                  key={participantId} 
                  style={{ paddingRight: "1vw" }} 
                  className={`flex items-center gap-3 px-4 py-2 rounded-full border ${
                    colorTheme === 'arctic'
                      ? 'bg-gray-100 border-gray-300'
                      : 'bg-white/5 border-white/10'
                  } ${!isCurrentUser ? 'cursor-pointer hover:border-primary/50 transition-all' : ''}`}
                  onClick={() => !isCurrentUser && router.push(`/profile/${participantId}`)}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center relative ${
                    colorTheme === 'arctic'
                      ? 'from-primary/50 to-accent/50'
                      : 'from-primary/30 to-accent/30'
                  }`}>
                    <span className={`font-semibold text-xs ${
                      colorTheme === 'arctic' ? 'text-white' : 'text-white'
                    }`}>{getUserInitials(participantId)}</span>
                    {/* Verified badge */}
                    {participantData?.emailVerified && (
                      <div className="absolute -bottom-0.5 -right-0.5 bg-[#0A0A0A] rounded-full p-0.5">
                        <MdVerified className="text-primary" size={12} />
                      </div>
                    )}
                  </div>
                  <p className={`font-medium text-sm ${getTextColor('primary')}`}>
                    {getUserDisplayName(participantId)}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Divider */}
        <div className={`border-t ${getBorderColor()}`} style={{ marginBottom: '24px' }} />

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 gap-4 pt-4"
          // if organizer, style add marginbottom 2vh
          style={{ marginBottom: isOrganizer ? '2vh' : '0' }}
        >
          {!isOrganizer && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleMessageHost}
              className={`py-4 rounded-full font-semibold transition-all flex items-center justify-center gap-2 ${
                colorTheme === 'arctic'
                  ? 'text-gray-900 hover:bg-gray-200'
                  : 'text-white hover:bg-white/5'
              }`}
            >
              <FiMessageCircle size={20} />
              Message Host
            </motion.button>
          )}

          {isOrganizer ? (
            <>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={confirmDelete}
                style={{ height: '7vh' }}
                className="rounded-full text-white font-bold transition-all flex items-center justify-center gap-2 text-red-500 hover:bg-red-500/10"
              >
                <FiTrash2 size={20} />
                Delete Ride
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push(`/my-rides`)}
                style={{ height: '7vh' }}
                className="rounded-full from-primary to-accent text-white font-bold bg-gradient-to-r transition-all flex items-center justify-center gap-2"
              >
                Manage Ride
                <MdEdit size={24} />
              </motion.button>
            </>
          ) : (
            <motion.button
              onHoverStart={() => setIsHoveringJoined(true)}
              onHoverEnd={() => setIsHoveringJoined(false)}
              whileHover={{ scale: isParticipant || isFull ? (isParticipant ? 1.02 : 1) : 1.02, x: isParticipant || isFull ? 0 : 2 }}
              whileTap={{ scale: isParticipant || isFull ? (isParticipant ? 0.98 : 1) : 0.98 }}
              onClick={isParticipant ? handleLeaveRide : handleRequestJoin}
              disabled={isFull && !isParticipant}
              style={{ height: '7vh' }}
              className={`rounded-full font-bold transition-all flex items-center justify-center gap-2 ${isParticipant
                  ? isHoveringJoined
                    ? 'bg-red-500/20 text-red-400'
                    : 'bg-green-500/20 text-green-400'
                  : isFull
                    ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary to-accent text-white'
                }`}
            >

              {isParticipant ? (isHoveringJoined ? '✗ Leave Ride' : '✓ Joined') : isFull ? 'Ride Full' : 'Join'}
              {!isParticipant && !isFull && <MdArrowRightAlt size={32} />}
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ padding: "2vw" }}
            className={`backdrop-blur-xl rounded-3xl border p-8 max-w-md w-full ${
              colorTheme === 'arctic'
                ? 'bg-white border-gray-200'
                : 'bg-gray-900/95 border-white/10'
            }`}
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <FiTrash2 className="text-red-400" size={24} />
                </div>
                <h2 className={`text-2xl font-bold ${getTextColor('primary')}`}>Delete Ride?</h2>
              </div>
              <p className={`mb-6 ${getTextColor('tertiary')}`}>
                Are you sure you want to delete <span className={`font-semibold ${getTextColor('primary')}`}>{deleteModal.rideName}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ height: "6vh" }}
                  onClick={() => setDeleteModal({ show: false, rideId: null, rideName: '' })}
                  className={`flex-1 py-3 rounded-full font-semibold transition-all ${
                    colorTheme === 'arctic'
                      ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      : 'bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ height: "6vh" }}
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

      {/* Toast Notification */}
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border max-w-md"
          style={{
            background: toast.type === 'success' ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.1))' :
                       toast.type === 'error' ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.1))' :
                       'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(37, 99, 235, 0.1))',
            borderColor: toast.type === 'success' ? 'rgba(16, 185, 129, 0.3)' :
                        toast.type === 'error' ? 'rgba(239, 68, 68, 0.3)' :
                        'rgba(59, 130, 246, 0.3)'
          
        ,padding: "1vw" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {toast.type === 'success' && (
                <div className="w-8 h-8 rounded-full bg-green-500/30 flex items-center justify-center">
                  <FiCheck className="text-green-400" size={18} />
                </div>
              )}
              {toast.type === 'error' && (
                <div className="w-8 h-8 rounded-full bg-red-500/30 flex items-center justify-center">
                  <FiX className="text-red-400" size={18} />
                </div>
              )}
              {toast.type === 'info' && (
                <div className="w-8 h-8 rounded-full bg-blue-500/30 flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-lg">i</span>
                </div>
              )}
            </div>
            <p className={`font-medium ${
              colorTheme === 'arctic' ? 'text-gray-900' : 'text-white'
            }`}>{toast.message}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
