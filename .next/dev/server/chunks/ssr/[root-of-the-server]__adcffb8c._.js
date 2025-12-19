module.exports = [
"[project]/pages/marketplace.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Marketplace
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/md/index.mjs [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/firebase/auth [external] (firebase/auth, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/firebase/firestore [external] (firebase/firestore, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
// Category definitions with icons and colors
const categoryConfig = {
    all: {
        id: 'all',
        label: 'All Items',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiPackage"],
        gradient: 'from-gray-500/30 to-gray-600/30',
        iconBg: 'bg-gradient-to-br from-gray-500/40 to-gray-600/40',
        iconColor: 'text-gray-300'
    },
    textbooks: {
        id: 'textbooks',
        label: 'Textbooks',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdMenuBook"],
        gradient: 'from-blue-500/30 to-blue-600/30',
        iconBg: 'bg-gradient-to-br from-blue-500/40 to-blue-600/40',
        iconColor: 'text-blue-400'
    },
    electronics: {
        id: 'electronics',
        label: 'Electronics',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdDevices"],
        gradient: 'from-cyan-500/30 to-cyan-600/30',
        iconBg: 'bg-gradient-to-br from-cyan-500/40 to-cyan-600/40',
        iconColor: 'text-cyan-400'
    },
    furniture: {
        id: 'furniture',
        label: 'Furniture',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdChair"],
        gradient: 'from-amber-500/30 to-amber-600/30',
        iconBg: 'bg-gradient-to-br from-amber-500/40 to-amber-600/40',
        iconColor: 'text-amber-400'
    },
    clothing: {
        id: 'clothing',
        label: 'Clothing',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdCheckroom"],
        gradient: 'from-pink-500/30 to-pink-600/30',
        iconBg: 'bg-gradient-to-br from-pink-500/40 to-pink-600/40',
        iconColor: 'text-pink-400'
    },
    sports: {
        id: 'sports',
        label: 'Sports',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdSportsSoccer"],
        gradient: 'from-green-500/30 to-green-600/30',
        iconBg: 'bg-gradient-to-br from-green-500/40 to-green-600/40',
        iconColor: 'text-green-400'
    },
    gaming: {
        id: 'gaming',
        label: 'Gaming',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdSportsEsports"],
        gradient: 'from-purple-500/30 to-purple-600/30',
        iconBg: 'bg-gradient-to-br from-purple-500/40 to-purple-600/40',
        iconColor: 'text-purple-400'
    },
    free: {
        id: 'free',
        label: 'Free Stuff',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiGift"],
        gradient: 'from-emerald-500/30 to-emerald-600/30',
        iconBg: 'bg-gradient-to-br from-emerald-500/40 to-emerald-600/40',
        iconColor: 'text-emerald-400'
    },
    other: {
        id: 'other',
        label: 'Other',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdMoreHoriz"],
        gradient: 'from-slate-500/30 to-slate-600/30',
        iconBg: 'bg-gradient-to-br from-slate-500/40 to-slate-600/40',
        iconColor: 'text-slate-400'
    }
};
const categories = Object.values(categoryConfig);
// Price filter options
const priceFilters = [
    {
        id: 'all',
        label: 'All Prices',
        min: null,
        max: null
    },
    {
        id: 'free',
        label: 'Free',
        min: 0,
        max: 0
    },
    {
        id: 'under25',
        label: 'Under $25',
        min: 0.01,
        max: 25
    },
    {
        id: '25to50',
        label: '$25 - $50',
        min: 25,
        max: 50
    },
    {
        id: '50to100',
        label: '$50 - $100',
        min: 50,
        max: 100
    },
    {
        id: 'over100',
        label: '$100+',
        min: 100,
        max: null
    }
];
// Condition labels
const conditionLabels = [
    'Poor',
    'Fair',
    'Good',
    'Like New',
    'New'
];
function Marketplace() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [products, setProducts] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [authLoading, setAuthLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('all');
    const [selectedPriceFilter, setSelectedPriceFilter] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('all');
    const [showPriceDropdown, setShowPriceDropdown] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    // Check authentication
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__["onAuthStateChanged"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["auth"], (currentUser)=>{
            if (!currentUser) {
                router.push('/login');
            } else {
                setUser(currentUser);
                setAuthLoading(false);
            }
        });
        return ()=>unsubscribe();
    }, [
        router
    ]);
    // Fetch products from Firestore in real-time
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const productsRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'products');
        const q = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["query"])(productsRef, (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["orderBy"])('createdAt', 'desc'));
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["onSnapshot"])(q, (snapshot)=>{
            const productsData = snapshot.docs.map((doc)=>({
                    id: doc.id,
                    ...doc.data()
                }));
            setProducts(productsData);
            setLoading(false);
        }, (error)=>{
            console.error('Error fetching products:', error);
            setLoading(false);
        });
        return ()=>unsubscribe();
    }, []);
    // Filter products based on search, category, and price
    const filteredProducts = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useMemo"])(()=>{
        let result = [
            ...products
        ];
        // Filter by search query
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter((p)=>p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
        }
        // Filter by category
        if (selectedCategory !== 'all') {
            // Special handling for "free" category
            if (selectedCategory === 'free') {
                result = result.filter((p)=>p.price === 0 || p.price === '0' || p.priceType === 'free');
            } else {
                result = result.filter((p)=>{
                    // Check if product has the category in its categories array
                    if (p.categories && Array.isArray(p.categories)) {
                        return p.categories.some((cat)=>cat.toLowerCase() === selectedCategory.toLowerCase() || cat.toLowerCase().includes(selectedCategory.toLowerCase()));
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
        const priceFilter = priceFilters.find((f)=>f.id === selectedPriceFilter);
        if (priceFilter && priceFilter.id !== 'all') {
            result = result.filter((p)=>{
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
    }, [
        products,
        searchQuery,
        selectedCategory,
        selectedPriceFilter
    ]);
    // Handle category click
    const handleCategoryClick = (categoryId)=>{
        if (selectedCategory === categoryId) {
            setSelectedCategory('all'); // Toggle off
        } else {
            setSelectedCategory(categoryId);
        }
    };
    // Format price display
    const formatPrice = (product)=>{
        if (product.priceType === 'free' || product.price === 0 || product.price === '0') {
            return 'FREE';
        }
        if (product.priceType === 'negotiable') {
            return `$${product.price} OBO`;
        }
        return `$${product.price}`;
    };
    // Get condition label
    const getConditionLabel = (condition)=>{
        const index = Math.round(condition / 25);
        return conditionLabels[Math.min(index, conditionLabels.length - 1)] || 'Good';
    };
    if (authLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/pages/marketplace.jsx",
                        lineNumber: 233,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-gray-400 text-lg",
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/pages/marketplace.jsx",
                        lineNumber: 234,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/marketplace.jsx",
                lineNumber: 232,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/marketplace.jsx",
            lineNumber: 231,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "w-full bg-transparent pb-32 relative min-h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "top-0 z-30 border-b border-white/5 pb-6 rounded-[3rem] md:place-self-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "max-w-2xl md:max-w-6xl mx-auto px-6 pt-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: -20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].h1, {
                                initial: {
                                    opacity: 0,
                                    y: -10
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                style: {
                                    marginTop: "2vh",
                                    marginBottom: "1vh"
                                },
                                className: "text-4xl font-bold text-white mb-6 text-center bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent",
                                children: "Campus Deals"
                            }, void 0, false, {
                                fileName: "[project]/pages/marketplace.jsx",
                                lineNumber: 250,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                whileFocus: {
                                    scale: 1.005
                                },
                                className: "relative group mb-4",
                                style: {
                                    marginBottom: "6vh"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[3rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/marketplace.jsx",
                                        lineNumber: 265,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiSearch"], {
                                                className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-200 group-focus-within:text-primary transition-colors duration-300 z-10",
                                                size: 24
                                            }, void 0, false, {
                                                fileName: "[project]/pages/marketplace.jsx",
                                                lineNumber: 267,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "What are you looking for?",
                                                value: searchQuery,
                                                onChange: (e)=>setSearchQuery(e.target.value),
                                                style: {
                                                    height: '7vh',
                                                    paddingLeft: '3.5rem',
                                                    paddingRight: '3.5rem',
                                                    background: '#5a6f8226'
                                                },
                                                className: "w-full border-2 border-white/20 rounded-[3rem] text-white text-lg font-bold placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 shadow-2xl"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/marketplace.jsx",
                                                lineNumber: 268,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setShowPriceDropdown(!showPriceDropdown),
                                                className: "absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-0 bg-transparent border-none cursor-pointer",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiFilter"], {
                                                    className: `transition-colors duration-300 ${selectedPriceFilter !== 'all' ? 'text-primary' : 'text-gray-200 hover:text-primary'}`,
                                                    size: 24
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/marketplace.jsx",
                                                    lineNumber: 282,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/marketplace.jsx",
                                                lineNumber: 278,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/marketplace.jsx",
                                        lineNumber: 266,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["AnimatePresence"], {
                                        children: showPriceDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                y: -10
                                            },
                                            animate: {
                                                opacity: 1,
                                                y: 0
                                            },
                                            exit: {
                                                opacity: 0,
                                                y: -10
                                            },
                                            className: "absolute top-full right-0 mt-2 w-48 bg-[#1C1C1C] border border-white/10 rounded-xl overflow-hidden shadow-xl z-50",
                                            children: priceFilters.map((filter)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        setSelectedPriceFilter(filter.id);
                                                        setShowPriceDropdown(false);
                                                    },
                                                    className: `w-full text-left px-4 py-3 text-sm transition-colors ${selectedPriceFilter === filter.id ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:bg-white/5'}`,
                                                    children: filter.label
                                                }, filter.id, false, {
                                                    fileName: "[project]/pages/marketplace.jsx",
                                                    lineNumber: 301,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/pages/marketplace.jsx",
                                            lineNumber: 294,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/marketplace.jsx",
                                        lineNumber: 292,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/marketplace.jsx",
                                lineNumber: 260,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/marketplace.jsx",
                        lineNumber: 245,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/marketplace.jsx",
                    lineNumber: 244,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/marketplace.jsx",
                lineNumber: 243,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "px-4 py-6",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "max-w-6xl mx-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "md:w-48 flex-shrink-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "md:hidden flex gap-2 overflow-x-auto pb-2 scrollbar-hide",
                                        children: categories.map((category)=>{
                                            const Icon = category.icon;
                                            const isSelected = selectedCategory === category.id;
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleCategoryClick(category.id),
                                                className: `flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${isSelected ? 'bg-primary/20 text-primary border border-primary/50' : 'bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Icon, {
                                                        size: 18,
                                                        className: isSelected ? 'text-primary' : category.iconColor
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/marketplace.jsx",
                                                        lineNumber: 347,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-medium whitespace-nowrap",
                                                        children: category.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/marketplace.jsx",
                                                        lineNumber: 348,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, category.id, true, {
                                                fileName: "[project]/pages/marketplace.jsx",
                                                lineNumber: 338,
                                                columnNumber: 21
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/pages/marketplace.jsx",
                                        lineNumber: 332,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "hidden md:block sticky top-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                className: "text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2",
                                                children: "Categories"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/marketplace.jsx",
                                                lineNumber: 356,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "space-y-1",
                                                children: categories.map((category)=>{
                                                    const Icon = category.icon;
                                                    const isSelected = selectedCategory === category.id;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>handleCategoryClick(category.id),
                                                        className: `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${isSelected ? 'bg-primary/20 text-white border-l-2 border-primary' : 'text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Icon, {
                                                                size: 20,
                                                                className: isSelected ? 'text-primary' : category.iconColor
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/marketplace.jsx",
                                                                lineNumber: 372,
                                                                columnNumber: 25
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-medium",
                                                                children: category.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/marketplace.jsx",
                                                                lineNumber: 373,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, category.id, true, {
                                                        fileName: "[project]/pages/marketplace.jsx",
                                                        lineNumber: 363,
                                                        columnNumber: 23
                                                    }, this);
                                                })
                                            }, void 0, false, {
                                                fileName: "[project]/pages/marketplace.jsx",
                                                lineNumber: 357,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/marketplace.jsx",
                                        lineNumber: 355,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/marketplace.jsx",
                                lineNumber: 330,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "mb-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-400",
                                            children: [
                                                filteredProducts.length,
                                                " ",
                                                filteredProducts.length === 1 ? 'item' : 'items',
                                                " found",
                                                selectedCategory !== 'all' && ` in ${categoryConfig[selectedCategory]?.label}`
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/marketplace.jsx",
                                            lineNumber: 385,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/marketplace.jsx",
                                        lineNumber: 384,
                                        columnNumber: 15
                                    }, this),
                                    loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
                                        children: [
                                            ...Array(8)
                                        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "bg-white/5 rounded-2xl overflow-hidden animate-pulse",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "aspect-square bg-white/10"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/marketplace.jsx",
                                                        lineNumber: 396,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "p-3 space-y-2",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "h-4 bg-white/10 rounded w-3/4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/marketplace.jsx",
                                                                lineNumber: 398,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "h-5 bg-white/10 rounded w-1/2"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/marketplace.jsx",
                                                                lineNumber: 399,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/marketplace.jsx",
                                                        lineNumber: 397,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, i, true, {
                                                fileName: "[project]/pages/marketplace.jsx",
                                                lineNumber: 395,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/pages/marketplace.jsx",
                                        lineNumber: 393,
                                        columnNumber: 13
                                    }, this) : filteredProducts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            scale: 0.9
                                        },
                                        animate: {
                                            opacity: 1,
                                            scale: 1
                                        },
                                        className: "text-center py-20",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                                animate: {
                                                    scale: [
                                                        1,
                                                        1.05,
                                                        1
                                                    ],
                                                    rotate: [
                                                        0,
                                                        5,
                                                        -5,
                                                        0
                                                    ]
                                                },
                                                transition: {
                                                    duration: 4,
                                                    repeat: Infinity
                                                },
                                                className: "w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-xl border border-white/10 shadow-2xl",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiPackage"], {
                                                    size: 48,
                                                    className: "text-gray-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/marketplace.jsx",
                                                    lineNumber: 418,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/marketplace.jsx",
                                                lineNumber: 410,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                className: "text-2xl font-bold text-white mb-3",
                                                children: "No items found"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/marketplace.jsx",
                                                lineNumber: 420,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-gray-400 text-lg",
                                                children: searchQuery ? `No results for "${searchQuery}"` : 'Create a new listing to get started!'
                                            }, void 0, false, {
                                                fileName: "[project]/pages/marketplace.jsx",
                                                lineNumber: 421,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/marketplace.jsx",
                                        lineNumber: 405,
                                        columnNumber: 13
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["AnimatePresence"], {
                                            children: filteredProducts.map((product, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                                    layout: true,
                                                    initial: {
                                                        opacity: 0,
                                                        y: 50,
                                                        scale: 0.95
                                                    },
                                                    animate: {
                                                        opacity: 1,
                                                        y: 0,
                                                        scale: 1
                                                    },
                                                    exit: {
                                                        opacity: 0,
                                                        y: -20,
                                                        scale: 0.95
                                                    },
                                                    transition: {
                                                        delay: index * 0.08,
                                                        duration: 0.4,
                                                        ease: [
                                                            0.25,
                                                            0.46,
                                                            0.45,
                                                            0.94
                                                        ]
                                                    },
                                                    onClick: ()=>router.push(`/listing/${product.id}`),
                                                    className: "group relative cursor-pointer",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "relative flex flex-col",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "relative aspect-square overflow-hidden rounded-2xl",
                                                                children: product.photo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                                    src: product.photo,
                                                                    alt: product.name,
                                                                    className: "w-full h-full object-cover"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/marketplace.jsx",
                                                                    lineNumber: 451,
                                                                    columnNumber: 27
                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "w-full h-full flex items-center justify-center bg-black/30",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiPackage"], {
                                                                        size: 48,
                                                                        className: "text-gray-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/marketplace.jsx",
                                                                        lineNumber: 458,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/marketplace.jsx",
                                                                    lineNumber: 457,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/marketplace.jsx",
                                                                lineNumber: 449,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "relative pt-3 space-y-1",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center justify-between",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                                className: `text-lg font-bold ${product.priceType === 'free' || product.price === 0 ? 'text-emerald-400' : 'text-gray-200'}`,
                                                                                children: formatPrice(product)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/marketplace.jsx",
                                                                                lineNumber: 467,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            product.priceType === 'negotiable' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                                className: "text-xs text-gray-500 font-medium",
                                                                                children: "Negotiable"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/marketplace.jsx",
                                                                                lineNumber: 475,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/pages/marketplace.jsx",
                                                                        lineNumber: 466,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                                        className: "text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-primary transition-colors",
                                                                        children: product.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/marketplace.jsx",
                                                                        lineNumber: 480,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-gray-500 font-medium",
                                                                        children: product.userName || 'Anonymous'
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/marketplace.jsx",
                                                                        lineNumber: 485,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/marketplace.jsx",
                                                                lineNumber: 464,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/marketplace.jsx",
                                                        lineNumber: 447,
                                                        columnNumber: 21
                                                    }, this)
                                                }, product.id, false, {
                                                    fileName: "[project]/pages/marketplace.jsx",
                                                    lineNumber: 432,
                                                    columnNumber: 19
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/pages/marketplace.jsx",
                                            lineNumber: 430,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/marketplace.jsx",
                                        lineNumber: 429,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/marketplace.jsx",
                                lineNumber: 382,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/marketplace.jsx",
                        lineNumber: 327,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/pages/marketplace.jsx",
                    lineNumber: 326,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/marketplace.jsx",
                lineNumber: 325,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].button, {
                onClick: ()=>router.push('/create-listing'),
                className: "fixed bottom-24 right-4 md:bottom-8 md:right-8 flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary to-accent rounded-2xl shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all z-40 backdrop-blur-xl border border-white/20",
                style: {
                    boxShadow: '0 0 30px rgba(var(--color-primary-rgb), 0.4), 0 0 60px rgba(var(--color-primary-rgb), 0.2), inset 0 1px 1px rgba(255,255,255,0.2)'
                },
                whileHover: {
                    scale: 1.05,
                    boxShadow: '0 0 40px rgba(var(--color-primary-rgb), 0.5), 0 0 80px rgba(var(--color-primary-rgb), 0.3)'
                },
                whileTap: {
                    scale: 0.95
                },
                initial: {
                    scale: 0,
                    opacity: 0
                },
                animate: {
                    scale: 1,
                    opacity: 1
                },
                transition: {
                    delay: 0.3,
                    type: 'spring',
                    stiffness: 200
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiPlus"], {
                        size: 24,
                        className: "text-white"
                    }, void 0, false, {
                        fileName: "[project]/pages/marketplace.jsx",
                        lineNumber: 513,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                        className: "text-white font-bold text-lg",
                        children: "Sell Item"
                    }, void 0, false, {
                        fileName: "[project]/pages/marketplace.jsx",
                        lineNumber: 514,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/marketplace.jsx",
                lineNumber: 501,
                columnNumber: 7
            }, this),
            showPriceDropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-20",
                onClick: ()=>setShowPriceDropdown(false)
            }, void 0, false, {
                fileName: "[project]/pages/marketplace.jsx",
                lineNumber: 519,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/marketplace.jsx",
        lineNumber: 241,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__adcffb8c._.js.map