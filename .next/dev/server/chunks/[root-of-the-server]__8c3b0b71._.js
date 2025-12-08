module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/pages/api/autocomplete.js [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
async function handler(req, res) {
    const { input } = req.query;
    if (!input) {
        return res.status(400).json({
            error: 'Input is required'
        });
    }
    try {
        const response = await fetch(`https://places.googleapis.com/v1/places:autocomplete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY
            },
            body: JSON.stringify({
                input: input,
                locationBias: {
                    circle: {
                        center: {
                            latitude: 42.258,
                            longitude: -87.841
                        },
                        radius: 5.0
                    }
                }
            })
        });
        const data = await response.json();
        if (response.ok) {
            // console.log('Google Places API (New) response:', data);
            res.status(200).json(data);
        } else {
            // console.error('Google Places API error:', data);
            res.status(500).json({
                error: 'Failed to fetch autocomplete suggestions',
                details: data
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Internal server error',
            details: error.message
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8c3b0b71._.js.map