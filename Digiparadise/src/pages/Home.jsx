import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ChevronRight, Star, Zap, Shield, Truck, Play, Mic, Camera, Edit3, Check, ArrowRight, ChevronLeft, Phone, MessageCircle, X, User, Mail, MapPin } from "lucide-react"
import { useNavigate } from "react-router-dom"

// Sample user avatar - replace with your actual image
const user = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"


// --- NEW POPUP FORM COMPONENT ---
const PopupForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    shootType: 'Podcast',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to an API)
    console.log("Form Submitted:", formData);
    onClose(); // Close form on submission
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto border border-yellow-200 flex flex-col max-h-[90vh]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
          aria-label="Close form"
        >
          <X size={20} className="text-gray-600" />
        </button>

        {/* Form Header */}
        <div className="p-6 sm:p-8 text-center bg-gradient-to-r from-yellow-400 to-amber-500 rounded-t-2xl flex-shrink-0">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Get a Quote!</h2>
          <p className="text-white/90 mt-2 text-sm sm:text-base">Let's create something amazing together.</p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5 overflow-y-auto">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition" />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition" />
          </div>

          {/* Phone Number */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition" />
          </div>
          
          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" name="location" placeholder="Your Location" value={formData.location} onChange={handleChange} required className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition" />
          </div>

          {/* Shoot Type */}
          <div className="relative">
            <select name="shootType" value={formData.shootType} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition">
              <option>Podcast</option>
              <option>Personal</option>
              <option>Fashion</option>
            </select>
            <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none rotate-90" size={20} />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-yellow-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            Submit Inquiry
          </button>
        </form>
      </motion.div>
    </div>
  );
};


// Photo Slider Component
const PhotoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Sample photos - replace with your actual studio photos
  const photos = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1590602842205-e5215d31a539?w=1920&h=800&fit=crop",
      alt: "Professional podcast recording setup"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=800&fit=crop",
      alt: "Video production studio with cameras"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=800&fit=crop",
      alt: "Audio mixing console"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1920&h=800&fit=crop",
      alt: "Professional lighting setup"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1920&h=800&fit=crop",
      alt: "Green screen video production"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?w=1920&h=800&fit=crop",
      alt: "Sound booth recording"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1920&h=800&fit=crop",
      alt: "Professional microphone setup"
    }
  ]

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === photos.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [photos.length])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? photos.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === photos.length - 1 ? 0 : currentIndex + 1)
  }

  return (
    <div className="relative mt-16 w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden bg-gray-900">
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <img
              src={photos[currentIndex].url}
              alt={photos[currentIndex].alt}
              className="w-full h-full object-cover"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20"></div>
          </motion.div>
        </AnimatePresence>

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10"
        aria-label="Next image"
      >
        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-yellow-400 scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Optional: Studio name overlay */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg"
        >
          DigiParadise Studio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-sm sm:text-base lg:text-lg text-white/90 drop-shadow-lg"
        >
          Professional Content Creation Hub
        </motion.p>
      </div>
      </div>
    </div>
  )
}

// Fixed ScrollZoom Component with controlled scaling
const ScrollZoom = ({ children, className = "" }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  
  // More controlled scaling - keeps elements within reasonable bounds
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1.05, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8])
  
  return (
    <div className="overflow-hidden w-full">
      <motion.div 
        ref={ref} 
        style={{ 
          scale, 
          opacity, 
          transformOrigin: 'center center',
          width: '100%',
          maxWidth: '100%'
        }} 
        className={`${className} w-full max-w-full`}
      >
        {children}
      </motion.div>
    </div>
  )
}

