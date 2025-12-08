# Firestore Rules Deployment

To deploy the Firestore security rules to your Firebase project:

## Option 1: Firebase Console (Easiest)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Firestore Database** → **Rules** tab
4. Copy the contents of `firestore.rules` file
5. Paste into the rules editor
6. Click **Publish**

## Option 2: Firebase CLI
```bash
# Install Firebase CLI if you haven't
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (if not already done)
firebase init firestore

# Deploy rules
firebase deploy --only firestore:rules
```

## Important Notes

The rules allow:
- **Users**: Read all profiles, write only own profile
- **Rides**: Authenticated users can read all, participants can update, organizer can delete
- **Ride Messages**: Only participants can read/write messages in their rides
- **Direct Messages**: Authenticated users can read/write their direct message threads
- **Listings**: Anyone can read, only owners can update/delete

Make sure to deploy these rules to enable the messaging functionality!
