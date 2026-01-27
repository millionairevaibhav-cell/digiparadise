import { useState } from "react";
import { motion } from "framer-motion";
import { X, User, Mail, MapPin, Phone, ChevronRight, Loader2 } from "lucide-react";

const PopupForm = ({ onClose, userEmail = null, onFormSubmitted }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: userEmail || '',
    phone: '',
    location: '',
    shootType: 'podcast_recording',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const port = "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitMessage('');

    try {
      const response = await fetch(`${port}/demographics/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          location: formData.location,
          phoneNumber: formData.phone,
          category: formData.shootType.toLowerCase()
        })
      });

      const data = await response.json();

      if (data.success) {
        setSubmitMessage('Form submitted successfully! We\'ll get back to you soon.');
        if (onFormSubmitted) {
          onFormSubmitted();
        }
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSubmitError(data.message || 'Failed to submit form. Please try again.');
      }
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
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 bg-[#1a1a18] hover:bg-black rounded-full flex items-center justify-center transition-colors z-10"
          aria-label="Close form"
          disabled={isSubmitting}
        >
          <X size={20} className="text-gray-300" />
        </button>

        <div className="p-6 sm:p-8 text-center bg-gradient-to-r from-[#1a1a18] to-[#2a2a28] border-b border-yellow-500/20 rounded-t-2xl flex-shrink-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Let's Bring Your Idea to Life 🎬🚀</h2>
          <p className="text-gray-300 mt-2 text-sm sm:text-base">No hidden charges — we'll get back within 24 hours.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 overflow-y-auto">
          {submitMessage && (
            <div className="bg-green-900/50 border border-green-700 text-green-300 px-4 py-3 rounded-lg text-sm">
              {submitMessage}
            </div>
          )}
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
        </form>
      </motion.div>
    </div>
  );
};

export default PopupForm;