// Studios Gallery Component
const StudiosGallery = () => {
  const navigate = useNavigate();

  const studios = [
    {
      id: 1,
      title: "GodFather Empire",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop",
      link: "/godfather-empire"
    },
    {
      id: 2,
      title: "The White House",
      image: "https://images.unsplash.com/photo-1590602842205-e5215d31a539?w=600&h=400&fit=crop",
      link: "/the-white-house"
    },
    {
      id: 3,
      title: "Medina Muse",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
      link: "/medina-muse"
    },
    {
      id: 4,
      title: "Nexus Den",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop",
      link: "/nexus-den"
    },
    {
      id: 5,
      title: "Fashion Shoot Studios",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
      link: "/fashion-shoot-studios"
    }
  ];

  const handleStudioClick = (link) => {
    navigate(link);
  };

  return (
    <div className="pt-8 pb-12 sm:py-20 bg-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-10 sm:mb-6 px-2">
            Take a glance at our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 via-amber-600 to-cyan-800">
              Studios
            </span>
          </h2>
        </motion.div>

        {/* --- Correction Start --- */}
        {/* Switched to flexbox to center the cards in each row, especially the last row. */}
        {/* `items-stretch` ensures all cards in a row have the same height. */}
        {/* `basis-` with `calc()` is used to set the width of each card to create a grid-like layout while accounting for gaps. */}
        <div className="flex flex-wrap justify-center items-stretch gap-6 sm:gap-8">
          {studios.map((studio, index) => (
            <motion.div
              key={studio.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              onClick={() => handleStudioClick(studio.link)}
              className="group cursor-pointer bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-yellow-100 transform hover:-translate-y-2 basis-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1.3334rem)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={studio.image}
                  alt={studio.title}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover overlay with arrow */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <ArrowRight className="text-white" size={20} />
                  </motion.div>
                </div>
              </div>

              <div className="p-4 sm:p-6 text-center flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black group-hover:text-yellow-600 transition-colors duration-300">
                  {studio.title}
                </h3>
                
                {/* Bottom border animation */}
                <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-yellow-500 to-amber-600 mx-auto mt-3 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
        {/* --- Correction End --- */}
        
      </div>
    </div>
  );
};




// Photo Grid CTA Component
const PhotoGridCTA = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const gridImages = [
    "https://images.unsplash.com/photo-1578997982295-2a25a363fb20?w=600&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1610412891295-50a315058715?w=600&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1595741643242-8a9d3e69485d?w=600&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1603425200989-b62a63ab4fb8?w=600&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1533671549538-3213b75b11b5?w=600&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1598550463216-339b3a3a4130?w=600&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1609121852426-905141025555?w=600&h=450&fit=crop&q=80"
  ];

  // Handle responsive logic
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const imagesToDisplay = isMobile ? gridImages.slice(0, 4) : gridImages;

  const openLightbox = (src) => {
    // Remove existing modal if any
    const existingModal = document.getElementById('lightbox-modal');
    if (existingModal) {
      existingModal.remove();
    }

    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.95);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      z-index: 999999;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.3s ease;
    `;
    
    // Create image container
    const container = document.createElement('div');
    container.style.cssText = `
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      cursor: default;
      transform: scale(0.9);
      transition: transform 0.3s ease;
    `;
    
    // Create image
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Enlarged view';
    img.style.cssText = `
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      border-radius: 0.5rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      display: block;
    `;
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
      position: absolute;
      top: -1rem;
      right: -1rem;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: bold;
      transition: all 0.2s ease;
    `;
    
    // Close modal function
    const closeLightbox = () => {
      modal.style.opacity = '0';
      container.style.transform = 'scale(0.9)';
      setTimeout(() => {
        if (modal.parentNode) {
          modal.remove();
        }
        document.body.style.overflow = '';
      }, 300);
      setSelectedImage(null);
    };
    
    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.background = 'rgba(0, 0, 0, 1)';
      closeBtn.style.transform = 'scale(1.1)';
    });
    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.background = 'rgba(0, 0, 0, 0.8)';
      closeBtn.style.transform = 'scale(1)';
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });
    
    container.addEventListener('click', (e) => e.stopPropagation());
    
    // Keyboard handler
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        closeLightbox();
        document.removeEventListener('keydown', handleKeydown);
      }
    };
    document.addEventListener('keydown', handleKeydown);
    
    // Assemble and show modal
    container.appendChild(img);
    container.appendChild(closeBtn);
    modal.appendChild(container);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    requestAnimationFrame(() => {
      modal.style.opacity = '1';
      container.style.transform = 'scale(1)';
    });
    
    setSelectedImage(src);
  };

  return (
    <div className="py-16 sm:mb-28 sm:py-20 bg-gradient-to-r from-yellow-400 to-amber-500">
      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl xs:text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 via-amber-800 to-cyan-800 lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
        >
          Our Work in Action
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg lg:text-xl text-white/90 mb-8 sm:mb-12 leading-relaxed"
        >
          A glimpse into the creative projects filmed and produced at our studio.
        </motion.p>
        
        {/* Grid of images */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {imagesToDisplay.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: (index % 4) * 0.1 }}
              className="relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer group shadow-lg"
              onClick={() => openLightbox(src)}
            >
              <img 
                src={src} 
                alt={`Studio work ${index + 1}`} 
                className="w-full h-full object-cover aspect-[4/3] group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Camera className="text-white w-8 h-8" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};


const DigiParadise = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const [isFormVisible, setIsFormVisible] = useState(false); // State for form visibility

  // Timer to show the form after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFormVisible(true);
    }, 10000); // 10000ms = 10 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);




  const navigate = useNavigate()
  const services = [
  {
    icon: Mic,
    title: "Podcast Studio",
    description: "Professional podcast recording with acoustic treatment and premium microphones.",
    features: ["Soundproof booth", "Multi-track recording", "Live streaming support"],
  },
  {
    icon: Camera,
    title: "Video Production",
    description: "Complete video production solutions for content creators and businesses.",
    features: ["4K camera setup", "Professional lighting", "Green screen facility"],
  },
  {
    icon: Edit3,
    title: "Post Production",
    description: "Expert editing and post-production to ensure high-quality final output.",
    features: ["Color grading", "Audio mixing", "Motion graphics and VFX"],
  },
  {
    icon: Camera, // Replace with a relevant icon for social media
    title: "Social Media Marketing",
    description: "Boost your online presence with tailored social media strategies.",
    features: ["Content strategy", "Campaign management", "Analytics & reporting"],
  },
  {
    icon: Mic, // Replace with a relevant icon for content marketing
    title: "Content Marketing",
    description: "Engaging content solutions that attract and retain your target audience.",
    features: ["Blog and article creation", "SEO optimization", "Email marketing"],
  },
];

  const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Tech Podcast Host",
    content: "The audio quality is incredible! My podcast has never sounded better.",
    rating: 5,
    avatar: user,
  },
  {
    name: "Priya Sharma",
    role: "YouTube Creator",
    content: "Professional setup and amazing team. Highly recommend for video content.",
    rating: 5,
    avatar: user,
  },
  {
    name: "Mumbai Startup",
    role: "Corporate Client",
    content: "Perfect for our product launches and corporate videos. Top-notch service!",
    rating: 5,
    avatar: user,
  },
  {
    name: "Anita Desai",
    role: "Wedding Videographer",
    content: "Exceptional quality and attention to detail. Every wedding video comes out perfect!",
    rating: 5,
    avatar: user,
  },
  {
    name: "Vikram Singh",
    role: "Music Producer",
    content: "State-of-the-art equipment and acoustics. My tracks sound professional every time.",
    rating: 5,
    avatar: user,
  },
  {
    name: "Deepika Patel",
    role: "Content Creator",
    content: "The team understands my vision perfectly. Great collaboration and results!",
    rating: 5,
    avatar: user,
  },
  {
    name: "Bangalore Tech Hub",
    role: "IT Company",
    content: "Reliable partner for all our corporate presentations and training videos.",
    rating: 5,
    avatar: user,
  },
  {
    name: "Sanjay Mehta",
    role: "Documentary Filmmaker",
    content: "Professional grade equipment and skilled operators. Couldn't ask for more!",
    rating: 5,
    avatar: user,
  },
  {
    name: "Kavya Krishnan",
    role: "Fashion Blogger",
    content: "Perfect lighting and camera work. My content looks magazine-quality now!",
    rating: 5,
    avatar: user,
  },
  {
    name: "Digital Marketing Agency",
    role: "Marketing Team",
    content: "Fast turnaround and excellent results. Our clients love the video campaigns!",
    rating: 5,
    avatar: user,
  },
  {
    name: "Rohit Agarwal",
    role: "Event Organizer",
    content: "Captured every moment beautifully. The event highlights reel was spectacular!",
    rating: 5,
    avatar: user,
  },
  {
    name: "Meera Joshi",
    role: "Online Educator",
    content: "Crystal clear video quality makes my online courses so much more engaging.",
    rating: 5,
    avatar: user,
  }
];

  const stats = [
    { number: "360+", label: "Happy Clients" },
    { number: "430+", label: "Projects Done" },
    { number: "9M+", label: "Audience reached" },
    { number: "3M+", label: "Engagement" },
  ]

  return (
     <div className=" antialiased">
        {/* Render Popup Form */}
        <AnimatePresence>
            {isFormVisible && <PopupForm onClose={() => setIsFormVisible(false)} />}
        </AnimatePresence>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-x-hidden">
      
            {/* Photo Slider - At the top */}
            <PhotoSlider />
      
            {/* Hero Section - Mobile Optimized with reduced margin */}
            <ScrollZoom className="relative flex items-center justify-center bg-white py-7 sm:min-h-screen sm:py-0">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-amber-50"></div>
                
                <div className="relative z-10 text-center px-4 sm:px-6 lg:px-12 max-w-6xl mx-auto w-full">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 via-amber-600 to-cyan-800 mb-3 sm:mb-4 leading-tight"
                    >
                        DigiParadise
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-6 sm:mb-8 leading-tight px-2"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 via-amber-600 to-cyan-800">
                        Lights. Camera. Podcast.
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-sm xs:text-base sm:text-lg lg:text-xl text-gray-700 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-2"
                    >
                        Delhi's premier video production and podcast studio where creativity meets cutting-edge technology
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col gap-4 sm:gap-6 justify-center items-center px-2"
                        >
                        <div className="flex flex-row gap-4 justify-center w-full">
                            {/* Book Studio Button */}
                            <a
                            href="/bookstudio" // Using a placeholder link
                            className="group bg-yellow-500 text-white px-2 py-3 xs:py-4 rounded-full text-base xs:text-lg font-semibold hover:bg-yellow-600 transition-all duration-300 flex items-center justify-center space-x-2 xs:space-x-3 shadow-lg hover:shadow-xl w-1/2 sm:w-auto"
                            >
                            <Play size={18} className="xs:w-5 xs:h-5" />
                            <span className="hidden sm:block">Book Studio Now</span>
                            <span className="sm:hidden">Book</span>
                            <ChevronRight className="group-hover:translate-x-1 transition-transform w-4 h-4 xs:w-5 xs:h-5" />
                            </a>

                            {/* New Visit Studio Button */}
                            <a
                            href="https://www.google.com/maps/dir/?api=1&destination=7/26+Part-D,+Block+7,+Kirti+Nagar+Industrial+Area,+Kirti+Nagar,+New+Delhi,+Delhi,+110015&travelmode=driving"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-yellow-500 text-white px-2 py-3 xs:py-4 rounded-full text-base xs:text-lg font-semibold hover:bg-yellow-600 transition-all duration-300 flex items-center justify-center space-x-2 xs:space-x-3 shadow-lg hover:shadow-xl w-1/2 sm:w-auto"
                            >
                            <Play size={18} className="xs:w-5 xs:h-5" />
                            <span className="hidden sm:block">Visit Studio Now</span>
                            <span className="sm:hidden">Visit</span>
                            <ChevronRight className="group-hover:translate-x-1 transition-transform w-4 h-4 xs:w-5 xs:h-5" />
                            </a>
                        </div>

                        <button className="border-2 border-yellow-500 text-yellow-500 px-2 py-3 xs:py-4 rounded-full text-base xs:text-lg font-semibold hover:bg-yellow-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto">
                            View Our Work
                        </button>
                    </motion.div>
                </div>

                {/* Floating Elements - Reduced for mobile */}
                <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-16 sm:top-20 left-4 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 bg-yellow-300/30 rounded-full blur-xl"
                />
                <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-16 sm:bottom-20 right-4 sm:right-10 w-20 sm:w-32 h-20 sm:h-32 bg-amber-200/40 rounded-full blur-xl"
                />
            </ScrollZoom>

            {/* Studios Gallery Section - Moved here after hero */}
            <StudiosGallery />

            {/* Stats Section - Mobile Grid */}
            <div className="py-12 sm:py-20 bg-yellow-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-yellow-100"
                    >
                        <div className="text-2xl xs:text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600 mb-1 sm:mb-2">
                        {stat.number}
                        </div>
                        <div className="text-gray-600 font-medium text-xs sm:text-sm lg:text-base">{stat.label}</div>
                    </motion.div>
                    ))}
                </div>
                </div>
            </div>

            {/* Features Section - Mobile Optimized - ScrollZoom removed */}
            <div className="py-12 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-10"
                >
                    <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 px-2">
                    Why Choose DigiParadise?
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-2">
                    Professional-grade equipment and expert team to bring your creative vision to life
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {[
                    {
                        icon: <Star className="text-yellow-500" size={28} />,
                        title: "Premium Quality",
                        description: "State-of-the-art equipment and professional-grade studios",
                    },
                    {
                        icon: <Zap className="text-yellow-500" size={28} />,
                        title: "Latest Technology",
                        description: "Cutting-edge recording and video production technology",
                    },
                    {
                        icon: <Shield className="text-yellow-500" size={28} />,
                        title: "Expert Team",
                        description: "Experienced professionals to guide your creative journey",
                    },
                    {
                        icon: <Truck className="text-yellow-500" size={28} />,
                        title: "Quick Turnaround",
                        description: "Fast delivery of polished, professional content",
                    },
                    ].map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center p-4 sm:p-6 bg-yellow-50 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-yellow-100"
                    >
                        <div className="flex justify-center mb-3 sm:mb-4">{feature.icon}</div>
                        <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-black mb-2 sm:mb-3">{feature.title}</h3>
                        <p className="text-gray-700 leading-relaxed text-sm lg:text-base">{feature.description}</p>
                    </motion.div>
                    ))}
                </div>
                </div>
            </div>

            {/* Services Section - Mobile Grid - ScrollZoom removed */}
            <div className="py-12 sm:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-10"
                >
                    <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 px-2">
                    Our{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 via-amber-600 to-cyan-800">
                        Services
                    </span>
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-2">
                    Complete production solutions for all your creative needs
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="p-4 sm:p-6 bg-yellow-50 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-yellow-100"
                    >
                        <div className="text-center mb-4 sm:mb-6">
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:shadow-lg shadow-yellow-200"
                        >
                            <service.icon size={24} className="sm:w-7 sm:h-7 text-white" />
                        </motion.div>
                        <h3 className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-3">{service.title}</h3>
                        <p className="text-gray-700 mb-3 sm:mb-4 text-sm lg:text-base leading-relaxed">{service.description}</p>
                        </div>

                        <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start space-x-2 sm:space-x-3">
                            <Check className="text-yellow-600 flex-shrink-0 mt-0.5" size={14} />
                            <span className="text-gray-700 text-sm">{feature}</span>
                            </li>
                        ))}
                        </ul>
                    </motion.div>
                    ))}
                </div>
                </div>
            </div>

            {/* Testimonials Section - Mobile Optimized - ScrollZoom removed */}
            <div className="py-12 sm:py-20 bg-yellow-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 px-2">
                    Client{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-800 via-amber-600 to-cyan-800">
                        Stories
                    </span>
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-2">
                    What our clients say about working with us
                    </p>
                </motion.div>

                {/* First row - moving left to right */}
                <div className="relative mb-4 sm:mb-6">
                    <div className="flex animate-scroll-left">
                    {[...testimonials, ...testimonials].map((testimonial, index) => (
                        <motion.div
                        key={`row1-${index}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index % testimonials.length) * 0.1 }}
                        className="flex-shrink-0 w-72 xs:w-80 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-yellow-100 mx-2 sm:mx-4"
                        >
                        <div className="flex items-center mb-3 sm:mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="text-yellow-500 fill-current" size={14} />
                            ))}
                        </div>
                        <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base italic leading-relaxed">
                            "{testimonial.content}"
                        </p>
                        <div className="flex items-center">
                            <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-3 border-2 border-yellow-200"
                            />
                            <div>
                            <p className="font-semibold text-black text-sm">{testimonial.name}</p>
                            <p className="text-xs text-gray-600">{testimonial.role}</p>
                            </div>
                        </div>
                        </motion.div>
                    ))}
                    </div>
                </div>

                {/* Second row - moving right to left */}
                <div className="relative">
                    <div className="flex animate-scroll-right">
                    {[...testimonials.slice().reverse(), ...testimonials.slice().reverse()].map((testimonial, index) => (
                        <motion.div
                        key={`row2-${index}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (index % testimonials.length) * 0.1 }}
                        className="flex-shrink-0 w-72 xs:w-80 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-yellow-100 mx-2 sm:mx-4"
                        >
                        <div className="flex items-center mb-3 sm:mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="text-yellow-500 fill-current" size={14} />
                            ))}
                        </div>
                        <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base italic leading-relaxed">
                            "{testimonial.content}"
                        </p>
                        <div className="flex items-center">
                            <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-3 border-2 border-yellow-200"
                            />
                            <div>
                            <p className="font-semibold text-black text-sm">{testimonial.name}</p>
                            <p className="text-xs text-gray-600">{testimonial.role}</p>
                            </div>
                        </div>
                        </motion.div>
                    ))}
                    </div>
                </div>
                </div>

                <style jsx>{`
                @keyframes scroll-left {
                    0% {
                    transform: translateX(0);
                    }
                    100% {
                    transform: translateX(-50%);
                    }
                }
                
                @keyframes scroll-right {
                    0% {
                    transform: translateX(-50%);
                    }
                    100% {
                    transform: translateX(0);
                    }
                }
                
                .animate-scroll-left {
                    animation: scroll-left 40s linear infinite;
                }
                
                .animate-scroll-right {
                    animation: scroll-right 40s linear infinite;
                }
                
                .animate-scroll-left:hover,
                .animate-scroll-right:hover {
                    animation-play-state: paused;
                }
                `}</style>
            </div>

            {/* CTA Section Replaced with Photo Grid */}
            <PhotoGridCTA />
      
            <div className="pb-20 sm:pb-24"></div>
        </motion.div>
    </div>
  )
}

export default DigiParadise
