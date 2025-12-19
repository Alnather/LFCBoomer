(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/lib/firebase.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "db",
    ()=>db,
    "default",
    ()=>__TURBOPACK__default__export__,
    "storage",
    ()=>storage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$storage$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/storage/dist/esm/index.esm.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/storage/dist/index.esm.js [client] (ecmascript)");
;
;
;
;
const firebaseConfig = {
    apiKey: ("TURBOPACK compile-time value", "AIzaSyA8ij5ko2vB1fE2P7FIOcWOJbAinRpbn4Q"),
    authDomain: "lfcboomer.firebaseapp.com",
    projectId: "lfcboomer",
    storageBucket: "lfcboomer.firebasestorage.app",
    messagingSenderId: "579328875040",
    appId: "1:579328875040:web:de58e2a358891dba5bfa45",
    measurementId: "G-51G7NE56NH"
};
// where do i get the config values? from firebase console -> project settings -> general -> your apps -> firebase sdk snippet -> config
const app = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getApps"])().length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["initializeApp"])(firebaseConfig) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getApps"])()[0];
const auth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getAuth"])(app);
const db = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getFirestore"])(app);
const storage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$storage$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getStorage"])(app);
const __TURBOPACK__default__export__ = app;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/context/UnreadContext.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UnreadProvider",
    ()=>UnreadProvider,
    "useUnread",
    ()=>useUnread
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
const UnreadContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["createContext"])({
    unreadCount: 0,
    rideUnreadCount: 0,
    directUnreadCount: 0,
    marketplaceUnreadCount: 0,
    latestMessage: null
});
function useUnread() {
    _s();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useContext"])(UnreadContext);
}
_s(useUnread, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
function UnreadProvider({ user, children }) {
    _s1();
    const [rideUnreadCount, setRideUnreadCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [directUnreadCount, setDirectUnreadCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [marketplaceUnreadCount, setMarketplaceUnreadCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [latestMessage, setLatestMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Use refs for Maps to persist across re-renders and prevent listener leaks
    const threadDataRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const messageUnsubscribersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const docUnsubscribersRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const processedMessagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(new Set());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UnreadProvider.useEffect": ()=>{
            if (!user) {
                setRideUnreadCount(0);
                setDirectUnreadCount(0);
                setMarketplaceUnreadCount(0);
                setLatestMessage(null);
                return;
            }
            const threadData = threadDataRef.current;
            const messageUnsubscribers = messageUnsubscribersRef.current;
            const docUnsubscribers = docUnsubscribersRef.current;
            const processedMessages = processedMessagesRef.current;
            const unsubscribers = [];
            const calculateUnreadForThread = {
                "UnreadProvider.useEffect.calculateUnreadForThread": (threadKey)=>{
                    const data = threadData.get(threadKey);
                    if (!data || !data.messages) return 0;
                    const lastReadTime = data.lastReadTimestamp?.toDate ? data.lastReadTimestamp.toDate() : new Date(0);
                    return data.messages.filter({
                        "UnreadProvider.useEffect.calculateUnreadForThread": (msg)=>{
                            const msgTime = msg.timestamp?.toDate ? msg.timestamp.toDate() : new Date(0);
                            if (data.type === 'ride') {
                                return msgTime > lastReadTime && msg.senderId !== user.uid;
                            } else {
                                return msgTime > lastReadTime && msg.senderId === data.otherUserId;
                            }
                        }
                    }["UnreadProvider.useEffect.calculateUnreadForThread"]).length;
                }
            }["UnreadProvider.useEffect.calculateUnreadForThread"];
            const updateCategoryUnread = {
                "UnreadProvider.useEffect.updateCategoryUnread": ()=>{
                    let rideTotal = 0;
                    let directTotal = 0;
                    let marketplaceTotal = 0;
                    threadData.forEach({
                        "UnreadProvider.useEffect.updateCategoryUnread": (data, threadKey)=>{
                            const count = calculateUnreadForThread(threadKey);
                            if (data.type === 'ride') {
                                rideTotal += count;
                            } else if (data.type === 'marketplace') {
                                marketplaceTotal += count;
                            } else {
                                directTotal += count;
                            }
                        }
                    }["UnreadProvider.useEffect.updateCategoryUnread"]);
                    setRideUnreadCount(rideTotal);
                    setDirectUnreadCount(directTotal);
                    setMarketplaceUnreadCount(marketplaceTotal);
                }
            }["UnreadProvider.useEffect.updateCategoryUnread"];
            const checkForNewMessage = {
                "UnreadProvider.useEffect.checkForNewMessage": (threadKey, messages, data)=>{
                    if (!messages || messages.length === 0) return;
                    const latestMsg = messages[0]; // Already sorted desc by timestamp
                    if (!latestMsg || !latestMsg.timestamp) return;
                    const msgId = `${threadKey}_${latestMsg.timestamp?.seconds || 0}`;
                    // Skip if already processed
                    if (processedMessages.has(msgId)) return;
                    processedMessages.add(msgId);
                    const msgTime = latestMsg.timestamp?.toDate ? latestMsg.timestamp.toDate() : new Date(0);
                    const lastReadTime = data.lastReadTimestamp?.toDate ? data.lastReadTimestamp.toDate() : new Date(0);
                    // Check if it's a new unread message from someone else
                    const isFromOther = data.type === 'ride' ? latestMsg.senderId !== user.uid : latestMsg.senderId === data.otherUserId;
                    if (msgTime > lastReadTime && isFromOther) {
                        // Only show notification for messages received in the last 30 seconds
                        const now = new Date();
                        const thirtySecondsAgo = new Date(now.getTime() - 30000);
                        if (msgTime > thirtySecondsAgo) {
                            setLatestMessage({
                                threadKey,
                                threadId: threadKey.replace('ride_', '').replace('direct_', ''),
                                type: data.type,
                                senderName: latestMsg.senderName || 'Someone',
                                text: latestMsg.text || '',
                                timestamp: msgTime
                            });
                        }
                    }
                }
            }["UnreadProvider.useEffect.checkForNewMessage"];
            // Track rides
            const ridesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'rides');
            const ridesQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["query"])(ridesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["where"])('participants', 'array-contains', user.uid));
            const unsubRides = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(ridesQuery, {
                "UnreadProvider.useEffect.unsubRides": (snapshot)=>{
                    snapshot.docs.forEach({
                        "UnreadProvider.useEffect.unsubRides": (rideDoc)=>{
                            const rideData = rideDoc.data();
                            const threadKey = 'ride_' + rideDoc.id;
                            // Initialize or update thread data
                            if (!threadData.has(threadKey)) {
                                threadData.set(threadKey, {
                                    type: 'ride',
                                    lastReadTimestamp: rideData[`lastRead_${user.uid}`],
                                    messages: []
                                });
                            } else {
                                const existing = threadData.get(threadKey);
                                const newLastRead = rideData[`lastRead_${user.uid}`];
                                if (newLastRead !== null && newLastRead !== undefined) {
                                    existing.lastReadTimestamp = newLastRead;
                                }
                            }
                            // Set up document listener for lastRead changes
                            if (!docUnsubscribers.has(threadKey)) {
                                const rideDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'rides', rideDoc.id);
                                const unsubDoc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(rideDocRef, {
                                    "UnreadProvider.useEffect.unsubRides.unsubDoc": (updatedDoc)=>{
                                        const data = threadData.get(threadKey);
                                        if (!data) return;
                                        const updatedData = updatedDoc.data();
                                        if (updatedData) {
                                            const newLastRead = updatedData[`lastRead_${user.uid}`];
                                            if (newLastRead !== null && newLastRead !== undefined) {
                                                data.lastReadTimestamp = newLastRead;
                                                updateCategoryUnread();
                                            }
                                        }
                                    }
                                }["UnreadProvider.useEffect.unsubRides.unsubDoc"]);
                                docUnsubscribers.set(threadKey, unsubDoc);
                            }
                            // Set up messages listener (only once per thread)
                            if (!messageUnsubscribers.has(threadKey)) {
                                const messagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'rides', rideDoc.id, 'messages');
                                const messagesQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["query"])(messagesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["orderBy"])('timestamp', 'desc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["limit"])(10));
                                const unsubMsg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(messagesQuery, {
                                    "UnreadProvider.useEffect.unsubRides.unsubMsg": (msgSnap)=>{
                                        const data = threadData.get(threadKey);
                                        if (data) {
                                            const messages = msgSnap.docs.map({
                                                "UnreadProvider.useEffect.unsubRides.unsubMsg.messages": (d)=>d.data()
                                            }["UnreadProvider.useEffect.unsubRides.unsubMsg.messages"]);
                                            data.messages = messages;
                                            updateCategoryUnread();
                                            checkForNewMessage(threadKey, messages, data);
                                        }
                                    }
                                }["UnreadProvider.useEffect.unsubRides.unsubMsg"]);
                                messageUnsubscribers.set(threadKey, unsubMsg);
                            }
                        }
                    }["UnreadProvider.useEffect.unsubRides"]);
                }
            }["UnreadProvider.useEffect.unsubRides"]);
            // Track direct messages
            const directRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'directMessages');
            const directQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["query"])(directRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["where"])('participants', 'array-contains', user.uid));
            const unsubDirect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(directQuery, {
                "UnreadProvider.useEffect.unsubDirect": (snapshot)=>{
                    snapshot.docs.forEach({
                        "UnreadProvider.useEffect.unsubDirect": (threadDoc)=>{
                            const dmData = threadDoc.data();
                            const otherUserId = dmData.participants.find({
                                "UnreadProvider.useEffect.unsubDirect.otherUserId": (id)=>id !== user.uid
                            }["UnreadProvider.useEffect.unsubDirect.otherUserId"]);
                            const threadKey = 'direct_' + threadDoc.id;
                            // Initialize or update thread data
                            if (!threadData.has(threadKey)) {
                                threadData.set(threadKey, {
                                    type: 'direct',
                                    lastReadTimestamp: dmData[`lastRead_${user.uid}`],
                                    otherUserId: otherUserId,
                                    messages: []
                                });
                            } else {
                                const existing = threadData.get(threadKey);
                                const newLastRead = dmData[`lastRead_${user.uid}`];
                                if (newLastRead !== null && newLastRead !== undefined) {
                                    existing.lastReadTimestamp = newLastRead;
                                }
                            }
                            // Set up document listener for lastRead changes
                            if (!docUnsubscribers.has(threadKey)) {
                                const threadDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'directMessages', threadDoc.id);
                                const unsubDoc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(threadDocRef, {
                                    "UnreadProvider.useEffect.unsubDirect.unsubDoc": (updatedDoc)=>{
                                        const data = threadData.get(threadKey);
                                        if (!data) return;
                                        const updatedData = updatedDoc.data();
                                        if (updatedData) {
                                            const newLastRead = updatedData[`lastRead_${user.uid}`];
                                            if (newLastRead !== null && newLastRead !== undefined) {
                                                data.lastReadTimestamp = newLastRead;
                                                updateCategoryUnread();
                                            }
                                        }
                                    }
                                }["UnreadProvider.useEffect.unsubDirect.unsubDoc"]);
                                docUnsubscribers.set(threadKey, unsubDoc);
                            }
                            // Set up messages listener (only once per thread)
                            if (!messageUnsubscribers.has(threadKey)) {
                                const messagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'directMessages', threadDoc.id, 'messages');
                                const messagesQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["query"])(messagesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["orderBy"])('timestamp', 'desc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["limit"])(10));
                                const unsubMsg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(messagesQuery, {
                                    "UnreadProvider.useEffect.unsubDirect.unsubMsg": (msgSnap)=>{
                                        const data = threadData.get(threadKey);
                                        if (data) {
                                            const messages = msgSnap.docs.map({
                                                "UnreadProvider.useEffect.unsubDirect.unsubMsg.messages": (d)=>d.data()
                                            }["UnreadProvider.useEffect.unsubDirect.unsubMsg.messages"]);
                                            data.messages = messages;
                                            updateCategoryUnread();
                                            checkForNewMessage(threadKey, messages, data);
                                        }
                                    }
                                }["UnreadProvider.useEffect.unsubDirect.unsubMsg"]);
                                messageUnsubscribers.set(threadKey, unsubMsg);
                            }
                        }
                    }["UnreadProvider.useEffect.unsubDirect"]);
                }
            }["UnreadProvider.useEffect.unsubDirect"]);
            unsubscribers.push(unsubRides, unsubDirect);
            // Track marketplace conversations
            const conversationsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'conversations');
            const conversationsQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["query"])(conversationsRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["where"])('participants', 'array-contains', user.uid));
            const unsubMarketplace = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(conversationsQuery, {
                "UnreadProvider.useEffect.unsubMarketplace": (snapshot)=>{
                    snapshot.docs.forEach({
                        "UnreadProvider.useEffect.unsubMarketplace": (convDoc)=>{
                            const convData = convDoc.data();
                            // Only track marketplace type conversations
                            if (convData.type !== 'marketplace') return;
                            const otherUserId = convData.participants.find({
                                "UnreadProvider.useEffect.unsubMarketplace.otherUserId": (id)=>id !== user.uid
                            }["UnreadProvider.useEffect.unsubMarketplace.otherUserId"]);
                            const threadKey = 'marketplace_' + convDoc.id;
                            // Initialize or update thread data
                            if (!threadData.has(threadKey)) {
                                threadData.set(threadKey, {
                                    type: 'marketplace',
                                    lastReadTimestamp: convData[`lastRead_${user.uid}`],
                                    otherUserId: otherUserId,
                                    messages: []
                                });
                            } else {
                                const existing = threadData.get(threadKey);
                                const newLastRead = convData[`lastRead_${user.uid}`];
                                if (newLastRead !== null && newLastRead !== undefined) {
                                    existing.lastReadTimestamp = newLastRead;
                                }
                            }
                            // Set up document listener for lastRead changes
                            if (!docUnsubscribers.has(threadKey)) {
                                const convDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'conversations', convDoc.id);
                                const unsubDoc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(convDocRef, {
                                    "UnreadProvider.useEffect.unsubMarketplace.unsubDoc": (updatedDoc)=>{
                                        const data = threadData.get(threadKey);
                                        if (!data) return;
                                        const updatedData = updatedDoc.data();
                                        if (updatedData) {
                                            const newLastRead = updatedData[`lastRead_${user.uid}`];
                                            if (newLastRead !== null && newLastRead !== undefined) {
                                                data.lastReadTimestamp = newLastRead;
                                                updateCategoryUnread();
                                            }
                                        }
                                    }
                                }["UnreadProvider.useEffect.unsubMarketplace.unsubDoc"]);
                                docUnsubscribers.set(threadKey, unsubDoc);
                            }
                            // Set up messages listener (only once per thread)
                            if (!messageUnsubscribers.has(threadKey)) {
                                const messagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'conversations', convDoc.id, 'messages');
                                const messagesQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["query"])(messagesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["orderBy"])('timestamp', 'desc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["limit"])(10));
                                const unsubMsg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(messagesQuery, {
                                    "UnreadProvider.useEffect.unsubMarketplace.unsubMsg": (msgSnap)=>{
                                        const data = threadData.get(threadKey);
                                        if (data) {
                                            const messages = msgSnap.docs.map({
                                                "UnreadProvider.useEffect.unsubMarketplace.unsubMsg.messages": (d)=>d.data()
                                            }["UnreadProvider.useEffect.unsubMarketplace.unsubMsg.messages"]);
                                            data.messages = messages;
                                            updateCategoryUnread();
                                            checkForNewMessage(threadKey, messages, data);
                                        }
                                    }
                                }["UnreadProvider.useEffect.unsubMarketplace.unsubMsg"]);
                                messageUnsubscribers.set(threadKey, unsubMsg);
                            }
                        }
                    }["UnreadProvider.useEffect.unsubMarketplace"]);
                }
            }["UnreadProvider.useEffect.unsubMarketplace"]);
            unsubscribers.push(unsubMarketplace);
            return ({
                "UnreadProvider.useEffect": ()=>{
                    unsubscribers.forEach({
                        "UnreadProvider.useEffect": (unsub)=>unsub()
                    }["UnreadProvider.useEffect"]);
                    messageUnsubscribers.forEach({
                        "UnreadProvider.useEffect": (unsub)=>unsub()
                    }["UnreadProvider.useEffect"]);
                    docUnsubscribers.forEach({
                        "UnreadProvider.useEffect": (unsub)=>unsub()
                    }["UnreadProvider.useEffect"]);
                }
            })["UnreadProvider.useEffect"];
        }
    }["UnreadProvider.useEffect"], [
        user
    ]);
    // Compute total for backward compatibility
    const unreadCount = rideUnreadCount + directUnreadCount + marketplaceUnreadCount;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(UnreadContext.Provider, {
        value: {
            unreadCount,
            rideUnreadCount,
            directUnreadCount,
            marketplaceUnreadCount,
            latestMessage
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/context/UnreadContext.jsx",
        lineNumber: 330,
        columnNumber: 5
    }, this);
}
_s1(UnreadProvider, "Rt9DIhLOmFI2fiOQOuH5yP+UTuI=");
_c = UnreadProvider;
var _c;
__turbopack_context__.k.register(_c, "UnreadProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/messages.jsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Messages
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/fi/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/hi/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/md/index.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/firebase.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$firestore$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/firestore/dist/esm/index.esm.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/firestore/dist/index.esm.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/auth/dist/esm/index.esm.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/auth/dist/esm/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$UnreadContext$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/context/UnreadContext.jsx [client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
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
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["MdFlight"],
        color: 'text-cyan-400',
        bg: 'from-cyan-500/20 to-blue-500/20',
        bgSolid: 'bg-cyan-500/20'
    },
    'shopping': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["MdShoppingCart"],
        color: 'text-pink-400',
        bg: 'from-pink-500/20 to-red-500/20',
        bgSolid: 'bg-pink-500/20'
    },
    'downtown': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["MdLocationCity"],
        color: 'text-indigo-400',
        bg: 'from-indigo-500/20 to-purple-500/20',
        bgSolid: 'bg-indigo-500/20'
    },
    'college': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["MdSchool"],
        color: 'text-emerald-400',
        bg: 'from-emerald-500/20 to-green-500/20',
        bgSolid: 'bg-emerald-500/20'
    },
    'default': {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FiMessageCircle"],
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
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { category: urlCategory, userId: urlUserId, conversationId: urlConversationId } = router.query; // Get URL parameters
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('rides'); // 'rides', 'marketplace', 'direct'
    const [threads, setThreads] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedThread, setSelectedThread] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [newMessage, setNewMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [usersData, setUsersData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [unreadCounts, setUnreadCounts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({}); // Track unread counts per thread
    const [pendingConversationId, setPendingConversationId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null); // For auto-selecting conversation
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const threadsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(threads); // Ref to access latest threads state in listeners
    // Get per-category unread counts from context
    const { rideUnreadCount, directUnreadCount, marketplaceUnreadCount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$UnreadContext$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["useUnread"])();
    // Keep threadsRef in sync with threads state
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Messages.useEffect": ()=>{
            threadsRef.current = threads;
        }
    }["Messages.useEffect"], [
        threads
    ]);
    const categories = [
        {
            id: 'rides',
            label: 'Rides',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["MdFlight"]
        },
        {
            id: 'marketplace',
            label: 'Marketplace',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$md$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["MdShoppingCart"]
        },
        {
            id: 'direct',
            label: 'Direct',
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FiUser"]
        }
    ];
    // Redirect to login if not authenticated
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Messages.useEffect": ()=>{
            if (!loading && !user) {
                router.push('/login');
            }
        }
    }["Messages.useEffect"], [
        user,
        loading,
        router
    ]);
    // Handle URL parameters (for "Message Host" feature)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Messages.useEffect": ()=>{
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
                    const fetchOtherUserName = {
                        "Messages.useEffect.fetchOtherUserName": async ()=>{
                            try {
                                const otherUserDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'users', urlUserId));
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
                        }
                    }["Messages.useEffect.fetchOtherUserName"];
                    fetchOtherUserName();
                }
                // If conversationId is provided for marketplace, store it for auto-selection
                if (urlCategory === 'marketplace' && urlConversationId) {
                    setPendingConversationId(urlConversationId);
                }
            }
        }
    }["Messages.useEffect"], [
        urlCategory,
        urlUserId,
        urlConversationId,
        user
    ]);
    // Auto-select marketplace conversation when threads load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Messages.useEffect": ()=>{
            if (pendingConversationId && threads.length > 0 && activeCategory === 'marketplace') {
                const targetThread = threads.find({
                    "Messages.useEffect.targetThread": (t)=>t.id === pendingConversationId
                }["Messages.useEffect.targetThread"]);
                if (targetThread) {
                    setSelectedThread(targetThread);
                    setPendingConversationId(null); // Clear so it doesn't re-select
                }
            }
        }
    }["Messages.useEffect"], [
        pendingConversationId,
        threads,
        activeCategory
    ]);
    // Check screen width for mobile detection
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Messages.useEffect": ()=>{
            const checkMobile = {
                "Messages.useEffect.checkMobile": ()=>{
                    setIsMobile(window.innerWidth < 768); // md breakpoint is 768px
                }
            }["Messages.useEffect.checkMobile"];
            checkMobile();
            window.addEventListener('resize', checkMobile);
            return ({
                "Messages.useEffect": ()=>window.removeEventListener('resize', checkMobile)
            })["Messages.useEffect"];
        }
    }["Messages.useEffect"], []);
    // Check authentication
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Messages.useEffect": ()=>{
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$auth$2f$dist$2f$esm$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onAuthStateChanged"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["auth"], {
                "Messages.useEffect.unsubscribe": (currentUser)=>{
                    if (currentUser) {
                        setUser(currentUser);
                    } else {
                        router.push('/login');
                    }
                }
            }["Messages.useEffect.unsubscribe"]);
            return ({
                "Messages.useEffect": ()=>unsubscribe()
            })["Messages.useEffect"];
        }
    }["Messages.useEffect"], [
        router
    ]);
    // Fetch user display names
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Messages.useEffect": ()=>{
            if (!user) return;
            const fetchUserData = {
                "Messages.useEffect.fetchUserData": async (userId)=>{
                    if (usersData[userId]) return;
                    try {
                        const userDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'users', userId));
                        if (userDoc.exists()) {
                            setUsersData({
                                "Messages.useEffect.fetchUserData": (prev)=>({
                                        ...prev,
                                        [userId]: {
                                            name: capitalizeName(userDoc.data().name || userDoc.data().email || 'Anonymous'),
                                            email: userDoc.data().email
                                        }
                                    })
                            }["Messages.useEffect.fetchUserData"]);
                        }
                    } catch (error) {
                        console.error('Error fetching user:', error);
                    }
                }
            }["Messages.useEffect.fetchUserData"];
            // Fetch user data for all participants when threads change
            threads.forEach({
                "Messages.useEffect": (thread)=>{
                    if (thread.participants) {
                        thread.participants.forEach({
                            "Messages.useEffect": (participantId)=>{
                                if (participantId !== 'system') {
                                    fetchUserData(participantId);
                                }
                            }
                        }["Messages.useEffect"]);
                    }
                    if (thread.lastMessageSenderId && thread.lastMessageSenderId !== 'system') {
                        fetchUserData(thread.lastMessageSenderId);
                    }
                }
            }["Messages.useEffect"]);
        }
    }["Messages.useEffect"], [
        threads,
        user
    ]);
    // Fetch threads based on active category
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Messages.useEffect": ()=>{
            if (!user) return;
            if (activeCategory === 'rides') {
                // Fetch ride threads
                const ridesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'rides');
                const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["query"])(ridesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["where"])('participants', 'array-contains', user.uid));
                const messageUnsubscribers = [];
                const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, {
                    "Messages.useEffect.unsubscribe": (snapshot)=>{
                        // Unsubscribe from previous message listeners
                        messageUnsubscribers.forEach({
                            "Messages.useEffect.unsubscribe": (unsub)=>unsub()
                        }["Messages.useEffect.unsubscribe"]);
                        messageUnsubscribers.length = 0;
                        const rideThreadsMap = new Map();
                        snapshot.docs.forEach({
                            "Messages.useEffect.unsubscribe": (rideDoc)=>{
                                const rideData = rideDoc.data();
                                // Get lastRead value, ignoring null (pending serverTimestamp)
                                const lastReadValue = rideData[`lastRead_${user.uid}`];
                                let initialLastRead = null;
                                if (lastReadValue !== null && lastReadValue !== undefined) {
                                    initialLastRead = lastReadValue;
                                } else if (lastReadValue === null) {
                                    // If null (pending serverTimestamp), try to get existing value from current state
                                    const existingThread = threadsRef.current.find({
                                        "Messages.useEffect.unsubscribe.existingThread": (t)=>t.id === rideDoc.id
                                    }["Messages.useEffect.unsubscribe.existingThread"]);
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
                                const rideDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'rides', rideDoc.id);
                                const unsubRideDoc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(rideDocRef, {
                                    "Messages.useEffect.unsubscribe.unsubRideDoc": (updatedRideDoc)=>{
                                        const thread = rideThreadsMap.get(rideDoc.id);
                                        if (!thread) return;
                                        const updatedRideData = updatedRideDoc.data();
                                        if (updatedRideData) {
                                            const newLastRead = updatedRideData[`lastRead_${user.uid}`];
                                            // Update lastReadTimestamp - keep existing value if new value is null (pending serverTimestamp)
                                            if (newLastRead !== undefined && newLastRead !== null) {
                                                thread.lastReadTimestamp = newLastRead;
                                                // Force threads state update with the new timestamp
                                                const updatedThreads = Array.from(rideThreadsMap.values()).sort({
                                                    "Messages.useEffect.unsubscribe.unsubRideDoc.updatedThreads": (a, b)=>b.lastMessageTime - a.lastMessageTime
                                                }["Messages.useEffect.unsubscribe.unsubRideDoc.updatedThreads"]);
                                                setThreads(updatedThreads);
                                            }
                                        }
                                    }
                                }["Messages.useEffect.unsubscribe.unsubRideDoc"]);
                                messageUnsubscribers.push(unsubRideDoc);
                                // Set up real-time listener for messages
                                const messagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'rides', rideDoc.id, 'messages');
                                const messagesQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["query"])(messagesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["orderBy"])('timestamp', 'desc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["limit"])(10));
                                const unsubMsg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(messagesQuery, {
                                    "Messages.useEffect.unsubscribe.unsubMsg": (msgSnapshot)=>{
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
                                            thread.unreadCount = msgSnapshot.docs.filter({
                                                "Messages.useEffect.unsubscribe.unsubMsg": (doc)=>{
                                                    const msgData = doc.data();
                                                    const msgTime = msgData.timestamp?.toDate ? msgData.timestamp.toDate() : new Date(0);
                                                    return msgTime > lastReadTime && msgData.senderId !== user.uid;
                                                }
                                            }["Messages.useEffect.unsubscribe.unsubMsg"]).length;
                                        } else {
                                            // No lastRead timestamp means all messages are unread
                                            thread.unreadCount = msgSnapshot.docs.filter({
                                                "Messages.useEffect.unsubscribe.unsubMsg": (doc)=>doc.data().senderId !== user.uid
                                            }["Messages.useEffect.unsubscribe.unsubMsg"]).length;
                                        }
                                        // Update threads state
                                        const updatedThreads = Array.from(rideThreadsMap.values()).sort({
                                            "Messages.useEffect.unsubscribe.unsubMsg.updatedThreads": (a, b)=>b.lastMessageTime - a.lastMessageTime
                                        }["Messages.useEffect.unsubscribe.unsubMsg.updatedThreads"]);
                                        setThreads(updatedThreads);
                                    }
                                }["Messages.useEffect.unsubscribe.unsubMsg"], {
                                    "Messages.useEffect.unsubscribe.unsubMsg": (error)=>{
                                        if (error.code !== 'permission-denied') {
                                            console.error('Error fetching messages:', error);
                                        }
                                    }
                                }["Messages.useEffect.unsubscribe.unsubMsg"]);
                                messageUnsubscribers.push(unsubMsg);
                            }
                        }["Messages.useEffect.unsubscribe"]);
                        setLoading(false);
                    }
                }["Messages.useEffect.unsubscribe"], {
                    "Messages.useEffect.unsubscribe": (error)=>{
                        console.error('Error fetching rides:', error);
                        setLoading(false);
                    }
                }["Messages.useEffect.unsubscribe"]);
                return ({
                    "Messages.useEffect": ()=>{
                        unsubscribe();
                        messageUnsubscribers.forEach({
                            "Messages.useEffect": (unsub)=>unsub()
                        }["Messages.useEffect"]);
                    }
                })["Messages.useEffect"];
            } else if (activeCategory === 'direct') {
                // Fetch direct message threads
                const directMessagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'directMessages');
                const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["query"])(directMessagesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["where"])('participants', 'array-contains', user.uid));
                const messageUnsubscribers = [];
                const directThreadsMap = new Map();
                const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, {
                    "Messages.useEffect.unsubscribe": async (snapshot)=>{
                        for (const threadDoc of snapshot.docs){
                            const threadData = threadDoc.data();
                            const otherUserId = threadData.participants.find({
                                "Messages.useEffect.unsubscribe.otherUserId": (id)=>id !== user.uid
                            }["Messages.useEffect.unsubscribe.otherUserId"]);
                            // Get lastRead value, ignoring null (pending serverTimestamp)
                            const lastReadValue = threadData[`lastRead_${user.uid}`];
                            let initialLastRead = null;
                            if (lastReadValue !== null && lastReadValue !== undefined) {
                                initialLastRead = lastReadValue;
                            } else if (lastReadValue === null) {
                                // If null (pending serverTimestamp), try to get existing value from current state
                                const existingThread = threadsRef.current.find({
                                    "Messages.useEffect.unsubscribe.existingThread": (t)=>t.id === threadDoc.id
                                }["Messages.useEffect.unsubscribe.existingThread"]);
                                if (existingThread?.lastReadTimestamp) {
                                    initialLastRead = existingThread.lastReadTimestamp;
                                }
                            }
                            // Fetch other user's name
                            let otherUserName = 'User';
                            try {
                                const otherUserDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getDoc"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'users', otherUserId));
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
                            const threadDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'directMessages', threadDoc.id);
                            const unsubThreadDoc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(threadDocRef, {
                                "Messages.useEffect.unsubscribe.unsubThreadDoc": (updatedThreadDoc)=>{
                                    const thread = directThreadsMap.get(threadDoc.id);
                                    if (!thread) return;
                                    const updatedThreadData = updatedThreadDoc.data();
                                    if (updatedThreadData) {
                                        const newLastRead = updatedThreadData[`lastRead_${user.uid}`];
                                        // Update lastReadTimestamp - keep existing value if new value is null (pending serverTimestamp)
                                        if (newLastRead !== undefined && newLastRead !== null) {
                                            thread.lastReadTimestamp = newLastRead;
                                            // Force threads state update with the new timestamp
                                            const updatedThreads = Array.from(directThreadsMap.values()).sort({
                                                "Messages.useEffect.unsubscribe.unsubThreadDoc.updatedThreads": (a, b)=>b.lastMessageTime - a.lastMessageTime
                                            }["Messages.useEffect.unsubscribe.unsubThreadDoc.updatedThreads"]);
                                            setThreads(updatedThreads);
                                        }
                                        // Always update message metadata
                                        thread.lastMessage = updatedThreadData.lastMessage || 'No messages yet';
                                        thread.lastMessageTime = updatedThreadData.lastMessageTime?.toDate ? updatedThreadData.lastMessageTime.toDate() : new Date(0);
                                    }
                                }
                            }["Messages.useEffect.unsubscribe.unsubThreadDoc"]);
                            messageUnsubscribers.push(unsubThreadDoc);
                            // Listen to messages for unread count calculation
                            const messagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'directMessages', threadDoc.id, 'messages');
                            const messagesQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["query"])(messagesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["orderBy"])('timestamp', 'desc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["limit"])(10));
                            const unsubMsg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(messagesQuery, {
                                "Messages.useEffect.unsubscribe.unsubMsg": (msgSnapshot)=>{
                                    const thread = directThreadsMap.get(threadDoc.id);
                                    if (!thread) return;
                                    // Calculate unread count using the current lastReadTimestamp from thread object
                                    if (thread.lastReadTimestamp) {
                                        const lastReadTime = thread.lastReadTimestamp.toDate ? thread.lastReadTimestamp.toDate() : new Date(0);
                                        thread.unreadCount = msgSnapshot.docs.filter({
                                            "Messages.useEffect.unsubscribe.unsubMsg": (doc)=>{
                                                const msgData = doc.data();
                                                const msgTime = msgData.timestamp?.toDate ? msgData.timestamp.toDate() : new Date(0);
                                                return msgTime > lastReadTime && msgData.senderId === thread.otherUserId;
                                            }
                                        }["Messages.useEffect.unsubscribe.unsubMsg"]).length;
                                    } else {
                                        // No lastRead timestamp means all messages from other user are unread
                                        thread.unreadCount = msgSnapshot.docs.filter({
                                            "Messages.useEffect.unsubscribe.unsubMsg": (doc)=>doc.data().senderId === thread.otherUserId
                                        }["Messages.useEffect.unsubscribe.unsubMsg"]).length;
                                    }
                                    // Update threads state
                                    const updatedThreads = Array.from(directThreadsMap.values()).sort({
                                        "Messages.useEffect.unsubscribe.unsubMsg.updatedThreads": (a, b)=>b.lastMessageTime - a.lastMessageTime
                                    }["Messages.useEffect.unsubscribe.unsubMsg.updatedThreads"]);
                                    setThreads(updatedThreads);
                                }
                            }["Messages.useEffect.unsubscribe.unsubMsg"]);
                            messageUnsubscribers.push(unsubMsg);
                        }
                        setLoading(false);
                    }
                }["Messages.useEffect.unsubscribe"], {
                    "Messages.useEffect.unsubscribe": (error)=>{
                        console.error('Error fetching direct messages:', error);
                        setLoading(false);
                    }
                }["Messages.useEffect.unsubscribe"]);
                return ({
                    "Messages.useEffect": ()=>{
                        unsubscribe();
                        messageUnsubscribers.forEach({
                            "Messages.useEffect": (unsub)=>unsub()
                        }["Messages.useEffect"]);
                    }
                })["Messages.useEffect"];
            } else if (activeCategory === 'marketplace') {
                // Fetch marketplace conversation threads
                const conversationsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'conversations');
                const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["query"])(conversationsRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["where"])('participants', 'array-contains', user.uid), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["where"])('type', '==', 'marketplace'));
                const messageUnsubscribers = [];
                const marketplaceThreadsMap = new Map();
                const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, {
                    "Messages.useEffect.unsubscribe": async (snapshot)=>{
                        for (const convoDoc of snapshot.docs){
                            const convoData = convoDoc.data();
                            const otherUserId = convoData.participants.find({
                                "Messages.useEffect.unsubscribe.otherUserId": (id)=>id !== user.uid
                            }["Messages.useEffect.unsubscribe.otherUserId"]);
                            // Determine if current user is buyer or seller
                            const isSeller = convoData.user2Id === user.uid;
                            const otherUserName = isSeller ? convoData.user1Name : convoData.user2Name;
                            // Get lastRead value
                            const lastReadValue = convoData[`lastRead_${user.uid}`];
                            let initialLastRead = null;
                            if (lastReadValue !== null && lastReadValue !== undefined) {
                                initialLastRead = lastReadValue;
                            }
                            // Initialize thread data
                            marketplaceThreadsMap.set(convoDoc.id, {
                                id: convoDoc.id,
                                type: 'marketplace',
                                title: convoData.productName || 'Product',
                                subtitle: otherUserName || 'User',
                                productPhoto: convoData.productPhoto,
                                productPrice: convoData.productPrice,
                                productPriceType: convoData.productPriceType,
                                productId: convoData.productId,
                                participants: convoData.participants || [],
                                participantCount: 2,
                                lastMessage: convoData.lastMessage || 'No messages yet',
                                lastMessageSenderId: null,
                                lastMessageTime: convoData.lastMessageTime?.toDate ? convoData.lastMessageTime.toDate() : new Date(0),
                                themeKey: 'default',
                                unreadCount: 0,
                                lastReadTimestamp: initialLastRead,
                                otherUserId: otherUserId
                            });
                            // Listen to the conversation document for updates
                            const convoDocRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'conversations', convoDoc.id);
                            const unsubConvoDoc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(convoDocRef, {
                                "Messages.useEffect.unsubscribe.unsubConvoDoc": (updatedConvoDoc)=>{
                                    const thread = marketplaceThreadsMap.get(convoDoc.id);
                                    if (!thread) return;
                                    const updatedConvoData = updatedConvoDoc.data();
                                    if (updatedConvoData) {
                                        const newLastRead = updatedConvoData[`lastRead_${user.uid}`];
                                        if (newLastRead !== undefined && newLastRead !== null) {
                                            thread.lastReadTimestamp = newLastRead;
                                        }
                                        thread.lastMessage = updatedConvoData.lastMessage || 'No messages yet';
                                        thread.lastMessageTime = updatedConvoData.lastMessageTime?.toDate ? updatedConvoData.lastMessageTime.toDate() : new Date(0);
                                        const updatedThreads = Array.from(marketplaceThreadsMap.values()).sort({
                                            "Messages.useEffect.unsubscribe.unsubConvoDoc.updatedThreads": (a, b)=>b.lastMessageTime - a.lastMessageTime
                                        }["Messages.useEffect.unsubscribe.unsubConvoDoc.updatedThreads"]);
                                        setThreads(updatedThreads);
                                    }
                                }
                            }["Messages.useEffect.unsubscribe.unsubConvoDoc"]);
                            messageUnsubscribers.push(unsubConvoDoc);
                            // Listen to messages for unread count
                            const messagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'conversations', convoDoc.id, 'messages');
                            const messagesQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["query"])(messagesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["orderBy"])('timestamp', 'desc'), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["limit"])(10));
                            const unsubMsg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(messagesQuery, {
                                "Messages.useEffect.unsubscribe.unsubMsg": (msgSnapshot)=>{
                                    const thread = marketplaceThreadsMap.get(convoDoc.id);
                                    if (!thread) return;
                                    if (thread.lastReadTimestamp) {
                                        const lastReadTime = thread.lastReadTimestamp.toDate ? thread.lastReadTimestamp.toDate() : new Date(0);
                                        thread.unreadCount = msgSnapshot.docs.filter({
                                            "Messages.useEffect.unsubscribe.unsubMsg": (doc)=>{
                                                const msgData = doc.data();
                                                const msgTime = msgData.timestamp?.toDate ? msgData.timestamp.toDate() : new Date(0);
                                                return msgTime > lastReadTime && msgData.senderId === thread.otherUserId;
                                            }
                                        }["Messages.useEffect.unsubscribe.unsubMsg"]).length;
                                    } else {
                                        thread.unreadCount = msgSnapshot.docs.filter({
                                            "Messages.useEffect.unsubscribe.unsubMsg": (doc)=>doc.data().senderId === thread.otherUserId
                                        }["Messages.useEffect.unsubscribe.unsubMsg"]).length;
                                    }
                                    const updatedThreads = Array.from(marketplaceThreadsMap.values()).sort({
                                        "Messages.useEffect.unsubscribe.unsubMsg.updatedThreads": (a, b)=>b.lastMessageTime - a.lastMessageTime
                                    }["Messages.useEffect.unsubscribe.unsubMsg.updatedThreads"]);
                                    setThreads(updatedThreads);
                                }
                            }["Messages.useEffect.unsubscribe.unsubMsg"]);
                            messageUnsubscribers.push(unsubMsg);
                        }
                        setLoading(false);
                    }
                }["Messages.useEffect.unsubscribe"], {
                    "Messages.useEffect.unsubscribe": (error)=>{
                        console.error('Error fetching marketplace conversations:', error);
                        setLoading(false);
                    }
                }["Messages.useEffect.unsubscribe"]);
                return ({
                    "Messages.useEffect": ()=>{
                        unsubscribe();
                        messageUnsubscribers.forEach({
                            "Messages.useEffect": (unsub)=>unsub()
                        }["Messages.useEffect"]);
                    }
                })["Messages.useEffect"];
            } else {
                // Unknown category
                setThreads([]);
                setLoading(false);
            }
        }
    }["Messages.useEffect"], [
        user,
        activeCategory
    ]);
    // Fetch messages for selected thread
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Messages.useEffect": ()=>{
            if (!selectedThread || !user) return;
            let messagesRef;
            let retryTimeout;
            let unsubscribe;
            // Determine the correct Firestore path based on thread type
            if (selectedThread.type === 'ride') {
                messagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'rides', selectedThread.id, 'messages');
            } else if (selectedThread.type === 'direct') {
                messagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'directMessages', selectedThread.id, 'messages');
            } else if (selectedThread.type === 'marketplace') {
                messagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'conversations', selectedThread.id, 'messages');
            } else {
                return;
            }
            const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["query"])(messagesRef, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["orderBy"])('timestamp', 'asc'));
            const setupListener = {
                "Messages.useEffect.setupListener": ()=>{
                    unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["onSnapshot"])(q, {
                        "Messages.useEffect.setupListener": async (snapshot)=>{
                            const msgs = snapshot.docs.map({
                                "Messages.useEffect.setupListener.msgs": (doc)=>({
                                        id: doc.id,
                                        ...doc.data()
                                    })
                            }["Messages.useEffect.setupListener.msgs"]);
                            setMessages(msgs);
                            setTimeout({
                                "Messages.useEffect.setupListener": ()=>messagesEndRef.current?.scrollIntoView({
                                        behavior: 'smooth'
                                    })
                            }["Messages.useEffect.setupListener"], 100);
                        }
                    }["Messages.useEffect.setupListener"], {
                        "Messages.useEffect.setupListener": (error)=>{
                            // Handle permission errors gracefully
                            if (error.code === 'permission-denied') {
                                setMessages([]);
                                // Retry after 2 seconds - user might be added as participant
                                retryTimeout = setTimeout({
                                    "Messages.useEffect.setupListener": ()=>{
                                        if (unsubscribe) unsubscribe();
                                        setupListener();
                                    }
                                }["Messages.useEffect.setupListener"], 2000);
                            } else {
                                console.error('Error fetching messages:', error);
                            }
                        }
                    }["Messages.useEffect.setupListener"]);
                }
            }["Messages.useEffect.setupListener"];
            setupListener();
            return ({
                "Messages.useEffect": ()=>{
                    if (unsubscribe) unsubscribe();
                    if (retryTimeout) clearTimeout(retryTimeout);
                }
            })["Messages.useEffect"];
        }
    }["Messages.useEffect"], [
        selectedThread,
        user
    ]);
    // Separate effect to update lastRead timestamp when viewing messages
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Messages.useEffect": ()=>{
            if (!selectedThread || !user || messages.length === 0) return;
            // Update lastReadTimestamp for this user in the thread
            const updateLastRead = {
                "Messages.useEffect.updateLastRead": async ()=>{
                    try {
                        if (selectedThread.type === 'direct') {
                            const threadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'directMessages', selectedThread.id);
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setDoc"])(threadRef, {
                                [`lastRead_${user.uid}`]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                            }, {
                                merge: true
                            });
                        } else if (selectedThread.type === 'ride') {
                            const threadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'rides', selectedThread.id);
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setDoc"])(threadRef, {
                                [`lastRead_${user.uid}`]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                            }, {
                                merge: true
                            });
                        } else if (selectedThread.type === 'marketplace') {
                            const threadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'conversations', selectedThread.id);
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setDoc"])(threadRef, {
                                [`lastRead_${user.uid}`]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                            }, {
                                merge: true
                            });
                        }
                    } catch (error) {
                        console.error('Error updating lastRead timestamp:', error);
                    }
                }
            }["Messages.useEffect.updateLastRead"];
            updateLastRead();
        }
    }["Messages.useEffect"], [
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
                messagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'rides', selectedThread.id, 'messages');
                // For rides, ensure user is a participant before sending
                const rideRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'rides', selectedThread.id);
                const rideDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getDoc"])(rideRef);
                if (rideDoc.exists()) {
                    const rideData = rideDoc.data();
                    if (!rideData.participants?.includes(user.uid)) {
                        // User is not a participant - shouldn't happen but handle gracefully
                        console.warn('User not a participant, message may fail');
                    }
                }
            } else if (selectedThread.type === 'direct') {
                // For direct messages, ensure the thread document exists first
                const threadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'directMessages', selectedThread.id);
                const threadDoc = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["getDoc"])(threadRef);
                if (!threadDoc.exists()) {
                    // Create the thread document if it doesn't exist
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setDoc"])(threadRef, {
                        participants: selectedThread.participants,
                        createdAt: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                        lastMessageTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                        lastMessage: newMessage.trim()
                    });
                } else {
                    // Update existing thread using setDoc with merge to avoid permission issues
                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setDoc"])(threadRef, {
                        lastMessageTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                        lastMessage: newMessage.trim()
                    }, {
                        merge: true
                    });
                }
                messagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'directMessages', selectedThread.id, 'messages');
            } else if (selectedThread.type === 'marketplace') {
                // For marketplace conversations
                const convoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'conversations', selectedThread.id);
                // Update conversation with last message
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setDoc"])(convoRef, {
                    lastMessageTime: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["serverTimestamp"])(),
                    lastMessage: newMessage.trim()
                }, {
                    merge: true
                });
                messagesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["collection"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'conversations', selectedThread.id, 'messages');
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
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["addDoc"])(messagesRef, {
                text: newMessage.trim(),
                senderId: user.uid,
                senderName: capitalizeName(user.displayName || user.email || 'Anonymous'),
                timestamp: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-[#0A0A0A] ",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-16 h-16 mx-auto mb-4 border-4 border-primary/30 border-t-primary rounded-full animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/pages/messages.jsx",
                        lineNumber: 835,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-gray-400 text-lg",
                        children: "Loading messages..."
                    }, void 0, false, {
                        fileName: "[project]/pages/messages.jsx",
                        lineNumber: 836,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/messages.jsx",
                lineNumber: 834,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/pages/messages.jsx",
            lineNumber: 833,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col bg-[#0A0A0A] ",
        style: {
            height: '90vh'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-none border-b border-white/10 bg-[#0A0A0A]/95 backdrop-blur-lg ",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-b border-white/10",
                            style: {
                                marginTop: "2vh",
                                marginBottom: "2vh"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-2xl mx-auto px-6 py-4 flex items-center gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].button, {
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
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$hi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["HiArrowLeft"], {
                                            size: 24,
                                            className: "text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/pages/messages.jsx",
                                            lineNumber: 861,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 849,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-bold text-white",
                                        children: 'Messages'
                                    }, void 0, false, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 863,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/messages.jsx",
                                lineNumber: 848,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/messages.jsx",
                            lineNumber: 847,
                            columnNumber: 11
                        }, this),
                        (!selectedThread || !isMobile) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-4 bg-white/5 p-1 rounded-2xl backdrop-blur-xl bg-[#0A0A0A]",
                            style: {
                                height: "6vh",
                                marginTop: "5vh",
                                background: "#0A0A0A"
                            },
                            children: categories.map((category)=>{
                                const Icon = category.icon;
                                // Get unread count for this category from context
                                let categoryUnread = 0;
                                if (category.id === 'rides') {
                                    categoryUnread = rideUnreadCount;
                                } else if (category.id === 'direct') {
                                    categoryUnread = directUnreadCount;
                                } else if (category.id === 'marketplace') {
                                    categoryUnread = marketplaceUnreadCount;
                                }
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setActiveCategory(category.id);
                                        setSelectedThread(null);
                                    },
                                    className: `bg-[#0A0A0A] flex-1 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 relative ${activeCategory === category.id ? 'bg-gradient-to-r from-primary to-accent text-white' : 'text-gray-400 hover:text-white'}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                            size: 18
                                        }, void 0, false, {
                                            fileName: "[project]/pages/messages.jsx",
                                            lineNumber: 897,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm",
                                            children: category.label
                                        }, void 0, false, {
                                            fileName: "[project]/pages/messages.jsx",
                                            lineNumber: 898,
                                            columnNumber: 21
                                        }, this),
                                        categoryUnread > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1.5",
                                            children: categoryUnread > 9 ? '9+' : categoryUnread
                                        }, void 0, false, {
                                            fileName: "[project]/pages/messages.jsx",
                                            lineNumber: 900,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, category.id, true, {
                                    fileName: "[project]/pages/messages.jsx",
                                    lineNumber: 885,
                                    columnNumber: 19
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/pages/messages.jsx",
                            lineNumber: 871,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/pages/messages.jsx",
                    lineNumber: 846,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/pages/messages.jsx",
                lineNumber: 845,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: isMobile ? '100vw' : '15vw',
                            paddingLeft: isMobile ? '2vw' : '0',
                            paddingRight: isMobile ? '2vw' : '0'
                        },
                        className: `border-r border-white/10 flex flex-col bg-[#0A0A0A]  ${selectedThread ? 'hidden md:block' : 'block'}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 overflow-y-auto",
                            children: threads.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-8 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FiMessageCircle"], {
                                        className: "mx-auto text-gray-600 mb-3",
                                        size: 48
                                    }, void 0, false, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 928,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-500 text-sm",
                                        children: [
                                            "No ",
                                            activeCategory,
                                            " messages yet"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 929,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/messages.jsx",
                                lineNumber: 927,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                const threadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'directMessages', thread.id);
                                                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setDoc"])(threadRef, {
                                                    [`lastRead_${user.uid}`]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                                                }, {
                                                    merge: true
                                                });
                                            } else if (thread.type === 'ride') {
                                                const threadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'rides', thread.id);
                                                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setDoc"])(threadRef, {
                                                    [`lastRead_${user.uid}`]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                                                }, {
                                                    merge: true
                                                });
                                            } else if (thread.type === 'marketplace') {
                                                const threadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["doc"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$firebase$2e$js__$5b$client$5d$__$28$ecmascript$29$__["db"], 'conversations', thread.id);
                                                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["setDoc"])(threadRef, {
                                                    [`lastRead_${user.uid}`]: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$firestore$2f$dist$2f$index$2e$esm$2e$js__$5b$client$5d$__$28$ecmascript$29$__["serverTimestamp"])()
                                                }, {
                                                    merge: true
                                                });
                                            }
                                        } catch (error) {
                                            console.error('❌ Error updating lastRead on click:', error);
                                        }
                                    };
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        style: {
                                            marginBottom: "1vh",
                                            marginTop: "1vh"
                                        },
                                        whileHover: {
                                            backgroundColor: 'rgba(255,255,255,0.03)'
                                        },
                                        onClick: handleThreadClick,
                                        className: `p-4 cursor-pointer transition-all relative ${isSelected ? 'bg-white/10 border-l-4 border-primary' : ''}`,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                thread.type === 'marketplace' && thread.productPhoto ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-full overflow-hidden flex-shrink-0 relative bg-[#0D0D0D]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: thread.productPhoto,
                                                            alt: "",
                                                            className: "w-full h-full object-cover"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 999,
                                                            columnNumber: 29
                                                        }, this),
                                                        hasUnread && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg",
                                                            children: thread.unreadCount > 9 ? '9+' : thread.unreadCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 1001,
                                                            columnNumber: 31
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/messages.jsx",
                                                    lineNumber: 998,
                                                    columnNumber: 27
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `w-12 h-12 rounded-full bg-gradient-to-br ${theme.bg} flex items-center justify-center flex-shrink-0 relative`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                            className: theme.color,
                                                            size: 24
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 1008,
                                                            columnNumber: 29
                                                        }, this),
                                                        hasUnread && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg",
                                                            children: thread.unreadCount > 9 ? '9+' : thread.unreadCount
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 1010,
                                                            columnNumber: 31
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/messages.jsx",
                                                    lineNumber: 1007,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between mb-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: `text-sm font-bold truncate ${hasUnread ? 'text-white' : 'text-white'}`,
                                                                    children: thread.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/messages.jsx",
                                                                    lineNumber: 1020,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs text-gray-500 ml-2 flex-shrink-0",
                                                                    style: {
                                                                        marginRight: "1vw"
                                                                    },
                                                                    children: formatTime(thread.lastMessageTime)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/messages.jsx",
                                                                    lineNumber: 1023,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 1019,
                                                            columnNumber: 27
                                                        }, this),
                                                        thread.type === 'marketplace' && thread.subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-primary mb-0.5",
                                                            children: thread.subtitle
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 1029,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: `text-xs truncate ${hasUnread ? 'text-gray-300 font-semibold' : 'text-gray-400'}`,
                                                            children: getLastMessagePreview(thread)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 1031,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/messages.jsx",
                                                    lineNumber: 1018,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/messages.jsx",
                                            lineNumber: 995,
                                            columnNumber: 23
                                        }, this)
                                    }, thread.id, false, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 986,
                                        columnNumber: 21
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/pages/messages.jsx",
                                lineNumber: 932,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/messages.jsx",
                            lineNumber: 925,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/pages/messages.jsx",
                        lineNumber: 915,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex-1 flex flex-col bg-[#0A0A0A] bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10  ${selectedThread ? 'block' : 'hidden md:flex'}`,
                        children: !selectedThread ? // Skeleton Placeholder
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 flex items-center justify-center p-8",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center max-w-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            scale: 0.9,
                                            opacity: 0
                                        },
                                        animate: {
                                            scale: 1,
                                            opacity: 1
                                        },
                                        className: "w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FiMessageCircle"], {
                                            className: "text-gray-600",
                                            size: 64
                                        }, void 0, false, {
                                            fileName: "[project]/pages/messages.jsx",
                                            lineNumber: 1057,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 1052,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-2xl font-bold text-white mb-3",
                                        children: "Select a conversation"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 1059,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-400",
                                        children: "Choose a thread from the left to start messaging"
                                    }, void 0, false, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 1060,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/pages/messages.jsx",
                                lineNumber: 1051,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/pages/messages.jsx",
                            lineNumber: 1050,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-none border-b border-white/10 p-4 bg-[#0A0A0A]/95 backdrop-blur-lg bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 ",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                (()=>{
                                                    const theme = destinationThemes[selectedThread.themeKey];
                                                    const Icon = theme.icon;
                                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: `w-10 h-10 rounded-full bg-gradient-to-br ${theme.bg} flex items-center justify-center`,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                            className: theme.color,
                                                            size: 20
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 1074,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/messages.jsx",
                                                        lineNumber: 1073,
                                                        columnNumber: 25
                                                    }, this);
                                                })(),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            className: "text-lg font-bold text-white",
                                                            children: selectedThread.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 1079,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-400",
                                                            children: [
                                                                selectedThread.participantCount,
                                                                " participants"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 1080,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/pages/messages.jsx",
                                                    lineNumber: 1078,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/messages.jsx",
                                            lineNumber: 1068,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 1067,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/messages.jsx",
                                    lineNumber: 1066,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar",
                                    style: {
                                        padding: "1vw"
                                    },
                                    children: [
                                        messages.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-center py-12",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$fi$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["FiMessageCircle"], {
                                                        className: "text-purple-400",
                                                        size: 32
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/messages.jsx",
                                                        lineNumber: 1094,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/messages.jsx",
                                                    lineNumber: 1093,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm text-gray-400",
                                                    children: "No messages yet"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/messages.jsx",
                                                    lineNumber: 1096,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs mt-1 text-gray-500",
                                                    children: "Be the first to say hi! 👋"
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/messages.jsx",
                                                    lineNumber: 1097,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/pages/messages.jsx",
                                            lineNumber: 1092,
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
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        showTimestamp && message.timestamp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-center my-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                                lineNumber: 1142,
                                                                columnNumber: 31
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 1141,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex justify-center my-4",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "bg-white/5 px-4 py-2 rounded-full max-w-md",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-xs text-gray-400 text-center",
                                                                    children: message.text
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/messages.jsx",
                                                                    lineNumber: 1164,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/messages.jsx",
                                                                lineNumber: 1163,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/messages.jsx",
                                                            lineNumber: 1162,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, message.id, true, {
                                                    fileName: "[project]/pages/messages.jsx",
                                                    lineNumber: 1138,
                                                    columnNumber: 25
                                                }, this);
                                            }
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    showTimestamp && message.timestamp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-center my-4",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                                                            lineNumber: 1176,
                                                            columnNumber: 29
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/messages.jsx",
                                                        lineNumber: 1175,
                                                        columnNumber: 27
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
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
                                                            !isOwn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center flex-shrink-0 mb-1 cursor-pointer hover:opacity-80 transition-opacity",
                                                                onClick: ()=>message.senderId && router.push(`/profile/${message.senderId}`),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "font-semibold text-xs text-white",
                                                                    children: message.senderName?.charAt(0).toUpperCase()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/pages/messages.jsx",
                                                                    lineNumber: 1209,
                                                                    columnNumber: 31
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/messages.jsx",
                                                                lineNumber: 1205,
                                                                columnNumber: 29
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: `flex flex-col ${isOwn ? 'items-end' : 'items-start'}`,
                                                                children: [
                                                                    !isOwn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs mb-1 ml-2 text-gray-400",
                                                                        children: message.senderName
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/messages.jsx",
                                                                        lineNumber: 1218,
                                                                        columnNumber: 31
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: `rounded-2xl backdrop-blur-sm ${isOwn ? 'bg-gradient-to-br from-primary via-primary/90 to-accent text-white rounded-br-md shadow-lg shadow-primary/20' : 'bg-white/10 text-white border border-white/10 rounded-bl-md'} ${message.imageUrl ? 'p-2' : 'px-5 py-3.5'}`,
                                                                        style: message.imageUrl ? {} : {
                                                                            paddingLeft: '3vw',
                                                                            paddingRight: '3vw',
                                                                            textAlign: 'center',
                                                                            paddingTop: '0.5vh',
                                                                            paddingBottom: '0.5vh',
                                                                            marginBottom: '0.5vh'
                                                                        },
                                                                        children: message.imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "max-w-xs",
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                src: message.imageUrl,
                                                                                alt: "Shared image",
                                                                                className: "rounded-xl w-full h-auto cursor-pointer hover:opacity-90 transition-opacity",
                                                                                onClick: ()=>window.open(message.imageUrl, '_blank')
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/pages/messages.jsx",
                                                                                lineNumber: 1239,
                                                                                columnNumber: 35
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/messages.jsx",
                                                                            lineNumber: 1238,
                                                                            columnNumber: 33
                                                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm leading-relaxed break-words",
                                                                            children: message.text
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/pages/messages.jsx",
                                                                            lineNumber: 1247,
                                                                            columnNumber: 33
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/pages/messages.jsx",
                                                                        lineNumber: 1222,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/messages.jsx",
                                                                lineNumber: 1215,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/messages.jsx",
                                                        lineNumber: 1197,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, message.id, true, {
                                                fileName: "[project]/pages/messages.jsx",
                                                lineNumber: 1172,
                                                columnNumber: 23
                                            }, this);
                                        }),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            ref: messagesEndRef
                                        }, void 0, false, {
                                            fileName: "[project]/pages/messages.jsx",
                                            lineNumber: 1256,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/pages/messages.jsx",
                                    lineNumber: 1090,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 backdrop-blur-xl bg-black/20",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 px-4 py-2 bg-white/5 focus-within:border-primary/50 transition-all",
                                        style: {
                                            paddingRight: "1vw",
                                            paddingLeft: "1vw"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                lineNumber: 1263,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                whileHover: {
                                                    scale: 1.1
                                                },
                                                whileTap: {
                                                    scale: 0.9
                                                },
                                                onClick: handleSendMessage,
                                                disabled: !newMessage.trim(),
                                                className: `flex-shrink-0 transition-all ${newMessage.trim() ? 'text-primary' : 'text-gray-500 cursor-not-allowed'}`,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                    width: "24",
                                                    height: "24",
                                                    viewBox: "0 0 24 24",
                                                    fill: "currentColor",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                        d: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/messages.jsx",
                                                        lineNumber: 1284,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/pages/messages.jsx",
                                                    lineNumber: 1283,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/pages/messages.jsx",
                                                lineNumber: 1272,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/pages/messages.jsx",
                                        lineNumber: 1261,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/pages/messages.jsx",
                                    lineNumber: 1260,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/pages/messages.jsx",
                        lineNumber: 1045,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/messages.jsx",
                lineNumber: 913,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/messages.jsx",
        lineNumber: 843,
        columnNumber: 5
    }, this);
}
_s(Messages, "t8POGYFYP/o2g7B1Yn6GhLkhj14=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$UnreadContext$2e$jsx__$5b$client$5d$__$28$ecmascript$29$__["useUnread"]
    ];
});
_c = Messages;
var _c;
__turbopack_context__.k.register(_c, "Messages");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/messages.jsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/messages";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/messages.jsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/messages\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/messages.jsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__adbaf4aa._.js.map