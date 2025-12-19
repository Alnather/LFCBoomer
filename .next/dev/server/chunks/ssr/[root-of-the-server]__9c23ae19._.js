module.exports = [
"[project]/pages/listing/[id].jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>ListingDetail
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/hi/index.mjs [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/md/index.mjs [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/firebase/firestore [external] (firebase/firestore, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/firebase/auth [external] (firebase/auth, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
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
// Category themes for visual styling
const categoryThemes = {
    'textbooks': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdMenuBook"],
        gradient: 'from-blue-500/20 via-blue-600/10 to-transparent',
        iconColor: 'text-blue-400',
        accentColor: 'text-blue-400',
        bgColor: 'bg-blue-500/20'
    },
    'electronics': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdDevices"],
        gradient: 'from-cyan-500/20 via-cyan-600/10 to-transparent',
        iconColor: 'text-cyan-400',
        accentColor: 'text-cyan-400',
        bgColor: 'bg-cyan-500/20'
    },
    'furniture': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdChair"],
        gradient: 'from-amber-500/20 via-amber-600/10 to-transparent',
        iconColor: 'text-amber-400',
        accentColor: 'text-amber-400',
        bgColor: 'bg-amber-500/20'
    },
    'clothing': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdCheckroom"],
        gradient: 'from-pink-500/20 via-pink-600/10 to-transparent',
        iconColor: 'text-pink-400',
        accentColor: 'text-pink-400',
        bgColor: 'bg-pink-500/20'
    },
    'sports': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdSportsSoccer"],
        gradient: 'from-green-500/20 via-green-600/10 to-transparent',
        iconColor: 'text-green-400',
        accentColor: 'text-green-400',
        bgColor: 'bg-green-500/20'
    },
    'gaming': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdSportsEsports"],
        gradient: 'from-purple-500/20 via-purple-600/10 to-transparent',
        iconColor: 'text-purple-400',
        accentColor: 'text-purple-400',
        bgColor: 'bg-purple-500/20'
    },
    'tickets': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdConfirmationNumber"],
        gradient: 'from-orange-500/20 via-red-500/10 to-transparent',
        iconColor: 'text-orange-400',
        accentColor: 'text-orange-400',
        bgColor: 'bg-orange-500/20'
    },
    'other': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdMoreHoriz"],
        gradient: 'from-gray-500/20 via-gray-600/10 to-transparent',
        iconColor: 'text-gray-400',
        accentColor: 'text-gray-400',
        bgColor: 'bg-gray-500/20'
    },
    'default': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiPackage"],
        gradient: 'from-primary/20 via-accent/10 to-transparent',
        iconColor: 'text-primary',
        accentColor: 'text-primary',
        bgColor: 'bg-primary/20'
    }
};
// Utility function to capitalize first letters
const capitalizeName = (name)=>{
    if (!name) return '';
    return name.split(' ').map((word)=>word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};
// Get theme based on first category
const getTheme = (categories)=>{
    if (!categories || categories.length === 0) return categoryThemes['default'];
    const firstCategory = categories[0].toLowerCase();
    return categoryThemes[firstCategory] || categoryThemes['default'];
};
function ListingDetail() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { id } = router.query;
    const [listing, setListing] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [seller, setSeller] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [deleteModal, setDeleteModal] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        show: false,
        message: '',
        type: 'success'
    });
    const [contactingLoading, setContactingLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [currentImageIndex, setCurrentImageIndex] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(0);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Detect if mobile
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const checkMobile = ()=>{
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return ()=>window.removeEventListener('resize', checkMobile);
    }, []);
    // Auto-hide toast after 3 seconds
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (toast.show) {
            const timer = setTimeout(()=>{
                setToast({
                    ...toast,
                    show: false
                });
            }, 3000);
            return ()=>clearTimeout(timer);
        }
    }, [
        toast.show
    ]);
    // Check authentication
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__["onAuthStateChanged"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["auth"], (currentUser)=>{
            setUser(currentUser);
        });
        return ()=>unsubscribe();
    }, []);
    // Fetch listing data in real-time
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!id) return;
        const listingRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'products', id);
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["onSnapshot"])(listingRef, async (docSnap)=>{
            if (docSnap.exists()) {
                const data = docSnap.data();
                setListing({
                    id: docSnap.id,
                    ...data
                });
                // Fetch seller data
                if (data.userId) {
                    try {
                        const sellerDoc = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'users', data.userId));
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
        }, (error)=>{
            console.error('Error fetching listing:', error);
            setLoading(false);
        });
        return ()=>unsubscribe();
    }, [
        id,
        router
    ]);
    // Handle delete listing
    const handleDeleteListing = async ()=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["deleteDoc"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'products', id));
            setDeleteModal(false);
            setToast({
                show: true,
                message: 'Listing deleted successfully',
                type: 'success'
            });
            setTimeout(()=>router.push('/marketplace'), 1500);
        } catch (error) {
            console.error('Error deleting listing:', error);
            setToast({
                show: true,
                message: 'Failed to delete listing',
                type: 'error'
            });
        }
    };
    // Handle contact seller - creates a marketplace conversation
    const handleContactSeller = async ()=>{
        if (!user) {
            setToast({
                show: true,
                message: 'Please log in to contact the seller',
                type: 'error'
            });
            setTimeout(()=>router.push('/login'), 1500);
            return;
        }
        if (user.uid === listing.userId) {
            setToast({
                show: true,
                message: "This is your own listing",
                type: 'info'
            });
            return;
        }
        setContactingLoading(true);
        try {
            // Check if a conversation already exists for this product between these users
            const conversationsRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'conversations');
            const q = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["query"])(conversationsRef, (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["where"])('productId', '==', id), (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["where"])('participants', 'array-contains', user.uid));
            const existingConvos = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["getDocs"])(q);
            let conversationId = null;
            // Find exact match (both users in participants for this product)
            existingConvos.forEach((doc)=>{
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
                    participants: [
                        user.uid,
                        listing.userId
                    ],
                    user1Id: user.uid,
                    user1Name: buyerName,
                    user2Id: listing.userId,
                    user2Name: sellerName,
                    createdAt: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["serverTimestamp"])(),
                    lastMessage: '',
                    lastMessageTime: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["serverTimestamp"])()
                };
                const newConvoRef = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["addDoc"])(conversationsRef, conversationData);
                conversationId = newConvoRef.id;
            }
            // Navigate to messages page with marketplace category and conversation selected
            router.push({
                pathname: '/messages',
                query: {
                    category: 'marketplace',
                    conversationId: conversationId
                }
            });
        } catch (error) {
            console.error('Error creating conversation:', error);
            setToast({
                show: true,
                message: 'Failed to start conversation',
                type: 'error'
            });
        } finally{
            setContactingLoading(false);
        }
    };
    // Format price display
    const formatPrice = (listing)=>{
        if (listing.priceType === 'free' || listing.price === 0 || listing.price === '0') {
            return 'FREE';
        }
        return `$${listing.price}`;
    };
    // Format date
    const formatDate = (dateString)=>{
        if (!dateString) return 'Unknown';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };
    // Get all images (support both single photo and photos array)
    const getImages = ()=>{
        if (listing?.photos && listing.photos.length > 0) {
            return listing.photos;
        }
        if (listing?.photo) {
            return [
                listing.photo
            ];
        }
        return [];
    };
    // Navigate images
    const nextImage = ()=>{
        const images = getImages();
        setCurrentImageIndex((prev)=>(prev + 1) % images.length);
    };
    const prevImage = ()=>{
        const images = getImages();
        setCurrentImageIndex((prev)=>(prev - 1 + images.length) % images.length);
    };
    if (loading || !listing) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/pages/listing/[id].jsx",
                        lineNumber: 306,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-gray-400 text-lg",
                        children: "Loading listing..."
                    }, void 0, false, {
                        fileName: "[project]/pages/listing/[id].jsx",
                        lineNumber: 307,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/listing/[id].jsx",
                lineNumber: 305,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/listing/[id].jsx",
            lineNumber: 304,
            columnNumber: 7
        }, this);
    }
    const isOwner = user && listing.userId === user.uid;
    const theme = getTheme(listing.categories);
    const CategoryIcon = theme.icon;
    const images = getImages();
    const isFree = listing.priceType === 'free' || listing.price === 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("title", {
                        children: [
                            listing.name,
                            " - ForesterSwap"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/listing/[id].jsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "theme-color",
                        content: "#0A0A0A"
                    }, void 0, false, {
                        fileName: "[project]/pages/listing/[id].jsx",
                        lineNumber: 323,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/listing/[id].jsx",
                lineNumber: 321,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "pb-32 min-h-screen",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["AnimatePresence"], {
                        children: toast.show && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                            initial: {
                                opacity: 0,
                                y: -20
                            },
                            animate: {
                                opacity: 1,
                                y: 0
                            },
                            exit: {
                                opacity: 0,
                                y: -20
                            },
                            className: `fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg ${toast.type === 'success' ? 'bg-green-500/90' : toast.type === 'error' ? 'bg-red-500/90' : 'bg-blue-500/90'} text-white font-medium`,
                            children: toast.message
                        }, void 0, false, {
                            fileName: "[project]/pages/listing/[id].jsx",
                            lineNumber: 330,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/listing/[id].jsx",
                        lineNumber: 328,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["AnimatePresence"], {
                        children: deleteModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            },
                            className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    scale: 0.9
                                },
                                animate: {
                                    opacity: 1,
                                    scale: 1
                                },
                                exit: {
                                    opacity: 0,
                                    scale: 0.9
                                },
                                className: "bg-[#1C1C1C] rounded-3xl p-6 max-w-md w-full border border-white/10",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "text-xl font-bold text-white mb-2",
                                        children: "Delete Listing?"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/listing/[id].jsx",
                                        lineNumber: 359,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-gray-400 mb-6",
                                        children: [
                                            'Are you sure you want to delete "',
                                            listing.name,
                                            '"? This action cannot be undone.'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/listing/[id].jsx",
                                        lineNumber: 360,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setDeleteModal(false),
                                                className: "flex-1 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors",
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/listing/[id].jsx",
                                                lineNumber: 364,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: handleDeleteListing,
                                                className: "flex-1 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors",
                                                children: "Delete"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/listing/[id].jsx",
                                                lineNumber: 370,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/listing/[id].jsx",
                                        lineNumber: 363,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/listing/[id].jsx",
                                lineNumber: 353,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/listing/[id].jsx",
                            lineNumber: 347,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/listing/[id].jsx",
                        lineNumber: 345,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                        initial: {
                            opacity: 0,
                            y: -20
                        },
                        animate: {
                            opacity: 1,
                            y: 0
                        },
                        transition: {
                            duration: 0.4
                        },
                        className: "backdrop-blur-2xl",
                        style: {
                            marginTop: "2vh",
                            marginBottom: "2vh"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "max-w-6xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].button, {
                                            initial: {
                                                opacity: 0,
                                                scale: 0.8
                                            },
                                            animate: {
                                                opacity: 1,
                                                scale: 1
                                            },
                                            transition: {
                                                delay: 0.1,
                                                duration: 0.3
                                            },
                                            whileTap: {
                                                scale: 0.9
                                            },
                                            onClick: ()=>router.back(),
                                            className: "w-10 h-10 rounded-full backdrop-blur-xl flex items-center justify-center hover:bg-white/10 transition-all",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["HiArrowLeft"], {
                                                size: 24,
                                                className: "text-white"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/listing/[id].jsx",
                                                lineNumber: 400,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/listing/[id].jsx",
                                            lineNumber: 392,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].h1, {
                                            initial: {
                                                opacity: 0,
                                                x: -10
                                            },
                                            animate: {
                                                opacity: 1,
                                                x: 0
                                            },
                                            transition: {
                                                delay: 0.2,
                                                duration: 0.4
                                            },
                                            className: "text-2xl md:text-3xl font-bold text-white",
                                            children: "Listing Details"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/listing/[id].jsx",
                                            lineNumber: 402,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/listing/[id].jsx",
                                    lineNumber: 391,
                                    columnNumber: 13
                                }, this),
                                isOwner && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].button, {
                                    whileHover: {
                                        scale: 1.05
                                    },
                                    whileTap: {
                                        scale: 0.95
                                    },
                                    onClick: ()=>setDeleteModal(true),
                                    className: "p-3 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiTrash2"], {
                                        size: 20
                                    }, void 0, false, {
                                        fileName: "[project]/pages/listing/[id].jsx",
                                        lineNumber: 420,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/listing/[id].jsx",
                                    lineNumber: 414,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/pages/listing/[id].jsx",
                            lineNumber: 390,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/listing/[id].jsx",
                        lineNumber: 383,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "w-full mx-auto",
                        style: isMobile ? {
                            paddingLeft: "4vw",
                            paddingRight: "4vw"
                        } : {
                            paddingLeft: "3rem",
                            paddingRight: "3rem"
                        },
                        children: [
                            listing.sold && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: -20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                className: "bg-amber-500/90 backdrop-blur-xl px-6 py-3 rounded-2xl flex items-center justify-center gap-2 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiCheckCircle"], {
                                        size: 24,
                                        className: "text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/listing/[id].jsx",
                                        lineNumber: 435,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                        className: "text-white text-lg font-bold",
                                        children: "This item has been sold"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/listing/[id].jsx",
                                        lineNumber: 436,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/listing/[id].jsx",
                                lineNumber: 430,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                className: `relative rounded-3xl overflow-hidden ${listing.sold ? 'opacity-70' : ''}`,
                                style: {
                                    marginBottom: '24px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: `absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-50 rounded-3xl`
                                    }, void 0, false, {
                                        fileName: "[project]/pages/listing/[id].jsx",
                                        lineNumber: 448,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        style: {
                                            padding: isMobile ? "4vw" : "2vw"
                                        },
                                        children: [
                                            images.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "relative mb-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "relative rounded-2xl overflow-hidden bg-black/30",
                                                        style: {
                                                            height: '50vh'
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].img, {
                                                                initial: {
                                                                    opacity: 0
                                                                },
                                                                animate: {
                                                                    opacity: 1
                                                                },
                                                                src: images[currentImageIndex],
                                                                alt: listing.name,
                                                                className: "w-full h-full object-contain"
                                                            }, currentImageIndex, false, {
                                                                fileName: "[project]/pages/listing/[id].jsx",
                                                                lineNumber: 455,
                                                                columnNumber: 21
                                                            }, this),
                                                            images.length > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                        onClick: prevImage,
                                                                        className: "absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiChevronLeft"], {
                                                                            size: 24
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/listing/[id].jsx",
                                                                            lineNumber: 472,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/listing/[id].jsx",
                                                                        lineNumber: 468,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                        onClick: nextImage,
                                                                        className: "absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiChevronRight"], {
                                                                            size: 24
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/listing/[id].jsx",
                                                                            lineNumber: 478,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/listing/[id].jsx",
                                                                        lineNumber: 474,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        className: "absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2",
                                                                        children: images.map((_, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                                onClick: ()=>setCurrentImageIndex(idx),
                                                                                className: `w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'}`
                                                                            }, idx, false, {
                                                                                fileName: "[project]/pages/listing/[id].jsx",
                                                                                lineNumber: 484,
                                                                                columnNumber: 29
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/listing/[id].jsx",
                                                                        lineNumber: 482,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/listing/[id].jsx",
                                                        lineNumber: 454,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].button, {
                                                        whileHover: {
                                                            scale: 1.1
                                                        },
                                                        whileTap: {
                                                            scale: 0.9
                                                        },
                                                        onClick: async ()=>{
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
                                                                setToast({
                                                                    show: true,
                                                                    message: 'Link copied to clipboard!',
                                                                    type: 'success'
                                                                });
                                                            }
                                                        },
                                                        className: "absolute top-3 right-3 p-3 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiShare2"], {
                                                            size: 20
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/listing/[id].jsx",
                                                            lineNumber: 524,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/listing/[id].jsx",
                                                        lineNumber: 500,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/listing/[id].jsx",
                                                lineNumber: 453,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "relative rounded-2xl overflow-hidden bg-black/30 mb-6 flex items-center justify-center",
                                                style: {
                                                    height: '30vh'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiPackage"], {
                                                    size: 96,
                                                    className: "text-gray-600"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/listing/[id].jsx",
                                                    lineNumber: 529,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/listing/[id].jsx",
                                                lineNumber: 528,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex items-start gap-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: `p-4 rounded-2xl`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(CategoryIcon, {
                                                            className: theme.iconColor,
                                                            size: 40
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/listing/[id].jsx",
                                                            lineNumber: 537,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/listing/[id].jsx",
                                                        lineNumber: 536,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                                className: "text-3xl md:text-4xl font-bold text-white mb-2",
                                                                children: listing.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/listing/[id].jsx",
                                                                lineNumber: 542,
                                                                columnNumber: 19
                                                            }, this),
                                                            listing.categories && listing.categories.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "flex flex-wrap gap-2 mb-3",
                                                                children: listing.categories.map((cat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        className: `px-3 py-1 rounded-full ${theme.accentColor} text-sm font-medium capitalize`,
                                                                        children: cat
                                                                    }, cat, false, {
                                                                        fileName: "[project]/pages/listing/[id].jsx",
                                                                        lineNumber: 550,
                                                                        columnNumber: 25
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/listing/[id].jsx",
                                                                lineNumber: 548,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/listing/[id].jsx",
                                                        lineNumber: 541,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: `px-5 py-3 rounded-2xl text-2xl font-bold ${isFree ? ' text-emerald-400' : ' text-white'}`,
                                                        children: formatPrice(listing)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/listing/[id].jsx",
                                                        lineNumber: 562,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/listing/[id].jsx",
                                                lineNumber: 534,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/listing/[id].jsx",
                                        lineNumber: 450,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/listing/[id].jsx",
                                lineNumber: 441,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "border-t border-white/10",
                                style: {
                                    marginBottom: '24px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/pages/listing/[id].jsx",
                                lineNumber: 574,
                                columnNumber: 11
                            }, this),
                            listing.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: 0.1
                                },
                                className: "relative rounded-2xl overflow-hidden",
                                style: {
                                    marginBottom: '24px',
                                    padding: "1vw"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: `absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-30 rounded-2xl`
                                    }, void 0, false, {
                                        fileName: "[project]/pages/listing/[id].jsx",
                                        lineNumber: 585,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "relative p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                className: "text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide",
                                                children: "Description"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/listing/[id].jsx",
                                                lineNumber: 587,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                className: "text-gray-200 leading-relaxed whitespace-pre-wrap text-lg",
                                                children: listing.description
                                            }, void 0, false, {
                                                fileName: "[project]/pages/listing/[id].jsx",
                                                lineNumber: 588,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/listing/[id].jsx",
                                        lineNumber: 586,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/listing/[id].jsx",
                                lineNumber: 578,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: 0.15
                                },
                                className: "grid grid-cols-2 gap-4",
                                style: {
                                    marginBottom: '24px'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "p-4 rounded-2xl bg-white/5 border border-white/10",
                                        style: {
                                            padding: "1vw"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiCalendar"], {
                                                    className: "text-gray-400",
                                                    size: 20
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/listing/[id].jsx",
                                                    lineNumber: 606,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-500 uppercase tracking-wide",
                                                            children: "Posted"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/listing/[id].jsx",
                                                            lineNumber: 608,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "font-semibold text-white",
                                                            children: formatDate(listing.createdAt)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/listing/[id].jsx",
                                                            lineNumber: 609,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/listing/[id].jsx",
                                                    lineNumber: 607,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/listing/[id].jsx",
                                            lineNumber: 605,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/listing/[id].jsx",
                                        lineNumber: 604,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "p-4 rounded-2xl bg-white/5 border border-white/10",
                                        style: {
                                            padding: "1vw"
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiTag"], {
                                                    className: theme.iconColor,
                                                    size: 20
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/listing/[id].jsx",
                                                    lineNumber: 617,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-500 uppercase tracking-wide",
                                                            children: "Category"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/listing/[id].jsx",
                                                            lineNumber: 619,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: `font-semibold ${theme.accentColor} capitalize`,
                                                            children: listing.categories?.[0] || 'Other'
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/listing/[id].jsx",
                                                            lineNumber: 620,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/listing/[id].jsx",
                                                    lineNumber: 618,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/listing/[id].jsx",
                                            lineNumber: 616,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/listing/[id].jsx",
                                        lineNumber: 615,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/listing/[id].jsx",
                                lineNumber: 596,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "border-t border-white/10",
                                style: {
                                    marginBottom: '24px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/pages/listing/[id].jsx",
                                lineNumber: 629,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: 0.2
                                },
                                className: "relative rounded-2xl overflow-hidden",
                                style: {
                                    marginBottom: '24px',
                                    padding: "1vw"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: `absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-30 rounded-2xl`
                                    }, void 0, false, {
                                        fileName: "[project]/pages/listing/[id].jsx",
                                        lineNumber: 639,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "relative p-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: `flex items-center gap-4 ${!isOwner ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`,
                                            onClick: ()=>!isOwner && listing.userId && router.push(`/profile/${listing.userId}`),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: `w-16 h-16 rounded-full ${theme.bgColor} flex items-center justify-center relative`,
                                                    children: [
                                                        seller?.photoURL ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                            src: seller.photoURL,
                                                            alt: "",
                                                            className: "w-full h-full rounded-full object-cover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/listing/[id].jsx",
                                                            lineNumber: 650,
                                                            columnNumber: 21
                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiUser"], {
                                                            size: 28,
                                                            className: theme.iconColor
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/listing/[id].jsx",
                                                            lineNumber: 652,
                                                            columnNumber: 21
                                                        }, this),
                                                        seller?.emailVerified && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "absolute -bottom-1 -right-1 bg-[#0A0A0A] rounded-full p-0.5",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdVerified"], {
                                                                className: "text-primary",
                                                                size: 18
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/listing/[id].jsx",
                                                                lineNumber: 657,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/listing/[id].jsx",
                                                            lineNumber: 656,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/listing/[id].jsx",
                                                    lineNumber: 648,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "text-xl font-semibold text-white",
                                                                children: capitalizeName(listing.userName || seller?.name || 'Anonymous')
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/listing/[id].jsx",
                                                                lineNumber: 665,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/listing/[id].jsx",
                                                            lineNumber: 664,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-400",
                                                            children: isOwner ? 'This is your listing' : 'Tap to view profile'
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/listing/[id].jsx",
                                                            lineNumber: 669,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/listing/[id].jsx",
                                                    lineNumber: 663,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/listing/[id].jsx",
                                            lineNumber: 643,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/listing/[id].jsx",
                                        lineNumber: 640,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/listing/[id].jsx",
                                lineNumber: 632,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 20
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    delay: 0.25
                                },
                                style: {
                                    marginBottom: "2vh"
                                },
                                children: isOwner ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    style: {
                                        height: "6vh"
                                    },
                                    onClick: ()=>router.push('/my-listings'),
                                    className: "w-full py-5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiEdit2"], {
                                            size: 22
                                        }, void 0, false, {
                                            fileName: "[project]/pages/listing/[id].jsx",
                                            lineNumber: 690,
                                            columnNumber: 17
                                        }, this),
                                        "Edit Listing"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/listing/[id].jsx",
                                    lineNumber: 685,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: `${listing.whatsappEnabled && (!listing.whatsappVerifiedOnly || user?.emailVerified) ? 'flex gap-3' : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: handleContactSeller,
                                            disabled: contactingLoading,
                                            style: {
                                                height: "6vh"
                                            },
                                            className: `${listing.whatsappEnabled && (!listing.whatsappVerifiedOnly || user?.emailVerified) ? 'flex-1' : 'w-full'} py-5 bg-gradient-to-r from-primary to-accent text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all disabled:opacity-50`,
                                            children: contactingLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/listing/[id].jsx",
                                                        lineNumber: 703,
                                                        columnNumber: 23
                                                    }, this),
                                                    "Starting..."
                                                ]
                                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiMessageCircle"], {
                                                        size: 22
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/listing/[id].jsx",
                                                        lineNumber: 708,
                                                        columnNumber: 23
                                                    }, this),
                                                    "Text Seller"
                                                ]
                                            }, void 0, true)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/listing/[id].jsx",
                                            lineNumber: 695,
                                            columnNumber: 17
                                        }, this),
                                        listing.whatsappEnabled && (!listing.whatsappVerifiedOnly || user?.emailVerified) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                // Format number - remove spaces, dashes, and ensure country code
                                                let number = listing.whatsappNumber.replace(/[\s-]/g, '');
                                                if (!number.startsWith('+')) {
                                                    number = '+1' + number; // Default to US if no country code
                                                }
                                                number = number.replace('+', '');
                                                const message = encodeURIComponent(`Hi! I'm interested in your listing "${listing.name}" on ForesterSwap.`);
                                                window.open(`https://wa.me/${number}?text=${message}`, '_blank');
                                            },
                                            style: {
                                                height: "6vh"
                                            },
                                            className: "flex-1 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-lg rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-green-500/40 hover:shadow-green-500/60 transition-all",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaWhatsapp"], {
                                                    size: 24
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/listing/[id].jsx",
                                                    lineNumber: 730,
                                                    columnNumber: 21
                                                }, this),
                                                "WhatsApp"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/listing/[id].jsx",
                                            lineNumber: 716,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/listing/[id].jsx",
                                    lineNumber: 694,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/listing/[id].jsx",
                                lineNumber: 678,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/listing/[id].jsx",
                        lineNumber: 427,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/listing/[id].jsx",
                lineNumber: 326,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__9c23ae19._.js.map