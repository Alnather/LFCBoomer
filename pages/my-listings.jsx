import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi';
import { FiEdit2, FiTrash2, FiPackage, FiDollarSign, FiCheckCircle } from 'react-icons/fi';
import { MdMenuBook, MdDevices, MdChair, MdCheckroom, MdSportsSoccer, MdSportsEsports, MdMoreHoriz } from 'react-icons/md';
import { db, auth } from '../lib/firebase';
import { collection, query, where, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Category themes for visual styling
const categoryThemes = {
  'textbooks': {
    icon: MdMenuBook,
    gradient: 'from-blue-500/20 via-blue-600/10 to-transparent',
    iconColor: 'text-blue-400',
    glow: 'shadow-blue-500/20'
  },
  'electronics': {
    icon: MdDevices,
    gradient: 'from-cyan-500/20 via-cyan-600/10 to-transparent',
    iconColor: 'text-cyan-400',
    glow: 'shadow-cyan-500/20'
  },
  'furniture': {
    icon: MdChair,
    gradient: 'from-amber-500/20 via-amber-600/10 to-transparent',
    iconColor: 'text-amber-400',
    glow: 'shadow-amber-500/20'
  },
  'clothing': {
    icon: MdCheckroom,
    gradient: 'from-pink-500/20 via-pink-600/10 to-transparent',
    iconColor: 'text-pink-400',
    glow: 'shadow-pink-500/20'
  },
  'sports': {
    icon: MdSportsSoccer,
    gradient: 'from-green-500/20 via-green-600/10 to-transparent',
    iconColor: 'text-green-400',
    glow: 'shadow-green-500/20'
  },
  'gaming': {
    icon: MdSportsEsports,
    gradient: 'from-purple-500/20 via-purple-600/10 to-transparent',
    iconColor: 'text-purple-400',
    glow: 'shadow-purple-500/20'
  },
  'other': {
    icon: MdMoreHoriz,
    gradient: 'from-gray-500/20 via-gray-600/10 to-transparent',
    iconColor: 'text-gray-400',
    glow: 'shadow-gray-500/20'
  },
  'default': {
    icon: FiPackage,
    gradient: 'from-primary/20 via-accent/10 to-transparent',
    iconColor: 'text-primary',
    glow: 'shadow-primary/20'
  }
};

// Get theme based on first category
const getTheme = (categories) => {
  if (!categories || categories.length === 0) return categoryThemes['default'];
  const firstCategory = categories[0].toLowerCase();
  return categoryThemes[firstCategory] || categoryThemes['default'];
};

// Format price display
const formatPrice = (listing) => {
  if (listing.priceType === 'free' || listing.price === 0 || listing.price === '0') {
    return 'FREE';
  }
  return `$${listing.price}`;
};

// Format date
const formatDate = (dateString) => {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
};

export default function MyListings() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, listingId: null, listingName: '' });
  const [soldModal, setSoldModal] = useState({ show: false, listingId: null, listingName: '', isSold: false });

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

  // Fetch user's listings
  useEffect(() => {
    if (!user) return;

    const listingsRef = collection(db, 'products');
    const q = query(listingsRef, where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const listings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort by createdAt descending
      listings.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB - dateA;
      });
      setMyListings(listings);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const confirmDelete = (listingId, listingName) => {
    setDeleteModal({ show: true, listingId, listingName });
  };

  const handleDeleteListing = async () => {
    try {
      await deleteDoc(doc(db, 'products', deleteModal.listingId));
      setDeleteModal({ show: false, listingId: null, listingName: '' });
    } catch (error) {
      console.error('Error deleting listing:', error);
      alert('Failed to delete listing');
    }
  };

  const confirmSoldToggle = (listingId, listingName, currentSoldStatus) => {
    setSoldModal({ show: true, listingId, listingName, isSold: currentSoldStatus });
  };

  const handleToggleSold = async () => {
    try {
      await updateDoc(doc(db, 'products', soldModal.listingId), {
        sold: !soldModal.isSold,
        soldAt: !soldModal.isSold ? new Date().toISOString() : null
      });
      setSoldModal({ show: false, listingId: null, listingName: '', isSold: false });
    } catch (error) {
      console.error('Error updating listing:', error);
      alert('Failed to update listing');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <div className="text-gray-400 text-lg">Loading your listings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-32 custom-app-layout-mobile">
      {/* Header */}
      <div className="backdrop-blur-2xl border-b border-white/10" style={{ marginTop: "2vh", marginBottom: "2vh" }}>
        <div className="max-w-2xl md:max-w-7xl mx-auto px-6 py-4 flex items-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
          >
            <HiArrowLeft size={24} className="text-white" />
          </motion.button>
          <h1 className="text-3xl font-bold text-white">My Listings</h1>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="max-w-2xl md:max-w-7xl mx-auto px-6 mb-6" style={{ marginBottom: "3vh" }}>
        <div className="flex gap-4 bg-white/5 p-4 rounded-2xl backdrop-blur-xl">
          <div className="flex-1 text-center">
            <p className="text-3xl font-bold text-white">{myListings.length}</p>
            <p className="text-sm text-gray-400">Active Listings</p>
          </div>
          <div className="w-px bg-white/10" />
          <div className="flex-1 text-center">
            <p className="text-3xl font-bold text-emerald-400">
              {myListings.filter(l => l.priceType === 'free' || l.price === 0).length}
            </p>
            <p className="text-sm text-gray-400">Free Items</p>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="max-w-2xl md:max-w-7xl mx-auto px-6">
        {myListings.length === 0 ? (
          <div className="text-center py-20">
            <FiPackage className="mx-auto mb-4 text-gray-500" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">No listings yet</h3>
            <p className="text-gray-400 mb-6">
              Start selling by creating your first listing
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/create-listing')}
              className="px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-full text-white font-semibold"
            >
              Create Listing
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {myListings.map((listing, index) => {
              const theme = getTheme(listing.categories);
              const CategoryIcon = theme.icon;
              const isFree = listing.priceType === 'free' || listing.price === 0;

              return (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="group relative cursor-pointer"
                  style={{ marginBottom: "2vh" }}
                  onClick={() => router.push(`/listing/${listing.id}`)}
                >
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Card */}
                  <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl group-hover:border-white/20 transition-all duration-300">
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-50 rounded-3xl`} />

                    {/* Sold Badge */}
                    {listing.sold && (
                      <div className="absolute top-4 right-4 z-10 bg-amber-500/90 backdrop-blur-xl px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <FiCheckCircle size={14} className="text-white" />
                        <span className="text-white text-xs font-bold">SOLD</span>
                      </div>
                    )}

                    {/* Top Section - Image and Info */}
                    <div className={`relative flex ${listing.sold ? 'opacity-60' : ''}`} style={{ minHeight: '14vh' }}>
                      {/* Thumbnail */}
                      <div className="w-32 h-32 flex-shrink-0 m-4 rounded-2xl overflow-hidden bg-black/30"
                      style={{marginRight:"2vw"}}
                      >
                        {listing.photo ? (
                          <img
                            src={listing.photo}
                            alt={listing.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FiPackage size={32} className="text-gray-600" />
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 py-4 pr-4 flex flex-col justify-center">
                        <div className="flex items-start gap-3 mb-2">
                          <CategoryIcon className={theme.iconColor} size={24} />
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-white line-clamp-1">
                              {listing.name}
                            </h3>
                            {listing.categories && listing.categories.length > 0 && (
                              <p className="text-sm text-gray-400 capitalize">
                                {listing.categories[0]}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4"
                        style={{marginTop:"1vh"}}>
                          <span className={`text-lg font-bold ${isFree ? 'text-emerald-400' : 'text-white'}`}>
                            {formatPrice(listing)}
                          </span>
                          <span className="text-sm text-gray-500">
                            Posted {formatDate(listing.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions Section */}
                    <div className="relative border-t border-white/10 px-6 py-4" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/edit-listing/${listing.id}`);
                          }}
                          style={{ paddingRight: "1vw", paddingLeft: "1vw", height: "4vh", marginTop: "1vh", marginBottom: "1vh" }}
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
                            confirmSoldToggle(listing.id, listing.name, listing.sold || false);
                          }}
                          style={{ paddingRight: "1vw", paddingLeft: "1vw", height: "4vh", marginTop: "1vh", marginBottom: "1vh" }}
                          className={`px-4 py-2 rounded-full transition-all flex items-center gap-2 ${listing.sold ? 'bg-amber-500/20 hover:bg-amber-500/30' : 'bg-emerald-500/20 hover:bg-emerald-500/30'}`}
                        >
                          <FiCheckCircle className={listing.sold ? 'text-amber-400' : 'text-emerald-400'} size={18} />
                          <span className={`font-semibold text-sm ${listing.sold ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {listing.sold ? 'Relist' : 'Sold'}
                          </span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDelete(listing.id, listing.name);
                          }}
                          style={{ paddingRight: "1vw", paddingLeft: "1vw", height: "4vh", marginRight: "1vw", marginTop: "1vh", marginBottom: "1vh" }}
                          className="px-4 py-2 rounded-full bg-red-500/20 hover:bg-red-500/30 transition-all flex items-center gap-2"
                        >
                          <FiTrash2 className="text-red-400" size={18} />
                          <span className="text-red-400 font-semibold text-sm">Delete</span>
                        </motion.button>
                      </div>
                    </div>
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
            style={{ padding: "2vw" }}
            className="bg-gray-900/95 backdrop-blur-xl rounded-3xl border border-white/10 p-8 max-w-md w-full"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <FiTrash2 className="text-red-400" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">Delete Listing?</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Are you sure you want to delete <span className="text-white font-semibold">"{deleteModal.listingName}"</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ height: "6vh" }}
                  onClick={() => setDeleteModal({ show: false, listingId: null, listingName: '' })}
                  className="flex-1 py-3 rounded-full bg-white/5 text-white font-semibold hover:bg-white/10 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ height: "6vh" }}
                  onClick={handleDeleteListing}
                  className="flex-1 py-3 rounded-full bg-red-500 text-white font-bold hover:bg-red-600 transition-all"
                >
                  Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Mark as Sold Confirmation Modal */}
      {soldModal.show && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 custom-app-layout-mobile">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ padding: "2vw" }}
            className="bg-gray-900/95 backdrop-blur-xl rounded-3xl border border-white/10 p-8 max-w-md w-full"
          >
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${soldModal.isSold ? 'bg-amber-500/20' : 'bg-emerald-500/20'}`}>
                  <FiCheckCircle className={soldModal.isSold ? 'text-amber-400' : 'text-emerald-400'} size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {soldModal.isSold ? 'Relist Item?' : 'Mark as Sold?'}
                </h2>
              </div>
              <p className="text-gray-400 mb-6">
                {soldModal.isSold 
                  ? <>Are you sure you want to relist <span className="text-white font-semibold">"{soldModal.listingName}"</span>? It will appear in search results again.</>
                  : <>Are you sure you want to mark <span className="text-white font-semibold">"{soldModal.listingName}"</span> as sold? It will be hidden from search results but kept in your listings.</>
                }
              </p>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ height: "6vh" }}
                  onClick={() => setSoldModal({ show: false, listingId: null, listingName: '', isSold: false })}
                  className="flex-1 py-3 rounded-full bg-white/5 text-white font-semibold hover:bg-white/10 transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ height: "6vh" }}
                  onClick={handleToggleSold}
                  className={`flex-1 py-3 rounded-full text-white font-bold transition-all ${soldModal.isSold ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-500 hover:bg-emerald-600'}`}
                >
                  {soldModal.isSold ? 'Relist' : 'Mark Sold'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
