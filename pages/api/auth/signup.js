import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password, name } = req.body;

  console.log('=== SIGNUP REQUEST ===');
  console.log('Email:', email);
  console.log('Name:', name);

  // Split name into first and last name
  const nameParts = name?.trim().split(" ") || [];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  console.log('Parsed name - First:', firstName, 'Last:', lastName);

  try {
    // Create the user in Firebase Auth
    console.log('Creating user in Firebase Auth...');
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    console.log('✓ User created in Auth with UID:', userCred.user.uid);
    
    await updateProfile(userCred.user, { displayName: name });
    console.log('✓ User display name updated');

    // Create user document in Firestore
    console.log('Creating user document in Firestore users collection...');
    const userData = {
      name: name,
      firstName: firstName,
      lastName: lastName,
      email: email,
      createdAt: Timestamp.now(),
      products: [],
    };
    console.log('User data to save:', userData);
    
    await setDoc(doc(db, "users", userCred.user.uid), userData);
    console.log('✓ User document created successfully in users collection');

    return res.status(200).json({ 
      uid: userCred.user.uid,
      firstName,
      lastName 
    });
  } catch (err) {
    console.error('✗ SIGNUP ERROR:', err.code, err.message);
    console.error('Full error:', err);
    return res.status(400).json({ error: err.message, code: err.code });
  }
}