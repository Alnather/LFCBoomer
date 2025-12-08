import Link from "next/link";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import Image from "next/image";

export default function Navbar({ user }) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  async function handleLogout() {
    try {
      await signOut(auth);
      setMobileMenuOpen(false);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <nav className="bg-[#1a1a1a] border-b border-gray-800 shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/swapbear1.png" 
              alt="SwapBear" 
              width={40} 
              height={40}
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <div className="text-xl md:text-2xl font-bold gradient-text">
              Boomer
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-primary-500 font-medium transition">
              Home
            </Link>
            <Link href="/listings" className="text-gray-300 hover:text-primary-500 font-medium transition">
              Listings
            </Link>
            {user && (
              <>
                <Link href="/create-listing" className="text-gray-300 hover:text-primary-500 font-medium transition">
                  Create Listing
                </Link>
                <Link href="/messages" className="text-gray-300 hover:text-primary-500 font-medium transition">
                  Messages
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition text-gray-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* User Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-2 text-gray-300">
                  <span className="font-medium">
                    {user.displayName || user.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-300 hover:text-primary-500 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg font-medium transition"
              >
                Home
              </Link>
              <Link
                href="/listings"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg font-medium transition"
              >
                Listings
              </Link>
              {user && (
                <>
                  <Link
                    href="/create-listing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg font-medium transition"
                  >
                    Create Listing
                  </Link>
                  <Link
                    href="/messages"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg font-medium transition"
                  >
                    Messages
                  </Link>
                  <div className="px-4 py-2 text-sm text-gray-400">
                    {user.displayName || user.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="mx-4 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition font-medium"
                  >
                    Logout
                  </button>
                </>
              )}
              {!user && (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg font-medium transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mx-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-center transition font-medium"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
