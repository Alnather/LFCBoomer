import "@/styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Reload user to get latest verification status
        await currentUser.reload();
        const refreshedUser = auth.currentUser;
        setUser(refreshedUser);
        
        // Check if user is logged in but email is not verified
        if (refreshedUser && !refreshedUser.emailVerified) {
          // Allow access to verification and auth pages
          const allowedPages = ['/verify-email', '/login', '/signup'];
          if (!allowedPages.includes(router.pathname)) {
            router.push('/verify-email');
          }
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router.pathname]);

  // Pages that don't need navigation
  const authPages = ['/login', '/signup', '/verify-email'];
  const isAuthPage = authPages.includes(router.pathname);
  const showNav = !isAuthPage || !user; // Show nav on auth pages when not logged in

  return (
    <div className="app-layout">
      <TopBar user={user} isAuthPage={isAuthPage} />
      <main className="flex-1 w-full flex justify-center" style={{ marginTop: '10vh' }}>
        <div className="w-full max-w-2xl md:max-w-7xl px-6">
          <Component {...pageProps} user={user} loading={loading} />
        </div>
      </main>
      <BottomNav user={user} isAuthPage={isAuthPage} />
    </div>
  );
}

