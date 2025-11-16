import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home({ user }) {
  return (
    <div className="min-h-screen">
      <Navbar user={user} />

      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                A Lake Forest College Initiative
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-100 mb-6">
              Welcome to{" "}
              <span className="gradient-text">ForesterSwap</span>
            </h1>
            <p className="text-xl text-gray-300 mb-4 max-w-3xl mx-auto">
              Lake Forest College's sustainable marketplace for swapping, trading, and discovering unique items. 
              Join your fellow Foresters in reducing waste and building a circular economy on campus! 🌲
            </p>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto font-medium">
              Every swap is a step toward a more sustainable future. Together, we can make a difference.
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
      <section className="py-20 bg-[#2a2a2a]">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-100">
            Why Choose ForesterSwap?
          </h2>
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            Lake Forest College is committed to sustainability. ForesterSwap empowers our community to reduce waste and promote conscious consumption.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-5xl mb-4">♻️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-100">Reduce Waste</h3>
              <p className="text-gray-400">
                Combat overconsumption and landfill waste by extending the lifecycle of items through swapping and reuse.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-5xl mb-4">🌱</div>
              <h3 className="text-xl font-bold mb-3 text-gray-100">Campus Sustainability</h3>
              <p className="text-gray-400">
                Support Lake Forest College's sustainability goals by participating in our circular economy initiative.
              </p>
            </div>

            <div className="card text-center">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3 text-gray-100">Forester Community</h3>
              <p className="text-gray-400">
                Connect with fellow students, faculty, and staff who share your commitment to environmental responsibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 gradient-bg">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-100">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-100">Create Your Account</h3>
                <p className="text-gray-300">
                  Sign up in seconds and join our growing community of swappers.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-100">List Your Items</h3>
                <p className="text-gray-300">
                  Upload photos and descriptions of items you want to swap or trade.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-100">Browse & Connect</h3>
                <p className="text-gray-300">
                  Explore listings and connect with other users to make swaps.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-100">Complete the Swap</h3>
                <p className="text-gray-300">
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
              Join the Lake Forest College Sustainability Movement
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Be part of the solution. Every item swapped is one less item in a landfill. Start making an impact today!
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-gray-800 text-gray-100 border-2 border-primary-600 font-bold rounded-lg hover:bg-gray-700 transition text-lg"
            >
              Sign Up with Your @lakeforest.edu Email
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container-custom text-center">
          <p className="mb-2">
            &copy; 2025 ForesterSwap - A Lake Forest College Sustainability Initiative 🌲
          </p>
          <p className="text-sm">
            Made with ❤️ for our planet and community
          </p>
        </div>
      </footer>
    </div>
  );
}

