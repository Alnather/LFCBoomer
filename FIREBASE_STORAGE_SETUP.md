# Firebase Storage CORS Setup Instructions

## Issue
The image upload feature is blocked by CORS policy when uploading to Firebase Storage.

## Solution

### Option 1: Using Firebase Console (Recommended)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **forester-swap**
3. Navigate to **Storage** in the left sidebar
4. Click on the **Rules** tab
5. Replace the rules with the content from `storage.rules` file
6. Click **Publish**

### Option 2: Using Google Cloud Console for CORS

1. Install Google Cloud SDK if you haven't already:
   - Download from: https://cloud.google.com/sdk/docs/install
   
2. Open PowerShell and authenticate:
   ```powershell
   gcloud auth login
   ```

3. Set your project:
   ```powershell
   gcloud config set project forester-swap
   ```

4. Apply CORS configuration:
   ```powershell
   gsutil cors set cors.json gs://forester-swap.firebasestorage.app
   ```

5. Verify CORS configuration:
   ```powershell
   gsutil cors get gs://forester-swap.firebasestorage.app
   ```

### Option 3: Using Firebase CLI

1. Install Firebase CLI if you haven't:
   ```powershell
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```powershell
   firebase login
   ```

3. Initialize Firebase (if not already):
   ```powershell
   firebase init storage
   ```

4. Deploy storage rules:
   ```powershell
   firebase deploy --only storage
   ```

## What Changed

### Files Updated:
1. **lib/firebase.js** - Added Firebase Storage initialization
2. **pages/ride/[id].jsx** - Implemented image upload with:
   - `handleImageUpload` function
   - Upload progress tracking
   - Loading states
   - Image display in messages
3. **pages/rides.jsx** - Added:
   - Fuzzy search for destinations
   - Date picker filter with "none" option (clear button)
   - Popular destinations chips
   - "Find Your Ride" title
   - Stagger animations for ride cards

### Features Implemented:
- ✅ Image upload to Firebase Storage
- ✅ Image display in group chat
- ✅ Fuzzy search for ride destinations
- ✅ Date picker filter on rides page
- ✅ Popular destinations quick filters
- ✅ Page title for better UI
- ✅ Smooth stagger animations as you scroll

## Testing
After setting up CORS, test the image upload by:
1. Navigate to a ride detail page
2. Join the ride (if not already)
3. Click the camera button in the group chat
4. Select an image
5. The image should upload and appear in the chat

## Notes
- Images are stored in: `ride-images/{rideId}/` in Firebase Storage
- Only authenticated users can upload images
- Anyone can view uploaded images
- The CORS configuration allows requests from localhost:3000 and your Vercel deployment
