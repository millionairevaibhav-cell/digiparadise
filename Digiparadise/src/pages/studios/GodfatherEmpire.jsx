import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const studioData = {
    name: "The Godfather Empire",
    coverImage: "https://media.digiparadisestudios.com/studiopics/the%20god%20father%20empire/gf-1.jpg",
    description: "Step into the world of classic cinema with The Godfather Empire set. Featuring rich, dark wood, vintage furniture, and an atmosphere of power and prestige, this studio is perfect for dramatic scenes, high-stakes interviews, and sophisticated photoshoots that command attention.",
    images: [
        "https://media.digiparadisestudios.com/studiopics/the%20god%20father%20empire/gf-2.jpg",
        "https://media.digiparadisestudios.com/studiopics/the%20god%20father%20empire/gf-3.jpg",
        "https://media.digiparadisestudios.com/studiopics/the%20god%20father%20empire/gf-4.jpg"
    ],
    video: "https://media.digiparadisestudios.com/sets/godfather.MOV",
    textColor: "text-white",
};

const otherStudios = [
    { name: "The White House", link: "/the-white-house" },
    { name: "Medina Muse", link: "/medina-muse" },
    { name: "Nexus Den", link: "/nexus-den" },
    { name: "Cyclorama", link: "/cyclorama" },
    { name: "Virasat-e-Noor", link: "/virasat-e-noor" },
    { name: "L-Blue Heaven", link: "/l-blue-heaven" },
];

const GodfatherEmpire = () => {
    const [enlargedImage, setEnlargedImage] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const slideInVariant = {
        hidden: (i) => ({
          opacity: 0,
          x: i % 2 === 0 ? -100 : 100,
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
        <div className="bg-black">
             <style>{`
                @font-face {
                    font-family: 'Kardust Expanded Bold';
                    src: url('/fonts/Kardust-Expanded-Bold.woff2') format('woff2'),
                         url('/fonts/Kardust-Expanded-Bold.woff') format('woff');
                    font-weight: bold; font-style: normal; font-display: swap;
                }
                .font-kardust { font-family: 'Kardust Expanded Bold', sans-serif; }
            `}</style>

            {/* Hero Section */}
            <div style={{ backgroundImage: `url(${studioData.coverImage})` }} className="relative h-[50vh] md:h-screen bg-cover bg-center flex items-center justify-center">
                <div className="absolute inset-0 bg-black/60" />
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`font-kardust text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider uppercase relative z-10 text-center px-4 ${studioData.textColor}`}
                >
                    {studioData.name}
                </motion.h1>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className="text-base sm:text-lg md:text-xl text-center mb-12 sm:mb-20 text-gray-300 max-w-4xl mx-auto"
                >
                    {studioData.description}
                </motion.p>

                {/* Image Gallery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 place-items-center overflow-hidden mb-12 sm:mb-20">
                    {allImages.map((img, i) => (
                        <motion.div
                            key={img}
                            custom={i}
                            variants={slideInVariant}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="cursor-pointer"
                            onClick={() => setEnlargedImage(img)}
                        >
                            <img src={img} alt={`${studioData.name} view ${i + 1}`} className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 object-cover rounded-2xl shadow-lg shadow-yellow-500/20 border-4 border-gray-800 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105" />
                        </motion.div>
                    ))}
                </div>

                {/* Video Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12 sm:mb-20"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-white">Studio Tour</h2>
                    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl mx-auto max-w-4xl border-2 border-gray-800">
                        <video src={studioData.video} controls className="w-full h-full object-cover" />
                    </div>
                </motion.div>

                {/* Other Studios Nav */}
                <nav className="border-t border-gray-800 pt-8 mt-8 sm:pt-12 sm:mt-12">
                    <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-white">Explore Other Studios</h3>
                    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                        {otherStudios.map(studio => (
                            <Link 
                                key={studio.name} 
                                to={studio.link} 
                                className="px-4 py-2 text-sm sm:text-base bg-gray-800 text-gray-300 rounded-full hover:bg-yellow-500 hover:text-black transition-all duration-300"
                            >
                                {studio.name}
                            </Link>
                        ))}
                    </div>
                </nav>
            </div>

            {/* Modal for Enlarged Image */}
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
                            key={enlargedImage}
                            src={enlargedImage}
                            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                        />
                        <motion.button 
                            onClick={() => setEnlargedImage(null)} 
                            className="absolute top-4 right-4 text-white hover:text-yellow-400 z-[51]"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1, transition: { delay: 0.2 } }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <X size={32} />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GodfatherEmpire;

