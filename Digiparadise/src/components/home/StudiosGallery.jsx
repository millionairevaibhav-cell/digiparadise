import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * StudioCard Component
 * This component renders a single studio card with an interactive media carousel.
 */
const StudioCard = ({ studio, index, onCardClick }) => {
  // Combine all media into one array for the carousel
  const media = [
    { type: 'image', src: studio.image },
    ...studio.subPhotos.map(src => ({ type: 'image', src })),
  ];
  if (studio.video) {
    media.push({ type: 'video', src: studio.video });
  }

  // Set initial index to the last item (video if present, otherwise last image)
  const [currentIndex, setCurrentIndex] = useState(media.length - media.length);

  // --- Carousel Navigation ---

  const nextMedia = (e) => {
    if (e) e.stopPropagation(); // Prevent card click
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const prevMedia = (e) => {
    if (e) e.stopPropagation(); // Prevent card click
    setCurrentIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length);
  };

  const goToMedia = (e, index) => {
    if (e) e.stopPropagation(); // Prevent card click
    setCurrentIndex(index);
  };

  // --- Auto-play Effect (REMOVED) ---

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      onClick={onCardClick} // Main card click navigates to studio page
      className="group cursor-pointer bg-gradient-to-br from-[#2a2a28] to-yellow-500/10 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-yellow-500/20 transform hover:-translate-y-2 basis-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1.3334rem)]"
    >
      {/* Media Container with Carousel */}
      <div className="relative overflow-hidden h-48 sm:h-56 lg:h-64">
        {/* Media items with fade transition */}
        <AnimatePresence initial={false}>
          {media.map((item, i) =>
            // Only render the currently active media item
            i === currentIndex && (
              <motion.div
                key={item.src} // Keyed to trigger animation on change
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.src}
                    alt={`${studio.title} media ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    autoPlay // Plays when it becomes visible
                    muted
                    loop
                    playsInline
                    // Note: group-hover:scale-110 is disabled for video for smoother playback
                  />
                )}
              </motion.div>
            )
          )}
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Center Arrow (for page navigation) - REMOVED
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center shadow-lg">
            <ArrowRight className="text-white" size={20} />
          </div>
        </div>
        */}

        {/* Carousel Navigation Arrows (Left/Right) - Always visible */}
        <button
          onClick={prevMedia}
          aria-label="Previous"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 text-white rounded-full transition-opacity duration-300 hover:bg-black/60"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextMedia}
          aria-label="Next"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/40 text-white rounded-full transition-opacity duration-300 hover:bg-black/60"
        >
          <ChevronRight size={20} />
        </button>

        {/* Carousel Indicator Dots - Always visible */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {media.map((_, i) => (
            <button
              key={i}
              onClick={(e) => goToMedia(e, i)}
              aria-label={`Go to item ${i + 1}`}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === i ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Card Content (Title) */}
      <div className="p-4 sm:p-6 text-center flex flex-col flex-grow">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 transition-colors duration-300">
          {studio.title}
        </h3>
        <div className="w-0 group-hover:w-1/2 h-0.5 bg-gradient-to-r from-yellow-500 to-amber-600 mx-auto mt-2 transition-all duration-400" />
      </div>
    </motion.div>
  );
};


/**
 * Main StudiosGallery Component
 * This component renders the gallery page and maps over the studio data.
 */
const StudiosGallery = () => {
  const navigate = useNavigate();

  // Original studio data
  const studiosData = [
    { id: 1, title: "GodFather Empire", image: 'https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20god%20father%20empire/gf-1.jpg', link: "/godfather-empire", subPhotos: ["https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20god%20father%20empire/gf-2.jpg", "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20god%20father%20empire/gf-3.jpg", "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20god%20father%20empire/gf-4.jpg"], video: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/sets/godfather.MOV" },
    { id: 2, title: "The White House", image: 'https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20white%20house/wh-1.JPG', link: "/the-white-house", subPhotos: ["https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20white%20house/wh-2.jpg", "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20white%20house/wh-3.JPG", "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20white%20house/wh-4.JPG", "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20white%20house/wh-5.jpg"], video: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/sets/whitehouse.MOV" },
    { id: 3, title: "Medina Muse", image: 'https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/medina%20muse/medina-1.jpg', link: "/medina-muse", subPhotos: ["https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/medina%20muse/medina-2.jpg", "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/medina%20muse/medina-3.png","https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/medina%20muse/medina-4.png","https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/medina%20muse/medina-5.jpg"], video: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/sets/medinamuse.MOV" },
    { id: 4, title: "Nexus Den", image: 'https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/Nexus%20den/nd-1.jpg', link: "/nexus-den", subPhotos: ["https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/Nexus%20den/nd-2.JPG","https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/Nexus%20den/nd-3.jpg","https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/Nexus%20den/nd-4.JPG","https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/Nexus%20den/nd-5.JPG"], video: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/sets/nexusden.MOV" },
    { id: 5, title: "Cyclorama", image: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/cyclorama/cyc.png", link: "/cyclorama", subPhotos: ["https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/cyclorama/cyc-2.png","https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/cyclorama/cyc-3.png"], video: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/sets/Set-%20Infinity%20wall.mov" },
    { id: 6, title: "L-Blue Heaven", image: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/blue/bh-1.png", link: "/l-blue-heaven", subPhotos: ['https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/blue/bh-1.png'], video: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/sets/L-Blue-Heaven.MOV" },
    { id: 7, title: "Virasat-e-Noor", image: 'https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/virasat-e-noor/Virasat-e-Noor%20.jpg', link: "/virasat-e-noor", subPhotos: ["https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/fashion/fashion.JPG"], video: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/sets/Set_%20Virasat-e-Noor.MOV" }
  ];

  // Handler for clicking the main card body (navigates to the studio's page)
  const handleStudioClick = (link) => {
    navigate(link);
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-12 sm:py-20 bg-[#262624]">
        {/* Floating Elements */}
        <motion.div
            animate={{ y: [0, 20, 0], x: [0, 20, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -z-0 top-1/4 left-1/4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl"
            aria-hidden="true"
        />
        <motion.div
            animate={{ y: [0, -20, 0], x: [0, -20, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -z-0 bottom-1/4 right-1/4 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl"
            aria-hidden="true"
        />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-10 sm:mb-6 px-2">
            Take a glance at our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400">
              Studios
            </span>
          </h2>
        </motion.div>

        {/* Grid of Studio Cards */}
        <div className="flex flex-wrap justify-center items-stretch gap-6 sm:gap-8">
          {studiosData.map((studio, index) => (
            <StudioCard
              key={studio.id}
              studio={studio}
              index={index}
              onCardClick={() => handleStudioClick(studio.link)}
            />
          ))}
        </div>
      </div>

      {/* All AnimatePresence modals for enlargedImage and playingVideo have been removed
        as their functionality is now replaced by the in-card carousel.
      */}
    </div>
  );
};

export default StudiosGallery;
