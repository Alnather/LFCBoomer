import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiUsers, FiShoppingBag, FiMapPin, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export default function Home({ user, loading }) {
  const router = useRouter();

  const features = [
    {
      icon: <FiUsers size={28} />,
      title: "Campus Rideshare",
      description: "Share rides with fellow Foresters. Save money, reduce carbon footprint, and make new friends on your commute."
    },
    {
      icon: <FiShoppingBag size={28} />,
      title: "Student Marketplace",
      description: "Buy and sell textbooks, furniture, electronics, and more within the Lake Forest community."
    },
    {
      icon: <FiMapPin size={28} />,
      title: "Campus Events",
      description: "Discover what's happening on campus, connect with student organizations, and never miss out."
    }
  ];

  return (
    <div className="flex items-center justify-center bg-[#171717] py-12 px-4 custom-app-layout-mobile" style={{minHeight:"80vh"}}>
      <div className="w-full max-w-4xl">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          style={{marginTop:"7vh",marginBottom:"6vh"}}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white" >Welcome to </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Boomer
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto" style={{justifySelf:"center"}}>
            Your all-in-one platform for ridesharing, buying and selling, and connecting with the Lake Forest College community.
          </p>
          
          {!loading && (
            <div className="flex gap-4 justify-center flex-wrap">
              {user ? (
                <Link href="/rides">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl transition-all flex items-center gap-2"
                    style={{height:"6vh",paddingLeft:"2.5vw",paddingRight:"2.5vw"}}
                  >
                    Get Started
                    <FiArrowRight size={20} />
                  </motion.button>
                </Link>
              ) : (
                <>
                  <Link href="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl transition-all"
                      style={{height:"6vh",paddingLeft:"2.5vw",paddingRight:"2.5vw"}}
                    >
                      Create Account
                    </motion.button>
                  </Link>
                  <Link href="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/10"
                      style={{height:"6vh",paddingLeft:"2.5vw",paddingRight:"2.5vw"}}
                    >
                      Sign In
                    </motion.button>
                  </Link>
                </>
              )}
            </div>
          )}
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16" style={{marginBottom:"3vh"}}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-[#171717] border border-white/10 p-6 rounded-2xl hover:border-primary/30 transition-all feature-card-${index}`}
            >
              <style jsx>{`
                .feature-card-${index} {
                  justify-self: ${index === 1 ? 'end' : 'auto'};
                  text-align: ${index === 1 ? 'right' : 'left'};
                }
                .feature-card-${index} .feature-icon {
                  margin-left: ${index === 1 ? 'auto' : '0'};
                  margin-right: ${index === 1 ? '0' : 'auto'};
                }
                @media (min-width: 768px) {
                  .feature-card-${index} {
                    justify-self: center;
                    text-align: center;
                  }
                  .feature-card-${index} .feature-icon {
                    margin-left: auto;
                    margin-right: auto;
                  }
                }
              `}</style>
              <div 
                className="feature-icon w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center mb-4 text-primary"
              >
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{display:"none"}}
          className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-8"
        >
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">1500+</div>
              <div className="text-gray-400">Active Students</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-gray-400">Rides Shared</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">1000+</div>
              <div className="text-gray-400">Items Traded</div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        {!user && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-gray-400 mb-4">
              Join the Lake Forest College community today
            </p>
            <p className="text-sm text-gray-500">
              You must use a @lakeforest.edu email address to sign up
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
