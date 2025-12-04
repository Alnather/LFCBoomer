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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Pages that don't need navigation
  const noNavPages = ['/login', '/signup', '/auth-test'];
  const showNav = !noNavPages.includes(router.pathname);

  return (
    <div className="app-layout">
      {showNav && <TopBar />}
      <main className="flex-1 w-full" style={{ marginTop: showNav ? '74px' : '0', paddingLeft: '5vw', paddingRight: '5vw' }}>
        <Component {...pageProps} user={user} loading={loading} />
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}

