import { motion } from "framer-motion";
import React, { useState } from "react";

// Terms and Conditions Component
const TermsAndConditions = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl z-50 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-200"
      >
        <div className="bg-black p-4 sm:p-5 flex items-center justify-between flex-shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Terms and Conditions
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto">
          <div className="prose prose-sm sm:prose-base max-w-none text-gray-700">
            <p className="mb-6">
              Your usage of Digiparadise Studios is governed by the following
              Terms and Conditions (T&C). Digiparadise Studios retains the right
              to modify the T&C without prior notice. The booking application
              with Digiparadise Studios establishes a prepaid usage license for
              accessing amenities on a hourly or daily basis.
            </p>

            <ul className="list-none p-0 space-y-4">
              <li><strong className="font-semibold text-gray-900">Booking & Payment:</strong> A 50% advance is required to confirm your booking. The advance is non-refundable. The remaining balance is due before the session begins. Payments are accepted via cash, UPI, or bank transfer.</li>
              <li><strong className="font-semibold text-gray-900">Cancellation Policy:</strong> Cancellations made at least 24 hours before the session are fully refundable. Bookings cancelled within 24 hours will incur a fee.</li>
              <li><strong className="font-semibold text-gray-900">Studio Use:</strong> The studio must be used in accordance with our guidelines. Any damage to equipment or property will result in additional charges.</li>
              <li><strong className="font-semibold text-gray-900">Timings:</strong> Studio is available for booking 24/7. These hours are subject to availability and prior bookings.</li>
              <li><strong className="font-semibold text-gray-900">Equipment:</strong> We provide essential equipment. Any additional or specialized equipment requests should be made in advance and may incur extra fees.</li>
              <li><strong className="font-semibold text-gray-900">Liability:</strong> Digiparadise Studios is not responsible for personal belongings or equipment left unattended. Clients are responsible for their own property.</li>
              <li><strong className="font-semibold text-gray-900">Conduct:</strong> Clients must adhere to respectful and professional conduct. Any disruptive behavior may result in immediate termination of the session without a refund.</li>
              <li><strong className="font-semibold text-gray-900">Amendments:</strong> We reserve the right to amend these terms and conditions as needed. Clients will be notified of any significant changes.</li>
              <li><strong className="font-semibold text-gray-900">Compliance:</strong> All bookings are subject to local laws and regulations. Clients must comply with all relevant legal requirements during their session.</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 p-4 sm:p-5 bg-gray-50 flex-shrink-0">
          <div className="flex flex-col sm:flex-row-reverse gap-3 sm:gap-4">
            <button
              onClick={onClose}
              className="flex-1 bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-sm"
            >
              I Understand & Agree
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none border-2 border-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- SVG Icon Components ---
const FiMapPin = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>);
const FiPhone = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>);
const FiMail = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>);
const FiFacebook = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);
const FiInstagram = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const FiTwitter = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>);
const FiYoutube = ({ size = 24, className = "" }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>);

const Footer = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const socialLinks = [
    { icon: FiFacebook, href: "https://www.facebook.com/people/Digiparadise-Studios/61576784010749/#", label: "Facebook", color: "hover:bg-blue-600 hover:text-white" },
    { icon: FiInstagram, href: "https://www.instagram.com/digiparadisestudio/?hl=en", label: "Instagram", color: "hover:bg-pink-600 hover:text-white" },
    { icon: FiTwitter, href: "https://x.com/digiparadise", label: "Twitter", color: "hover:bg-blue-400 hover:text-white" },
    { icon: FiYoutube, href: "https://www.youtube.com/watch?v=_TML-m0jTTQ&pp=ygUUZGlnaXBhcmFkaXNlIHN0dWRpb3M%3D", label: "YouTube", color: "hover:bg-red-600 hover:text-white" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-white pt-6 sm:pt-8 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4 md:col-span-2 lg:col-span-1 text-center lg:text-left"
          > 
            <div className="flex items-center space-x-2 justify-center lg:justify-start">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-xl font-bold">Digiparadise Studios</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Professional video production and podcast studio in Delhi. Creating exceptional content with state-of-the-art equipment.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4 text-center lg:text-left"
          >
            <h3 className="text-lg font-semibold text-black">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.path} className="text-gray-600 hover:text-amber-600 transition-colors duration-200 text-sm block py-1">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4 text-center lg:text-left"
          >
            <h3 className="text-lg font-semibold text-black">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 justify-center lg:justify-start">
                <FiMapPin className="text-amber-600 mt-1 flex-shrink-0" size={16} />
                <span className="text-gray-600 text-sm leading-relaxed text-left">
                  7/26 Part-D, Block 7, Kirti Nagar Industrial Area, Kirti Nagar, New Delhi, Delhi, 110015
                </span>
              </div>
              <div className="flex items-center space-x-3 justify-center lg:justify-start">
                <FiPhone className="text-amber-600 flex-shrink-0" size={16} />
                <a href="tel:+919582997398" className="text-gray-600 hover:text-amber-600 transition-colors text-sm">
                  +91 95829 97398
                </a>
              </div>
              <div className="flex items-center space-x-3 justify-center lg:justify-start">
                <FiMail className="text-amber-600 flex-shrink-0" size={16} />
                <a href="mailto:Info@digiparadise.com" className="text-gray-600 hover:text-amber-600 transition-colors text-sm">
                  Info@digiparadise.com
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4 text-center lg:text-left"
          >
            <h3 className="text-lg font-semibold text-black">Follow Us</h3>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center transition-colors duration-200 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-200 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center space-y-3"
        >
          <button
            onClick={() => setIsTermsOpen(true)}
            className="text-amber-600 hover:text-amber-600 transition-colors duration-200 text-sm underline underline-offset-4"
          >
            Terms and Conditions
          </button>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
            © {new Date().getFullYear()} Digiparadise Studios. All rights reserved.
          </p>
          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
             Developed by SS Web Solutions (8700589952)
          </p>
        </motion.div>
      </div>

      <TermsAndConditions
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />
    </footer>
  );
};

export default Footer;

