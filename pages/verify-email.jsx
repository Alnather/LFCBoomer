import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function VerifyEmail() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        /* if (currentUser.emailVerified) {
          // Already verified, redirect to home
          router.push("/");
        } else { */
          setUser(currentUser);
          setLoading(false);
        /* } */
      } else {
        // Not logged in, redirect to login
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  async function handleResendVerification() {
    if (!user) return;
    
    setError("");
    setMessage("");
    setResending(true);

    try {
      await sendEmailVerification(user);
      setMessage("Verification email sent! Please check your inbox and spam, it can take up to 3 minutes.");
    } catch (err) {
      setError(err.message || "Failed to resend verification email");
    } finally {
      setResending(false);
    }
  }

  /* async function handleCheckVerification() {
    if (!user) return;

    try {
      await user.reload();
      if (user.emailVerified) {
        setMessage("Email verified! Redirecting...");
        setTimeout(() => router.push("/"), 2000);
      } else {
        setError("Email not verified yet. Please check your inbox and spam, and click the verification link.");
      }
    } catch (err) {
      setError("Failed to check verification status");
    }
  } */

  async function handleLogout() {
    await auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg">
        <div className="text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className=" flex items-center justify-center bg-[#171717] py-12 px-4 custom-app-layout-mobile"  style={{minHeight:"80vh"}} >
      <div className="bg-[#171717] border border-white/10 p-8 rounded-2xl shadow-xl w-full max-w-md" style={{alignSelf:"center",padding:"2vw"}} >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <h1 className="text-3xl font-bold text-white" >Verify Your Email</h1>
          </Link>
          <p className="text-gray-400" style={{marginBottom:"6vh"}}>Check your inbox to continue</p>
        </div>

        <div className="space-y-5">
          <div style={{textAlign:"center"}} className="bg-blue-500/10 border border-blue-500/30 text-blue-400 px-4 py-4 rounded-xl">
            <p className="text-sm">
              A verification email has been sent to:
            </p>
            <p className="font-semibold mt-2 text-white">{user?.email}</p>
            <p className="text-sm mt-3">
              Please check your inbox and spam, and click the verification link to activate your account.
            </p>
          </div>

          {message && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl text-sm">
              {message}
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleCheckVerification}
            style={{height:"5vh",marginTop:"3vh",marginBottom:"1vh"}}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-primary text-white font-semibold rounded-xl transition-all"
          >
            I've Verified My Email
          </button>

          <button
            onClick={handleResendVerification}
            disabled={resending}
            style={{height:"5vh",marginBottom:"3vh"}}
            className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:text-gray-600 text-white font-semibold rounded-xl transition-all border border-white/10 disabled:cursor-not-allowed"
          >
            {resending ? "Sending..." : "Resend Verification Email"}
          </button>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 text-gray-400 hover:text-white transition-colors font-medium"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
