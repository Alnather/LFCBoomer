module.exports = [
"[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("styled-jsx/style.js", () => require("styled-jsx/style.js"));

module.exports = mod;
}),
"[project]/pages/create-listing.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>CreateListing
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/styled-jsx/style.js [external] (styled-jsx/style.js, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/hi/index.mjs [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/md/index.mjs [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fa/index.mjs [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/io5/index.mjs [ssr] (ecmascript)");
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
;
;
// Category definitions
const categoryOptions = [
    {
        id: 'textbooks',
        label: 'Textbooks',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdMenuBook"],
        color: 'from-blue-500/30 to-blue-600/30'
    },
    {
        id: 'electronics',
        label: 'Electronics',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdDevices"],
        color: 'from-cyan-500/30 to-cyan-600/30'
    },
    {
        id: 'furniture',
        label: 'Furniture',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdChair"],
        color: 'from-amber-500/30 to-amber-600/30'
    },
    {
        id: 'clothing',
        label: 'Clothing',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdCheckroom"],
        color: 'from-pink-500/30 to-pink-600/30'
    },
    {
        id: 'sports',
        label: 'Sports',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdSportsSoccer"],
        color: 'from-green-500/30 to-green-600/30'
    },
    {
        id: 'gaming',
        label: 'Gaming',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdSportsEsports"],
        color: 'from-purple-500/30 to-purple-600/30'
    },
    {
        id: 'tickets',
        label: 'Tickets & Events',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdConfirmationNumber"],
        color: 'from-orange-500/30 to-red-500/30'
    },
    {
        id: 'other',
        label: 'Other',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdMoreHoriz"],
        color: 'from-slate-500/30 to-slate-600/30'
    }
];
function CreateListing() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Form state
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [description, setDescription] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [price, setPrice] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [isFree, setIsFree] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [categories, setCategories] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [images, setImages] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    // WhatsApp state
    const [whatsappEnabled, setWhatsappEnabled] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [whatsappNumber, setWhatsappNumber] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [whatsappVerifiedOnly, setWhatsappVerifiedOnly] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [showWhatsappTooltip, setShowWhatsappTooltip] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // UI state
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [submitting, setSubmitting] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    // Check authentication status
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__["onAuthStateChanged"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["auth"], (currentUser)=>{
            if (currentUser) {
                setUser(currentUser);
                setLoading(false);
            } else {
                router.push('/login');
            }
        });
        return ()=>unsubscribe();
    }, [
        router
    ]);
    // Detect if mobile
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const checkMobile = ()=>{
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return ()=>window.removeEventListener('resize', checkMobile);
    }, []);
    // Handle image selection (supports multiple)
    const handleImageChange = (e)=>{
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        // Limit to 5 images total
        if (images.length + files.length > 5) {
            setError('Maximum 5 photos allowed');
            return;
        }
        files.forEach((file)=>{
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setError('Each image must be less than 5MB');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = ()=>{
                const img = new Image();
                img.onload = ()=>{
                    // Create canvas for compression
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    // Calculate new dimensions (max 800px width/height)
                    let width = img.width;
                    let height = img.height;
                    const maxSize = 800;
                    if (width > height) {
                        if (width > maxSize) {
                            height = height * maxSize / width;
                            width = maxSize;
                        }
                    } else {
                        if (height > maxSize) {
                            width = width * maxSize / height;
                            height = maxSize;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    // Draw and compress image
                    ctx.drawImage(img, 0, 0, width, height);
                    // Convert to base64 with compression
                    const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
                    setImages((prev)=>[
                            ...prev,
                            compressedDataUrl
                        ]);
                    setError('');
                };
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
        });
    };
    // Remove an image
    const removeImage = (index)=>{
        setImages((prev)=>prev.filter((_, i)=>i !== index));
    };
    // Check if categories should be shown (progressive disclosure)
    const shouldShowCategories = name.trim() || images.length > 0 || price;
    // Handle category toggle
    const handleCategoryToggle = (categoryId)=>{
        setCategories((prev)=>prev.includes(categoryId) ? prev.filter((c)=>c !== categoryId) : [
                ...prev,
                categoryId
            ]);
    };
    // Handle form submission
    const handleSubmit = async (e)=>{
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
                photo: images[0],
                photos: images,
                userId: user.uid,
                userName: user.displayName || user.email?.split('@')[0] || 'Anonymous',
                createdAt: new Date().toISOString(),
                // WhatsApp contact option
                whatsappEnabled: whatsappEnabled && whatsappNumber.trim() !== '',
                whatsappNumber: whatsappEnabled ? whatsappNumber.trim() : '',
                whatsappVerifiedOnly: whatsappEnabled ? whatsappVerifiedOnly : false
            };
            const docRef = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["addDoc"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'products'), listingData);
            // Try to add product reference to user's products array (non-critical)
            try {
                await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["updateDoc"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'Users', user.uid), {
                    products: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["arrayUnion"])(docRef.id)
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/pages/create-listing.jsx",
                        lineNumber: 223,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-gray-400 text-lg",
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/pages/create-listing.jsx",
                        lineNumber: 224,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/create-listing.jsx",
                lineNumber: 222,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/create-listing.jsx",
            lineNumber: 221,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "theme-color",
                        content: "#0A0A0A",
                        media: "(prefers-color-scheme: dark)",
                        className: "jsx-c0c25611216f9c79"
                    }, void 0, false, {
                        fileName: "[project]/pages/create-listing.jsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "theme-color",
                        content: "#F9FAFB",
                        media: "(prefers-color-scheme: light)",
                        className: "jsx-c0c25611216f9c79"
                    }, void 0, false, {
                        fileName: "[project]/pages/create-listing.jsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "mobile-web-app-capable",
                        content: "yes",
                        className: "jsx-c0c25611216f9c79"
                    }, void 0, false, {
                        fileName: "[project]/pages/create-listing.jsx",
                        lineNumber: 235,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "apple-mobile-web-app-capable",
                        content: "yes",
                        className: "jsx-c0c25611216f9c79"
                    }, void 0, false, {
                        fileName: "[project]/pages/create-listing.jsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "apple-mobile-web-app-status-bar-style",
                        content: "black-translucent",
                        className: "jsx-c0c25611216f9c79"
                    }, void 0, false, {
                        fileName: "[project]/pages/create-listing.jsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("meta", {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1, viewport-fit=cover",
                        className: "jsx-c0c25611216f9c79"
                    }, void 0, false, {
                        fileName: "[project]/pages/create-listing.jsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/create-listing.jsx",
                lineNumber: 232,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                style: isMobile ? {
                    paddingLeft: "4vw",
                    paddingRight: "4vw"
                } : {},
                className: "jsx-c0c25611216f9c79" + " " + "w-full min-h-screen pb-32 flex justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "jsx-c0c25611216f9c79" + " " + "w-full max-w-2xl md:max-w-4xl",
                    children: [
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
                            style: {
                                marginTop: "2vh"
                            },
                            className: "sticky top-0 z-30 backdrop-blur-2xl border-b border-white/5 pb-6",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "jsx-c0c25611216f9c79" + " " + "px-6 pt-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "jsx-c0c25611216f9c79" + " " + "flex items-center gap-4 mb-6",
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
                                                fileName: "[project]/pages/create-listing.jsx",
                                                lineNumber: 261,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/pages/create-listing.jsx",
                                            lineNumber: 253,
                                            columnNumber: 17
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
                                            className: "text-3xl font-bold text-white",
                                            children: "Create Listing"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/create-listing.jsx",
                                            lineNumber: 263,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/create-listing.jsx",
                                    lineNumber: 252,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/create-listing.jsx",
                                lineNumber: 251,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/create-listing.jsx",
                            lineNumber: 244,
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
                                delay: 0.3,
                                duration: 0.5
                            },
                            className: "max-w-2xl md:max-w-4xl mx-auto px-6 pt-8",
                            style: {
                                marginTop: "3vh"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                                onSubmit: handleSubmit,
                                className: "jsx-c0c25611216f9c79" + " " + "space-y-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["AnimatePresence"], {
                                        children: error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
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
                                            className: "bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-sm",
                                            children: error
                                        }, void 0, false, {
                                            fileName: "[project]/pages/create-listing.jsx",
                                            lineNumber: 287,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/create-listing.jsx",
                                        lineNumber: 285,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                        whileFocus: {
                                            scale: 1.002
                                        },
                                        className: "relative group",
                                        style: {
                                            marginBottom: '4vh'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-c0c25611216f9c79" + " " + "absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[1rem] blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/create-listing.jsx",
                                                lineNumber: 304,
                                                columnNumber: 17
                                            }, this),
                                            images.length === 0 ? /* Empty state - centered upload at 50% width */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-c0c25611216f9c79" + " " + "flex justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                    style: {
                                                        background: '#5a6f8226'
                                                    },
                                                    className: "jsx-c0c25611216f9c79" + " " + "relative w-1/2 flex flex-col items-center justify-center aspect-[4/3] rounded-[1rem] border-2 border-dashed border-white/20 cursor-pointer hover:border-primary/50 transition-all",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                            type: "file",
                                                            accept: "image/*",
                                                            multiple: true,
                                                            onChange: handleImageChange,
                                                            className: "jsx-c0c25611216f9c79" + " " + "hidden"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/create-listing.jsx",
                                                            lineNumber: 310,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiCamera"], {
                                                            size: 36,
                                                            className: "text-gray-400 mb-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/create-listing.jsx",
                                                            lineNumber: 317,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "jsx-c0c25611216f9c79" + " " + "text-gray-300 text-base font-semibold",
                                                            children: "Add Photo(s)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/create-listing.jsx",
                                                            lineNumber: 318,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "jsx-c0c25611216f9c79" + " " + "text-gray-500 text-xs mt-1",
                                                            children: "Tap to upload (up to 5)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/create-listing.jsx",
                                                            lineNumber: 319,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/create-listing.jsx",
                                                    lineNumber: 309,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/create-listing.jsx",
                                                lineNumber: 308,
                                                columnNumber: 19
                                            }, this) : /* Has images - show main + thumbnails at 50% width centered */ /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-c0c25611216f9c79" + " " + "flex flex-col items-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "jsx-c0c25611216f9c79" + " " + "w-1/2 space-y-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "jsx-c0c25611216f9c79" + " " + "relative aspect-[4/3] rounded-[1rem] overflow-hidden border-2 border-white/20",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                                    src: images[0],
                                                                    alt: "Main photo",
                                                                    className: "jsx-c0c25611216f9c79" + " " + "w-full h-full object-contain bg-black/30"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/create-listing.jsx",
                                                                    lineNumber: 328,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>removeImage(0),
                                                                    className: "jsx-c0c25611216f9c79" + " " + "absolute top-3 right-3 p-2 rounded-full bg-black/70 backdrop-blur-xl text-white hover:bg-red-500 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiX"], {
                                                                        size: 20
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/create-listing.jsx",
                                                                        lineNumber: 338,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/create-listing.jsx",
                                                                    lineNumber: 333,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: "jsx-c0c25611216f9c79" + " " + "absolute bottom-3 left-3 px-2 py-1 rounded-lg text-s text-white font-medium",
                                                                    children: "Main Photo"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/create-listing.jsx",
                                                                    lineNumber: 340,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/create-listing.jsx",
                                                            lineNumber: 327,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "jsx-c0c25611216f9c79" + " " + "flex gap-2 overflow-x-auto pb-1 justify-center",
                                                            children: [
                                                                images.slice(1).map((img, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        className: "jsx-c0c25611216f9c79" + " " + "relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 border-white/20",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                                                src: img,
                                                                                alt: `Photo ${index + 2}`,
                                                                                className: "jsx-c0c25611216f9c79" + " " + "w-full h-full object-cover"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/create-listing.jsx",
                                                                                lineNumber: 349,
                                                                                columnNumber: 29
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                                type: "button",
                                                                                onClick: ()=>removeImage(index + 1),
                                                                                className: "jsx-c0c25611216f9c79" + " " + "absolute top-1 right-1 p-1 rounded-full bg-black/70 backdrop-blur-xl text-white hover:bg-red-500 transition-colors",
                                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiX"], {
                                                                                    size: 10
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/pages/create-listing.jsx",
                                                                                    lineNumber: 359,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/create-listing.jsx",
                                                                                lineNumber: 354,
                                                                                columnNumber: 29
                                                                            }, this)
                                                                        ]
                                                                    }, index + 1, true, {
                                                                        fileName: "[project]/pages/create-listing.jsx",
                                                                        lineNumber: 348,
                                                                        columnNumber: 27
                                                                    }, this)),
                                                                images.length < 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("label", {
                                                                    style: {
                                                                        background: '#5a6f8226'
                                                                    },
                                                                    className: "jsx-c0c25611216f9c79" + " " + "relative flex-shrink-0 w-16 h-16 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/20 cursor-pointer hover:border-primary/50 transition-all",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                            type: "file",
                                                                            accept: "image/*",
                                                                            multiple: true,
                                                                            onChange: handleImageChange,
                                                                            className: "jsx-c0c25611216f9c79" + " " + "hidden"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/create-listing.jsx",
                                                                            lineNumber: 367,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiCamera"], {
                                                                            size: 16,
                                                                            className: "text-gray-400 mb-0.5"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/create-listing.jsx",
                                                                            lineNumber: 374,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                            className: "jsx-c0c25611216f9c79" + " " + "text-gray-500 text-[10px]",
                                                                            children: [
                                                                                images.length,
                                                                                "/5"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/pages/create-listing.jsx",
                                                                            lineNumber: 375,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/pages/create-listing.jsx",
                                                                    lineNumber: 366,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/create-listing.jsx",
                                                            lineNumber: 346,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/create-listing.jsx",
                                                    lineNumber: 325,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/create-listing.jsx",
                                                lineNumber: 324,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/create-listing.jsx",
                                        lineNumber: 299,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                        whileFocus: {
                                            scale: 1.002
                                        },
                                        className: "relative group",
                                        style: {
                                            marginBottom: '4vh'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-c0c25611216f9c79" + " " + "absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[1rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/create-listing.jsx",
                                                lineNumber: 390,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-c0c25611216f9c79" + " " + "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiTag"], {
                                                        className: "absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors duration-300 z-10",
                                                        size: 22
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/create-listing.jsx",
                                                        lineNumber: 392,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: name,
                                                        onChange: (e)=>setName(e.target.value),
                                                        placeholder: "What are you selling?",
                                                        maxLength: 100,
                                                        style: {
                                                            height: '8vh',
                                                            paddingLeft: '4rem',
                                                            background: '#5a6f8226'
                                                        },
                                                        className: "jsx-c0c25611216f9c79" + " " + "w-full pr-6 backdrop-blur-xl border-2 border-white/20 rounded-[1rem] text-white text-lg font-semibold placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 shadow-xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/create-listing.jsx",
                                                        lineNumber: 393,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/create-listing.jsx",
                                                lineNumber: 391,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/create-listing.jsx",
                                        lineNumber: 385,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                        whileFocus: {
                                            scale: 1.002
                                        },
                                        className: "relative group",
                                        style: {
                                            marginBottom: '4vh'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-c0c25611216f9c79" + " " + "absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[1rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/create-listing.jsx",
                                                lineNumber: 411,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-c0c25611216f9c79" + " " + "relative flex items-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                        className: "jsx-c0c25611216f9c79" + " " + `absolute left-5 top-1/2 transform -translate-y-1/2 transition-colors duration-300 z-10 text-2xl font-bold ${isFree ? 'text-gray-600' : 'text-gray-400 group-focus-within:text-primary'}`,
                                                        children: "$"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/create-listing.jsx",
                                                        lineNumber: 413,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                        type: "number",
                                                        value: isFree ? '' : price,
                                                        onChange: (e)=>setPrice(e.target.value),
                                                        placeholder: isFree ? 'Free' : 'Price',
                                                        min: "0",
                                                        step: "0.01",
                                                        disabled: isFree,
                                                        style: {
                                                            height: '8vh',
                                                            paddingLeft: '4rem',
                                                            paddingRight: '7rem',
                                                            background: isFree ? '#3a3a3a40' : '#5a6f8226'
                                                        },
                                                        className: "jsx-c0c25611216f9c79" + " " + `w-full backdrop-blur-xl border-2 border-white/20 rounded-[1rem] text-lg font-semibold placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 shadow-xl ${isFree ? 'text-gray-500 cursor-not-allowed' : 'text-white'}`
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/create-listing.jsx",
                                                        lineNumber: 414,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>{
                                                            setIsFree(!isFree);
                                                            if (!isFree) setPrice('');
                                                        },
                                                        className: "jsx-c0c25611216f9c79" + " " + `absolute right-3 flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${isFree ? 'bg-emerald-500/30 text-emerald-400' : 'bg-white/10 text-gray-400 hover:bg-white/20'}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    padding: "0.5vw"
                                                                },
                                                                className: "jsx-c0c25611216f9c79" + " " + `w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${isFree ? 'bg-emerald-500 border-emerald-500' : 'border-gray-500'}`,
                                                                children: isFree && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiCheck"], {
                                                                    size: 10,
                                                                    className: "text-white"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/create-listing.jsx",
                                                                    lineNumber: 436,
                                                                    columnNumber: 34
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/create-listing.jsx",
                                                                lineNumber: 435,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "jsx-c0c25611216f9c79" + " " + "text-sm font-medium",
                                                                children: "Free?"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/create-listing.jsx",
                                                                lineNumber: 438,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/create-listing.jsx",
                                                        lineNumber: 427,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/create-listing.jsx",
                                                lineNumber: 412,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/create-listing.jsx",
                                        lineNumber: 406,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["AnimatePresence"], {
                                        children: shouldShowCategories && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                height: 0
                                            },
                                            animate: {
                                                opacity: 1,
                                                height: 'auto'
                                            },
                                            exit: {
                                                opacity: 0,
                                                height: 0
                                            },
                                            transition: {
                                                duration: 0.3
                                            },
                                            style: {
                                                marginBottom: '4vh'
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "jsx-c0c25611216f9c79" + " " + "text-gray-400 text-sm font-medium mb-3 px-1",
                                                    children: "Select Category(s)"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/create-listing.jsx",
                                                    lineNumber: 453,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "jsx-c0c25611216f9c79" + " " + `grid gap-2 ${isMobile ? 'grid-cols-3' : 'grid-cols-4'}`,
                                                    children: categoryOptions.map((category)=>{
                                                        const Icon = category.icon;
                                                        const isSelected = categories.includes(category.id);
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].button, {
                                                            type: "button",
                                                            whileTap: {
                                                                scale: 0.95
                                                            },
                                                            onClick: ()=>handleCategoryToggle(category.id),
                                                            className: `py-3 px-2 rounded-xl text-center transition-all ${isSelected ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg' : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'}`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "jsx-c0c25611216f9c79" + " " + "flex flex-col items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Icon, {
                                                                        size: 24,
                                                                        className: "jsx-c0c25611216f9c79" + " " + ((isSelected ? 'text-white' : 'text-gray-400') || "")
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/create-listing.jsx",
                                                                        lineNumber: 472,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                        className: "jsx-c0c25611216f9c79" + " " + "text-xs font-semibold",
                                                                        children: category.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/create-listing.jsx",
                                                                        lineNumber: 473,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/create-listing.jsx",
                                                                lineNumber: 471,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, category.id, false, {
                                                            fileName: "[project]/pages/create-listing.jsx",
                                                            lineNumber: 460,
                                                            columnNumber: 27
                                                        }, this);
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/create-listing.jsx",
                                                    lineNumber: 454,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/create-listing.jsx",
                                            lineNumber: 446,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/create-listing.jsx",
                                        lineNumber: 444,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                        whileFocus: {
                                            scale: 1.002
                                        },
                                        className: "relative group",
                                        style: {
                                            marginBottom: '4vh'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-c0c25611216f9c79" + " " + "absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[1rem] blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/create-listing.jsx",
                                                lineNumber: 489,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "jsx-c0c25611216f9c79" + " " + "relative",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiAlignLeft"], {
                                                        className: "absolute left-5 top-6 text-gray-400 group-focus-within:text-primary transition-colors duration-300 z-10",
                                                        size: 20
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/create-listing.jsx",
                                                        lineNumber: 491,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                                        value: description,
                                                        onChange: (e)=>setDescription(e.target.value),
                                                        placeholder: "Add details about your item... (optional)",
                                                        rows: 5,
                                                        maxLength: 1000,
                                                        style: {
                                                            background: '#5a6f8226',
                                                            padding: '1.5rem',
                                                            paddingLeft: '3.5rem'
                                                        },
                                                        className: "jsx-c0c25611216f9c79" + " " + "w-full backdrop-blur-xl border-2 border-white/20 rounded-[1rem] text-white text-base placeholder-gray-400 focus:border-primary/50 focus:outline-none transition-all duration-300 resize-none shadow-xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/create-listing.jsx",
                                                        lineNumber: 492,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/create-listing.jsx",
                                                lineNumber: 490,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/create-listing.jsx",
                                        lineNumber: 484,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["AnimatePresence"], {
                                        children: shouldShowCategories && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                            initial: {
                                                opacity: 0,
                                                height: 0
                                            },
                                            animate: {
                                                opacity: 1,
                                                height: 'auto'
                                            },
                                            exit: {
                                                opacity: 0,
                                                height: 0
                                            },
                                            transition: {
                                                duration: 0.3
                                            },
                                            style: {
                                                marginBottom: '4vh'
                                            },
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "jsx-c0c25611216f9c79" + " " + "flex items-center gap-2 mb-3 px-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fa$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FaWhatsapp"], {
                                                            className: "text-green-500",
                                                            size: 18
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/create-listing.jsx",
                                                            lineNumber: 517,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: "jsx-c0c25611216f9c79" + " " + "text-gray-400 text-sm font-medium",
                                                            children: "WhatsApp Contact  (Verified Users Only)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/create-listing.jsx",
                                                            lineNumber: 518,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "jsx-c0c25611216f9c79" + " " + "relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                    type: "button",
                                                                    onClick: ()=>setShowWhatsappTooltip(!showWhatsappTooltip),
                                                                    onMouseEnter: ()=>setShowWhatsappTooltip(true),
                                                                    onMouseLeave: ()=>setShowWhatsappTooltip(false),
                                                                    className: "jsx-c0c25611216f9c79" + " " + "text-gray-500 hover:text-gray-300 transition-colors",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$io5$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["IoHelpCircleOutline"], {
                                                                        size: 18
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/create-listing.jsx",
                                                                        lineNumber: 527,
                                                                        columnNumber: 27
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/create-listing.jsx",
                                                                    lineNumber: 520,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["AnimatePresence"], {
                                                                    children: showWhatsappTooltip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                                                        initial: {
                                                                            opacity: 0,
                                                                            y: 5
                                                                        },
                                                                        animate: {
                                                                            opacity: 1,
                                                                            y: 0
                                                                        },
                                                                        exit: {
                                                                            opacity: 0,
                                                                            y: 5
                                                                        },
                                                                        className: "absolute left-0 top-full mt-2 w-64 p-3 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl z-50",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                            className: "jsx-c0c25611216f9c79" + " " + "text-xs text-gray-300 leading-relaxed",
                                                                            children: "Allow buyers to contact you directly on WhatsApp. Your number will only be visible on the listing page, not in search results."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/create-listing.jsx",
                                                                            lineNumber: 537,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/create-listing.jsx",
                                                                        lineNumber: 531,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/create-listing.jsx",
                                                                    lineNumber: 529,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/create-listing.jsx",
                                                            lineNumber: 519,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/create-listing.jsx",
                                                    lineNumber: 516,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>setWhatsappEnabled(!whatsappEnabled),
                                                    className: "jsx-c0c25611216f9c79" + " " + `w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all mb-3 ${whatsappEnabled ? 'bg-green-500/10 border-green-500/50' : 'bg-white/5 border-white/10 hover:border-white/20'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                width: "4vh",
                                                                height: "4vh"
                                                            },
                                                            className: "jsx-c0c25611216f9c79" + " " + `rounded border-2 flex items-center justify-center transition-all ${whatsappEnabled ? 'bg-green-500 border-green-500' : 'border-gray-500'}`,
                                                            children: whatsappEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiCheck"], {
                                                                size: 12,
                                                                className: "text-white"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/create-listing.jsx",
                                                                lineNumber: 559,
                                                                columnNumber: 45
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/create-listing.jsx",
                                                            lineNumber: 556,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "jsx-c0c25611216f9c79" + " " + `text-sm font-medium ${whatsappEnabled ? 'text-green-400' : 'text-gray-400'}`,
                                                            children: "Enable WhatsApp contact"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/create-listing.jsx",
                                                            lineNumber: 561,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/create-listing.jsx",
                                                    lineNumber: 547,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["AnimatePresence"], {
                                                    children: whatsappEnabled && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                                        initial: {
                                                            opacity: 0,
                                                            height: 0
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            height: 'auto'
                                                        },
                                                        exit: {
                                                            opacity: 0,
                                                            height: 0
                                                        },
                                                        transition: {
                                                            duration: 0.2
                                                        },
                                                        className: "space-y-3",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "jsx-c0c25611216f9c79" + " " + "relative",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                                type: "tel",
                                                                value: whatsappNumber,
                                                                onChange: (e)=>setWhatsappNumber(e.target.value),
                                                                placeholder: "Your WhatsApp number",
                                                                style: {
                                                                    height: '7vh',
                                                                    paddingLeft: '3rem',
                                                                    background: '#5a6f8226'
                                                                },
                                                                className: "jsx-c0c25611216f9c79" + " " + "w-full pr-4 backdrop-blur-xl border-2 border-white/20 rounded-xl text-white text-base placeholder-gray-400 focus:border-green-500/50 focus:outline-none transition-all"
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/create-listing.jsx",
                                                                lineNumber: 579,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/create-listing.jsx",
                                                            lineNumber: 577,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/create-listing.jsx",
                                                        lineNumber: 569,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/create-listing.jsx",
                                                    lineNumber: 567,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/create-listing.jsx",
                                            lineNumber: 507,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/create-listing.jsx",
                                        lineNumber: 505,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].button, {
                                        type: "submit",
                                        whileHover: {
                                            scale: 1.01
                                        },
                                        whileTap: {
                                            scale: 0.98
                                        },
                                        disabled: submitting,
                                        className: "w-full py-5 mt-8 bg-gradient-to-r from-primary to-accent rounded-[1rem] text-white font-bold text-lg shadow-2xl shadow-primary/40 hover:shadow-primary/60 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                                        style: {
                                            marginBottom: "2vh",
                                            backgroundSize: '200% 200%',
                                            animation: submitting ? 'none' : 'gradient 3s ease infinite',
                                            height: '6vh',
                                            marginTop: "2vh"
                                        },
                                        children: submitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "jsx-c0c25611216f9c79" + " " + "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/create-listing.jsx",
                                                    lineNumber: 626,
                                                    columnNumber: 21
                                                }, this),
                                                "Creating Listing..."
                                            ]
                                        }, void 0, true) : 'Create Listing'
                                    }, void 0, false, {
                                        fileName: "[project]/pages/create-listing.jsx",
                                        lineNumber: 616,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/create-listing.jsx",
                                lineNumber: 283,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/create-listing.jsx",
                            lineNumber: 276,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/create-listing.jsx",
                    lineNumber: 242,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/create-listing.jsx",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$styled$2d$jsx$2f$style$2e$js__$5b$external$5d$__$28$styled$2d$jsx$2f$style$2e$js$2c$__cjs$29$__["default"], {
                id: "c0c25611216f9c79",
                children: "@keyframes gradient{0%{background-position:0%}50%{background-position:100%}to{background-position:0%}}input[type=number].jsx-c0c25611216f9c79::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number].jsx-c0c25611216f9c79::-webkit-outer-spin-button{-webkit-appearance:none;margin:0}input[type=number].jsx-c0c25611216f9c79{-moz-appearance:textfield}"
            }, void 0, false, void 0, this)
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

//# sourceMappingURL=%5Broot-of-the-server%5D__d74f8d8d._.js.map