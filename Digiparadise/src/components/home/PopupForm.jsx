import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, MapPin, Phone, ChevronRight, Loader2, CheckCircle2, Sparkles } from "lucide-react";

const PopupForm = ({ onClose, userEmail = null, onFormSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: userEmail || '',
    phone: '',
    location: '',
    shootType: 'podcast_recording',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // ⭐ FIRST GOOGLE SHEET
  const GOOGLE_SCRIPT_URL_1 = 'https://script.google.com/macros/s/AKfycbxA1D9QcIwEhsxuBNmNjZ8ebXBLZqX22bY6U_NBPh3SC-XIVTlpHFPrzE5xxWJQ5YC2/exec';

  // ⭐ SECOND GOOGLE SHEET
  const GOOGLE_SCRIPT_URL_2 = 'https://script.google.com/macros/s/AKfycby3vsvZQMLYFV8zjN_r_Ur6Hw26yaFf0GRFpj70KPBOG-5gLvL-Ql1IHDZz4prTAhMc/exec';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const formPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        shootType: formData.shootType
      };

      const promises = [
        fetch(GOOGLE_SCRIPT_URL_1, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formPayload)
        }),
        fetch(GOOGLE_SCRIPT_URL_2, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formPayload)
        })
      ];

      await Promise.all(promises);

      if (onFormSubmitted) onFormSubmitted();
      setIsSubmitted(true);

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="relative bg-gradient-to-br from-[#2a2a28] to-yellow-500/10 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-lg mx-auto border border-yellow-500/20 flex flex-col max-h-[90vh]"
      >
        {/* Close button — always visible */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 bg-[#1a1a18] hover:bg-black rounded-full flex items-center justify-center transition-colors z-10"
          aria-label="Close form"
          disabled={isSubmitting}
        >
          <X size={20} className="text-gray-300" />
        </button>

        {/* ── HEADER — unchanged ── */}
        <div className="p-6 sm:p-8 text-center bg-gradient-to-r from-[#1a1a18] to-[#2a2a28] border-b border-yellow-500/20 rounded-t-2xl flex-shrink-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Let's Bring Your Idea to Life 🎬🚀</h2>
          <p className="text-gray-300 mt-2 text-sm sm:text-base">No hidden charges — we'll get back within 24 hours.</p>
        </div>

        {/* ── BODY — form OR confirmation ── */}
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            /* ── FORM ── */
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8 space-y-5 overflow-y-auto"
            >
              {submitError && (
                <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm">
                  {submitError}
                </div>
              )}

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-3 border border-yellow-500/30 bg-[#1a1a18] text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition disabled:bg-[#0f0f0f] disabled:cursor-not-allowed"
                />
              </div>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required disabled={isSubmitting || !!userEmail}
                  className="w-full pl-10 pr-4 py-3 border border-yellow-500/30 bg-[#1a1a18] text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition disabled:bg-[#0f0f0f] disabled:cursor-not-allowed"
                />
              </div>

              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-3 border border-yellow-500/30 bg-[#1a1a18] text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition disabled:bg-[#0f0f0f] disabled:cursor-not-allowed"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text" name="location" placeholder="Your Location" value={formData.location} onChange={handleChange} required disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-3 border border-yellow-500/30 bg-[#1a1a18] text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition disabled:bg-[#0f0f0f] disabled:cursor-not-allowed"
                />
              </div>

              <div className="relative">
                <select
                  name="shootType" value={formData.shootType} onChange={handleChange} required disabled={isSubmitting}
                  className="w-full px-4 py-3 border border-yellow-500/30 bg-[#1a1a18] text-white rounded-lg appearance-none focus:ring-2 focus:ring-amber-600 focus:border-amber-600 transition disabled:bg-[#0f0f0f] disabled:cursor-not-allowed"
                >
                  <option value="podcast_recording">Podcast Recording 🎙️</option>
                  <option value="fashion_shoot">Fashion Shoot 👗</option>
                  <option value="product_shoot">Product Shoot 📸</option>
                  <option value="corporate_video">Corporate Video 🎬</option>
                  <option value="event_coverage">Event Coverage 🎤</option>
                  <option value="other">Other (Custom) ✨</option>
                </select>
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none rotate-90" size={20} />
              </div>

              <button
                type="submit" disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-bold py-3 px-4 rounded-lg hover:from-yellow-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Submitting...
                  </>
                ) : (
                  'Submit Inquiry'
                )}
              </button>
            </motion.form>
          ) : (
            /* ── CONFIRMATION ── */
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 18, stiffness: 180, delay: 0.1 }}
              className="flex flex-col items-center justify-center px-6 py-10 sm:px-10 sm:py-14 gap-6 text-center"
            >
              {/* Animated check icon */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.2 }}
                className="relative flex items-center justify-center"
              >
                {/* Glow ring */}
                <span className="absolute w-24 h-24 rounded-full bg-cyan-400/10 blur-xl" />
                <span className="absolute w-16 h-16 rounded-full bg-amber-400/20 blur-md" />
                <CheckCircle2
                  size={64}
                  strokeWidth={1.5}
                  className="relative text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                />
              </motion.div>

              {/* Sparkle accent */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="flex items-center gap-2 text-yellow-500/60 text-xs sm:text-sm tracking-widest uppercase font-semibold"
              >
                <Sparkles size={14} />
                <span>Inquiry Received</span>
                <Sparkles size={14} />
              </motion.div>

              {/* Gradient confirmation message */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 font-bold text-xl sm:text-2xl leading-snug max-w-xs sm:max-w-sm"
              >
                Thank you for submitting your details. Our team will contact you shortly.
              </motion.p>

              {/* Subtle sub-text */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-400 text-xs sm:text-sm"
              >
                We typically respond within 24 hours.
              </motion.p>

              {/* Decorative divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="w-24 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"
              />

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                onClick={onClose}
                className="mt-2 px-8 py-2.5 rounded-full border border-yellow-500/30 text-yellow-400 text-sm font-semibold hover:bg-yellow-500/10 transition-all duration-200"
              >
                Close
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default PopupForm;
