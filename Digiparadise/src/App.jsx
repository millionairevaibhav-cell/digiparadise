import React, { useState, memo, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Copy } from "lucide-react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollZoomEffect from "./components/ScrollZoomEffect";
import { ThemeProvider } from "./context/ThemeContext";

import Testhome from "./pages/TestHome";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import NotFound from "./pages/NotFound";
import BookStudio from "./pages/BookStudio";
import Marketing from "./pages/Marketing";
// --- Import Studio Pages ---
import GodfatherEmpire from "./pages/studios/GodfatherEmpire";
import TheWhiteHouse from "./pages/studios/TheWhiteHouse";
import MedinaMuse from "./pages/studios/MedinaMuse";
import NexusDen from "./pages/studios/NexusDen";
import Cyclorama from "./pages/studios/Cyclorama";
import VirasatENoor from "./pages/studios/VirasatENoor";
import LBlueHeaven from "./pages/studios/LBlueHeaven";


// --- Updated Contact Buttons Component ---
const FixedContactButtons = memo(() => {
  const [showPhonePopup, setShowPhonePopup] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userAgent = navigator.userAgent;
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent
        )
      );
    }
  }, []);

  // Auto-open WhatsApp popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWhatsAppPopup(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const WhatsAppIcon = ({ className }) => (
    <svg
      className={className || "w-6 h-6 text-white"}
      fill="currentColor"
      viewBox="0 0 16 16"
    >
      <path d="M13.601 2.326A7.854 7.854 0 007.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 003.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0013.6 2.326zM7.994 14.521a6.573 6.573 0 01-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 01-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 014.66 1.931 6.557 6.557 0 011.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 00-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
    </svg>
  );

  const handlePhoneClick = () => {
    if (isMobile) {
      window.location.href = "tel:+919582997398";
    }
  };

  const copyToClipboard = () => {
    const phoneNumber = "+91 9582997398";
    navigator.clipboard
      .writeText(phoneNumber)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Clipboard copy failed:", err);
      });
  };

  return (
    <>
      {/* Phone Button & Popup on hover for desktop */}
      <div
        className="fixed bottom-6 left-4 z-[9999]"
        onMouseEnter={() => !isMobile && setShowPhonePopup(true)}
        onMouseLeave={() => !isMobile && setShowPhonePopup(false)}
      >
        <AnimatePresence>
          {showPhonePopup && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full mb-3 w-max bg-white p-4 rounded-lg shadow-xl border border-gray-200"
            >
              <p className="font-semibold text-lg text-gray-800">
                +91 9582997398
              </p>
              <button
                onClick={copyToClipboard}
                className={`mt-3 w-full text-sm font-bold py-2 px-4 rounded transition-all duration-300 flex items-center justify-center ${
                  copied
                    ? "bg-green-500"
                    : "bg-[#ca8a04] hover:bg-amber-600"
                } text-white`}
              >
                {copied ? (
                  "Copied!"
                ) : (
                  <>
                    <Copy size={14} className="mr-2" /> Copy
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={handlePhoneClick}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-500 hover:bg-amber-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          aria-label="Contact by phone"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </button>
      </div>

      {/* WhatsApp Button & Popup */}
      <div className="fixed bottom-6 right-4 z-[9999]">
        <AnimatePresence>
          {showWhatsAppPopup && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`absolute bottom-full right-0 mb-3 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 ${
                isMobile ? 'w-[192px] scale-100' : 'w-80'
              }`}
            >
              {/* Pointer Arrow - Only show on desktop */}
              {!isMobile && (
                <div className="absolute -bottom-2 right-5 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
              )}
              
              <div className={`bg-green-500 text-white flex justify-between items-center ${isMobile ? 'p-2' : 'p-4'}`}>
                <h3 className={`font-bold ${isMobile ? 'text-sm' : 'text-lg'}`}>WhatsApp</h3>
                <button
                  onClick={() => setShowWhatsAppPopup(false)}
                  className="text-white opacity-70 hover:opacity-100"
                  aria-label="Close popup"
                >
                  <svg className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className={`${isMobile ? 'p-2' : 'p-5'}`}>
                <p className={`text-gray-700 bg-gray-100 rounded-lg inline-block ${isMobile ? 'p-2 text-xs' : 'p-3'}`}>
                  Hello 👋, Welcome to DigiParadise Studios! How can we help you?
                </p>
              </div>
              <div className={`bg-gray-50 ${isMobile ? 'p-2' : 'p-4'}`}>
                <a
                  href="https://wa.me/919582997398?text=Hi%20DigiParadise%20Studios"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowWhatsAppPopup(false)}
                  className={`w-full flex items-center justify-center bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all duration-300 ${isMobile ? 'py-2 px-3 text-xs' : 'py-3 px-4'}`}
                >
                  <WhatsAppIcon className={`mr-2 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setShowWhatsAppPopup(prev => !prev)}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          aria-label="Contact on WhatsApp"
        >
          <WhatsAppIcon />
        </button>
      </div>
    </>
  );
});

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-[#262624] transition-colors duration-300 flex flex-col">
          <Navbar />
            <Routes>
              <Route path="/" element={<Testhome/>} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/bookstudio" element={<BookStudio />} />
              <Route path="/marketing" element={<Marketing />} />

              {/* --- Studio Routes --- */}
              <Route path="/godfather-empire" element={<GodfatherEmpire />} />
              <Route path="/the-white-house" element={<TheWhiteHouse />} />
              <Route path="/medina-muse" element={<MedinaMuse />} />
              <Route path="/nexus-den" element={<NexusDen />} />
              <Route path="/cyclorama" element={<Cyclorama />} />
              <Route path="/virasat-e-noor" element={<VirasatENoor />} />
              <Route path="/l-blue-heaven" element={<LBlueHeaven />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          <Footer />
          <FixedContactButtons />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;