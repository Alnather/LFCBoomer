import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // User is logged in, redirect to rides
        router.push('/rides');
      }
    });
    return () => unsubscribe();
  }, [router]);

  async function handleSignup(e) {
    e.preventDefault();
    setError("");

    // Validation - Check for @lakeforest.edu email
    if (!email.endsWith("@lakeforest.edu")) {
      setError("You must use a @lakeforest.edu email address to sign up");
      return;
    }

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const name = `${firstName} ${lastName}`.trim();
      // Create user with Firebase Auth (client-side)
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: name });
      // Create user document in Firestore (lowercase "users")
      const userData = {
        name: name,
        firstName: firstName,
        lastName: lastName,
        email: email,
        createdAt: Timestamp.now(),
        products: [],
        preferences: {},
      };
      await setDoc(doc(db, "users", userCred.user.uid), userData);
      // Redirect to rides page
      router.push("/rides");
    } catch (err) {
      let friendly = "Signup failed. Please try again.";
      if (err.code === "auth/email-already-in-use") {
        friendly = "This email is already registered. Try logging in or use another email.";
      } else if (err.code === "auth/invalid-email") {
        friendly = "Please enter a valid email address.";
      } else if (err.code === "auth/weak-password") {
        friendly = "Password is too weak. Please use at least 6 characters.";
      } else if (err.code === "auth/network-request-failed") {
        friendly = "Network error. Please check your connection.";
      }
      setError(friendly);
      setLoading(false);
    }
  }

  return (
    <div className=" flex items-center justify-center bg-[#171717] py-12 px-4 custom-app-layout-mobile"  style={{minHeight:"80vh"}} >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[#171717] border border-white/10 p-8 rounded-2xl shadow-xl w-full max-w-md" 
        style={{alignSelf:"center"}} 
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <h1 className="text-3xl font-bold text-white" >Create An Account</h1>
          </Link>
          <p className="text-gray-400" style={{marginBottom:"6vh"}}>Join the Lake Forest community</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input-field"
                placeholder="John"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input-field"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address (Lake Forest College)
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="you@lakeforest.edu"
            />
            <p className="text-xs text-gray-500 mt-1">
              Must be a @lakeforest.edu email address
            </p>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            style={{height:"5vh",marginTop:"3vh"}}
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-primary text-white font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center" style={{marginBottom:"1vh"}}>
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-primary-light font-semibold transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

