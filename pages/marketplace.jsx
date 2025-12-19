import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiX, FiPlus, FiChevronDown, FiPackage, FiGift, FiDollarSign, FiMapPin } from 'react-icons/fi';
import { MdSportsSoccer, MdDevices, MdChair, MdCheckroom, MdMenuBook, MdSportsEsports, MdMoreHoriz, MdEdit, MdConfirmationNumber } from 'react-icons/md';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

// Category definitions with icons and colors
const categoryConfig = {
  all: { 
    id: 'all', 
    label: 'All Items', 
    icon: FiPackage,
    gradient: 'from-gray-500/30 to-gray-600/30',
    iconBg: 'bg-gradient-to-br from-gray-500/40 to-gray-600/40',
    iconColor: 'text-gray-300'
  },
  textbooks: { 
    id: 'textbooks', 
    label: 'Textbooks', 
    icon: MdMenuBook,
    gradient: 'from-blue-500/30 to-blue-600/30',
    iconBg: 'bg-gradient-to-br from-blue-500/40 to-blue-600/40',
    iconColor: 'text-blue-400'
  },
  electronics: { 
    id: 'electronics', 
    label: 'Electronics', 
    icon: MdDevices,
    gradient: 'from-cyan-500/30 to-cyan-600/30',
    iconBg: 'bg-gradient-to-br from-cyan-500/40 to-cyan-600/40',
    iconColor: 'text-cyan-400'
  },
  furniture: { 
    id: 'furniture', 
    label: 'Furniture', 
    icon: MdChair,
    gradient: 'from-amber-500/30 to-amber-600/30',
    iconBg: 'bg-gradient-to-br from-amber-500/40 to-amber-600/40',
    iconColor: 'text-amber-400'
  },
  clothing: { 
    id: 'clothing', 
    label: 'Clothing', 
    icon: MdCheckroom,
    gradient: 'from-pink-500/30 to-pink-600/30',
    iconBg: 'bg-gradient-to-br from-pink-500/40 to-pink-600/40',
    iconColor: 'text-pink-400'
  },
  sports: { 
    id: 'sports', 
    label: 'Sports', 
    icon: MdSportsSoccer,
    gradient: 'from-green-500/30 to-green-600/30',
    iconBg: 'bg-gradient-to-br from-green-500/40 to-green-600/40',
    iconColor: 'text-green-400'
  },
  gaming: { 
    id: 'gaming', 
    label: 'Gaming', 
    icon: MdSportsEsports,
    gradient: 'from-purple-500/30 to-purple-600/30',
    iconBg: 'bg-gradient-to-br from-purple-500/40 to-purple-600/40',
    iconColor: 'text-purple-400'
  },
  tickets: { 
    id: 'tickets', 
    label: 'Tickets & Events', 
    icon: MdConfirmationNumber,
    gradient: 'from-orange-500/30 to-red-500/30',
    iconBg: 'bg-gradient-to-br from-orange-500/40 to-red-500/40',
    iconColor: 'text-orange-400'
  },
  free: { 
    id: 'free', 
    label: 'Free Stuff', 
    icon: FiGift,
    gradient: 'from-emerald-500/30 to-emerald-600/30',
    iconBg: 'bg-gradient-to-br from-emerald-500/40 to-emerald-600/40',
    iconColor: 'text-emerald-400'
  },
  other: { 
    id: 'other', 
    label: 'Other', 
    icon: MdMoreHoriz,
    gradient: 'from-slate-500/30 to-slate-600/30',
    iconBg: 'bg-gradient-to-br from-slate-500/40 to-slate-600/40',
    iconColor: 'text-slate-400'
  }
};

const categories = Object.values(categoryConfig);

// Price filter options
const priceFilters = [
  { id: 'all', label: 'All Prices', min: null, max: null },
  { id: 'free', label: 'Free', min: 0, max: 0 },
  { id: 'under25', label: 'Under $25', min: 0.01, max: 25 },
  { id: '25to50', label: '$25 - $50', min: 25, max: 50 },
  { id: '50to100', label: '$50 - $100', min: 50, max: 100 },
  { id: 'over100', label: '$100+', min: 100, max: null }
];

