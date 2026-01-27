import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";

const PhotoGridCTA = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const gridImages = [
    "https://images.unsplash.com/photo-1578997982295-2a25a363fb20?w=600&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1610412891295-50a315058715?w=600&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1595741643242-8a9d69485d?w=600&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1603425200989-b62a63ab4fb8?w=600&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1533671549538-3213b75b11b5?w=600&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1598550463216-339b3a3a4130?w=600&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=450&fit=crop&q=80",
    "https://images.unsplash.com/photo-1609121852426-905141025555?w=600&h=450&fit=crop&q=80"
  ];

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 1024);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const imagesToDisplay = isMobile ? gridImages.slice(0, 4) : gridImages;

  const openLightbox = (src) => {
    const existingModal = document.getElementById('lightbox-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.style.cssText = `position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.95); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; z-index: 9999; cursor: pointer; opacity: 0; transition: opacity 0.3s ease;`;
    
    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = `max-width: 90vw; max-height: 90vh; border-radius: 0.5rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); transform: scale(0.95); transition: transform 0.3s ease;`;
    
    modal.appendChild(img);
    document.body.appendChild(modal);
    
    const closeLightbox = () => {
      modal.style.opacity = '0';
      img.style.transform = 'scale(0.95)';
      setTimeout(() => modal.remove(), 300);
      setSelectedImage(null);
    };
    
    modal.addEventListener('click', closeLightbox);
    
    requestAnimationFrame(() => {
      modal.style.opacity = '1';
      img.style.transform = 'scale(1)';
    });
    
    setSelectedImage(src);
  };

  return (
    <div className="relative overflow-hidden py-16 sm:py-20 bg-[#262624]">
        {/* Floating Elements */}
        <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -z-0 top-10 right-10 w-28 h-28 bg-yellow-500/10 rounded-full blur-2xl"
            aria-hidden="true"
        />
        <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -z-0 bottom-10 left-10 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl"
            aria-hidden="true"
        />

      <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl xs:text-3xl sm:text-4xl text-white lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight"
        >
          Our Work in Action
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-12 leading-relaxed"
        >
          A glimpse into the creative projects filmed and produced at our studio.
        </motion.p>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {imagesToDisplay.map((src, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: (index % 4) * 0.1 }}
              className="relative overflow-hidden rounded-lg sm:rounded-xl cursor-pointer group shadow-md hover:shadow-xl transition-shadow"
              onClick={() => openLightbox(src)}
            >
              <img 
                src={src} 
                alt={`Studio work ${index + 1}`} 
                className="w-full h-full object-cover aspect-[4/3] group-hover:scale-110 transition-transform duration-300" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="p-3 bg-amber-600/80 rounded-full">
                   <Camera className="text-white w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGridCTA;
