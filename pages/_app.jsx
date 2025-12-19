import "@/styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { UnreadProvider } from "@/context/UnreadContext";
import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import MessageNotification from "@/components/MessageNotification";
import Script from "next/script";

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Track page views
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    const handleRouteChange = (url) => {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Reload user to get latest verification status
        await currentUser.reload();
        const refreshedUser = auth.currentUser;
        setUser(refreshedUser);
        
        // Sync emailVerified status to Firestore for other users to see
        if (refreshedUser && refreshedUser.emailVerified) {
          try {
            await updateDoc(doc(db, 'users', refreshedUser.uid), {
              emailVerified: true
            });
          } catch (err) {
            // Non-critical - user doc might not exist yet
            console.log('Could not sync verified status:', err);
          }
        }
        
        // Check if user is logged in but email is not verified
        /* if (refreshedUser && !refreshedUser.emailVerified) {
          // Allow access to verification and auth pages
          const allowedPages = ['/verify-email', '/login', '/signup'];
          if (!allowedPages.includes(router.pathname)) {
            router.push('/verify-email');
          }
        } */
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
    <UnreadProvider user={user}>
      {/* Google Analytics */}
      {GA_MEASUREMENT_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}
      
      <div className="app-layout">
        <TopBar user={user} isAuthPage={isAuthPage} />
        <MessageNotification user={user} />
        <main className="flex-1 w-full flex justify-center" style={{ marginTop: '10vh' }}>
          <div className="w-full max-w-2xl md:max-w-7xl px-6">
            <Component {...pageProps} user={user} loading={loading} />
          </div>
        </main>
        <BottomNav user={user} isAuthPage={isAuthPage} />
      </div>
    </UnreadProvider>
  );
}

