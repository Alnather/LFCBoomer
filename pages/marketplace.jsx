import { motion } from 'framer-motion';
import { FiPackage, FiSearch, FiFilter } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Marketplace() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

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

  useEffect(() => {
    // Fetch products from Fake Store API
    fetch('https://fakestoreapi.com/products?limit=12')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  const categories = ['All', 'Electronics', 'Books', 'Furniture', 'Clothing', 'Other'];

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
    <div className="w-full bg-transparent pb-24 relative">
      {/* Background skeleton - blurred */}
      <div className="blur-sm opacity-25 pointer-events-none max-h-[90vh] overflow-hidden flex">
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
          
          {/* Filters in sidebar */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-white mb-4 px-2">Filters</h3>
            <div className="space-y-2">
              <button className="w-full text-left flex items-center gap-2 px-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium text-gray-300 hover:bg-white/10 hover:border-primary/50 transition-all duration-300" style={{ height: '6vh' }}>
                <FiFilter size={16} />
                Price Range
              </button>
              <button className="w-full text-left flex items-center gap-2 px-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium text-gray-300 hover:bg-white/10 hover:border-primary/50 transition-all duration-300" style={{ height: '6vh' }}>
                <FiFilter size={16} />
                Condition
              </button>
              <button className="w-full text-left flex items-center gap-2 px-4 bg-white/5 border border-white/10 rounded-2xl text-sm font-medium text-gray-300 hover:bg-white/10 hover:border-primary/50 transition-all duration-300" style={{ height: '6vh' }}>
                <FiFilter size={16} />
                Sort By
              </button>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1">
        {/* Search bar and filters */}
        <div className="sticky top-0 z-20 backdrop-blur-2xl bg-gradient-to-b from-black/20 to-transparent border-b border-white/5 pb-4 pt-8 px-6">
          <div className="max-w-full mx-auto">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search marketplace..."
                className="w-full pl-12 pr-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 transition-all duration-300"
                style={{ height: '6vh' }}
              />
            </div>

            {/* Categories - mobile only */}
            <div className="flex md:hidden gap-2 overflow-x-auto pb-2 scrollbar-hide" style={{ marginTop: '2vh', marginBottom: '2vh' }}>
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

            {/* Filters - mobile only */}
            <div className="flex md:hidden gap-2 items-center overflow-x-auto pb-2 scrollbar-hide">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-gray-300 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 whitespace-nowrap">
                <FiFilter size={16} />
                Price Range
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-gray-300 hover:bg-white/10 hover:border-primary/50 transition-all duration-300 whitespace-nowrap">
                <FiFilter size={16} />
                Condition
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:border-primary/50 transition-colors">
                <FiFilter size={16} />
                Sort By
              </button>
            </div>
          </div>
        </div>

        {/* Listings grid */}
        <div className="max-w-2xl md:max-w-6xl mx-auto px-6 mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-[#1C1C1C] to-[#171717] rounded-2xl overflow-hidden border border-white/10"
              >
                {/* Product Image */}
                <div className="aspect-square bg-white flex items-center justify-center p-4">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="w-full h-full object-contain"
                    style={{background:"#171717"}}
                  />
                </div>
                
                {/* Item info */}
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">{product.title}</h3>
                  <p className="text-lg font-bold text-primary mb-1">${product.price}</p>
                  <p className="text-xs text-gray-400 capitalize">{product.category}</p>
                </div>
              </div>
            ))}
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
            className="w-32 h-32 mb-8 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl shadow-primary/10"
          >
            <FiPackage size={64} className="text-primary" />
          </motion.div>
          
          <h2 className="text-4xl font-bold text-white mb-4">
            Marketplace
          </h2>
          <p className="text-2xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-3">Coming Soon</p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Buy and sell items with your campus community. Stay tuned!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
