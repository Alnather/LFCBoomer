module.exports = [
"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}),
"[project]/pages/rides.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Rides
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/md/index.mjs [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$datepicker$2f$dist$2f$index$2e$es$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-datepicker/dist/index.es.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/firebase/firestore [external] (firebase/firestore, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
;
;
;
;
;
;
;
// Utility function to capitalize first letters
const capitalizeName = (name)=>{
    if (!name) return '';
    return name.split(' ').map((word)=>word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};
// Shopping destinations
const shoppingLocations = [
    'target',
    'walmart',
    'costco',
    'whole foods',
    'trader joe',
    'jewel',
    'mariano',
    'mall',
    'outlet'
];
// Downtown keywords
const downtownKeywords = [
    'downtown',
    'city center',
    'downtown chicago',
    'magnificent mile',
    'loop',
    'chicago'
];
// College keywords
const collegeKeywords = [
    'lake forest',
    'college',
    'university',
    'campus',
    'northwestern',
    'depaul',
    'loyola',
    'uic',
    'uchicago'
];
const destinationThemes = {
    'airport': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdFlight"],
        gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
        iconColor: 'text-cyan-400',
        glow: 'shadow-cyan-500/20'
    },
    'shopping': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdShoppingCart"],
        gradient: 'from-red-500/20 via-pink-500/10 to-transparent',
        iconColor: 'text-pink-400',
        glow: 'shadow-pink-500/20'
    },
    'downtown': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdLocationCity"],
        gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
        iconColor: 'text-indigo-400',
        glow: 'shadow-indigo-500/20'
    },
    'college': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdSchool"],
        gradient: 'from-green-500/20 via-emerald-500/10 to-transparent',
        iconColor: 'text-emerald-400',
        glow: 'shadow-emerald-500/20'
    },
    'default': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiMapPin"],
        gradient: 'from-gray-500/20 via-gray-500/10 to-transparent',
        iconColor: 'text-gray-400',
        glow: 'shadow-gray-500/20'
    }
};
// Function to detect theme based on destination name
const detectTheme = (destination)=>{
    const lowerDest = destination.toLowerCase();
    // Check for airport
    if (lowerDest.includes('airport') || lowerDest.includes('ord') || lowerDest.includes('mdw')) {
        return 'airport';
    }
    // Check for shopping
    if (shoppingLocations.some((shop)=>lowerDest.includes(shop))) {
        return 'shopping';
    }
    // Check for downtown
    if (downtownKeywords.some((keyword)=>lowerDest.includes(keyword))) {
        return 'downtown';
    }
    // Check for college
    if (collegeKeywords.some((keyword)=>lowerDest.includes(keyword))) {
        return 'college';
    }
    return 'default';
};
function Rides() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [destination, setDestination] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [selectedDate, setSelectedDate] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [selectedTime, setSelectedTime] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [rides, setRides] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [filteredRides, setFilteredRides] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [showFABWiggle, setShowFABWiggle] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [hoveredFAB, setHoveredFAB] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [dateFilter, setDateFilter] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null); // For date picker filter
    const [showDateModal, setShowDateModal] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false); // For date picker modal
    const containerRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const { scrollYProgress } = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["useScroll"])({
        target: containerRef
    });
    const y = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["useTransform"])(scrollYProgress, [
        0,
        1
    ], [
        0,
        -50
    ]);
    // Fuzzy search function
    const fuzzyMatch = (str, pattern)=>{
        if (!pattern) return true;
        const patternLower = pattern.toLowerCase();
        const strLower = str.toLowerCase();
        // Direct includes for simplicity
        if (strLower.includes(patternLower)) return true;
        // Fuzzy matching: check if all pattern characters appear in order
        let patternIdx = 0;
        for(let i = 0; i < strLower.length && patternIdx < patternLower.length; i++){
            if (strLower[i] === patternLower[patternIdx]) {
                patternIdx++;
            }
        }
        return patternIdx === patternLower.length;
    };
    // Fetch rides from Firestore in real-time
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const ridesRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'rides');
        const q = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["query"])(ridesRef, (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["where"])('status', '==', 'active'));
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["onSnapshot"])(q, (snapshot)=>{
            const ridesData = snapshot.docs.map((doc)=>{
                const data = doc.data();
                return {
                    id: doc.id,
                    destination: data.destination,
                    city: data.city || '',
                    fullAddress: data.fullAddress || data.destination,
                    date: data.date?.toDate ? data.date.toDate().toISOString().split('T')[0] : '',
                    time: data.time,
                    organizer: capitalizeName(data.organizerName),
                    organizerId: data.organizerId,
                    seats: data.seats,
                    members: data.participants?.length || 1,
                    description: data.description,
                    participants: data.participants || [],
                    createdAt: data.createdAt
                };
            });
            // Sort by date on the client side
            ridesData.sort((a, b)=>new Date(a.date) - new Date(b.date));
            setRides(ridesData);
            setFilteredRides(ridesData);
            setLoading(false);
        }, (error)=>{
            console.error('Error fetching rides:', error);
            setLoading(false);
        });
        return ()=>unsubscribe();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // Filter rides based on criteria
        let filtered = rides;
        if (destination) {
            filtered = filtered.filter((ride)=>fuzzyMatch(ride.destination, destination) || fuzzyMatch(ride.city || '', destination) || fuzzyMatch(ride.fullAddress || '', destination));
        }
        if (dateFilter) {
            const dateStr = dateFilter.toISOString().split('T')[0];
            filtered = filtered.filter((ride)=>ride.date === dateStr);
        }
        if (selectedTime) {
            filtered = filtered.filter((ride)=>ride.time.startsWith(selectedTime));
        }
        setFilteredRides(filtered);
        // Show wiggle animation if no results
        if (filtered.length === 0 && (destination || dateFilter || selectedTime)) {
            setTimeout(()=>setShowFABWiggle(true), 1000);
            setTimeout(()=>setShowFABWiggle(false), 2000);
        }
    }, [
        destination,
        dateFilter,
        selectedTime,
        rides
    ]);
    const handleCreateRide = ()=>{
        // Navigate to create ride page
        router.push('/create-ride');
    };
    const handleJoinRide = (rideId)=>{
        // Handle join ride logic
        console.log('Join ride:', rideId);
    };
    const getDestinationTheme = (dest)=>{
        const themeKey = detectTheme(dest);
        return destinationThemes[themeKey];
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "theme-color",
                        content: "#0A0A0A",
                        media: "(prefers-color-scheme: dark)"
                    }, void 0, false, {
                        fileName: "[project]/pages/rides.jsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "theme-color",
                        content: "#F9FAFB",
                        media: "(prefers-color-scheme: light)"
                    }, void 0, false, {
                        fileName: "[project]/pages/rides.jsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "apple-mobile-web-app-capable",
                        content: "yes"
                    }, void 0, false, {
                        fileName: "[project]/pages/rides.jsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "apple-mobile-web-app-status-bar-style",
                        content: "black-translucent"
                    }, void 0, false, {
                        fileName: "[project]/pages/rides.jsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1, viewport-fit=cover"
                    }, void 0, false, {
                        fileName: "[project]/pages/rides.jsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/rides.jsx",
                lineNumber: 215,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                ref: containerRef,
                className: "jsx-2df4565939163d7b" + " " + "w-full pb-32",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-2df4565939163d7b" + " " + "sticky top-0 z-30 border-b border-white/5 pb-6 rounded-[3rem] md:place-self-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-2df4565939163d7b" + " " + "max-w-2xl md:max-w-6xl mx-auto px-6 pt-8",
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
                                        children: "Find Your Ride"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/rides.jsx",
                                        lineNumber: 231,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                        whileFocus: {
                                            scale: 1.005
                                        },
                                        className: "relative group mb-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-2df4565939163d7b" + " " + "absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[3rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/rides.jsx",
                                                lineNumber: 245,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-2df4565939163d7b" + " " + "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiMapPin"], {
                                                        className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-200 group-focus-within:text-primary transition-colors duration-300 z-10",
                                                        size: 24
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/rides.jsx",
                                                        lineNumber: 247,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        placeholder: "Where to?",
                                                        value: destination,
                                                        onChange: (e)=>setDestination(e.target.value),
                                                        style: {
                                                            height: '7vh',
                                                            paddingLeft: '3.5rem',
                                                            paddingRight: '3.5rem',
                                                            background: '#5a6f8226'
                                                        },
                                                        className: "jsx-2df4565939163d7b" + " " + "w-full border-2 border-white/20 rounded-[3rem] text-white text-lg font-bold placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 shadow-2xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/rides.jsx",
                                                        lineNumber: 248,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>{
                                                            if (dateFilter) {
                                                                setDateFilter(null); // Reset if already selected
                                                            } else {
                                                                setShowDateModal(true); // Open modal if not selected
                                                            }
                                                        },
                                                        className: "jsx-2df4565939163d7b" + " " + "absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-0 bg-transparent border-none cursor-pointer",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiCalendar"], {
                                                            className: `transition-colors duration-300 ${dateFilter ? 'text-primary' : 'text-gray-200 hover:text-primary'}`,
                                                            size: 24
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/rides.jsx",
                                                            lineNumber: 268,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/rides.jsx",
                                                        lineNumber: 258,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/rides.jsx",
                                                lineNumber: 246,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/rides.jsx",
                                        lineNumber: 241,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: 10
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            delay: 0.1
                                        },
                                        className: "flex flex-wrap gap-2 justify-center mt-4",
                                        style: {
                                            marginBottom: "1vh",
                                            marginTop: "2vh"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                className: "jsx-2df4565939163d7b" + " " + "text-gray-400 text-sm mr-2",
                                                children: "Popular:"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/rides.jsx",
                                                lineNumber: 286,
                                                columnNumber: 15
                                            }, this),
                                            [
                                                {
                                                    name: "O'Hare Airport",
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdFlight"]
                                                },
                                                {
                                                    name: "Chicago Downtown",
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdLocationCity"]
                                                },
                                                {
                                                    name: "Lake Forest College",
                                                    icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdSchool"]
                                                }
                                            ].map((dest, idx)=>{
                                                const Icon = dest.icon;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].button, {
                                                    whileHover: {
                                                        scale: 1.05
                                                    },
                                                    whileTap: {
                                                        scale: 0.95
                                                    },
                                                    onClick: ()=>setDestination(dest.name),
                                                    style: {
                                                        background: "none",
                                                        border: "none"
                                                    },
                                                    className: "px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 rounded-full text-white text-sm font-medium transition-all duration-300 flex items-center gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Icon, {
                                                            size: 16,
                                                            className: "jsx-2df4565939163d7b"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/rides.jsx",
                                                            lineNumber: 303,
                                                            columnNumber: 21
                                                        }, this),
                                                        dest.name
                                                    ]
                                                }, idx, true, {
                                                    fileName: "[project]/pages/rides.jsx",
                                                    lineNumber: 294,
                                                    columnNumber: 19
                                                }, this);
                                            })
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/rides.jsx",
                                        lineNumber: 279,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/rides.jsx",
                                lineNumber: 226,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/rides.jsx",
                            lineNumber: 225,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/rides.jsx",
                        lineNumber: 224,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                        style: {
                            y
                        },
                        className: "w-full pl-5 pr-5 pt-8 pb-32 custom-app-layout-mobile",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "jsx-2df4565939163d7b" + " " + "max-w-2xl md:max-w-6xl mx-auto",
                            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                },
                                className: "text-center py-20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "jsx-2df4565939163d7b" + " " + "w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/rides.jsx",
                                        lineNumber: 322,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-2df4565939163d7b" + " " + "text-gray-400 text-lg",
                                        children: "Loading rides..."
                                    }, void 0, false, {
                                        fileName: "[project]/pages/rides.jsx",
                                        lineNumber: 323,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/rides.jsx",
                                lineNumber: 317,
                                columnNumber: 11
                            }, this) : filteredRides.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
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
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiMapPin"], {
                                            size: 48,
                                            className: "text-gray-400"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/rides.jsx",
                                            lineNumber: 339,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/rides.jsx",
                                        lineNumber: 331,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "jsx-2df4565939163d7b" + " " + "text-2xl font-bold text-white mb-3",
                                        children: "No rides found"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/rides.jsx",
                                        lineNumber: 341,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "jsx-2df4565939163d7b" + " " + "text-gray-400 text-lg",
                                        children: "Create a new ride to get started!"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/rides.jsx",
                                        lineNumber: 342,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/rides.jsx",
                                lineNumber: 326,
                                columnNumber: 11
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                style: {
                                    marginTop: "4vh"
                                },
                                className: "jsx-2df4565939163d7b" + " " + "grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["AnimatePresence"], {
                                    children: filteredRides.map((ride, index)=>{
                                        const theme = getDestinationTheme(ride.destination);
                                        const DestIcon = theme.icon;
                                        const seatsLeft = ride.seats - ride.members;
                                        const handleCardClick = ()=>{
                                            router.push(`/ride/${ride.id}`);
                                        };
                                        const handleJoinClick = async (e)=>{
                                            e.stopPropagation(); // Prevent card click
                                            // Quick animation before navigation
                                            await new Promise((resolve)=>setTimeout(resolve, 150));
                                            router.push(`/ride/${ride.id}`);
                                        };
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
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
                                            whileHover: {
                                                y: -4,
                                                scale: 1.01,
                                                transition: {
                                                    duration: 0.2
                                                }
                                            },
                                            className: "group relative cursor-pointer",
                                            style: {
                                                marginBottom: "1vh"
                                            },
                                            onClick: handleCardClick,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "jsx-2df4565939163d7b" + " " + `absolute inset-0 bg-gradient-to-br ${theme.gradient} rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/rides.jsx",
                                                    lineNumber: 382,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        height: '18vh'
                                                    },
                                                    className: "jsx-2df4565939163d7b" + " " + "relative bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-visible shadow-2xl group-hover:border-white/20 transition-all duration-300 flex flex-col",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "jsx-2df4565939163d7b" + " " + `absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-50 rounded-3xl`
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/rides.jsx",
                                                            lineNumber: 387,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                height: '70%'
                                                            },
                                                            className: "jsx-2df4565939163d7b" + " " + "relative flex items-center pl-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        paddingLeft: "2vw",
                                                                        paddingRight: "6vw"
                                                                    },
                                                                    className: "jsx-2df4565939163d7b" + " " + "h-full flex items-center justify-start flex-shrink-0 pl-3",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(DestIcon, {
                                                                        size: "3vw",
                                                                        className: "jsx-2df4565939163d7b" + " " + (theme.iconColor || "")
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/rides.jsx",
                                                                        lineNumber: 396,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/rides.jsx",
                                                                    lineNumber: 392,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-2df4565939163d7b" + " " + "flex-1 px-4 flex flex-col justify-center space-y-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                                            className: "jsx-2df4565939163d7b" + " " + "text-2xl font-bold text-white",
                                                                            children: ride.destination
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/rides.jsx",
                                                                            lineNumber: 402,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        ride.city && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                            className: "jsx-2df4565939163d7b" + " " + "text-sm text-gray-400",
                                                                            children: ride.city
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/rides.jsx",
                                                                            lineNumber: 408,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                            className: "jsx-2df4565939163d7b" + " " + "flex items-center gap-3",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                                    className: "jsx-2df4565939163d7b" + " " + "text-lg text-gray-300 font-medium",
                                                                                    children: new Date(ride.date).toLocaleDateString('en-US', {
                                                                                        weekday: 'short',
                                                                                        month: 'short',
                                                                                        day: 'numeric'
                                                                                    })
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/pages/rides.jsx",
                                                                                    lineNumber: 415,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                                    className: "jsx-2df4565939163d7b" + " " + "text-gray-500",
                                                                                    children: "•"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/pages/rides.jsx",
                                                                                    lineNumber: 422,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                                    className: "jsx-2df4565939163d7b" + " " + "text-lg text-gray-400 font-medium",
                                                                                    children: ride.time
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/pages/rides.jsx",
                                                                                    lineNumber: 423,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/pages/rides.jsx",
                                                                            lineNumber: 414,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/pages/rides.jsx",
                                                                    lineNumber: 400,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/rides.jsx",
                                                            lineNumber: 390,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                height: '30%'
                                                            },
                                                            className: "jsx-2df4565939163d7b" + " " + "relative flex items-center justify-between px-6 border-t border-white/10",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        marginLeft: "2vw"
                                                                    },
                                                                    className: "jsx-2df4565939163d7b" + " " + "flex items-center gap-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-2df4565939163d7b" + " " + "text-gray-400 text-sm",
                                                                            children: ride.organizer
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/rides.jsx",
                                                                            lineNumber: 434,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-2df4565939163d7b" + " " + "text-gray-500 text-xs",
                                                                            children: [
                                                                                ride.members,
                                                                                "/",
                                                                                ride.seats,
                                                                                " Seats"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/pages/rides.jsx",
                                                                            lineNumber: 435,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/pages/rides.jsx",
                                                                    lineNumber: 433,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].button, {
                                                                    whileHover: {
                                                                        scale: 1.05,
                                                                        x: 5
                                                                    },
                                                                    whileTap: {
                                                                        scale: 0.95
                                                                    },
                                                                    onClick: handleJoinClick,
                                                                    className: "flex items-center gap-0 px-4 py-2  text-primary font-semibold text-sm transition-all",
                                                                    style: {
                                                                        paddingRight: "1vw"
                                                                    },
                                                                    children: [
                                                                        "Ride",
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdArrowRightAlt"], {
                                                                            size: 30
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/rides.jsx",
                                                                            lineNumber: 447,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/pages/rides.jsx",
                                                                    lineNumber: 439,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/rides.jsx",
                                                            lineNumber: 431,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/rides.jsx",
                                                    lineNumber: 385,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, ride.id, true, {
                                            fileName: "[project]/pages/rides.jsx",
                                            lineNumber: 365,
                                            columnNumber: 19
                                        }, this);
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/pages/rides.jsx",
                                    lineNumber: 347,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/rides.jsx",
                                lineNumber: 345,
                                columnNumber: 11
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/rides.jsx",
                            lineNumber: 315,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/rides.jsx",
                        lineNumber: 314,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "jsx-2df4565939163d7b" + " " + "fixed bottom-28 right-6 flex flex-col gap-4 z-50 items-end",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].button, {
                                onHoverStart: ()=>setHoveredFAB('myRides'),
                                onHoverEnd: ()=>setHoveredFAB(null),
                                initial: {
                                    width: '64px'
                                },
                                animate: {
                                    width: hoveredFAB === 'myRides' ? 'auto' : '64px'
                                },
                                whileHover: {
                                    scale: 1.05
                                },
                                whileTap: {
                                    scale: 0.95
                                },
                                onClick: ()=>router.push('/my-rides'),
                                className: "h-16 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 rounded-full shadow-2xl shadow-purple-500/50 flex items-center overflow-hidden border-2 border-white/20 backdrop-blur-xl",
                                style: {
                                    backgroundSize: '200% 200%',
                                    animation: 'gradient 3s ease infinite',
                                    minWidth: '64px'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-2df4565939163d7b" + " " + "flex items-center gap-3 w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: hoveredFAB === 'myRides' ? '48px' : '64px',
                                                transition: 'width 0.2s'
                                            },
                                            className: "jsx-2df4565939163d7b" + " " + "flex items-center justify-center flex-shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiList"], {
                                                size: 24,
                                                className: "text-white",
                                                strokeWidth: 2.5
                                            }, void 0, false, {
                                                fileName: "[project]/pages/rides.jsx",
                                                lineNumber: 478,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/rides.jsx",
                                            lineNumber: 477,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].span, {
                                            initial: {
                                                opacity: 0,
                                                width: 0
                                            },
                                            animate: {
                                                opacity: hoveredFAB === 'myRides' ? 1 : 0,
                                                width: hoveredFAB === 'myRides' ? 'auto' : 0
                                            },
                                            transition: {
                                                duration: 0.2
                                            },
                                            className: "text-white font-bold text-base whitespace-nowrap pr-4",
                                            children: "My Rides"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/rides.jsx",
                                            lineNumber: 480,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/rides.jsx",
                                    lineNumber: 476,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/rides.jsx",
                                lineNumber: 463,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].button, {
                                initial: {
                                    width: '64px'
                                },
                                animate: showFABWiggle ? {
                                    rotate: [
                                        0,
                                        -10,
                                        10,
                                        -10,
                                        10,
                                        0
                                    ],
                                    width: '64px'
                                } : {
                                    width: hoveredFAB === 'create' ? 'auto' : '64px',
                                    rotate: 0
                                },
                                onHoverStart: ()=>setHoveredFAB('create'),
                                onHoverEnd: ()=>setHoveredFAB(null),
                                whileHover: {
                                    scale: 1.05
                                },
                                whileTap: {
                                    scale: 0.95
                                },
                                onClick: handleCreateRide,
                                className: "h-16 bg-gradient-to-r from-primary via-accent to-primary rounded-full shadow-2xl shadow-primary/50 flex items-center overflow-hidden border-2 border-white/20 backdrop-blur-xl",
                                style: {
                                    backgroundSize: '200% 200%',
                                    animation: 'gradient 3s ease infinite',
                                    minWidth: '64px'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-2df4565939163d7b" + " " + "flex items-center gap-3 w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            style: {
                                                width: hoveredFAB === 'create' ? '48px' : '64px',
                                                transition: 'width 0.2s'
                                            },
                                            className: "jsx-2df4565939163d7b" + " " + "flex items-center justify-center flex-shrink-0",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiPlus"], {
                                                size: 28,
                                                className: "text-white",
                                                strokeWidth: 3
                                            }, void 0, false, {
                                                fileName: "[project]/pages/rides.jsx",
                                                lineNumber: 511,
                                                columnNumber: 15
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/rides.jsx",
                                            lineNumber: 510,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].span, {
                                            initial: {
                                                opacity: 0,
                                                width: 0
                                            },
                                            animate: {
                                                opacity: hoveredFAB === 'create' ? 1 : 0,
                                                width: hoveredFAB === 'create' ? 'auto' : 0
                                            },
                                            transition: {
                                                duration: 0.2
                                            },
                                            className: "text-white font-bold text-base whitespace-nowrap pr-4",
                                            children: "Create Ride"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/rides.jsx",
                                            lineNumber: 513,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/rides.jsx",
                                    lineNumber: 509,
                                    columnNumber: 11
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/rides.jsx",
                                lineNumber: 495,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/rides.jsx",
                        lineNumber: 461,
                        columnNumber: 7
                    }, this),
                    showDateModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        onClick: ()=>setShowDateModal(false),
                        className: "jsx-2df4565939163d7b" + " " + "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                scale: 0.9
                            },
                            animate: {
                                opacity: 1,
                                scale: 1
                            },
                            onClick: (e)=>e.stopPropagation(),
                            className: "bg-[#1a1a1a] rounded-3xl border border-white/10 p-6 max-w-md w-full",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                    style: {
                                        marginBottom: "1vh",
                                        marginTop: "1vh"
                                    },
                                    className: "jsx-2df4565939163d7b" + " " + "text-xl font-bold text-white mb-4 text-center",
                                    children: "Select Date"
                                }, void 0, false, {
                                    fileName: "[project]/pages/rides.jsx",
                                    lineNumber: 540,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-2df4565939163d7b" + " " + "flex justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$datepicker$2f$dist$2f$index$2e$es$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        selected: dateFilter,
                                        onChange: (date)=>{
                                            setDateFilter(date);
                                            setShowDateModal(false);
                                        },
                                        inline: true,
                                        minDate: new Date()
                                    }, void 0, false, {
                                        fileName: "[project]/pages/rides.jsx",
                                        lineNumber: 542,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/rides.jsx",
                                    lineNumber: 541,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowDateModal(false),
                                    style: {
                                        height: "4vh",
                                        marginTop: "2vh",
                                        marginBottom: "1vh"
                                    },
                                    className: "jsx-2df4565939163d7b" + " " + "w-full mt-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white font-semibold transition-all",
                                    children: "Close"
                                }, void 0, false, {
                                    fileName: "[project]/pages/rides.jsx",
                                    lineNumber: 552,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/rides.jsx",
                            lineNumber: 534,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/rides.jsx",
                        lineNumber: 530,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                        id: "1bfe117c79888d07",
                        children: "@keyframes gradient{0%{background-position:0%}50%{background-position:100%}to{background-position:0%}}"
                    }, void 0, false, void 0, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                        id: "fed39edda91b66ca",
                        children: ".date-picker-icon-wrapper,.date-picker-icon-wrapper .react-datepicker-wrapper,.date-picker-icon-wrapper .react-datepicker__input-container{display:inline-block}.react-datepicker{background-color:#1a1a1a!important;border:1px solid #ffffff1a!important;border-radius:1rem!important}.react-datepicker__header{background-color:#2a2a2a!important;border-bottom:1px solid #ffffff1a!important;border-radius:1rem 1rem 0 0!important}.react-datepicker__current-month,.react-datepicker__day-name{color:#fff!important}.react-datepicker__day{color:#9ca3af!important}.react-datepicker__day:hover{color:#fff!important;background-color:#8b5cf633!important}.react-datepicker__day--selected{color:#fff!important;background-color:#8b5cf6!important}.react-datepicker__day--keyboard-selected{background-color:#8b5cf680!important}.react-datepicker__day--disabled{color:#4b5563!important}.react-datepicker__close-icon:after{color:#fff!important;background-color:#8b5cf6!important}"
                    }, void 0, false, void 0, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/rides.jsx",
                lineNumber: 222,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5a3f0aa9._.js.map