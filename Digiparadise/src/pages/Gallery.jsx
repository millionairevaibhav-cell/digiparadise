"use client"

import { useState, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

// --- INLINE SVG ICONS ---
const FiX = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const FiChevronLeft = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="15 18 9 12 15 6"></polyline></svg>
);
const FiChevronRight = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="9 18 15 12 9 6"></polyline></svg>
);
const FiInfo = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
);
// --- END INLINE SVG ICONS ---

const FloatingElement = ({ className, delay = 0, duration = 6 }) => (
  <motion.div
    animate={{ 
      y: [-10, 10, -10],
      x: [-5, 5, -5],
      opacity: [0.1, 0.3, 0.1]
    }}
    transition={{ 
      duration: duration + delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className={`absolute -z-0 ${className}`}
    aria-hidden="true"
  />
)

const ImageCard = ({ image, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    whileHover={{ y: -3, transition: { duration: 0.2 } }}
    className="group cursor-pointer"
    onClick={() => onClick(image)}
  >
    <div className="relative overflow-hidden rounded-xl shadow-lg border border-yellow-500/20 bg-[#2a2a28] transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10">
      <img
        src={image.src || "/placeholder.svg"}
        alt={image.title}
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/2a2a28/ffffff?text=Image+Not+Found'; }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
          <p className="text-sm opacity-90 line-clamp-2">{image.description}</p>
        </div>
      </div>
    </div>
  </motion.div>
)

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [filter, setFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [showDescription, setShowDescription] = useState(false)
  const imagesPerPage = 6

  const images = useMemo(() => [
    // GodFather Empire Images
    { id: 1, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20god%20father%20empire/gf-1.jpg", category: "godfather-empire", title: "GodFather Empire", description: "A view from the GodFather Empire set." },
    { id: 2, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20god%20father%20empire/gf-2.jpg", category: "godfather-empire", title: "GodFather Empire", description: "A view from the GodFather Empire set." },
    { id: 3, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20god%20father%20empire/gf-3.jpg", category: "godfather-empire", title: "GodFather Empire", description: "A view from the GodFather Empire set." },
    { id: 4, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20god%20father%20empire/gf-4.jpg", category: "godfather-empire", title: "GodFather Empire", description: "A view from the GodFather Empire set." },
    // The White House Images
    { id: 5, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20white%20house/wh-1.JPG", category: "the-white-house", title: "The White House", description: "A view from The White House set." },
    { id: 6, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20white%20house/wh-2.jpg", category: "the-white-house", title: "The White House", description: "A view from The White House set." },
    { id: 7, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20white%20house/wh-3.JPG", category: "the-white-house", title: "The White House", description: "A view from The White House set." },
    { id: 8, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20white%20house/wh-4.JPG", category: "the-white-house", title: "The White House", description: "A view from The White House set." },
    { id: 9, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/the%20white%20house/wh-5.jpg", category: "the-white-house", title: "The White House", description: "A view from The White House set." },
    // Medina Muse Images
    { id: 10, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/medina%20muse/medina-1.jpg", category: "medina-muse", title: "Medina Muse", description: "A view from the Medina Muse set." },
    { id: 11, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/medina%20muse/medina-2.jpg", category: "medina-muse", title: "Medina Muse", description: "A view from the Medina Muse set." },
    { id: 12, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/medina%20muse/medina-3.png", category: "medina-muse", title: "Medina Muse", description: "A view from the Medina Muse set." },
    { id: 13, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/medina%20muse/medina-4.png", category: "medina-muse", title: "Medina Muse", description: "A view from the Medina Muse set." },
    { id: 14, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/medina%20muse/medina-5.jpg", category: "medina-muse", title: "Medina Muse", description: "A view from the Medina Muse set." },
    // Nexus Den Images
    { id: 15, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/Nexus%20den/nd-1.jpg", category: "nexus-den", title: "Nexus Den", description: "A view from the Nexus Den set." },
    { id: 16, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/Nexus%20den/nd-2.JPG", category: "nexus-den", title: "Nexus Den", description: "A view from the Nexus Den set." },
    { id: 17, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/Nexus%20den/nd-3.jpg", category: "nexus-den", title: "Nexus Den", description: "A view from the Nexus Den set." },
    { id: 18, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/Nexus%20den/nd-4.JPG", category: "nexus-den", title: "Nexus Den", description: "A view from the Nexus Den set." },
    // Infinity wall (Cyclorama) Images
    { id: 19, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/cyclorama/cyc.png", category: "infinity-wall-cyclorama", title: "Infinity wall (Cyclorama)", description: "A view from the Infinity wall (Cyclorama) set." },
    { id: 20, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/cyclorama/cyc-2.png", category: "infinity-wall-cyclorama", title: "Infinity wall (Cyclorama)", description: "A view from the Infinity wall (Cyclorama) set." },
    { id: 21, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/cyclorama/cyc-3.png", category: "infinity-wall-cyclorama", title: "Infinity wall (Cyclorama)", description: "A view from the Infinity wall (Cyclorama) set." },
    // L- Blue heaven Images
    { id: 22, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/blue/bh-1.png", category: "l-blue-heaven", title: "L- Blue heaven", description: "A view from the L- Blue heaven set." },
    // Virasat-e-Noor Images
    { id: 23, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/virasat-e-noor/Virasat-e-Noor%20.jpg", category: "virasat-e-noor", title: "Virasat-e-Noor", description: "A view from the Virasat-e-Noor set." },
    { id: 24, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/studiopics/fashion/fashion.JPG", category: "virasat-e-noor", title: "Virasat-e-Noor", description: "A view from the Virasat-e-Noor set." },
  ], [])

  const categories = useMemo(() => [
    { id: "all", name: "All" },
    { id: "godfather-empire", name: "GodFather Empire" },
    { id: "the-white-house", name: "The White House" },
    { id: "medina-muse", name: "Medina Muse" },
    { id: "nexus-den", name: "Nexus Den" },
    { id: "infinity-wall-cyclorama", name: "Infinity wall" },
    { id: "l-blue-heaven", name: "L- Blue heaven" },
    { id: "virasat-e-noor", name: "Virasat-e-Noor" }
  ], [])

  const filteredImages = useMemo(() => 
    filter === "all" ? images : images.filter((img) => img.category === filter),
    [images, filter]
  )
  
  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(filteredImages.length / imagesPerPage)
    const startIndex = (currentPage - 1) * imagesPerPage
    const endIndex = startIndex + imagesPerPage
    const currentImages = filteredImages.slice(startIndex, endIndex)
    
    return { totalPages, startIndex, endIndex, currentImages }
  }, [filteredImages, currentPage, imagesPerPage])

  const handleFilterChange = useCallback((newFilter) => {
    setFilter(newFilter)
    setCurrentPage(1)
  }, [])

  const openLightbox = useCallback((image) => {
    setSelectedImage(image)
    setShowDescription(false)
  }, [])

  const closeLightbox = useCallback(() => {
    setSelectedImage(null)
    setShowDescription(false)
  }, [])

  const nextImage = useCallback(() => {
    if (!selectedImage) return
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id)
    const nextIndex = (currentIndex + 1) % filteredImages.length
    setSelectedImage(filteredImages[nextIndex])
    setShowDescription(false)
  }, [selectedImage, filteredImages])

  const prevImage = useCallback(() => {
    if (!selectedImage) return
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage.id)
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length
    setSelectedImage(filteredImages[prevIndex])
    setShowDescription(false)
  }, [selectedImage, filteredImages])

  const goToPage = useCallback((page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="pt-16 min-h-screen bg-[#262624] text-gray-300 overflow-x-hidden">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-20 bg-gradient-to-br from-[#1a1a18] via-[#262624] to-[#2a2a28] relative overflow-hidden"
      >
        <FloatingElement className="top-10 right-20 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl" />
        <FloatingElement className="bottom-10 left-20 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" delay={2} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our professional studio setups, equipment, and the amazing content we've helped create for our
            clients.
          </p>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="py-8 bg-[#262624] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* --- MODIFIED FOR 2-COLUMN ON MOBILE --- */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleFilterChange(category.id)}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium transition-all duration-200 text-sm sm:text-base text-center ${
                  filter === category.id
                    ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg shadow-amber-500/20"
                    : "bg-gradient-to-br from-[#2a2a28] to-yellow-500/10 backdrop-blur-md border border-yellow-500/20 text-gray-300 hover:border-yellow-500/40 shadow-md"
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
          {/* --- END OF MODIFICATION --- */}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="pb-8 bg-gradient-to-br from-[#1a1a18] via-[#262624] to-[#2a2a28] relative overflow-hidden">
        <FloatingElement className="top-20 left-10 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl" delay={1} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginationData.currentImages.map((image, index) => (
              <ImageCard
                key={image.id}
                image={image}
                index={index}
                onClick={openLightbox}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {paginationData.totalPages > 1 && (
        <div className="py-12 sm:py-20 bg-[#262624]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center space-x-2">
              {/* Previous Button */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === 1
                    ? "bg-[#2a2a28] text-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-br from-[#2a2a28] to-yellow-500/10 backdrop-blur-md border border-yellow-500/20 text-gray-300 hover:border-yellow-500/40 shadow-md"
                }`}
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>

              {/* Page Numbers */}
              {[...Array(paginationData.totalPages)].map((_, index) => {
                const pageNum = index + 1
                const isCurrentPage = pageNum === currentPage
                
                const showPage = pageNum === 1 || 
                                pageNum === paginationData.totalPages || 
                                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                
                if (!showPage) {
                  if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                    return (
                      <span key={pageNum} className="px-2 text-gray-500">
                        ...
                      </span>
                    )
                  }
                  return null
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      isCurrentPage
                        ? "bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 text-white shadow-lg shadow-amber-500/20"
                        : "bg-gradient-to-br from-[#2a2a28] to-yellow-500/10 backdrop-blur-md border border-yellow-500/20 text-gray-300 hover:border-yellow-500/40 shadow-md"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}

              {/* Next Button */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === paginationData.totalPages}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  currentPage === paginationData.totalPages
                  ? "bg-[#2a2a28] text-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-br from-[#2a2a28] to-yellow-500/10 backdrop-blur-md border border-yellow-500/20 text-gray-300 hover:border-yellow-500/40 shadow-md"
                }`}
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Page Info */}
            <div className="text-center mt-4">
              <p className="text-gray-400">
                Showing {paginationData.startIndex + 1}-{Math.min(paginationData.endIndex, filteredImages.length)} of {filteredImages.length} images
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox (Already dark-themed, no changes needed) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg border border-yellow-200/20"
              />

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-10 h-10 bg-yellow-600/80 hover:bg-yellow-600 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
              >
                <FiX size={24} />
              </button>

              {/* Info Button */}
              <div className="absolute top-4 left-4">
                <div 
                  className="relative"
                  onMouseEnter={() => setShowDescription(true)}
                  onMouseLeave={() => setShowDescription(false)}
                >
                  <button className="w-10 h-10 bg-yellow-600/80 hover:bg-yellow-600 rounded-full flex items-center justify-center text-white transition-colors shadow-lg">
                    <FiInfo size={18} />
                  </button>
                  
                  {/* Description Tooltip */}
                  <AnimatePresence>
                    {showDescription && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-12 left-0 min-w-[300px] max-w-[400px] bg-black/90 backdrop-blur-sm text-white p-4 rounded-lg shadow-xl border border-yellow-200/20 z-10"
                      >
                        <h3 className="font-semibold text-lg mb-2 text-yellow-300">
                          {selectedImage.title}
                        </h3>
                        <p className="text-sm text-gray-200 leading-relaxed">
                          {selectedImage.description}
                        </p>
                        <div className="absolute -top-2 left-4 w-4 h-4 bg-black/90 rotate-45 border-l border-t border-yellow-200/20"></div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-yellow-600/80 hover:bg-yellow-600 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
              >
                <FiChevronLeft size={24} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-yellow-600/80 hover:bg-yellow-600 rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
              >
                <FiChevronRight size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Gallery
