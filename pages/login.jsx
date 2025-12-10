import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { motion } from "framer-motion";
import { signInWithEmailAndPassword, /* sendEmailVerification, */ onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);
  const [verificationResent, setVerificationResent] = useState(false);
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

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    setShowResendVerification(false);

    try {
      // Sign in with Firebase Auth (client-side)
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Redirect to home after successful login
      router.push("/rides");
      setLoading(false);
    } catch (err) {
      let friendly = "Login failed. Please try again.";
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        friendly = "Incorrect email or password.";
      } else if (err.code === "auth/too-many-requests") {
        friendly = "Too many attempts. Please try again later.";
      } else if (err.code === "auth/network-request-failed") {
        friendly = "Network error. Please check your connection.";
      }
      setError(friendly);
      setLoading(false);
    }
  }

  /* async function handleResendVerification() {
    setError("");
    setVerificationResent(false);
    
    try {
      // Sign in temporarily to get the user object
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Send verification email
      await sendEmailVerification(userCredential.user);
      setVerificationResent(true);
      
      // Sign out again
      await auth.signOut();
    } catch (err) {
      setError("Failed to resend verification email. Please try again.");
    }
  } */

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
            <h1 className="text-3xl font-bold text-white" >Welcome Back</h1>
          </Link>
          <p className="text-gray-400" style={{marginBottom:"6vh"}}>Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* verificationResent && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl text-sm">
              Verification email sent! Please check your inbox.
            </div>
          ) */}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* showResendVerification && (
            <button
              type="button"
              onClick={handleResendVerification}
              className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/10"
            >
              Resend Verification Email
            </button>
          ) */}
        </form>

        <div className="mt-6 text-center" style={{marginBottom:"1vh"}}>
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary hover:text-primary-light font-semibold transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

