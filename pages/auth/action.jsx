import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { applyActionCode, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function AuthAction() {
  const router = useRouter();
  const [mode, setMode] = useState(null);
  const [actionCode, setActionCode] = useState(null);
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Get the action to complete (mode) and the one-time code from the URL
    const { mode: urlMode, oobCode } = router.query;

    if (urlMode && oobCode) {
      setMode(urlMode);
      setActionCode(oobCode);
      handleAction(urlMode, oobCode);
    }
  }, [router.query]);

  async function handleAction(mode, actionCode) {
    try {
      switch (mode) {
        case "verifyEmail":
          await applyActionCode(auth, actionCode);
          // Update Firestore user document with emailVerified status
          if (auth.currentUser) {
            try {
              await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                emailVerified: true
              });
            } catch (err) {
              console.log('Could not update user verified status:', err);
            }
          }
          setStatus("success");
          setMessage("Your email has been verified successfully!");
          // Redirect to login after 3 seconds
          setTimeout(() => router.push("/login"), 3000);
          break;

        case "resetPassword":
          // Handle password reset (you can expand this later)
          setStatus("success");
          setMessage("Password reset link is valid. Redirecting...");
          setTimeout(() => router.push(`/reset-password?oobCode=${actionCode}`), 2000);
          break;

        case "recoverEmail":
          await applyActionCode(auth, actionCode);
          setStatus("success");
          setMessage("Your email has been recovered successfully!");
          break;

        default:
          setStatus("error");
          setError("Invalid action mode");
      }
    } catch (err) {
      setStatus("error");
      if (err.code === "auth/expired-action-code") {
        setError("This link has expired. Please request a new verification email.");
      } else if (err.code === "auth/invalid-action-code") {
        setError("This link is invalid or has already been used.");
      } else {
        setError(err.message || "An error occurred. Please try again.");
      }
    }
  }

  return (
    <div className=" flex items-center justify-center bg-[#171717] py-12 px-4 custom-app-layout-mobile"  style={{minHeight:"80vh"}} >
      <div className="bg-[#171717] border border-white/10 p-8 rounded-2xl shadow-xl w-full max-w-md" style={{alignSelf:"center"}} >
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <h1 className="text-3xl font-bold text-white" >
              {mode === "verifyEmail" && "Email Verification"}
              {mode === "resetPassword" && "Reset Password"}
              {mode === "recoverEmail" && "Recover Email"}
              {!mode && "Processing..."}
            </h1>
          </Link>
          <p className="text-gray-400" style={{marginBottom:"6vh"}}>Please wait while we process your request</p>
        </div>

        <div className="space-y-5">
          {status === "loading" && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent"></div>
              <p className="text-gray-400 mt-4">Processing your request...</p>
            </div>
          )}

          {status === "success" && (
            <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-4 rounded-xl">
              <div className="flex items-center mb-2">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <h3 className="font-semibold">Success!</h3>
              </div>
              <p className="text-sm">{message}</p>
            </div>
          )}

          {status === "error" && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-4 rounded-xl">
              <div className="flex items-center mb-2">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <h3 className="font-semibold">Error</h3>
              </div>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {status === "success" && mode === "verifyEmail" && (
            <div className="text-center pt-4">
              <p className="text-gray-400 text-sm mb-4">Redirecting you to Rides...</p>
              <Link href="/rides" className="inline-block w-full py-3 px-4 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-primary text-white font-semibold rounded-xl transition-all text-center" style={{height:"5vh",marginTop:"3vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
                Go to Rides
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="text-center pt-4 space-y-3">
              <Link href="/verify-email" className="inline-block w-full py-3 px-4 bg-gradient-to-r from-primary to-accent hover:from-primary-dark hover:to-primary text-white font-semibold rounded-xl transition-all text-center" style={{height:"5vh",marginTop:"3vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
                Request New Verification Email
              </Link>
              <Link href="/login" className="block text-gray-400 hover:text-white text-sm transition-colors">
                Back to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
