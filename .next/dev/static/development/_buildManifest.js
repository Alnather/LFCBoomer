self.__BUILD_MANIFEST = {
  "/": [
    "static/chunks/pages/index.js"
  ],
  "/campus": [
    "static/chunks/pages/campus.js"
  ],
  "/marketplace": [
    "static/chunks/pages/marketplace.js"
  ],
  "/ride/[id]": [
    "static/chunks/pages/ride/[id].js"
  ],
  "/rides": [
    "static/chunks/pages/rides.js"
  ],
  "__rewrites": {
    "afterFiles": [],
    "beforeFiles": [],
    "fallback": []
  },
  "sortedPages": [
    "/",
    "/_app",
    "/_error",
    "/api/auth/login",
    "/api/auth/logout",
    "/api/auth/signup",
    "/auth-test",
    "/campus",
    "/chat/[id]",
    "/create-listing",
    "/listings",
    "/login",
    "/marketplace",
    "/messages",
    "/profile",
    "/ride/[id]",
    "/rides",
    "/signup"
  ]
};self.__BUILD_MANIFEST_CB && self.__BUILD_MANIFEST_CB()