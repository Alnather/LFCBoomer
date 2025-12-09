import { auth, db } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password, name } = req.body;

  // Split name into first and last name
  const nameParts = name?.trim().split(" ") || [];
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  try {
    // Create the user in Firebase Auth
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    
    await updateProfile(userCred.user, { displayName: name });

    // Create user document in Firestore
    const userData = {
      name: name,
      firstName: firstName,
      lastName: lastName,
      email: email,
      createdAt: Timestamp.now(),
      products: [],
    };
    
    await setDoc(doc(db, "users", userCred.user.uid), userData);

    return res.status(200).json({ 
      uid: userCred.user.uid,
      firstName,
      lastName 
    });
  } catch (err) {
    console.error('Signup error:', err.code, err.message);
    return res.status(400).json({ error: err.message, code: err.code });
  }
}