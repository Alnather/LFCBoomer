module.exports = [
"[project]/pages/messages.jsx [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Messages
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/framer-motion [external] (framer-motion, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/hi/index.mjs [ssr] (ecmascript)");
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
// Utility function to capitalize first letters
const capitalizeName = (name)=>{
    if (!name) return '';
    return name.split(' ').map((word)=>word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
};
// Destination themes for ride group chats
const destinationThemes = {
    'airport': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdFlight"],
        color: 'text-cyan-400',
        bg: 'from-cyan-500/20 to-blue-500/20',
        bgSolid: 'bg-cyan-500/20'
    },
    'shopping': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdShoppingCart"],
        color: 'text-pink-400',
        bg: 'from-pink-500/20 to-red-500/20',
        bgSolid: 'bg-pink-500/20'
    },
    'downtown': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdLocationCity"],
        color: 'text-indigo-400',
        bg: 'from-indigo-500/20 to-purple-500/20',
        bgSolid: 'bg-indigo-500/20'
    },
    'college': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdSchool"],
        color: 'text-emerald-400',
        bg: 'from-emerald-500/20 to-green-500/20',
        bgSolid: 'bg-emerald-500/20'
    },
    'default': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiMessageCircle"],
        color: 'text-gray-400',
        bg: 'from-gray-500/20 to-gray-600/20',
        bgSolid: 'bg-gray-500/20'
    }
};
const detectTheme = (destination)=>{
    const lowerDest = destination.toLowerCase();
    if (lowerDest.includes('airport') || lowerDest.includes('ord') || lowerDest.includes('mdw')) return 'airport';
    if ([
        'target',
        'walmart',
        'costco',
        'mall'
    ].some((shop)=>lowerDest.includes(shop))) return 'shopping';
    if ([
        'downtown',
        'chicago'
    ].some((keyword)=>lowerDest.includes(keyword))) return 'downtown';
    if ([
        'college',
        'university',
        'campus'
    ].some((keyword)=>lowerDest.includes(keyword))) return 'college';
    return 'default';
};
function Messages() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { category: urlCategory, userId: urlUserId } = router.query; // Get URL parameters
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('rides'); // 'rides', 'marketplace', 'direct'
    const [threads, setThreads] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [selectedThread, setSelectedThread] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [newMessage, setNewMessage] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [usersData, setUsersData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({});
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [unreadCounts, setUnreadCounts] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({}); // Track unread counts per thread
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const threadsRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(threads); // Ref to access latest threads state in listeners
    // Keep threadsRef in sync with threads state
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        threadsRef.current = threads;
    }, [
        threads
    ]);
    const categories = [
        {
            id: 'rides',
            label: 'Rides',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdFlight"]
        },
        {
            id: 'marketplace',
            label: 'Marketplace',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["MdShoppingCart"]
        },
        {
            id: 'direct',
            label: 'Direct',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiUser"]
        }
    ];
    // Redirect to login if not authenticated
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!loading && !user) {
            router.push('/login');
        }
    }, [
        user,
        loading,
        router
    ]);
    // Handle URL parameters (for "Message Host" feature)
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (urlCategory && user) {
            setActiveCategory(urlCategory);
            // If userId is provided, create/find direct message thread
            if (urlCategory === 'direct' && urlUserId) {
                // Create a direct message thread with the user
                const directThreadId = [
                    user.uid,
                    urlUserId
                ].sort().join('_');
                // Fetch the other user's name
                const fetchOtherUserName = async ()=>{
                    try {
                        const otherUserDoc = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'users', urlUserId));
                        const otherUserName = otherUserDoc.exists() ? capitalizeName(otherUserDoc.data().name || otherUserDoc.data().email || 'User') : 'User';
                        setSelectedThread({
                            id: directThreadId,
                            type: 'direct',
                            title: otherUserName,
                            subtitle: '',
                            participants: [
                                user.uid,
                                urlUserId
                            ],
                            participantCount: 2,
                            lastMessage: 'Start a conversation',
                            lastMessageSenderId: null,
                            lastMessageTime: new Date(),
                            themeKey: 'default',
                            unreadCount: 0
                        });
                    } catch (error) {
                        console.error('Error fetching user:', error);
                        setSelectedThread({
                            id: directThreadId,
                            type: 'direct',
                            title: 'Direct Message',
                            subtitle: '',
                            participants: [
                                user.uid,
                                urlUserId
                            ],
                            participantCount: 2,
                            lastMessage: 'Start a conversation',
                            lastMessageSenderId: null,
                            lastMessageTime: new Date(),
                            themeKey: 'default',
                            unreadCount: 0
                        });
                    }
                };
                fetchOtherUserName();
            }
        }
    }, [
        urlCategory,
        urlUserId,
        user
    ]);
    // Check screen width for mobile detection
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const checkMobile = ()=>{
            setIsMobile(window.innerWidth < 768); // md breakpoint is 768px
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return ()=>window.removeEventListener('resize', checkMobile);
    }, []);
    // Check authentication
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const unsubscribe = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$auth__$5b$external$5d$__$28$firebase$2f$auth$2c$__esm_import$29$__["onAuthStateChanged"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["auth"], (currentUser)=>{
            if (currentUser) {
                setUser(currentUser);
            } else {
                router.push('/login');
            }
        });
        return ()=>unsubscribe();
    }, [
        router
    ]);
    // Fetch user display names
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!user) return;
        const fetchUserData = async (userId)=>{
            if (usersData[userId]) return;
            try {
                const userDoc = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'users', userId));
                if (userDoc.exists()) {
                    setUsersData((prev)=>({
                            ...prev,
                            [userId]: {
                                name: capitalizeName(userDoc.data().name || userDoc.data().email || 'Anonymous'),
                                email: userDoc.data().email
                            }
                        }));
                }
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        // Fetch user data for all participants when threads change
        threads.forEach((thread)=>{
            if (thread.participants) {
                thread.participants.forEach((participantId)=>{
                    if (participantId !== 'system') {
                        fetchUserData(participantId);
                    }
                });
            }
            if (thread.lastMessageSenderId && thread.lastMessageSenderId !== 'system') {
                fetchUserData(thread.lastMessageSenderId);
            }
        });
    }, [
        threads,
        user
    ]);
    // Fetch threads based on active category
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!user) return;
        if (activeCategory === 'rides') {
            // Fetch ride threads
            const ridesRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'rides');
            const q = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["query"])(ridesRef, (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["where"])('participants', 'array-contains', user.uid));
            const messageUnsubscribers = [];
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["onSnapshot"])(q, (snapshot)=>{
                // Unsubscribe from previous message listeners
                messageUnsubscribers.forEach((unsub)=>unsub());
                messageUnsubscribers.length = 0;
                const rideThreadsMap = new Map();
                snapshot.docs.forEach((rideDoc)=>{
                    const rideData = rideDoc.data();
                    // Get lastRead value, ignoring null (pending serverTimestamp)
                    const lastReadValue = rideData[`lastRead_${user.uid}`];
                    let initialLastRead = null;
                    if (lastReadValue !== null && lastReadValue !== undefined) {
                        initialLastRead = lastReadValue;
                    } else if (lastReadValue === null) {
                        // If null (pending serverTimestamp), try to get existing value from current state
                        const existingThread = threadsRef.current.find((t)=>t.id === rideDoc.id);
                        if (existingThread?.lastReadTimestamp) {
                            initialLastRead = existingThread.lastReadTimestamp;
                        }
                    }
                    // Initialize thread data
                    rideThreadsMap.set(rideDoc.id, {
                        id: rideDoc.id,
                        type: 'ride',
                        title: rideData.destination,
                        subtitle: rideData.city || '',
                        participants: rideData.participants || [],
                        participantCount: rideData.participants?.length || 0,
                        lastMessage: 'No messages yet',
                        lastMessageSenderId: null,
                        lastMessageTime: new Date(0),
                        themeKey: detectTheme(rideData.destination),
                        unreadCount: 0,
                        lastReadTimestamp: initialLastRead
                    });
                    // Listen to the ride document itself for lastRead updates
                    const rideDocRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'rides', rideDoc.id);
                    const unsubRideDoc = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["onSnapshot"])(rideDocRef, (updatedRideDoc)=>{
                        const thread = rideThreadsMap.get(rideDoc.id);
                        if (!thread) return;
                        const updatedRideData = updatedRideDoc.data();
                        if (updatedRideData) {
                            const newLastRead = updatedRideData[`lastRead_${user.uid}`];
                            // Update lastReadTimestamp - keep existing value if new value is null (pending serverTimestamp)
                            if (newLastRead !== undefined && newLastRead !== null) {
                                thread.lastReadTimestamp = newLastRead;
                                // Force threads state update with the new timestamp
                                const updatedThreads = Array.from(rideThreadsMap.values()).sort((a, b)=>b.lastMessageTime - a.lastMessageTime);
                                setThreads(updatedThreads);
                            }
                        }
                    });
                    messageUnsubscribers.push(unsubRideDoc);
                    // Set up real-time listener for messages
                    const messagesRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'rides', rideDoc.id, 'messages');
                    const messagesQuery = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["query"])(messagesRef, (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["orderBy"])('timestamp', 'desc'));
                    const unsubMsg = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["onSnapshot"])(messagesQuery, (msgSnapshot)=>{
                        const thread = rideThreadsMap.get(rideDoc.id);
                        if (!thread) return;
                        const lastMessage = msgSnapshot.docs[0]?.data();
                        if (lastMessage) {
                            thread.lastMessage = lastMessage.text || 'No messages yet';
                            thread.lastMessageSenderId = lastMessage.senderId || null;
                            thread.lastMessageTime = lastMessage.timestamp?.toDate ? lastMessage.timestamp.toDate() : new Date(0);
                        }
                        // Calculate unread count using the current lastReadTimestamp from thread object
                        if (thread.lastReadTimestamp) {
                            const lastReadTime = thread.lastReadTimestamp.toDate ? thread.lastReadTimestamp.toDate() : new Date(0);
                            thread.unreadCount = msgSnapshot.docs.filter((doc)=>{
                                const msgData = doc.data();
                                const msgTime = msgData.timestamp?.toDate ? msgData.timestamp.toDate() : new Date(0);
                                return msgTime > lastReadTime && msgData.senderId !== user.uid;
                            }).length;
                        } else {
                            // No lastRead timestamp means all messages are unread
                            thread.unreadCount = msgSnapshot.docs.filter((doc)=>doc.data().senderId !== user.uid).length;
                        }
                        // Update threads state
                        const updatedThreads = Array.from(rideThreadsMap.values()).sort((a, b)=>b.lastMessageTime - a.lastMessageTime);
                        setThreads(updatedThreads);
                    }, (error)=>{
                        if (error.code !== 'permission-denied') {
                            console.error('Error fetching messages:', error);
                        }
                    });
                    messageUnsubscribers.push(unsubMsg);
                });
                setLoading(false);
            }, (error)=>{
                console.error('Error fetching rides:', error);
                setLoading(false);
            });
            return ()=>{
                unsubscribe();
                messageUnsubscribers.forEach((unsub)=>unsub());
            };
        } else if (activeCategory === 'direct') {
            // Fetch direct message threads
            const directMessagesRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'directMessages');
            const q = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["query"])(directMessagesRef, (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["where"])('participants', 'array-contains', user.uid));
            const messageUnsubscribers = [];
            const directThreadsMap = new Map();
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["onSnapshot"])(q, async (snapshot)=>{
                for (const threadDoc of snapshot.docs){
                    const threadData = threadDoc.data();
                    const otherUserId = threadData.participants.find((id)=>id !== user.uid);
                    // Get lastRead value, ignoring null (pending serverTimestamp)
                    const lastReadValue = threadData[`lastRead_${user.uid}`];
                    let initialLastRead = null;
                    if (lastReadValue !== null && lastReadValue !== undefined) {
                        initialLastRead = lastReadValue;
                    } else if (lastReadValue === null) {
                        // If null (pending serverTimestamp), try to get existing value from current state
                        const existingThread = threadsRef.current.find((t)=>t.id === threadDoc.id);
                        if (existingThread?.lastReadTimestamp) {
                            initialLastRead = existingThread.lastReadTimestamp;
                        }
                    }
                    // Fetch other user's name
                    let otherUserName = 'User';
                    try {
                        const otherUserDoc = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'users', otherUserId));
                        if (otherUserDoc.exists()) {
                            otherUserName = capitalizeName(otherUserDoc.data().name || otherUserDoc.data().email || 'User');
                        }
                    } catch (error) {
                        console.error('Error fetching user:', error);
                    }
                    // Initialize thread data
                    directThreadsMap.set(threadDoc.id, {
                        id: threadDoc.id,
                        type: 'direct',
                        title: otherUserName,
                        subtitle: '',
                        participants: threadData.participants || [],
                        participantCount: 2,
                        lastMessage: threadData.lastMessage || 'No messages yet',
                        lastMessageSenderId: null,
                        lastMessageTime: threadData.lastMessageTime?.toDate ? threadData.lastMessageTime.toDate() : new Date(0),
                        themeKey: 'default',
                        unreadCount: 0,
                        lastReadTimestamp: initialLastRead,
                        otherUserId: otherUserId
                    });
                    // Listen to the thread document for lastRead updates
                    const threadDocRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'directMessages', threadDoc.id);
                    const unsubThreadDoc = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["onSnapshot"])(threadDocRef, (updatedThreadDoc)=>{
                        const thread = directThreadsMap.get(threadDoc.id);
                        if (!thread) return;
                        const updatedThreadData = updatedThreadDoc.data();
                        if (updatedThreadData) {
                            const newLastRead = updatedThreadData[`lastRead_${user.uid}`];
                            // Update lastReadTimestamp - keep existing value if new value is null (pending serverTimestamp)
                            if (newLastRead !== undefined && newLastRead !== null) {
                                thread.lastReadTimestamp = newLastRead;
                                // Force threads state update with the new timestamp
                                const updatedThreads = Array.from(directThreadsMap.values()).sort((a, b)=>b.lastMessageTime - a.lastMessageTime);
                                setThreads(updatedThreads);
                            }
                            // Always update message metadata
                            thread.lastMessage = updatedThreadData.lastMessage || 'No messages yet';
                            thread.lastMessageTime = updatedThreadData.lastMessageTime?.toDate ? updatedThreadData.lastMessageTime.toDate() : new Date(0);
                        }
                    });
                    messageUnsubscribers.push(unsubThreadDoc);
                    // Listen to messages for unread count calculation
                    const messagesRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'directMessages', threadDoc.id, 'messages');
                    const messagesQuery = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["query"])(messagesRef, (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["orderBy"])('timestamp', 'desc'));
                    const unsubMsg = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["onSnapshot"])(messagesQuery, (msgSnapshot)=>{
                        const thread = directThreadsMap.get(threadDoc.id);
                        if (!thread) return;
                        // Calculate unread count using the current lastReadTimestamp from thread object
                        if (thread.lastReadTimestamp) {
                            const lastReadTime = thread.lastReadTimestamp.toDate ? thread.lastReadTimestamp.toDate() : new Date(0);
                            thread.unreadCount = msgSnapshot.docs.filter((doc)=>{
                                const msgData = doc.data();
                                const msgTime = msgData.timestamp?.toDate ? msgData.timestamp.toDate() : new Date(0);
                                return msgTime > lastReadTime && msgData.senderId === thread.otherUserId;
                            }).length;
                        } else {
                            // No lastRead timestamp means all messages from other user are unread
                            thread.unreadCount = msgSnapshot.docs.filter((doc)=>doc.data().senderId === thread.otherUserId).length;
                        }
                        // Update threads state
                        const updatedThreads = Array.from(directThreadsMap.values()).sort((a, b)=>b.lastMessageTime - a.lastMessageTime);
                        setThreads(updatedThreads);
                    });
                    messageUnsubscribers.push(unsubMsg);
                }
                setLoading(false);
            }, (error)=>{
                console.error('Error fetching direct messages:', error);
                setLoading(false);
            });
            return ()=>{
                unsubscribe();
                messageUnsubscribers.forEach((unsub)=>unsub());
            };
        } else {
            // Marketplace category - placeholder for now
            setThreads([]);
            setLoading(false);
        }
    }, [
        user,
        activeCategory
    ]);
    // Fetch messages for selected thread
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!selectedThread || !user) return;
        let messagesRef;
        let retryTimeout;
        let unsubscribe;
        // Determine the correct Firestore path based on thread type
        if (selectedThread.type === 'ride') {
            messagesRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'rides', selectedThread.id, 'messages');
        } else if (selectedThread.type === 'direct') {
            messagesRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'directMessages', selectedThread.id, 'messages');
        } else {
            return;
        }
        const q = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["query"])(messagesRef, (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["orderBy"])('timestamp', 'asc'));
        const setupListener = ()=>{
            unsubscribe = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["onSnapshot"])(q, async (snapshot)=>{
                const msgs = snapshot.docs.map((doc)=>({
                        id: doc.id,
                        ...doc.data()
                    }));
                setMessages(msgs);
                setTimeout(()=>messagesEndRef.current?.scrollIntoView({
                        behavior: 'smooth'
                    }), 100);
            }, (error)=>{
                // Handle permission errors gracefully
                if (error.code === 'permission-denied') {
                    console.log('Permission denied - waiting for participant access. Retrying in 2s...');
                    setMessages([]);
                    // Retry after 2 seconds - user might be added as participant
                    retryTimeout = setTimeout(()=>{
                        console.log('Retrying message listener...');
                        if (unsubscribe) unsubscribe();
                        setupListener();
                    }, 2000);
                } else {
                    console.error('Error fetching messages:', error);
                }
            });
        };
        setupListener();
        return ()=>{
            if (unsubscribe) unsubscribe();
            if (retryTimeout) clearTimeout(retryTimeout);
        };
    }, [
        selectedThread,
        user
    ]);
    // Separate effect to update lastRead timestamp when viewing messages
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        if (!selectedThread || !user || messages.length === 0) return;
        // Update lastReadTimestamp for this user in the thread
        const updateLastRead = async ()=>{
            try {
                if (selectedThread.type === 'direct') {
                    const threadRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'directMessages', selectedThread.id);
                    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["setDoc"])(threadRef, {
                        [`lastRead_${user.uid}`]: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["serverTimestamp"])()
                    }, {
                        merge: true
                    });
                } else if (selectedThread.type === 'ride') {
                    const threadRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'rides', selectedThread.id);
                    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["setDoc"])(threadRef, {
                        [`lastRead_${user.uid}`]: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["serverTimestamp"])()
                    }, {
                        merge: true
                    });
                }
            } catch (error) {
                console.error('Error updating lastRead timestamp:', error);
            }
        };
        updateLastRead();
    }, [
        selectedThread,
        user,
        messages.length
    ]);
    const handleSendMessage = async (e)=>{
        e.preventDefault();
        if (!newMessage.trim() || !selectedThread || !user) return;
        try {
            let messagesRef;
            // Determine the correct Firestore path based on thread type
            if (selectedThread.type === 'ride') {
                messagesRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'rides', selectedThread.id, 'messages');
                // For rides, ensure user is a participant before sending
                const rideRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'rides', selectedThread.id);
                const rideDoc = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["getDoc"])(rideRef);
                if (rideDoc.exists()) {
                    const rideData = rideDoc.data();
                    if (!rideData.participants?.includes(user.uid)) {
                        // User is not a participant - shouldn't happen but handle gracefully
                        console.warn('User not a participant, message may fail');
                    }
                }
            } else if (selectedThread.type === 'direct') {
                // For direct messages, ensure the thread document exists first
                const threadRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'directMessages', selectedThread.id);
                const threadDoc = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["getDoc"])(threadRef);
                if (!threadDoc.exists()) {
                    // Create the thread document if it doesn't exist
                    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["setDoc"])(threadRef, {
                        participants: selectedThread.participants,
                        createdAt: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["serverTimestamp"])(),
                        lastMessageTime: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["serverTimestamp"])(),
                        lastMessage: newMessage.trim()
                    });
                } else {
                    // Update existing thread using setDoc with merge to avoid permission issues
                    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["setDoc"])(threadRef, {
                        lastMessageTime: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["serverTimestamp"])(),
                        lastMessage: newMessage.trim()
                    }, {
                        merge: true
                    });
                }
                messagesRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'directMessages', selectedThread.id, 'messages');
            } else {
                throw new Error('Invalid thread type');
            }
            // Optimistically add the message to local state
            const optimisticMessage = {
                id: 'temp-' + Date.now(),
                text: newMessage.trim(),
                senderId: user.uid,
                senderName: capitalizeName(user.displayName || user.email || 'Anonymous'),
                timestamp: new Date()
            };
            setMessages((prev)=>[
                    ...prev,
                    optimisticMessage
                ]);
            setNewMessage('');
            // Send to Firestore
            await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["addDoc"])(messagesRef, {
                text: newMessage.trim(),
                senderId: user.uid,
                senderName: capitalizeName(user.displayName || user.email || 'Anonymous'),
                timestamp: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["serverTimestamp"])()
            });
        // Note: We can't update other user's unread count due to security rules
        // Unread counts will be calculated based on lastRead timestamps instead
        } catch (error) {
            console.error('❌ Error sending message:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            // Remove optimistic message on error
            setMessages((prev)=>prev.filter((m)=>!m.id.startsWith('temp-')));
            alert('Failed to send message: ' + error.message);
        }
    };
    const formatTime = (timestamp)=>{
        if (!timestamp) return '';
        let date;
        // Handle Firestore Timestamp object
        if (timestamp?.toDate && typeof timestamp.toDate === 'function') {
            date = timestamp.toDate();
        } else if (timestamp instanceof Date) {
            date = timestamp;
        } else if (timestamp?.seconds) {
            date = new Date(timestamp.seconds * 1000);
        } else if (typeof timestamp === 'number') {
            date = new Date(timestamp);
        } else {
            return '';
        }
        if (!date || isNaN(date.getTime()) || date.getTime() === 0) return '';
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m`;
        if (diffHours < 24) return `${diffHours}h`;
        if (diffDays < 7) return `${diffDays}d`;
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };
    const formatMessageTime = (timestamp)=>{
        if (!timestamp?.toDate) return '';
        const date = timestamp.toDate();
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };
    const getUserDisplayName = (userId)=>{
        if (userId === 'system') return 'System';
        if (userId === user?.uid) return 'You';
        return usersData[userId]?.name || 'Loading...';
    };
    const getLastMessagePreview = (thread)=>{
        const senderName = thread.lastMessageSenderId ? getUserDisplayName(thread.lastMessageSenderId) : '';
        const preview = thread.lastMessage.length > 40 ? thread.lastMessage.substring(0, 40) + '...' : thread.lastMessage;
        if (senderName && senderName !== 'System') {
            return `${senderName}: ${preview}`;
        }
        return preview;
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-[#0A0A0A] ",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/pages/messages.jsx",
                        lineNumber: 683,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: "text-gray-400 text-lg",
                        children: "Loading messages..."
                    }, void 0, false, {
                        fileName: "[project]/pages/messages.jsx",
                        lineNumber: 684,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/messages.jsx",
                lineNumber: 682,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/messages.jsx",
            lineNumber: 681,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: "flex flex-col bg-[#0A0A0A] ",
        style: {
            height: '90vh'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex-none border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur-lg ",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    className: "px-6 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "border-b border-white/10",
                            style: {
                                marginTop: "2vh",
                                marginBottom: "2vh"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "max-w-2xl mx-auto px-6 py-4 flex items-center gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        onClick: ()=>{
                                            if (selectedThread) {
                                                setSelectedThread(null); // On mobile, go back to thread list
                                            } else {
                                                router.back(); // If no thread selected, go back to previous page
                                            }
                                        },
                                        className: "w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-all",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["HiArrowLeft"], {
                                            size: 24,
                                            className: "text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/messages.jsx",
                                            lineNumber: 709,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 697,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-bold text-white",
                                        children: 'Messages'
                                    }, void 0, false, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 711,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/messages.jsx",
                                lineNumber: 696,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/messages.jsx",
                            lineNumber: 695,
                            columnNumber: 11
                        }, this),
                        (!selectedThread || !isMobile) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex gap-4 bg-white/5 p-1 rounded-2xl backdrop-blur-xl bg-[#0A0A0A]",
                            style: {
                                height: "6vh",
                                marginTop: "5vh",
                                background: "#0A0A0A"
                            },
                            children: categories.map((category)=>{
                                const Icon = category.icon;
                                // Calculate unread count for this category
                                const categoryUnread = activeCategory === category.id ? threads.reduce((sum, thread)=>sum + (thread.unreadCount || 0), 0) : 0;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setActiveCategory(category.id);
                                        setSelectedThread(null);
                                    },
                                    className: `bg-[#0A0A0A] flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 relative ${activeCategory === category.id ? 'bg-gradient-to-r from-primary to-accent text-white' : 'text-gray-400 hover:text-white'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Icon, {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/pages/messages.jsx",
                                            lineNumber: 740,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            className: "text-sm",
                                            children: category.label
                                        }, void 0, false, {
                                            fileName: "[project]/pages/messages.jsx",
                                            lineNumber: 741,
                                            columnNumber: 21
                                        }, this),
                                        categoryUnread > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1.5",
                                            children: categoryUnread > 99 ? '99+' : categoryUnread
                                        }, void 0, false, {
                                            fileName: "[project]/pages/messages.jsx",
                                            lineNumber: 743,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, category.id, true, {
                                    fileName: "[project]/pages/messages.jsx",
                                    lineNumber: 728,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/pages/messages.jsx",
                            lineNumber: 719,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/messages.jsx",
                    lineNumber: 694,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/messages.jsx",
                lineNumber: 693,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: "flex-1 flex overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        style: {
                            width: isMobile ? '100vw' : '15vw',
                            paddingLeft: isMobile ? '2vw' : '0',
                            paddingRight: isMobile ? '2vw' : '0'
                        },
                        className: `border-r border-white/10 flex flex-col bg-[#0A0A0A]  ${selectedThread ? 'hidden md:block' : 'block'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto",
                            children: threads.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "p-8 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiMessageCircle"], {
                                        className: "mx-auto text-gray-600 mb-3",
                                        size: 48
                                    }, void 0, false, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 771,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500 text-sm",
                                        children: [
                                            "No ",
                                            activeCategory,
                                            " messages yet"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 772,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/messages.jsx",
                                lineNumber: 770,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "divide-y divide-white/5",
                                children: threads.map((thread)=>{
                                    const theme = destinationThemes[thread.themeKey];
                                    const Icon = theme.icon;
                                    const isSelected = selectedThread?.id === thread.id;
                                    const hasUnread = thread.unreadCount > 0;
                                    const handleThreadClick = async ()=>{
                                        // Optimistically update the thread's lastReadTimestamp in state
                                        const updatedThreads = threads.map((t)=>{
                                            if (t.id === thread.id) {
                                                return {
                                                    ...t,
                                                    lastReadTimestamp: {
                                                        toDate: ()=>new Date()
                                                    },
                                                    unreadCount: 0
                                                };
                                            }
                                            return t;
                                        });
                                        setThreads(updatedThreads);
                                        // Update selectedThread with optimistic timestamp
                                        setSelectedThread({
                                            ...thread,
                                            lastReadTimestamp: {
                                                toDate: ()=>new Date()
                                            },
                                            unreadCount: 0
                                        });
                                        // Update lastRead timestamp in Firestore (will trigger real update)
                                        try {
                                            if (thread.type === 'direct') {
                                                const threadRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'directMessages', thread.id);
                                                await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["setDoc"])(threadRef, {
                                                    [`lastRead_${user.uid}`]: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["serverTimestamp"])()
                                                }, {
                                                    merge: true
                                                });
                                            } else if (thread.type === 'ride') {
                                                const threadRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["db"], 'rides', thread.id);
                                                await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["setDoc"])(threadRef, {
                                                    [`lastRead_${user.uid}`]: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$firebase$2f$firestore__$5b$external$5d$__$28$firebase$2f$firestore$2c$__esm_import$29$__["serverTimestamp"])()
                                                }, {
                                                    merge: true
                                                });
                                            }
                                        } catch (error) {
                                            console.error('❌ Error updating lastRead on click:', error);
                                        }
                                    };
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                        style: {
                                            marginBottom: "1vh",
                                            marginTop: "1vh"
                                        },
                                        whileHover: {
                                            backgroundColor: 'rgba(255,255,255,0.03)'
                                        },
                                        onClick: handleThreadClick,
                                        className: `p-4 cursor-pointer transition-all relative ${isSelected ? 'bg-white/10 border-l-4 border-primary' : ''}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: `w-12 h-12 rounded-full bg-gradient-to-br ${theme.bg} flex items-center justify-center flex-shrink-0 relative`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Icon, {
                                                            className: theme.color,
                                                            size: 24
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 836,
                                                            columnNumber: 27
                                                        }, this),
                                                        hasUnread && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg",
                                                            children: thread.unreadCount > 9 ? '9+' : thread.unreadCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 838,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/messages.jsx",
                                                    lineNumber: 835,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between mb-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                                                    className: `text-sm font-bold truncate ${hasUnread ? 'text-white' : 'text-white'}`,
                                                                    children: thread.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/messages.jsx",
                                                                    lineNumber: 847,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs text-gray-500 ml-2 flex-shrink-0",
                                                                    style: {
                                                                        marginRight: "1vw"
                                                                    },
                                                                    children: formatTime(thread.lastMessageTime)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/messages.jsx",
                                                                    lineNumber: 850,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 846,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                            className: `text-xs truncate ${hasUnread ? 'text-gray-300 font-semibold' : 'text-gray-400'}`,
                                                            children: getLastMessagePreview(thread)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 854,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/messages.jsx",
                                                    lineNumber: 845,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/messages.jsx",
                                            lineNumber: 833,
                                            columnNumber: 23
                                        }, this)
                                    }, thread.id, false, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 824,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/pages/messages.jsx",
                                lineNumber: 775,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/messages.jsx",
                            lineNumber: 768,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/messages.jsx",
                        lineNumber: 758,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: `flex-1 flex flex-col bg-[#0A0A0A] bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10  ${selectedThread ? 'block' : 'hidden md:flex'}`,
                        children: !selectedThread ? // Skeleton Placeholder
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: "flex-1 flex items-center justify-center p-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: "text-center max-w-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].div, {
                                        initial: {
                                            scale: 0.9,
                                            opacity: 0
                                        },
                                        animate: {
                                            scale: 1,
                                            opacity: 1
                                        },
                                        className: "w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiMessageCircle"], {
                                            className: "text-gray-600",
                                            size: 64
                                        }, void 0, false, {
                                            fileName: "[project]/pages/messages.jsx",
                                            lineNumber: 880,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 875,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold text-white mb-3",
                                        children: "Select a conversation"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 882,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        className: "text-gray-400",
                                        children: "Choose a thread from the left to start messaging"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 883,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/messages.jsx",
                                lineNumber: 874,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/messages.jsx",
                            lineNumber: 873,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex-none border-b border-white/10 p-4 bg-[#0A0A0A]/95 backdrop-blur-lg bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 ",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3",
                                                children: [
                                                    (()=>{
                                                        const theme = destinationThemes[selectedThread.themeKey];
                                                        const Icon = theme.icon;
                                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: `w-10 h-10 rounded-full bg-gradient-to-br ${theme.bg} flex items-center justify-center`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(Icon, {
                                                                className: theme.color,
                                                                size: 20
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/messages.jsx",
                                                                lineNumber: 897,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 896,
                                                            columnNumber: 25
                                                        }, this);
                                                    })(),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                                className: "text-lg font-bold text-white",
                                                                children: selectedThread.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/messages.jsx",
                                                                lineNumber: 902,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                className: "text-xs text-gray-400",
                                                                children: [
                                                                    selectedThread.participantCount,
                                                                    " participants"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/messages.jsx",
                                                                lineNumber: 903,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/messages.jsx",
                                                        lineNumber: 901,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/messages.jsx",
                                                lineNumber: 891,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                className: "p-2 hover:bg-white/5 rounded-full transition-all",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiMoreVertical"], {
                                                    className: "text-gray-400",
                                                    size: 20
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/messages.jsx",
                                                    lineNumber: 907,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/messages.jsx",
                                                lineNumber: 906,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 890,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/messages.jsx",
                                    lineNumber: 889,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar",
                                    style: {
                                        padding: "1vw"
                                    },
                                    children: [
                                        messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: "text-center py-12",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: "w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$ssr$5d$__$28$ecmascript$29$__["FiMessageCircle"], {
                                                        className: "text-purple-400",
                                                        size: 32
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/messages.jsx",
                                                        lineNumber: 917,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/messages.jsx",
                                                    lineNumber: 916,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-400",
                                                    children: "No messages yet"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/messages.jsx",
                                                    lineNumber: 919,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: "text-xs mt-1 text-gray-500",
                                                    children: "Be the first to say hi! 👋"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/messages.jsx",
                                                    lineNumber: 920,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/messages.jsx",
                                            lineNumber: 915,
                                            columnNumber: 19
                                        }, this) : messages.map((message, index)=>{
                                            const isOwn = message.senderId === user?.uid;
                                            const isSystem = message.senderId === 'system';
                                            // Check if we need to show timestamp (if >30 mins since last message)
                                            let showTimestamp = index === 0;
                                            if (index > 0 && messages[index - 1].timestamp && message.timestamp) {
                                                // Convert timestamps to milliseconds for comparison
                                                let currentTime, previousTime;
                                                // Handle Firestore Timestamp objects
                                                if (message.timestamp?.toDate) {
                                                    currentTime = message.timestamp.toDate().getTime();
                                                } else if (message.timestamp?.seconds) {
                                                    currentTime = message.timestamp.seconds * 1000;
                                                } else if (message.timestamp instanceof Date) {
                                                    currentTime = message.timestamp.getTime();
                                                } else {
                                                    currentTime = 0;
                                                }
                                                if (messages[index - 1].timestamp?.toDate) {
                                                    previousTime = messages[index - 1].timestamp.toDate().getTime();
                                                } else if (messages[index - 1].timestamp?.seconds) {
                                                    previousTime = messages[index - 1].timestamp.seconds * 1000;
                                                } else if (messages[index - 1].timestamp instanceof Date) {
                                                    previousTime = messages[index - 1].timestamp.getTime();
                                                } else {
                                                    previousTime = 0;
                                                }
                                                const timeDiff = currentTime - previousTime;
                                                showTimestamp = timeDiff > 30 * 60 * 1000; // 30 minutes in milliseconds
                                            }
                                            if (isSystem) {
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        showTimestamp && message.timestamp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center my-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                className: "text-xs px-3 py-1 rounded-full text-gray-500",
                                                                children: (()=>{
                                                                    let date;
                                                                    if (message.timestamp?.toDate) {
                                                                        date = message.timestamp.toDate();
                                                                    } else if (message.timestamp?.seconds) {
                                                                        date = new Date(message.timestamp.seconds * 1000);
                                                                    } else if (message.timestamp instanceof Date) {
                                                                        date = message.timestamp;
                                                                    }
                                                                    return date?.toLocaleString([], {
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit'
                                                                    }) || '';
                                                                })()
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/messages.jsx",
                                                                lineNumber: 965,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 964,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-center my-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "bg-white/5 px-4 py-2 rounded-full max-w-md",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-400 text-center",
                                                                    children: message.text
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/messages.jsx",
                                                                    lineNumber: 987,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/messages.jsx",
                                                                lineNumber: 986,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 985,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, message.id, true, {
                                                    fileName: "[project]/pages/messages.jsx",
                                                    lineNumber: 961,
                                                    columnNumber: 25
                                                }, this);
                                            }
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                children: [
                                                    showTimestamp && message.timestamp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center my-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                            className: "text-xs px-3 py-1 rounded-full text-gray-500",
                                                            children: (()=>{
                                                                let date;
                                                                if (message.timestamp?.toDate) {
                                                                    date = message.timestamp.toDate();
                                                                } else if (message.timestamp?.seconds) {
                                                                    date = new Date(message.timestamp.seconds * 1000);
                                                                } else if (message.timestamp instanceof Date) {
                                                                    date = message.timestamp;
                                                                }
                                                                return date?.toLocaleString([], {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                }) || '';
                                                            })()
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 999,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/messages.jsx",
                                                        lineNumber: 998,
                                                        columnNumber: 27
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
                                                            delay: index * 0.05
                                                        },
                                                        className: `flex items-end gap-2 ${isOwn ? 'justify-end' : 'justify-start'}`,
                                                        children: [
                                                            !isOwn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: "w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center flex-shrink-0 mb-1",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-xs text-white",
                                                                    children: message.senderName?.charAt(0).toUpperCase()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/messages.jsx",
                                                                    lineNumber: 1029,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/messages.jsx",
                                                                lineNumber: 1028,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                className: `flex flex-col ${isOwn ? 'items-end' : 'items-start'}`,
                                                                children: [
                                                                    !isOwn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs mb-1 ml-2 text-gray-400",
                                                                        children: message.senderName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/messages.jsx",
                                                                        lineNumber: 1038,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                        className: `rounded-2xl backdrop-blur-sm ${isOwn ? 'bg-gradient-to-br from-primary via-primary/90 to-accent text-white rounded-br-md shadow-lg shadow-primary/20' : 'bg-white/10 text-white border border-white/10 rounded-bl-md'} ${message.imageUrl ? 'p-2' : 'px-5 py-3.5'}`,
                                                                        style: message.imageUrl ? {} : {
                                                                            paddingLeft: '3vw',
                                                                            paddingRight: '3vw',
                                                                            textAlign: 'center',
                                                                            paddingTop: '0.5vh',
                                                                            paddingBottom: '0.5vh',
                                                                            marginBottom: '0.5vh'
                                                                        },
                                                                        children: message.imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                            className: "max-w-xs",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                                                src: message.imageUrl,
                                                                                alt: "Shared image",
                                                                                className: "rounded-xl w-full h-auto cursor-pointer hover:opacity-90 transition-opacity",
                                                                                onClick: ()=>window.open(message.imageUrl, '_blank')
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/messages.jsx",
                                                                                lineNumber: 1059,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/messages.jsx",
                                                                            lineNumber: 1058,
                                                                            columnNumber: 33
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm leading-relaxed break-words",
                                                                            children: message.text
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/messages.jsx",
                                                                            lineNumber: 1067,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/messages.jsx",
                                                                        lineNumber: 1042,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/messages.jsx",
                                                                lineNumber: 1035,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/messages.jsx",
                                                        lineNumber: 1020,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, message.id, true, {
                                                fileName: "[project]/pages/messages.jsx",
                                                lineNumber: 995,
                                                columnNumber: 23
                                            }, this);
                                        }),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            ref: messagesEndRef
                                        }, void 0, false, {
                                            fileName: "[project]/pages/messages.jsx",
                                            lineNumber: 1076,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/messages.jsx",
                                    lineNumber: 913,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: "p-4 backdrop-blur-xl bg-black/20",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 px-4 py-2 bg-white/5 focus-within:border-primary/50 transition-all",
                                        style: {
                                            paddingRight: "1vw",
                                            paddingLeft: "1vw"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: newMessage,
                                                style: {
                                                    height: "6vh",
                                                    paddingLeft: "1vw"
                                                },
                                                onChange: (e)=>setNewMessage(e.target.value),
                                                onKeyPress: (e)=>e.key === 'Enter' && !e.shiftKey && handleSendMessage(e),
                                                placeholder: "Message...",
                                                className: "flex-1 bg-transparent border-none focus:outline-none text-sm py-1 text-white placeholder-gray-400"
                                            }, void 0, false, {
                                                fileName: "[project]/pages/messages.jsx",
                                                lineNumber: 1083,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$framer$2d$motion__$5b$external$5d$__$28$framer$2d$motion$2c$__esm_import$29$__["motion"].button, {
                                                whileHover: {
                                                    scale: 1.1
                                                },
                                                whileTap: {
                                                    scale: 0.9
                                                },
                                                onClick: handleSendMessage,
                                                disabled: !newMessage.trim(),
                                                className: `flex-shrink-0 transition-all ${newMessage.trim() ? 'text-primary' : 'text-gray-500 cursor-not-allowed'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("svg", {
                                                    width: "24",
                                                    height: "24",
                                                    viewBox: "0 0 24 24",
                                                    fill: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("path", {
                                                        d: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/messages.jsx",
                                                        lineNumber: 1104,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/messages.jsx",
                                                    lineNumber: 1103,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/messages.jsx",
                                                lineNumber: 1092,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 1081,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/messages.jsx",
                                    lineNumber: 1080,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/pages/messages.jsx",
                        lineNumber: 868,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/messages.jsx",
                lineNumber: 756,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/messages.jsx",
        lineNumber: 691,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__bab02e8b._.js.map