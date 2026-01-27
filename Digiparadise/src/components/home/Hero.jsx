import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ChevronRight, Phone, MessageCircle } from "lucide-react";

const InstagramIcon = () => (
  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const Hero = () => {
  const [showContactOptions, setShowContactOptions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent;
      setIsMobile(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent));
    }
  }, []);

  const handlePhoneClick = () => {
    if (isMobile) {
      window.location.href = "tel:+919582997398";
    } else {
      navigator.clipboard.writeText("+919582997398").then(() => {
        alert("Phone number copied to clipboard!"); 
      });
    }
  };

  const handleGetInTouchClick = () => {
    if (isMobile) {
      setShowContactOptions(!showContactOptions);
    }
  };

  return (
    <div className="relative flex items-center justify-center bg-[#262624] py-7 sm:min-h-screen sm:py-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a18] via-[#262624] to-[#2a2a28] "></div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 sm:mb-4 pb-2"
        >
          ShubhVibe Events
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-6 sm:mb-8 leading-tight px-2"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400">
            From Bhakti to Baaraat, we make it Divine ✨
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-4 sm:gap-6 justify-center items-center px-2"
        >
          <div className="flex mt-3 flex-row gap-4 justify-center w-full">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/bookstudio"
              className="group bg-gradient-to-br from-[#2a2a28] to-yellow-500/10 backdrop-blur-md border border-yellow-500/20 text-white px-2 py-3 xs:py-4 rounded-full text-base xs:text-lg font-semibold hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 flex items-center justify-center space-x-2 xs:space-x-3 shadow-lg w-1/2 sm:w-auto relative"
            >
              <Play size={18} className="xs:w-5 xs:h-5" />
              <span className="hidden sm:block">Book Studio Now</span>
              <span className="sm:hidden">Book</span>
              <ChevronRight className="group-hover:translate-x-1 transition-transform w-4 h-4 xs:w-5 xs:h-5" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.google.com/maps/dir/?api=1&destination=7/26+Part-D,+Block+7,+Kirti+Nagar+Industrial+Area,+Kirti+Nagar,+New+Delhi,+Delhi,+110015&travelmode=driving"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-gradient-to-br from-[#2a2a28] to-yellow-500/10 backdrop-blur-md border border-yellow-500/20 text-white px-2 py-3 xs:py-4 rounded-full text-base xs:text-lg font-semibold hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 flex items-center justify-center space-x-2 xs:space-x-3 shadow-lg w-1/2 sm:w-auto relative"
            >
              <Play size={18} className="xs:w-5 xs:h-5" />
              <span className="hidden sm:block">Visit Studio Now</span>
              <span className="sm:hidden">Visit</span>
              <ChevronRight className="group-hover:translate-x-1 transition-transform w-4 h-4 xs:w-5 xs:h-5" />
            </motion.a>
          </div>

          <div 
            className="relative w-full sm:w-auto"
            onMouseEnter={() => !isMobile && setShowContactOptions(true)}
            onMouseLeave={() => !isMobile && setShowContactOptions(false)}
          >
            <AnimatePresence mode="wait">
              {!showContactOptions || !isMobile ? (
                <motion.button 
                  key="get-in-touch-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGetInTouchClick}
                  className="border-2 border-amber-600 text-amber-600 px-8 py-3 xs:py-4 rounded-full text-base xs:text-lg font-semibold hover:bg-amber-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                  Get In Touch
                </motion.button>
              ) : (
                <motion.div
                  key="contact-icons-inline"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 p-[2px] rounded-full shadow-2xl w-full"
                >
                  <div className="bg-[#2a2a28] backdrop-blur-md p-2 rounded-full flex items-center justify-center gap-2 w-full"
                >
                  <button
                    onClick={handlePhoneClick}
                    className="w-12 h-12 bg-yellow-500/10 hover:bg-yellow-500/20 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none"
                    aria-label="Call us"
                  >
                    <Phone className="w-6 h-6" />
                  </button>

                  <a
                    href="https://wa.me/919582997398?text=Hi%20DigiParadise%20Studios"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="w-6 h-6 text-white" />
                  </a>
                  
                  <a
                    href="https://www.instagram.com/digiparadisestudio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
                    aria-label="Instagram"
                  >
                    <InstagramIcon />
                  </a>
                </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Desktop popup - only show on non-mobile */}
            {!isMobile && (
              <AnimatePresence>
                {showContactOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full mt-3 left-0 right-0 mx-auto w-max bg-[#2a2a28]/90 backdrop-blur-md p-2 rounded-full shadow-2xl border border-yellow-500/20 flex items-center gap-2"
                  >
                    <button
                      onClick={handlePhoneClick}
                      className="w-12 h-12 bg-yellow-500/10 hover:bg-yellow-500/20 text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none"
                      aria-label="Copy phone number"
                    >
                      <Phone className="w-6 h-6" />
                    </button>

                    <a
                      href="https://wa.me/919582997398?text=Hi%20DigiParadise%20Studios"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
                      aria-label="WhatsApp"
                    >
                      <MessageCircle className="w-6 h-6 text-white" />
                    </a>
                    
                    <a
                      href="https://www.instagram.com/digiparadisestudio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md hover:shadow-lg"
                      aria-label="Instagram"
                    >
                      <InstagramIcon />
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-16 sm:top-20 left-4 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 bg-yellow-500/15 rounded-full blur-xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-16 sm:bottom-20 right-4 sm:right-10 w-20 sm:w-32 h-20 sm:h-32 bg-amber-500/20 rounded-full blur-xl"
      />
    </div>
  );
};

export default Hero;