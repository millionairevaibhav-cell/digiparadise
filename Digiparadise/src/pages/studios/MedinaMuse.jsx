import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const studioData = {
  name: 'Medina Muse',
  coverImage: 'https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/medina%20muse/medina-1.jpg',
  description: "Inspired by the enchanting architecture of the Middle East, Medina Muse is a studio that transports you to another world. Its warm tones, archways, and rustic textures provide a unique and captivating setting for culturally rich photoshoots, artistic films, and interviews.",
  images: [
    "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/medina%20muse/medina-2.jpg", 
    "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/medina%20muse/medina-3.png",
    "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/medina%20muse/medina-4.png",
    "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/medina%20muse/medina-5.jpg"
  ],
  video: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/sets/medinamuse.MOV",
  textColor: 'text-black',
  textOutline: 'text-black-outline',
};

const otherStudios = [
  { name: "Godfather Empire", link: "/godfather-empire" },
  { name: "The White House", link: "/the-white-house" },
  { name: "Nexus Den", link: "/nexus-den" },
  { name: "Cyclorama", link: "/cyclorama" },
  { name: "Virasat-e-Noor", link: "/virasat-e-noor" },
  { name: "L-Blue Heaven", link: "/l-blue-heaven" },
];

const MedinaMuse = () => {
  const [enlargedImage, setEnlargedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allImages = [...new Set([studioData.coverImage, ...studioData.images])];

  const slideInVariant = {
    hidden: (i) => ({
      opacity: 0,
      x: allImages.length === 1 ? -100 : (i % 2 === 0 ? -100 : 100),
    }),
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  return (
    <div className="bg-[#fef3c7] text-black">
      <style>{`
        @font-face {
          font-family: 'Kardust Expanded Bold';
          src: url('/fonts/Kardust-Expanded-Bold.woff2') format('woff2'),
               url('/fonts/Kardust-Expanded-Bold.woff') format('woff');
          font-weight: bold; font-style: normal; font-display: swap;
        }
        .font-kardust { font-family: 'Kardust Expanded Bold', sans-serif; }
        .text-black-outline {
          text-shadow:
            -1.5px -1.5px 0 #fff, 1.5px -1.5px 0 #fff,
            -1.5px 1.5px 0 #fff, 1.5px 1.5px 0 #fff,
            -2px 2px 8px rgba(0,0,0,0.3);
        }
      `}</style>
      
      {/* Hero Section */}
      <div 
        className="relative h-[50vh] md:h-screen w-full flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${studioData.coverImage})` }}
      >
        <div className="absolute inset-0 bg-amber-100 opacity-40"></div>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`relative z-10 font-kardust text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-wider text-center px-4 ${studioData.textColor} ${studioData.textOutline}`}
        >
          {studioData.name}
        </motion.h1>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center text-lg md:text-xl text-amber-900 max-w-4xl mx-auto mb-12 sm:mb-24"
        >
          {studioData.description}
        </motion.p>

        {/* Image Gallery */}
        <div className={`grid ${allImages.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-12 place-items-center overflow-hidden`}>
          {allImages.map((img, i) => (
            <motion.div
              key={img}
              custom={i}
              variants={slideInVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              onClick={() => setEnlargedImage(img)}
              className="cursor-pointer p-2 bg-white w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl shadow-lg shadow-amber-500/20 border-4 border-white hover:border-amber-300 transition-all duration-300 transform hover:scale-105"
            >
              <img 
                src={img} 
                alt={`${studioData.name} view ${i + 1}`} 
                className="w-full h-full object-contain"
              />
            </motion.div>
          ))}
        </div>

        {/* Video Section */}
        <div className="mt-16 sm:mt-32 text-center">
             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-amber-900 mb-8">Studio Tour</h2>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto"
            >
                <video 
                    src={studioData.video} 
                    controls 
                    className="w-full rounded-lg shadow-2xl border-2 border-amber-200"
                >
                    Your browser does not support the video tag.
                </video>
            </motion.div>
        </div>
      </div>
      
      {/* Other Studios Navbar */}
      <nav className="bg-amber-100 py-6 md:py-8 border-t border-amber-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-amber-900 mb-6">Explore Other Studios</h3>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
                {otherStudios.map(studio => (
                    <a key={studio.link} href={studio.link} className="text-amber-800 hover:text-black text-lg transition-colors duration-300">
                        {studio.name}
                    </a>
                ))}
            </div>
        </div>
      </nav>

      {/* Enlarged Image Modal */}
      <AnimatePresence>
        {enlargedImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEnlargedImage(null)}
          >
            <motion.img
              src={enlargedImage}
              className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            />
             <button onClick={() => setEnlargedImage(null)} className="absolute top-4 right-4 text-white hover:text-amber-300 z-[51]">
                <X size={32} />
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MedinaMuse;

