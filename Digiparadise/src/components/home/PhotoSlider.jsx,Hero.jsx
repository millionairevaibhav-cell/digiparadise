import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const sliderImages = [
  { src: 'https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20god%20father%20empire/gf-2.jpg' },
  { src: 'https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20white%20house/wh-3-compressed.jpg' },
  { src: 'https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20white%20house/wh-1-compressed.jpg' },
  { src: 'https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/medina%20muse/medina-1.jpg' },
];

const PhotoSlider = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const activeImage = sliderImages[currentImageIndex];

  return (
    <div className="relative w-full h-[50vh] md:h-screen overflow-hidden bg-[#262624]">
      {/* Font style block removed as text is no longer present */}

      <AnimatePresence>
        <motion.img
          key={currentImageIndex}
          src={activeImage.src}
          alt="Digiparadise Studios background"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      
      {/* Dark overlay and blur effect div removed */}

      {/* Text container div removed */}
    </div>
  );
};

export default PhotoSlider;