// Condition labels
const conditionLabels = ['Poor', 'Fair', 'Good', 'Like New', 'New'];

export default function Marketplace() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceFilter, setSelectedPriceFilter] = useState('all');
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hoveredFAB, setHoveredFAB] = useState(null);
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

  // Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
        setAuthLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Fetch products from Firestore in real-time
  useEffect(() => {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching products:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter products based on search, category, and price
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Note: Sold items are no longer filtered out - they show with a sold overlay

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      // Special handling for "free" category
      if (selectedCategory === 'free') {
        result = result.filter(p => 
          p.price === 0 || p.price === '0' || p.priceType === 'free'
        );
      } else {
        result = result.filter(p => {
          // Check if product has the category in its categories array
          if (p.categories && Array.isArray(p.categories)) {
            return p.categories.some(cat => 
              cat.toLowerCase() === selectedCategory.toLowerCase() ||
              cat.toLowerCase().includes(selectedCategory.toLowerCase())
            );
          }
          // Fallback to single category field
          if (p.category) {
            return p.category.toLowerCase() === selectedCategory.toLowerCase();
          }
          return false;
        });
      }
    }

    // Filter by price
    const priceFilter = priceFilters.find(f => f.id === selectedPriceFilter);
    if (priceFilter && priceFilter.id !== 'all') {
      result = result.filter(p => {
        const price = parseFloat(p.price) || 0;
        const isFree = p.priceType === 'free' || price === 0;
        
        if (priceFilter.id === 'free') {
          return isFree;
        }
        
        if (priceFilter.min !== null && price < priceFilter.min) return false;
        if (priceFilter.max !== null && price > priceFilter.max) return false;
        return true;
      });
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedPriceFilter]);

  // Handle category click
  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory('all'); // Toggle off
    } else {
      setSelectedCategory(categoryId);
    }
  };

  // Format price display
  const formatPrice = (product) => {
    if (product.priceType === 'free' || product.price === 0 || product.price === '0') {
      return 'FREE';
    }
    if (product.priceType === 'negotiable') {
      return `$${product.price} OBO`;
    }
    return `$${product.price}`;
  };

  // Get condition label
  const getConditionLabel = (condition) => {
    const index = Math.round(condition / 25);
    return conditionLabels[Math.min(index, conditionLabels.length - 1)] || 'Good';
  };

  if (authLoading) {
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
    <div className="w-full bg-transparent pb-32 relative min-h-screen">
      {/* Header Section */}
      <div className="top-0 z-30 border-b border-white/5 pb-6 rounded-[3rem] md:place-self-center">
        <div className="max-w-2xl md:max-w-6xl mx-auto px-6 pt-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: "2vh", marginBottom: "1vh" }}
              className="text-4xl font-bold text-white mb-6 text-center bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent"
            >
              Campus Deals
            </motion.h1>

            {/* Search Bar with Price Filter Icon - Uber Style */}
            <motion.div
              whileFocus={{ scale: 1.005 }}
              className="relative group mb-4"
              style={{marginBottom:"0vh"}}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[3rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-200 group-focus-within:text-primary transition-colors duration-300 z-10" size={24} />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ height: '7vh', paddingLeft: '3.5rem', paddingRight: '3.5rem', background: '#5a6f8226' }}
                  className="w-full border-2 border-white/20 rounded-[3rem] text-white text-lg font-bold placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 shadow-2xl"
                />
                
                {/* Price Filter Icon */}
                <button 
                  onClick={() => setShowPriceDropdown(!showPriceDropdown)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-0 bg-transparent border-none cursor-pointer"
                >
                  <FiFilter 
                    className={`transition-colors duration-300 ${
                      selectedPriceFilter !== 'all' ? 'text-primary' : 'text-gray-200 hover:text-primary'
                    }`} 
                    size={24} 
                  />
                </button>
              </div>
              
              {/* Price Filter Dropdown */}
              <AnimatePresence>
                {showPriceDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-48 bg-[#1C1C1C] border border-white/10 rounded-xl overflow-hidden shadow-xl z-50"
                  >
                    {priceFilters.map((filter) => (
                      <button
                        key={filter.id}
                        onClick={() => {
                          setSelectedPriceFilter(filter.id);
                          setShowPriceDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                          selectedPriceFilter === filter.id
                            ? 'bg-primary/20 text-primary'
                            : 'text-gray-300 hover:bg-white/5'
                        }`}
                      >
                        {filter.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Popular Searches */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2 justify-center mt-4"
              style={{ marginBottom: "1vh", marginTop: "2vh" }}
            >
              <span className="text-gray-400 text-sm mr-2">Popular:</span>
              {[
                { name: "TV", icon: MdDevices },
                { name: "Gloves", icon: MdCheckroom },
                { name: "Jacket", icon: MdCheckroom }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchQuery(item.name)}
                    style={{ background: "none", border: "none" }}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 rounded-full text-white text-sm font-medium transition-all duration-300 flex items-center gap-2"
                  >
                    {item.name}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content - Sidebar + Products */}
      <div className="py-6" style={isMobile ? { paddingLeft: "4vw", paddingRight: "4vw" } : { paddingLeft: "1rem", paddingRight: "1rem" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            
            {/* Categories Sidebar - Vertical on Desktop, Horizontal scroll on Mobile */}
            <div className="md:w-56 flex-shrink-0">
              {/* Mobile: Horizontal scroll */}
              <div className="md:hidden flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className={`flex-shrink-0 flex items-center gap-2.5 px-5 py-3 rounded-2xl transition-all duration-200 ${
                        isSelected 
                          ? 'bg-primary/20 text-primary border border-primary/50' 
                          : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <Icon size={22} className={isSelected ? 'text-primary' : category.iconColor} />
                      <span className="text-base font-semibold whitespace-nowrap">{category.label}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Desktop: Premium Vertical sidebar */}
              <div className="hidden md:block sticky top-4">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-2 space-y-1">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.id;
                    
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryClick(category.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          isSelected 
                            ? `bg-gradient-to-r ${category.gradient} border border-white/20` 
                            : 'hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isSelected ? category.iconBg : 'bg-white/5'
                        }`}>
                          <Icon size={22} className={isSelected ? 'text-white' : category.iconColor} />
                        </div>
                        <span className={`text-sm font-semibold ${
                          isSelected ? 'text-white' : 'text-gray-400'
                        }`}>{category.label}</span>

                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Products Section */}
            <div className="flex-1">
              {/* Items count */}
              <div className="mb-4">
                <p className="text-sm text-gray-400">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found
                  {selectedCategory !== 'all' && ` in ${categoryConfig[selectedCategory]?.label}`}
                </p>
              </div>
              
              {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white/5 rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-square bg-white/10" />
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                    <div className="h-5 bg-white/10 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-2xl"
              >
                <FiPackage size={48} className="text-gray-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-3">No items found</h3>
              <p className="text-gray-400 text-lg">
                {searchQuery 
                  ? `No results for "${searchQuery}"`
                  : 'Create a new listing to get started!'
                }
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ 
                      duration: 0.2,
                      ease: "easeOut"
                    }}
                    onClick={() => router.push(`/listing/${product.id}`)}
                    className="group relative cursor-pointer"
                  >
                    {/* Card - No background, no border */}
                    <div className={`relative flex flex-col ${product.sold ? 'opacity-60' : ''}`}>
                      {/* Product Image */}
                      <div className="relative aspect-square overflow-hidden rounded-2xl">
                        {product.photo ? (
                          <img 
                            src={product.photo} 
                            alt={product.name}
                            className={`w-full h-full object-cover ${product.sold ? 'grayscale' : ''}`}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-black/30">
                            <FiPackage size={48} className="text-gray-600" />
                          </div>
                        )}
                        
                        {/* Sold Overlay Badge */}
                        {/* {product.sold && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                            <div className="bg-white-500/90 backdrop-blur-sm px-4 py-2 rounded-full">
                              <span className="text-primary text-sm font-bold">SOLD</span>
                            </div>
                          </div>
                        )} */}
                      </div>
                      
                      {/* Item info - Hierarchy: Price > Name > Seller */}
                      <div className="relative pt-3 space-y-1">
                        {/* Price - Prominent but not too big */}
                        <div className="flex items-center justify-between">
                          <div className={`text-lg font-bold ${
                            product.sold 
                              ? 'text-gray-500 line-through'
                              : product.priceType === 'free' || product.price === 0
                                ? 'text-emerald-400'
                                : 'text-gray-200'
                          }`}>
                            {formatPrice(product)}
                          </div>
                          {product.priceType === 'negotiable' && !product.sold && (
                            <span className="text-xs text-gray-500 font-medium">Negotiable</span>
                          )}
                        </div>
                        
                        {/* Product Name - White */}
                        <h3 className={`text-sm font-semibold line-clamp-2 leading-snug transition-colors ${
                          product.sold ? 'text-gray-500' : 'text-white group-hover:text-primary'
                        }`}>
                          {product.name}
                        </h3>
                        
                        {/* Seller info */}
                        <p className="text-xs text-gray-500 font-medium">
                          {product.userName || 'Anonymous'}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons - My Listings + Create Listing (Rides Style) */}
      <div className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-40 flex flex-col gap-3">
        {/* My Listings FAB */}
        <motion.button
          initial={{ width: '64px' }}
          animate={{
            width: hoveredFAB === 'my-listings' ? 'auto' : '64px'
          }}
          onHoverStart={() => setHoveredFAB('my-listings')}
          onHoverEnd={() => setHoveredFAB(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/my-listings')}
          className="h-16 bg-white/10 backdrop-blur-2xl rounded-full shadow-2xl flex items-center overflow-hidden border-2 border-white/20"
          style={{ minWidth: '64px' }}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center justify-center flex-shrink-0" style={{ width: hoveredFAB === 'my-listings' ? '48px' : '64px', transition: 'width 0.2s' }}>
              <MdEdit size={24} className="text-white" />
            </div>
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: hoveredFAB === 'my-listings' ? 1 : 0,
                width: hoveredFAB === 'my-listings' ? 'auto' : 0
              }}
              transition={{ duration: 0.2 }}
              className="text-white font-bold text-base whitespace-nowrap pr-4"
            >
              My Listings
            </motion.span>
          </div>
        </motion.button>

        {/* Create Listing FAB */}
        <motion.button
          initial={{ width: '64px' }}
          animate={{
            width: hoveredFAB === 'create' ? 'auto' : '64px'
          }}
          onHoverStart={() => setHoveredFAB('create')}
          onHoverEnd={() => setHoveredFAB(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push('/create-listing')}
          className="h-16 bg-gradient-to-r from-primary via-accent to-primary rounded-full shadow-2xl shadow-primary/50 flex items-center overflow-hidden border-2 border-white/20 backdrop-blur-xl"
          style={{ backgroundSize: '200% 200%', animation: 'gradient 3s ease infinite', minWidth: '64px' }}
        >
          <div className="flex items-center gap-3 w-full">
            <div className="flex items-center justify-center flex-shrink-0" style={{ width: hoveredFAB === 'create' ? '48px' : '64px', transition: 'width 0.2s' }}>
              <FiPlus size={28} className="text-white" strokeWidth={3} />
            </div>
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: hoveredFAB === 'create' ? 1 : 0,
                width: hoveredFAB === 'create' ? 'auto' : 0
              }}
              transition={{ duration: 0.2 }}
              className="text-white font-bold text-base whitespace-nowrap pr-4"
            >
              Sell Item
            </motion.span>
          </div>
        </motion.button>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Click outside to close price dropdown */}
      {showPriceDropdown && (
        <div 
          className="fixed inset-0 z-20" 
          onClick={() => setShowPriceDropdown(false)} 
        />
      )}
    </div>
  );
}
