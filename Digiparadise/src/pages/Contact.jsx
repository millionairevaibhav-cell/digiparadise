import React, { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// --- SVG Icons (Memoized for performance) ---
const FiMapPin = React.memo(({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
));

const FiPhone = React.memo(({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
));

const FiMail = React.memo(({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
));

const FiClock = React.memo(({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
));

const FiSend = React.memo(({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
));

const FiCheck = React.memo(({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
));

const FiX = React.memo(({ className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
));


// --- Reusable Components (Memoized) ---

const ScrollZoom = React.memo(({ children, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1.05, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8]);
  
  return (
    <div className="overflow-hidden w-full">
      <motion.div 
        ref={ref} 
        style={{ 
          scale, 
          opacity, 
          transformOrigin: 'center center',
          width: '100%',
          maxWidth: '100%',
          willChange: 'transform, opacity' // Hint for browser optimization
        }} 
        className={`${className} w-full max-w-full`}
      >
        {children}
      </motion.div>
    </div>
  );
});

const Card = React.memo(({ children, className = "" }) => {
  return (
    <div className={`rounded-xl ${className}`}>
      {children}
    </div>
  );
});

const Button = React.memo(({ children, type = "button", size = "md", className = "", onClick, disabled = false }) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
});

// --- Static Data (defined outside component to prevent recreation) ---

const contactInfo = [
    { icon: FiMapPin, title: "Address", details: "7/26 Part-D, Block 7, Kirti Nagar Industrial Area, Kirti Nagar, New Delhi, Delhi, 110015" },
    { icon: FiPhone, title: "Phone", details: "+91 95829 97398" },
    { icon: FiMail, title: "Email", details: "info@digiparadise.com" },
    { icon: FiClock, title: "Hours", details: "Mon-Sun: Open 24 Hours" },
];

const faqData = [
    { question: "How far in advance should I book?", answer: "We recommend booking at least 1-2 weeks in advance, especially for weekend slots. However, we can often accommodate last-minute bookings based on availability." },
    { question: "What's included in the studio rental?", answer: "All our packages include professional equipment, basic lighting setup, and technical support. Editing services and additional equipment can be added based on your needs." },
    { question: "Can I bring my own equipment?", answer: "You're welcome to bring your own equipment. Our technical team can help integrate it with our studio setup." },
    { question: "Do you offer pickup and delivery services?", answer: "Yes, we offer pickup and delivery services for final edited content. Rush delivery options are also available for an additional fee." },
];

// --- Contact Page Component ---

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState("");

  

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (submitStatus) {
      setSubmitStatus(null);
      setSubmitMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setSubmitStatus('success');
        setSubmitMessage(data.message);
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="pt-16 bg-[#262624] overflow-x-hidden"
    >
      {/* Header */}
      <ScrollZoom className="py-20 bg-gradient-to-br from-[#1a1a18] via-[#262624] to-[#2a2a28] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Get In{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-gray-300">
              Ready to bring your vision to life? Let's discuss your project and create something amazing together.
            </p>
          </motion.div>
          <motion.div animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-10 left-10 w-24 h-24 bg-yellow-500/15 rounded-full blur-xl" />
          <motion.div animate={{ y: [0, 15, 0], rotate: [360, 180, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute bottom-10 right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-xl" />
          <motion.div animate={{ y: [0, -20, 0], x: [0, 10, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute top-1/3 right-0 w-16 h-16 bg-yellow-600/15 rounded-full blur-lg" />
        </div>
      </ScrollZoom>

      {/* Contact Form & Info */}
      <ScrollZoom className="py-20 bg-[#262624]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="p-8 bg-gradient-to-br from-[#2a2a28] to-yellow-500/10 border border-yellow-500/20 shadow-lg hover:shadow-xl transition-shadow">
                <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
                {submitStatus && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-lg mb-6 flex items-center space-x-3 ${submitStatus === 'success' ? 'bg-green-900/20 text-green-300 border border-green-700' : 'bg-red-900/20 text-red-300 border border-red-700'}`}>
                    {submitStatus === 'success' ? <FiCheck className="w-5 h-5 flex-shrink-0" /> : <FiX className="w-5 h-5 flex-shrink-0" />}
                    <p className="text-sm">{submitMessage}</p>
                  </motion.div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} required disabled={isSubmitting} className="w-full px-4 py-3 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-[#1a1a18] text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required disabled={isSubmitting} className="w-full px-4 py-3 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-[#1a1a18] text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} disabled={isSubmitting} className="w-full px-4 py-3 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-[#1a1a18] text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed" placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Service</label>
                      <select name="service" value={formData.service} onChange={handleChange} disabled={isSubmitting} className="w-full px-4 py-3 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-[#1a1a18] text-white disabled:opacity-50 disabled:cursor-not-allowed">
                        <option value="">Select a service</option>
                        <option value="podcast">Podcast Recording</option>
                        <option value="video">Video Production</option>
                        <option value="editing">Post-Production</option>
                        <option value="custom">Custom Package</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Message *</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={6} disabled={isSubmitting} className="w-full px-4 py-3 border border-yellow-500/30 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-[#1a1a18] text-white placeholder-gray-400 disabled:opacity-50 disabled:cursor-not-allowed resize-none" placeholder="Tell us about your project..." />
                  </div>
                  <Button type="submit" size="lg" disabled={isSubmitting} className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all disabled:from-gray-400 disabled:to-gray-500">
                    {isSubmitting ? (<><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />Sending...</>) : (<><FiSend className="mr-2" />Send Message</>)}
                  </Button>
                </form>
              </Card>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Contact Information</h2>
                <p className="text-gray-300 mb-8">We're here to help bring your creative vision to life. Reach out to us through any of the following channels.</p>
              </div>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-yellow-500/30">
                      <info.icon size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{info.title}</h3>
                      <p className="text-gray-300">{info.details}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Card className="p-0 overflow-hidden border border-yellow-500/20 shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-64 relative">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.2755982825175!2d77.14332048885497!3d28.650303975638847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03ec08766251%3A0xed83f4af3c74aa8d!2sDigiparadise%20Studios%20%E2%80%93%20Best%20Podcast%20Studio%20in%20Delhi!5e0!3m2!1sen!2sin!4v1726580000000!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Digiparadise Studios Location" className="rounded-lg"></iframe>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-yellow-500/10 pointer-events-none" />
                  <motion.div animate={{ y: [0, -10, 0], x: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-4 right-4 w-8 h-8 bg-yellow-500/20 rounded-full blur-sm pointer-events-none" />
                  <motion.div animate={{ y: [0, 8, 0], x: [0, -3, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute bottom-4 left-4 w-6 h-6 bg-amber-500/25 rounded-full blur-sm pointer-events-none" />
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </ScrollZoom>

      {/* FAQ Section */}
      <ScrollZoom className="py-20 bg-gradient-to-br from-[#1a1a18] via-[#2a2a28] to-[#262624] relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">Questions</span></h2>
            <p className="text-xl text-gray-300">Quick answers to common questions</p>
          </motion.div>
          <div className="space-y-6">
            {faqData.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Card className="p-6 bg-[#2a2a28] border border-yellow-500/20 shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }} transition={{ duration: 12, repeat: Infinity }} className="absolute top-10 left-0 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl" />
          <motion.div animate={{ y: [0, 20, 0], rotate: [360, 180, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute bottom-10 right-0 w-24 h-24 bg-amber-500/15 rounded-full blur-xl" />
          <motion.div animate={{ y: [0, -25, 0], x: [0, 15, 0] }} transition={{ duration: 9, repeat: Infinity }} className="absolute top-1/2 right-10 w-14 h-14 bg-yellow-600/20 rounded-full blur-lg" />
        </div>
      </ScrollZoom>

      {/* CTA Section */}
      <ScrollZoom className="py-20 bg-gradient-to-r from-yellow-500 to-amber-600 relative overflow-hidden">
        <motion.div animate={{ y: [0, -20, 0], rotate: [0, 360, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <motion.div animate={{ y: [0, 30, 0], rotate: [360, 0, 360] }} transition={{ duration: 25, repeat: Infinity }} className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        <motion.div animate={{ y: [0, -15, 0], x: [0, 25, 0] }} transition={{ duration: 18, repeat: Infinity }} className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/8 rounded-full blur-xl" />
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">Let's Create Something Amazing</motion.h2>
          <motion.p initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed">Your story deserves professional treatment. Let's discuss your project and bring your vision to life.</motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="inline-flex items-center justify-center space-x-3 bg-white text-yellow-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl">
              <span>Book a Consultation</span>
            </button>
            <button className="inline-flex items-center justify-center space-x-3 border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-yellow-500 transition-colors shadow-lg hover:shadow-xl">
              <span>View Our Work</span>
            </button>
          </motion.div>
        </div>
      </ScrollZoom>
    </motion.div>
  );
};

export default Contact;
