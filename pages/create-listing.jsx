import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi';
import { FiCamera, FiX, FiTag, FiAlignLeft, FiCheck } from 'react-icons/fi';
import { MdMenuBook, MdDevices, MdChair, MdCheckroom, MdSportsSoccer, MdSportsEsports, MdMoreHoriz, MdConfirmationNumber } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { IoHelpCircleOutline } from 'react-icons/io5';
import { db, auth } from '../lib/firebase';
import { collection, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Category definitions
const categoryOptions = [
  { id: 'textbooks', label: 'Textbooks', icon: MdMenuBook, color: 'from-blue-500/30 to-blue-600/30' },
  { id: 'electronics', label: 'Electronics', icon: MdDevices, color: 'from-cyan-500/30 to-cyan-600/30' },
  { id: 'furniture', label: 'Furniture', icon: MdChair, color: 'from-amber-500/30 to-amber-600/30' },
  { id: 'clothing', label: 'Clothing', icon: MdCheckroom, color: 'from-pink-500/30 to-pink-600/30' },
  { id: 'sports', label: 'Sports', icon: MdSportsSoccer, color: 'from-green-500/30 to-green-600/30' },
  { id: 'gaming', label: 'Gaming', icon: MdSportsEsports, color: 'from-purple-500/30 to-purple-600/30' },
  { id: 'tickets', label: 'Tickets & Events', icon: MdConfirmationNumber, color: 'from-orange-500/30 to-red-500/30' },
  { id: 'other', label: 'Other', icon: MdMoreHoriz, color: 'from-slate-500/30 to-slate-600/30' },
];



export default function CreateListing() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  
  // WhatsApp state
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [whatsappVerifiedOnly, setWhatsappVerifiedOnly] = useState(true);
  const [showWhatsappTooltip, setShowWhatsappTooltip] = useState(false);
  
  // UI state
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Check authentication status
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Detect if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle image selection (supports multiple)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Limit to 5 images total
    if (images.length + files.length > 5) {
      setError('Maximum 5 photos allowed');
      return;
    }

    files.forEach(file => {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Each image must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          // Create canvas for compression
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Calculate new dimensions (max 800px width/height)
          let width = img.width;
          let height = img.height;
          const maxSize = 800;
          
          if (width > height) {
            if (width > maxSize) {
              height = (height * maxSize) / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width = (width * maxSize) / height;
              height = maxSize;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress image
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to base64 with compression
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
          setImages(prev => [...prev, compressedDataUrl]);
          setError('');
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove an image
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  // Check if categories should be shown (progressive disclosure)
  const shouldShowCategories = name.trim() || images.length > 0 || price;

  // Handle category toggle
  const handleCategoryToggle = (categoryId) => {
    setCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(c => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!name.trim()) {
      setError('Please enter a title for your listing');
      return;
    }

    if (categories.length === 0) {
      setError('Please select at least one category');
      return;
    }

    if (images.length === 0) {
      setError('Please add at least one photo of your item');
      return;
    }

    if (!isFree && (!price || parseFloat(price) < 0)) {
      setError('Please enter a valid price');
      return;
    }

    setSubmitting(true);

    try {
      const listingData = {
        name: name.trim(),
        description: description.trim() || '',
        price: isFree ? 0 : parseFloat(price),
        priceType: isFree ? 'free' : 'fixed',
        categories,
        photo: images[0], // Primary photo
        photos: images, // All photos
        userId: user.uid,
        userName: user.displayName || user.email?.split('@')[0] || 'Anonymous',
        createdAt: new Date().toISOString(),
        // WhatsApp contact option
        whatsappEnabled: whatsappEnabled && whatsappNumber.trim() !== '',
        whatsappNumber: whatsappEnabled ? whatsappNumber.trim() : '',
        whatsappVerifiedOnly: whatsappEnabled ? whatsappVerifiedOnly : false,
      };

      const docRef = await addDoc(collection(db, 'products'), listingData);

      // Try to add product reference to user's products array (non-critical)
      try {
        await updateDoc(doc(db, 'Users', user.uid), {
          products: arrayUnion(docRef.id),
        });
      } catch (err) {
        // Non-critical error - product was created successfully
        console.log('Could not update user products array:', err);
      }

      // Redirect to the new listing
      router.push(`/listing/${docRef.id}`);
    } catch (err) {
      console.error('Error creating listing:', err);
      setError(err.message || 'Failed to create listing. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <div className="text-gray-400 text-lg">Loading...</div>
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
      </Head>

      <div className="w-full min-h-screen pb-32 flex justify-center" style={isMobile ? { paddingLeft: "4vw", paddingRight: "4vw" } : {}}>
        <div className="w-full max-w-2xl md:max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ marginTop: "2vh" }}
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
                  className="w-10 h-10 rounded-full backdrop-blur-xl flex items-center justify-center hover:bg-white/10 transition-all"
                >
                  <HiArrowLeft size={24} className="text-white" />
                </motion.button>
                <motion.h1
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-3xl font-bold text-white"
                >
                  Create Listing
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
            style={{ marginTop: "3vh" }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Image Upload - Big centered with multi-photo support */}
              <motion.div
                whileFocus={{ scale: 1.002 }}
                className="relative group"
                style={{ marginBottom: '4vh' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[1rem] blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                
                {images.length === 0 ? (
                  /* Empty state - centered upload at 50% width */
                  <div className="flex justify-center">
                    <label className="relative w-1/2 flex flex-col items-center justify-center aspect-[4/3] rounded-[1rem] border-2 border-dashed border-white/20 cursor-pointer hover:border-primary/50 transition-all" style={{ background: '#5a6f8226' }}>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <FiCamera size={36} className="text-gray-400 mb-3" />
                      <span className="text-gray-300 text-base font-semibold">Add Photo(s)</span>
                      <span className="text-gray-500 text-xs mt-1">Tap to upload (up to 5)</span>
                    </label>
                  </div>
                ) : (
                  /* Has images - show main + thumbnails at 50% width centered */
                  <div className="flex flex-col items-center">
                    <div className="w-1/2 space-y-3">
                      {/* Main image display */}
                      <div className="relative aspect-[4/3] rounded-[1rem] overflow-hidden border-2 border-white/20">
                        <img
                          src={images[0]}
                          alt="Main photo"
                          className="w-full h-full object-contain bg-black/30"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(0)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-black/70 backdrop-blur-xl text-white hover:bg-red-500 transition-colors"
                        >
                          <FiX size={20} />
                        </button>
                        <div className="absolute bottom-3 left-3 px-2 py-1 rounded-lg text-s text-white font-medium">
                          Main Photo
                        </div>
                      </div>
                      
                      {/* Thumbnail row for additional photos */}
                      <div className="flex gap-2 overflow-x-auto pb-1 justify-center">
                        {images.slice(1).map((img, index) => (
                          <div key={index + 1} className="relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20">
                            <img
                              src={img}
                              alt={`Photo ${index + 2}`}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index + 1)}
                              className="absolute top-1 right-1 p-1 rounded-full bg-black/70 backdrop-blur-xl text-white hover:bg-red-500 transition-colors"
                            >
                              <FiX size={10} />
                            </button>
                          </div>
                        ))}
                        
                        {/* Add more photos button */}
                        {images.length < 5 && (
                          <label className="relative flex-shrink-0 w-16 h-16 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 cursor-pointer hover:border-primary/50 transition-all" style={{ background: '#5a6f8226' }}>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleImageChange}
                              className="hidden"
                            />
                            <FiCamera size={16} className="text-gray-400 mb-0.5" />
                            <span className="text-gray-500 text-[10px]">{images.length}/5</span>
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Title */}
              <motion.div
                whileFocus={{ scale: 1.002 }}
                className="relative group"
                style={{ marginBottom: '4vh' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[1rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <FiTag className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-300 z-10" size={22} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="What are you selling?"
                    maxLength={100}
                    style={{ height: '8vh', paddingLeft: '4rem', background: '#5a6f8226' }}
                    className="w-full pr-6 backdrop-blur-xl border-2 border-white/20 rounded-[1rem] text-white text-lg font-semibold placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 shadow-xl"
                  />
                </div>
              </motion.div>

              {/* Price Input with Free checkbox */}
              <motion.div
                whileFocus={{ scale: 1.002 }}
                className="relative group"
                style={{ marginBottom: '4vh' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[1rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center">
                  <span className={`absolute left-5 top-1/2 transform -translate-y-1/2 transition-colors duration-300 z-10 text-2xl font-bold ${isFree ? 'text-gray-600' : 'text-gray-400 group-focus-within:text-primary'}`}>$</span>
                  <input
                    type="number"
                    value={isFree ? '' : price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={isFree ? 'Free' : 'Price'}
                    min="0"
                    step="0.01"
                    disabled={isFree}
                    style={{ height: '8vh', paddingLeft: '4rem', paddingRight: '7rem', background: isFree ? '#3a3a3a40' : '#5a6f8226' }}
                    className={`w-full backdrop-blur-xl border-2 border-white/20 rounded-[1rem] text-lg font-semibold placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 shadow-xl ${isFree ? 'text-gray-500 cursor-not-allowed' : 'text-white'}`}
                  />
                  
                  {/* Free checkbox inside input */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsFree(!isFree);
                      if (!isFree) setPrice('');
                    }}
                    className={`absolute right-3 flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${isFree ? 'bg-emerald-500/30 text-emerald-400' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`}
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${isFree ? 'bg-emerald-500 border-emerald-500' : 'border-gray-500'}`} style={{padding:"0.5vw"}}>
                      {isFree && <FiCheck size={10} className="text-white" />}
                    </div>
                    <span className="text-sm font-medium">Free?</span>
                  </button>
                </div>
              </motion.div>

              {/* Categories - Hidden until form has content */}
              <AnimatePresence>
                {shouldShowCategories && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ marginBottom: '4vh' }}
                  >
                    <p className="text-gray-400 text-sm font-medium mb-3 px-1">Select Category(s)</p>
                    <div className={`grid gap-2 ${isMobile ? 'grid-cols-3' : 'grid-cols-4'}`}>
                      {categoryOptions.map((category) => {
                        const Icon = category.icon;
                        const isSelected = categories.includes(category.id);
                        
                        return (
                          <motion.button
                            key={category.id}
                            type="button"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCategoryToggle(category.id)}
                            className={`py-3 px-2 rounded-xl text-center transition-all ${
                              isSelected
                                ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg'
                                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
                            }`}
                          >
                            <div className="flex flex-col items-center gap-2">
                              <Icon size={24} className={isSelected ? 'text-white' : 'text-gray-400'} />
                              <span className="text-xs font-semibold">{category.label}</span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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
                    placeholder="Add details about your item... (optional)"
                    rows={5}
                    maxLength={1000}
                    style={{ background: '#5a6f8226', padding: '1.5rem', paddingLeft: '3.5rem' }}
                    className="w-full backdrop-blur-xl border-2 border-white/20 rounded-[1rem] text-white text-base placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 resize-none shadow-xl"
                  />
                </div>
              </motion.div>

              {/* WhatsApp Contact Option */}
              <AnimatePresence>
                {shouldShowCategories && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ marginBottom: '4vh' }}
                    className="relative"
                  >
                    {/* Header with tooltip */}
                    <div className="flex items-center gap-2 mb-3 px-1">
                      <FaWhatsapp className="text-green-500" size={18} />
                      <p className="text-gray-400 text-sm font-medium">WhatsApp Contact  (Verified Users Only)</p>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setShowWhatsappTooltip(!showWhatsappTooltip)}
                          onMouseEnter={() => setShowWhatsappTooltip(true)}
                          onMouseLeave={() => setShowWhatsappTooltip(false)}
                          className="text-gray-500 hover:text-gray-300 transition-colors"
                        >
                          <IoHelpCircleOutline size={18} />
                        </button>
                        <AnimatePresence>
                          {showWhatsappTooltip && (
                            <motion.div
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 5 }}
                              className="absolute left-0 top-full mt-2 w-64 p-3 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl z-50"
                            >
                              <p className="text-xs text-gray-300 leading-relaxed">
                                Allow buyers to contact you directly on WhatsApp. Your number will only be visible on the listing page, not in search results.
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Enable WhatsApp checkbox */}
                    <button
                      type="button"
                      onClick={() => setWhatsappEnabled(!whatsappEnabled)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all mb-3 ${
                        whatsappEnabled 
                          ? 'bg-green-500/10 border-green-500/50' 
                          : 'bg-white/5 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div style={{width:"4vh",height:"4vh"}} className={`rounded border-2 flex items-center justify-center transition-all ${
                        whatsappEnabled ? 'bg-green-500 border-green-500' : 'border-gray-500'
                      }`}>
                        {whatsappEnabled && <FiCheck size={12} className="text-white" />}
                      </div>
                      <span className={`text-sm font-medium ${whatsappEnabled ? 'text-green-400' : 'text-gray-400'}`}>
                        Enable WhatsApp contact
                      </span>
                    </button>

                    {/* WhatsApp number input and verified only option */}
                    <AnimatePresence>
                      {whatsappEnabled && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3"
                        >
                          {/* Phone number input */}
                          <div className="relative">
                            {/* <FaWhatsapp className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 z-10" size={20} /> */}
                            <input
                              type="tel"
                              value={whatsappNumber}
                              onChange={(e) => setWhatsappNumber(e.target.value)}
                              placeholder="Your WhatsApp number"
                              style={{ height: '7vh', paddingLeft: '3rem', background: '#5a6f8226' }}
                              className="w-full pr-4 backdrop-blur-xl border-2 border-white/20 rounded-xl text-white text-base placeholder-gray-400 focus:border-green-500/50 focus:outline-none transition-all"
                            />
                          </div>

                          {/* Verified users only checkbox */}
                          {/* <button
                            type="button"
                            onClick={() => setWhatsappVerifiedOnly(!whatsappVerifiedOnly)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${
                              whatsappVerifiedOnly 
                                ? 'bg-primary/10 border-primary/30' 
                                : 'bg-white/5 border-white/10 hover:border-white/20'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                              whatsappVerifiedOnly ? 'bg-primary border-primary' : 'border-gray-500'
                            }`}>
                              {whatsappVerifiedOnly && <FiCheck size={10} className="text-white" />}
                            </div>
                            <span className={`text-xs font-medium ${whatsappVerifiedOnly ? 'text-primary' : 'text-gray-400'}`}>
                              Show only to verified users
                            </span>
                          </button> */}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitting}
                className="w-full py-5 mt-8 bg-gradient-to-r from-primary to-accent rounded-[1rem] text-white font-bold text-lg shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ marginBottom:"2vh",backgroundSize: '200% 200%', animation: submitting ? 'none' : 'gradient 3s ease infinite', height: '6vh', marginTop: "2vh" }}
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Listing...
                  </>
                ) : (
                  'Create Listing'
                )}
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
        /* Hide number input spinners */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </>
  );
}
