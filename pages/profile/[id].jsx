import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPackage, FiCalendar } from 'react-icons/fi';
import { HiArrowLeft } from 'react-icons/hi';
import { MdFlight, MdVerified } from 'react-icons/md';
import { db, auth } from '@/lib/firebase';
import { doc, getDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Utility function to capitalize names
const capitalizeName = (name) => {
  if (!name) return '';
  return name.split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

export default function PublicProfile() {
  const router = useRouter();
  const { id } = router.query;
  
  const [currentUser, setCurrentUser] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auth check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      } else {
        setCurrentUser(user);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch profile user data
  useEffect(() => {
    if (!id || !currentUser) return;

    // If viewing own profile, redirect to main profile page
    if (id === currentUser.uid) {
      router.push('/profile');
      return;
    }

    const fetchProfileData = async () => {
      setLoading(true);
      try {
        // Fetch user document
        const userDoc = await getDoc(doc(db, 'users', id));
        if (userDoc.exists()) {
          setProfileUser({ id: userDoc.id, ...userDoc.data() });
        } else {
          // User not found
          setProfileUser(null);
        }

        // Fetch user's listings (filter sold client-side to avoid index requirement)
        const listingsQuery = query(
          collection(db, 'products'),
          where('userId', '==', id),
          orderBy('createdAt', 'desc'),
          limit(12)
        );
        const listingsSnap = await getDocs(listingsQuery);
        // Filter out sold items client-side
        setListings(listingsSnap.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(listing => !listing.sold)
          .slice(0, 6)
        );

        // Fetch user's rides (where they are organizer)
        console.log('Fetching rides for organizerId:', id);
        const ridesQuery = query(
          collection(db, 'rides'),
          where('organizerId', '==', id),
          limit(20)
        );
        const ridesSnap = await getDocs(ridesQuery);
        console.log('Rides found:', ridesSnap.docs.length);
        ridesSnap.docs.forEach(doc => {
          console.log('Ride:', doc.id, doc.data());
        });
        // Filter expired rides and sort client-side
        const today = new Date().toISOString().split('T')[0];
        console.log('Today for filtering:', today);
        const filteredRides = ridesSnap.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(ride => {
            const isUpcoming = ride.date >= today;
            console.log('Ride date:', ride.date, 'isUpcoming:', isUpcoming);
            return isUpcoming;
          })
          .sort((a, b) => a.date.localeCompare(b.date))
          .slice(0, 6);
        console.log('Filtered rides:', filteredRides);
        setRides(filteredRides);

      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id, currentUser, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <div className="text-gray-400 text-lg">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiUser size={64} className="mx-auto text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">User Not Found</h2>
          <p className="text-gray-400 mb-6">This profile doesn't exist or has been removed.</p>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-primary/20 text-primary rounded-full font-semibold hover:bg-primary/30 transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const displayName = capitalizeName(
    profileUser.name || 
    profileUser.firstName && profileUser.lastName 
      ? `${profileUser.firstName} ${profileUser.lastName}` 
      : profileUser.email?.split('@')[0] || 'User'
  );

  const memberSince = profileUser.createdAt?.toDate 
    ? profileUser.createdAt.toDate().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Recently joined';

  return (
    <div className="w-full min-h-screen bg-transparent pb-32">
      {/* Header with Back Button */}
      <div className="backdrop-blur-2xl" style={{ marginTop: "2vh", marginBottom: "2vh" }}>
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center gap-4">
          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="p-2 rounded-full transition-all hover:bg-white/5 text-white"
          >
            <HiArrowLeft size={28} />
          </motion.button>
          
          {/* Page Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-3xl font-bold text-white"
          >
            Back
          </motion.h1>
        </div>
      </div>

      <div 
        className="max-w-2xl mx-auto py-8"
        style={isMobile ? { paddingLeft: '4vw', paddingRight: '4vw' } : { paddingLeft: '1rem', paddingRight: '1rem' }}
      >
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          {/* Avatar */}
          <div className="w-28 h-28 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl shadow-primary/30 border-4 border-white/10 overflow-hidden">
            {profileUser.photoURL ? (
              <img src={profileUser.photoURL} alt="" className="w-full h-full object-cover" />
            ) : (
              <FiUser size={56} className="text-white" />
            )}
          </div>

          {/* Name with Verified Badge */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-3xl font-bold text-white">{displayName}</h2>
            {profileUser.emailVerified && (
              <MdVerified className="text-primary" size={28} />
            )}
          </div>

          {/* Member Since */}
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
            <FiCalendar size={16} />
            <span className="text-sm">Member since {memberSince}</span>
          </div>

          {/* Verified Badge */}
          {profileUser.emailVerified && (
            <span className="inline-block px-4 py-1.5 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30">
              ✓ Verified Student
            </span>
          )}
        </motion.div>

        {/* Listings Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <FiPackage size={20} className="text-primary" />
            </div>
            <h3 className="text-xl font-bold text-white">Listings</h3>
          </div>

          {listings.length === 0 ? (
            <div className="bg-white/5 rounded-2xl border border-white/10 p-8 text-center" style={{ minHeight: '10vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* <FiPackage size={32} className="mx-auto text-gray-600 mb-3" /> */}
              <p className="text-gray-400">No active listings</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {listings.map((listing) => (
                <motion.div
                  key={listing.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(`/listing/${listing.id}`)}
                  className="cursor-pointer"
                >
                  <div className="aspect-square rounded-2xl overflow-hidden bg-white/5 mb-2">
                    {listing.photo ? (
                      <img src={listing.photo} alt={listing.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiPackage size={32} className="text-gray-600" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-white truncate">{listing.name}</p>
                  <p className="text-sm text-primary font-bold">
                    {listing.priceType === 'free' || listing.price === 0 ? 'FREE' : `$${listing.price}`}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Rides Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{marginTop:"3vh"}}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
              <MdFlight size={20} className="text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Rides</h3>
          </div>

          {rides.length === 0 ? (
            <div className="bg-white/5 rounded-2xl border border-white/10 p-8 text-center" style={{ minHeight: '10vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* <MdFlight size={32} className="mx-auto text-gray-600 mb-3" /> */}
              <p className="text-gray-400">No upcoming rides</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rides.map((ride) => (
                <motion.div
                  key={ride.id}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => router.push(`/ride/${ride.id}`)}
                  className="bg-white/5 rounded-2xl border border-white/10 p-4 cursor-pointer hover:border-primary/30 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">{ride.destination}</h4>
                      <p className="text-sm text-gray-400">
                        {new Date(ride.date + 'T12:00:00').toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })} at {ride.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-primary font-semibold">{ride.members}/{ride.seats} seats</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
