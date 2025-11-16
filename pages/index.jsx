import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home({ user }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />

      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to{" "}
              <span className="gradient-text">ForesterSwap</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              The sustainable marketplace for swapping, trading, and discovering unique items. 
              Join our community and give your items a second life! 🌱
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <>
                  <Link href="/listings" className="btn-primary">
                    Browse Listings
                  </Link>
                  <Link href="/create-listing" className="btn-secondary">
                    Create Listing
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/signup" className="btn-primary">
                    Get Started
                  </Link>
                  <Link href="/login" className="btn-secondary">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose ForesterSwap?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-5xl mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Sustainable</h3>
              <p className="text-gray-600">
                Reduce waste and environmental impact by giving items a second life through swapping and trading.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Community</h3>
              <p className="text-gray-600">
                Connect with like-minded individuals who value sustainability and smart exchanges.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Easy to Use</h3>
              <p className="text-gray-600">
                List your items in minutes and start swapping with our intuitive, user-friendly platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 gradient-bg">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Create Your Account</h3>
                <p className="text-gray-700">
                  Sign up in seconds and join our growing community of swappers.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">List Your Items</h3>
                <p className="text-gray-700">
                  Upload photos and descriptions of items you want to swap or trade.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Browse & Connect</h3>
                <p className="text-gray-700">
                  Explore listings and connect with other users to make swaps.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Complete the Swap</h3>
                <p className="text-gray-700">
                  Arrange the exchange and enjoy your new item while helping the planet!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-20 bg-primary-600 text-white">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Swapping?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of users who are making a difference, one swap at a time.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-primary-600 font-bold rounded-lg hover:bg-gray-100 transition text-lg"
            >
              Sign Up Now - It's Free!
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container-custom text-center">
          <p className="mb-2">
            &copy; 2025 ForesterSwap. Built for sustainability. 🌲
          </p>
          <p className="text-sm">
            Made with 💚 for the environment
          </p>
        </div>
      </footer>
    </div>
  );
}
