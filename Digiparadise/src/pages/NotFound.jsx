"use client"
import { motion } from "framer-motion"

// --- Inlined Assets ---
// Replaced react-icons/fi with inline SVGs to remove dependency

const FiHome = ({ className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const FiArrowLeft = ({ className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const FiMapPin = ({ className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

// --- Main Component ---

const NotFound = () => {
  // Replaced Button and Card components with standard HTML elements (div, button, a)
  // and applied the Tailwind classes directly.
  // Replaced <Link> with <a> for standard HTML.

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="pt-16 min-h-screen bg-[#262624] overflow-x-hidden"
    >
      {/* Main Content */}
      <div className="py-10 bg-gradient-to-br from-[#1a1a18] via-[#262624] to-[#2a2a28] relative min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
          >
            {/* 404 Animation */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="mb-8"
            >
              <div className="text-8xl md:text-9xl lg:text-[12rem] font-bold bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent leading-none">
                404
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Page Not{" "}
                  <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
                    Found
                  </span>
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Oops! The page you're looking for seems to have wandered off into the digital void. 
                  Let's get you back on track to create something amazing.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                <a 
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-md bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  <FiHome className="mr-2" />
                  Go Home
                </a>
                <button 
                  onClick={() => window.history.back()}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-md border border-yellow-500/30 text-white hover:bg-yellow-500/10 shadow-lg hover:shadow-xl transition-all"
                >
                  <FiArrowLeft className="mr-2" />
                  Go Back
                </button>
              </div>

              {/* Helpful Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="pt-12"
              >
                <div className="p-8 bg-gradient-to-br from-[#2a2a28] to-yellow-500/10 border border-yellow-500/20 shadow-lg hover:shadow-xl transition-shadow max-w-2xl mx-auto rounded-lg">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Looking for something specific?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <a 
                      href="/"
                      className="flex items-center space-x-3 p-4 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-500/30">
                        <FiHome className="text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-white group-hover:text-yellow-400 transition-colors">
                          Homepage
                        </h3>
                        <p className="text-sm text-gray-300">
                          Start your journey here
                        </p>
                      </div>
                    </a>

                    <a 
                      href="/contact"
                      className="flex items-center space-x-3 p-4 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-500/30">
                        <FiMapPin className="text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-white group-hover:text-yellow-400 transition-colors">
                          Contact Us
                        </h3>
                        <p className="text-sm text-gray-300">
                          Get in touch with us
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Floating Elements - matching Contact.jsx style */}
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-10 left-10 w-24 h-24 bg-yellow-500/15 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [360, 180, 0] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-10 right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-1/3 right-0 w-16 h-16 bg-yellow-600/15 rounded-full blur-lg"
          />
          <motion.div
            animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-yellow-500/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [0, -18, 0], rotate: [0, -180, 0] }}
            transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-2/3 left-10 w-14 h-14 bg-amber-500/25 rounded-full blur-lg"
          />
        </div>
      </div>

      {/* CTA Section - matching Contact.jsx */}
      <div className="py-20 bg-gradient-to-r from-yellow-500 to-amber-600 relative overflow-hidden">
        {/* Background Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 360, 0] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [360, 0, 360] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -15, 0], x: [0, 25, 0] }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/8 rounded-full blur-xl"
        />
        
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            Lost? Let's Create Something Amazing Instead
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed"
          >
            Even though you ended up here, we can still help bring your creative vision to life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <a href="/contact" className="inline-flex items-center justify-center space-x-3 bg-white text-yellow-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl">
              <span>Get In Touch</span>
            </a>
            <a href="/" className="inline-flex items-center justify-center space-x-3 border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-yellow-500 transition-colors shadow-lg hover:shadow-xl">
              <span>Explore Our Work</span>
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default NotFound

