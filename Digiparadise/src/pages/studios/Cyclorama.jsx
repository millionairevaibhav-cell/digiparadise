import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const studioData = {
  name: 'Cyclorama',
  coverImage: 'https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/cyclorama/cyc.png',
  description: "Unleash your imagination in our Infinity Wall (Cyclorama) studio. This seamless, pre-lit space is a blank canvas designed for ultimate creative freedom. Perfect for music videos, commercials, and large-scale photoshoots where the only limit is your vision.",
  images: [
    "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/cyclorama/cyc-2.png",
    "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/cyclorama/cyc-3.png"
  ],
  video: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/sets/Set-%20Infinity%20wall.mov",
  textColor: 'text-fuchsia-500',
  textOutline: 'text-magenta-outline',
};

const otherStudios = [
  { name: "Godfather Empire", link: "/godfather-empire" },
  { name: "The White House", link: "/the-white-house" },
  { name: "Medina Muse", link: "/medina-muse" },
  { name: "Nexus Den", link: "/nexus-den" },
  { name: "Virasat-e-Noor", link: "/virasat-e-noor" },
  { name: "L-Blue Heaven", link: "/l-blue-heaven" },
];

const Cyclorama = () => {
  const [enlargedImage, setEnlargedImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const slideInVariant = {
    hidden: (i) => ({
      opacity: 0,
      // If there's only one image, it always comes from the left.
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

  const allImages = [...new Set([studioData.coverImage, ...studioData.images])];

  return (
    <div className="bg-gray-100 text-black">
      <style>{`
        @font-face {
          font-family: 'Kardust Expanded Bold';
          src: url('/fonts/Kardust-Expanded-Bold.woff2') format('woff2'),
               url('/fonts/Kardust-Expanded-Bold.woff') format('woff');
          font-weight: bold; font-style: normal; font-display: swap;
        }
        .font-kardust { font-family: 'Kardust Expanded Bold', sans-serif; }
        .text-magenta-outline {
          text-shadow:
            -1px -1px 0 #000, 1px -1px 0 #000,
            -1px 1px 0 #000, 1px 1px 0 #000,
            -2px 2px 5px rgba(0,0,0,0.6);
        }
      `}</style>
      
      {/* Hero Section */}
      <div 
        className="relative h-[50vh] md:h-screen w-full flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${studioData.coverImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`relative z-10 font-kardust text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-wider text-center ${studioData.textColor} ${studioData.textOutline}`}
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
          className="text-center text-lg md:text-xl lg:text-2xl text-gray-700 max-w-4xl mx-auto mb-12 sm:mb-24"
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
              className="cursor-pointer p-2 bg-white w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-2xl shadow-lg shadow-fuchsia-500/20 border-4 border-white hover:border-fuchsia-500 transition-all duration-300 transform hover:scale-105"
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
             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-8">Studio Tour</h2>
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
                    className="w-full rounded-lg shadow-2xl border-2 border-gray-300"
                >
                    Your browser does not support the video tag.
                </video>
            </motion.div>
        </div>
      </div>
      
      {/* Other Studios Navbar */}
      <nav className="bg-white py-6 md:py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-black mb-6">Explore Other Studios</h3>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
                {otherStudios.map(studio => (
                    <a key={studio.link} href={studio.link} className="text-gray-600 hover:text-fuchsia-600 text-lg transition-colors duration-300">
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
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
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
             <button onClick={() => setEnlargedImage(null)} className="absolute top-4 right-4 text-white hover:text-fuchsia-400 z-[51]">
                <X size={32} />
             </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cyclorama;

