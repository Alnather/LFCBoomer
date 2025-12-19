import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiShare2, FiPackage, FiUser, FiCalendar, FiTag, FiTrash2, FiChevronLeft, FiChevronRight, FiEdit2, FiCheckCircle } from 'react-icons/fi';
import { HiArrowLeft } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { MdVerified, MdMenuBook, MdDevices, MdChair, MdCheckroom, MdSportsSoccer, MdSportsEsports, MdMoreHoriz, MdConfirmationNumber } from 'react-icons/md';
import { db, auth } from '../../lib/firebase';
import { doc, getDoc, onSnapshot, deleteDoc, collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Category themes for visual styling
const categoryThemes = {
  'textbooks': {
    icon: MdMenuBook,
    gradient: 'from-blue-500/20 via-blue-600/10 to-transparent',
    iconColor: 'text-blue-400',
    accentColor: 'text-blue-400',
    bgColor: 'bg-blue-500/20'
  },
  'electronics': {
    icon: MdDevices,
    gradient: 'from-cyan-500/20 via-cyan-600/10 to-transparent',
    iconColor: 'text-cyan-400',
    accentColor: 'text-cyan-400',
    bgColor: 'bg-cyan-500/20'
  },
  'furniture': {
    icon: MdChair,
    gradient: 'from-amber-500/20 via-amber-600/10 to-transparent',
    iconColor: 'text-amber-400',
    accentColor: 'text-amber-400',
    bgColor: 'bg-amber-500/20'
  },
  'clothing': {
    icon: MdCheckroom,
    gradient: 'from-pink-500/20 via-pink-600/10 to-transparent',
    iconColor: 'text-pink-400',
    accentColor: 'text-pink-400',
    bgColor: 'bg-pink-500/20'
  },
  'sports': {
    icon: MdSportsSoccer,
    gradient: 'from-green-500/20 via-green-600/10 to-transparent',
    iconColor: 'text-green-400',
    accentColor: 'text-green-400',
    bgColor: 'bg-green-500/20'
  },
  'gaming': {
    icon: MdSportsEsports,
    gradient: 'from-purple-500/20 via-purple-600/10 to-transparent',
    iconColor: 'text-purple-400',
    accentColor: 'text-purple-400',
    bgColor: 'bg-purple-500/20'
  },
  'tickets': {
    icon: MdConfirmationNumber,
    gradient: 'from-orange-500/20 via-red-500/10 to-transparent',
    iconColor: 'text-orange-400',
    accentColor: 'text-orange-400',
    bgColor: 'bg-orange-500/20'
  },
  'other': {
    icon: MdMoreHoriz,
    gradient: 'from-gray-500/20 via-gray-600/10 to-transparent',
    iconColor: 'text-gray-400',
    accentColor: 'text-gray-400',
    bgColor: 'bg-gray-500/20'
  },
  'default': {
    icon: FiPackage,
    gradient: 'from-primary/20 via-accent/10 to-transparent',
    iconColor: 'text-primary',
    accentColor: 'text-primary',
    bgColor: 'bg-primary/20'
  }
};

// Utility function to capitalize first letters
const capitalizeName = (name) => {
  if (!name) return '';
  return name.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
};

// Get theme based on first category
const getTheme = (categories) => {
  if (!categories || categories.length === 0) return categoryThemes['default'];
  const firstCategory = categories[0].toLowerCase();
  return categoryThemes[firstCategory] || categoryThemes['default'];
};

export default function ListingDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [listing, setListing] = useState(null);
  const [user, setUser] = useState(null);
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [contactingLoading, setContactingLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Fetch listing data in real-time
  useEffect(() => {
    if (!id) return;

    const listingRef = doc(db, 'products', id);
    const unsubscribe = onSnapshot(listingRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setListing({
          id: docSnap.id,
          ...data
        });

        // Fetch seller data
        if (data.userId) {
          try {
            const sellerDoc = await getDoc(doc(db, 'users', data.userId));
            if (sellerDoc.exists()) {
              setSeller(sellerDoc.data());
            }
          } catch (error) {
            console.error('Error fetching seller:', error);
          }
        }
      } else {
        console.error('Listing not found');
        router.push('/marketplace');
      }
      setLoading(false);
    }, (error) => {
      console.error('Error fetching listing:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id, router]);

  // Handle delete listing
  const handleDeleteListing = async () => {
    try {
      await deleteDoc(doc(db, 'products', id));
      setDeleteModal(false);
      setToast({ show: true, message: 'Listing deleted successfully', type: 'success' });
      setTimeout(() => router.push('/marketplace'), 1500);
    } catch (error) {
      console.error('Error deleting listing:', error);
      setToast({ show: true, message: 'Failed to delete listing', type: 'error' });
    }
  };

  // Handle contact seller - creates a marketplace conversation
  const handleContactSeller = async () => {
    if (!user) {
      setToast({ show: true, message: 'Please log in to contact the seller', type: 'error' });
      setTimeout(() => router.push('/login'), 1500);
      return;
    }

    if (user.uid === listing.userId) {
      setToast({ show: true, message: "This is your own listing", type: 'info' });
      return;
    }

    setContactingLoading(true);

    try {
      // Check if a conversation already exists for this product between these users
      const conversationsRef = collection(db, 'conversations');
      const q = query(
        conversationsRef,
        where('productId', '==', id),
        where('participants', 'array-contains', user.uid)
      );
      
      const existingConvos = await getDocs(q);
      let conversationId = null;

      // Find exact match (both users in participants for this product)
      existingConvos.forEach((doc) => {
        const data = doc.data();
        if (data.participants.includes(listing.userId)) {
          conversationId = doc.id;
        }
      });

      if (!conversationId) {
        // Create new conversation
        const buyerName = capitalizeName(user.displayName || user.email?.split('@')[0] || 'Anonymous');
        const sellerName = capitalizeName(listing.userName || 'Seller');

        const conversationData = {
          type: 'marketplace',
          productId: id,
          productName: listing.name,
          productPhoto: listing.photo || null,
          productPrice: listing.price,
          productPriceType: listing.priceType || 'fixed',
          participants: [user.uid, listing.userId],
          user1Id: user.uid,
          user1Name: buyerName,
          user2Id: listing.userId,
          user2Name: sellerName,
          createdAt: serverTimestamp(),
          lastMessage: '',
          lastMessageTime: serverTimestamp(),
        };

        const newConvoRef = await addDoc(conversationsRef, conversationData);
        conversationId = newConvoRef.id;
      }

      // Navigate to messages page with marketplace category and conversation selected
      router.push({
        pathname: '/messages',
        query: { category: 'marketplace', conversationId: conversationId }
      });

    } catch (error) {
      console.error('Error creating conversation:', error);
      setToast({ show: true, message: 'Failed to start conversation', type: 'error' });
    } finally {
      setContactingLoading(false);
    }
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
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get all images (support both single photo and photos array)
  const getImages = () => {
    if (listing?.photos && listing.photos.length > 0) {
      return listing.photos;
    }
    if (listing?.photo) {
      return [listing.photo];
    }
    return [];
  };

  // Navigate images
  const nextImage = () => {
    const images = getImages();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = getImages();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (loading || !listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <div className="text-gray-400 text-lg">Loading listing...</div>
        </div>
      </div>
    );
  }

  const isOwner = user && listing.userId === user.uid;
  const theme = getTheme(listing.categories);
  const CategoryIcon = theme.icon;
  const images = getImages();
  const isFree = listing.priceType === 'free' || listing.price === 0;

  return (
    <>
      <Head>
        <title>{listing.name} - ForesterSwap</title>
        <meta name="theme-color" content="#0A0A0A" />
      </Head>

      <div className="pb-32 min-h-screen">
        {/* Toast Notification */}
        <AnimatePresence>
          {toast.show && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg ${
                toast.type === 'success' ? 'bg-green-500/90' : 
                toast.type === 'error' ? 'bg-red-500/90' : 'bg-blue-500/90'
              } text-white font-medium`}
            >
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {deleteModal && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#1C1C1C] rounded-3xl p-6 max-w-md w-full border border-white/10"
              >
                <h3 className="text-xl font-bold text-white mb-2">Delete Listing?</h3>
                <p className="text-gray-400 mb-6">
                  Are you sure you want to delete "{listing.name}"? This action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setDeleteModal(false)}
                    className="flex-1 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteListing}
                    className="flex-1 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header with Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="backdrop-blur-2xl"
          style={{ marginTop: "2vh", marginBottom: "2vh" }}
        >
          <div className="max-w-6xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => router.back()}
                className="w-10 h-10 rounded-full backdrop-blur-xl flex items-center justify-center hover:bg-white/10 transition-all"
              >
                <HiArrowLeft size={24} className="text-white" />
              </motion.button>
              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-2xl md:text-3xl font-bold text-white"
              >
                Listing Details
              </motion.h1>
            </div>

            {/* Owner Actions */}
            {isOwner && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDeleteModal(true)}
                className="p-3 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
              >
                <FiTrash2 size={20} />
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="w-full mx-auto" style={isMobile ? { paddingLeft: "4vw", paddingRight: "4vw" } : { paddingLeft: "3rem", paddingRight: "3rem" }}>
          {/* Sold Badge */}
          {listing.sold && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-500/90 backdrop-blur-xl px-6 py-3 rounded-2xl flex items-center justify-center gap-2 mb-6"
            >
              <FiCheckCircle size={24} className="text-white" />
              <span className="text-white text-lg font-bold">This item has been sold</span>
            </motion.div>
          )}

          {/* Product Hero Card - Similar to Destination Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative rounded-3xl overflow-hidden ${listing.sold ? 'opacity-70' : ''}`}
            style={{ marginBottom: '24px' }}
          >
            {/* Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-50 rounded-3xl`} />

            <div className="relative" style={{ padding: isMobile ? "4vw" : "2vw" }}>
              {/* Image Gallery */}
              {images.length > 0 ? (
                <div className="relative mb-6">
                  <div className="relative rounded-2xl overflow-hidden bg-black/30" style={{ height: '50vh' }}>
                    <motion.img
                    
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={images[currentImageIndex]}
                      alt={listing.name}
                      className="w-full h-full object-contain"
                    />
                    
                    {/* Image Navigation */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                        >
                          <FiChevronLeft size={24} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                        >
                          <FiChevronRight size={24} />
                        </button>
                        
                        {/* Image Dots */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                          {images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImageIndex(idx)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                idx === currentImageIndex 
                                  ? 'bg-white w-6' 
                                  : 'bg-white/50 hover:bg-white/70'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Share Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={async () => {
                      const shareData = {
                        title: listing.name,
                        text: `Check out this listing: ${listing.name} - ${formatPrice(listing)}`,
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
                        navigator.clipboard.writeText(window.location.href);
                        setToast({ show: true, message: 'Link copied to clipboard!', type: 'success' });
                      }
                    }}
                    className="absolute top-3 right-3 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
                  >
                    <FiShare2 size={20} />
                  </motion.button>
                </div>
              ) : (
                <div className="relative rounded-2xl overflow-hidden bg-black/30 mb-6 flex items-center justify-center" style={{ height: '30vh' }}>
                  <FiPackage size={96} className="text-gray-600" />
                </div>
              )}

              {/* Product Info Section */}
              <div className="flex items-start gap-6">
                {/* Category Icon */}
                <div className={`p-4 rounded-2xl`}>
                  <CategoryIcon className={theme.iconColor} size={40} />
                </div>

                {/* Title and Price */}
                <div className="flex-1">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {listing.name}
                  </h2>
                  
                  {/* Categories */}
                  {listing.categories && listing.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {listing.categories.map((cat) => (
                        <span
                          key={cat}
                          className={`px-3 py-1 rounded-full ${theme.accentColor} text-sm font-medium capitalize`}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Price Badge */}
                <div className={`px-5 py-3 rounded-2xl text-2xl font-bold ${
                  isFree
                    ? ' text-emerald-400'
                    : ' text-white'
                }`}>
                  {formatPrice(listing)}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="border-t border-white/10" style={{ marginBottom: '24px' }} />

          {/* Description Section */}
          {listing.description && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden"
              style={{ marginBottom: '24px' ,padding:"1vw"}}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-30 rounded-2xl`} />
              <div className="relative p-6">
                <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">Description</h3>
                <p className="text-gray-200 leading-relaxed whitespace-pre-wrap text-lg">
                  {listing.description}
                </p>
              </div>
            </motion.div>
          )}

          {/* Info Grid - Similar to ride details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
            style={{ marginBottom: '24px' }}
          >
            {/* Posted Date */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10" style={{padding:"1vw"}}>
              <div className="flex items-center gap-3">
                <FiCalendar className="text-gray-400" size={20} />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Posted</p>
                  <p className="font-semibold text-white">{formatDate(listing.createdAt)}</p>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10" style={{padding:"1vw"}}>
              <div className="flex items-center gap-3">
                <FiTag className={theme.iconColor} size={20} />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Category</p>
                  <p className={`font-semibold ${theme.accentColor} capitalize`}>
                    {listing.categories?.[0] || 'Other'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Divider */}
          <div className="border-t border-white/10" style={{ marginBottom: '24px' }} />

          {/* Seller Card - Premium Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden"
            style={{ marginBottom: '24px' ,padding:"1vw"}}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-30 rounded-2xl`} />
            <div className="relative p-6">
              {/* <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">Seller</h3> */}
              
              <div 
                className={`flex items-center gap-4 ${!isOwner ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
                onClick={() => !isOwner && listing.userId && router.push(`/profile/${listing.userId}`)}
              >
                {/* Seller Avatar */}
                <div className={`w-16 h-16 rounded-full ${theme.bgColor} flex items-center justify-center relative`}>
                  {seller?.photoURL ? (
                    <img src={seller.photoURL} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <FiUser size={28} className={theme.iconColor} />
                  )}
                  {/* Verified badge on avatar */}
                  {seller?.emailVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-[#0A0A0A] rounded-full p-0.5">
                      <MdVerified className="text-primary" size={18} />
                    </div>
                  )}
                </div>

                {/* Seller Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold text-white">
                      {capitalizeName(listing.userName || seller?.name || 'Anonymous')}
                    </span>
                  </div>
                  <span className="text-gray-400">
                    {isOwner ? 'This is your listing' : 'Tap to view profile'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Button - Edit/Manage for owner, Contact for others */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{marginBottom:"2vh"}}
          >
            {isOwner ? (
              <button
              style={{height:"6vh"}}
                onClick={() => router.push('/my-listings')}
                className="w-full py-5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all"
              >
                <FiEdit2 size={22} />
                Edit Listing
              </button>
            ) : (
              <div className={`${listing.whatsappEnabled && (!listing.whatsappVerifiedOnly || user?.emailVerified) ? 'flex gap-3' : ''}`}>
                <button
                  onClick={handleContactSeller}
                  disabled={contactingLoading}
                  style={{height:"6vh"}}
                  className={`${listing.whatsappEnabled && (!listing.whatsappVerifiedOnly || user?.emailVerified) ? 'flex-1' : 'w-full'} py-5 bg-gradient-to-r from-primary to-accent text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all disabled:opacity-50`}
                >
                  {contactingLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Starting...
                    </>
                  ) : (
                    <>
                      <FiMessageCircle size={22} />
                      Text Seller
                    </>
                  )}
                </button>
                
                {/* WhatsApp Button - only show if enabled and user meets verification requirements */}
                {listing.whatsappEnabled && (!listing.whatsappVerifiedOnly || user?.emailVerified) && (
                  <button
                    onClick={() => {
                      // Format number - remove spaces, dashes, and ensure country code
                      let number = listing.whatsappNumber.replace(/[\s-]/g, '');
                      if (!number.startsWith('+')) {
                        number = '+1' + number; // Default to US if no country code
                      }
                      number = number.replace('+', '');
                      const message = encodeURIComponent(`Hi! I'm interested in your listing "${listing.name}" on ForesterSwap.`);
                      window.open(`https://wa.me/${number}?text=${message}`, '_blank');
                    }}
                    style={{height:"6vh"}}
                    className="flex-1 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 transition-all"
                  >
                    <FaWhatsapp size={24} />
                    WhatsApp
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}
