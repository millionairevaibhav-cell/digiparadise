import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

// SVG Icons
const StarIcon = ({ filled }) => (
    <svg className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.176 0l-3.368 2.447c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.07 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
    </svg>
);

const GoogleIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 48 48">
        <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"></path>
        <path fill="#FBBC05" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"></path>
        <path fill="#EA4335" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);

const QuoteIcon = () => (
    <svg className="w-8 h-8 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 32 32">
        <path d="M9.981 21.019C8.307 22.883 6.054 24 3.999 24c-1.579 0-3.04-.61-4.14-1.71-1.1-1.1-1.71-2.56-1.71-4.14 0-4.045 3.078-7.318 6.85-7.318h.15c.39 0 .7.31.7.7v3.438c0 .39-.31.7-.7.7h-.15c-1.518 0-2.75 1.232-2.75 2.75s1.232 2.75 2.75 2.75 2.75-1.232 2.75-2.75c0-3.313 2.687-6 6-6h1.25V4.687c0-.39.31-.7.7-.7h3.438c.39 0 .7.31.7.7V10c0 6.065-4.935 11-11 11.019zM26.019 21.019C24.345 22.883 22.092 24 20.037 24c-1.579 0-3.04-.61-4.14-1.71-1.1-1.1-1.71-2.56-1.71-4.14 0-4.045 3.078-7.318 6.85-7.318h.15c.39 0 .7.31.7.7v3.438c0 .39-.31.7-.7.7h-.15c-1.518 0-2.75 1.232-2.75 2.75s1.232 2.75 2.75 2.75 2.75-1.232 2.75-2.75c0-3.313 2.687-6 6-6h1.25V4.687c0-.39.31-.7.7-.7h3.438c.39 0 .7.31.7.7V10c0 6.065-4.935 11-11 11.019z"></path>
    </svg>
);

const videoTestimonials = [
    { id: 1, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/testimonials/Testimonail%20video%2013.mp4" },
    { id: 2, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/testimonials/Testimonail%20video%2011.mp4" },
    { id: 3, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/testimonials/Testimonail%20video%2014.mp4" },
    { id: 4, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/testimonials/Testimonail%20video%209.mp4" },
    { id: 5, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/testimonials/Testimonail%20video%2010.mp4" },
    { id: 6, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/testimonials/Testimonail%20video%2012.mp4" },
    { id: 7, src: "https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/testimonials/Testimonail%20video%2015.mp4" },
];

const writtenTestimonialsData = [
    { id: 1, name: "Sarah L.", role: "Marketing Director, TechCorp", avatar: "https://placehold.co/100x100/3498DB/FFFFFF?text=SL", rating: 5, content: "Working with this team was a game-changer. Their insights and dedication helped us increase our lead generation by over 60% in just one quarter. Truly remarkable results!" },
    { id: 2, name: "Michael B.", role: "Founder, Startup Inc.", avatar: "https://placehold.co/100x100/2ECC71/FFFFFF?text=MB", rating: 5, content: "As a new company, we needed a partner who understood our vision. They not only delivered a fantastic product but also provided strategic advice that was invaluable." },
    { id: 3, name: "Jessica P.", role: "CEO, Innovate Solutions", avatar: "https://placehold.co/100x100/E74C3C/FFFFFF?text=JP", rating: 5, content: "The level of professionalism and creativity is unmatched. They consistently exceeded our expectations and were a pleasure to collaborate with. Highly recommended." },
    { id: 4, name: "David Chen", role: "Product Manager, FutureWorks", avatar: "https://placehold.co/100x100/F1C40F/FFFFFF?text=DC", rating: 4, content: "A reliable and skilled team that delivers high-quality work on time. They were adaptable to our changing requirements and always maintained clear communication." },
    { id: 5, name: "Emily R.", role: "E-commerce Specialist", avatar: "https://placehold.co/100x100/9B59B6/FFFFFF?text=ER", rating: 5, content: "Our online sales have soared since we revamped our platform with them. Their expertise in user experience is evident in the positive feedback we've received from customers." },
    { id: 6, name: "Chris T.", role: "Operations Head, Global Logistics", avatar: "https://placehold.co/100x100/E67E22/FFFFFF?text=CT", rating: 5, content: "They streamlined our processes with a custom software solution that has saved us countless hours and reduced operational errors. An essential partner for our growth." },
];

const VideoCard = ({ src, isMobile }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayForMobile = () => {
        if (!isMobile) return;
        const video = videoRef.current;
        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const handleMouseEnter = () => {
        if (!isMobile && videoRef.current) {
            videoRef.current.play().catch(error => console.error("Autoplay was prevented:", error));
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile && videoRef.current) {
            videoRef.current.pause();
        }
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const handleEnd = () => setIsPlaying(false);
        video.addEventListener("ended", handleEnd);
        return () => video.removeEventListener("ended", handleEnd);
    }, []);

    return (
        <div 
            className="relative aspect-[9/16] w-full bg-black rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden shadow-lg group"
            onClick={isMobile ? togglePlayForMobile : undefined}
            onMouseEnter={!isMobile ? handleMouseEnter : undefined}
            onMouseLeave={!isMobile ? handleMouseLeave : undefined}
        >
            <video ref={videoRef} src={src} loop={!isMobile} playsInline className="w-full h-full object-cover" />
            {isMobile && !isPlaying && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity">
                    <Play className="w-12 h-12 text-white/80 drop-shadow-lg" />
                </div>
            )}
        </div>
    );
};

const WrittenReviewCard = ({ name, rating, content, avatar }) => {
    return (
      <div className="bg-gradient-to-br from-[#2a2a28] to-yellow-500/10 backdrop-blur-md border border-yellow-500/20 rounded-lg p-6 shadow-md flex flex-col h-full hover:shadow-xl hover:border-yellow-500/40 transition-all">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img src={avatar} alt={name} className="w-12 h-12 rounded-full object-cover" />
            <div>
              <p className="font-semibold text-white">{name}</p>
              <p className="text-sm text-gray-400">a year ago</p>
            </div>
          </div>
          <GoogleIcon />
        </div>
        <div className="flex items-center mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon key={i} filled={i < rating} />
          ))}
        </div>
        <div className="flex-grow text-gray-300 flex items-start space-x-2">
          <QuoteIcon />
          <span className="flex-1">{content}</span>
        </div>
      </div>
    );
};

const Testimonials = () => {
    const [currentIndex1, setCurrentIndex1] = useState(0);
    const [currentIndex2, setCurrentIndex2] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [videoItemsPerPage, setVideoItemsPerPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    const writtenAutoScrollInterval = useRef(null);
    const videoAutoScrollInterval = useRef(null);
    
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            setIsMobile(screenWidth < 640);
            if (screenWidth >= 1024) {
                setVideoItemsPerPage(7);
            } else if (screenWidth >= 640) {
                setVideoItemsPerPage(3);
            } else {
                setVideoItemsPerPage(1);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const startWrittenAutoScroll = () => {
            writtenAutoScrollInterval.current = setInterval(() => {
                if (!isPaused && !isAnimating) {
                    setCurrentIndex2((prev) => (prev - 1 + writtenTestimonialsData.length) % writtenTestimonialsData.length);
                }
            }, 4000);
        };
        startWrittenAutoScroll();
        return () => clearInterval(writtenAutoScrollInterval.current);
    }, [isPaused, isAnimating]);

    useEffect(() => {
        if (!isMobile) {
            if (videoAutoScrollInterval.current) {
                clearInterval(videoAutoScrollInterval.current);
            }
            return;
        }
        const startVideoAutoScroll = () => {
            videoAutoScrollInterval.current = setInterval(() => {
                if (!isPaused && !isAnimating) {
                    setCurrentIndex1((prev) => (prev + 1) % videoTestimonials.length);
                }
            }, 6000);
        };
        startVideoAutoScroll();
        return () => {
            if (videoAutoScrollInterval.current) {
                clearInterval(videoAutoScrollInterval.current);
            }
        };
    }, [isPaused, isAnimating, isMobile]);

    const pauseAutoScroll = () => {
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 10000);
    };

    const handleNavigation = (direction, rowNumber) => {
        if (isAnimating) return;
        pauseAutoScroll();
        setIsAnimating(true);
        
        if (rowNumber === 1) {
            setCurrentIndex1(prev => {
                const newIndex = direction === 'left'
                    ? (prev - 1 + videoTestimonials.length) % videoTestimonials.length
                    : (prev + 1) % videoTestimonials.length;
                return newIndex;
            });
        } else {
            setCurrentIndex2(prev => {
                const newIndex = direction === 'left'
                    ? (prev - 1 + writtenTestimonialsData.length) % writtenTestimonialsData.length
                    : (prev + 1) % writtenTestimonialsData.length;
                return newIndex;
            });
        }
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handleIndicatorClick = (index) => {
        pauseAutoScroll();
        setCurrentIndex1(index);
        setCurrentIndex2(index);
    };
    
    const testimonials = writtenTestimonialsData;

    return (
        <div className="relative py-12 lg:py-20 bg-[#262624] overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            {/* Floating Elements */}
            <motion.div
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -z-0 top-1/3 right-1/4 w-48 h-48 bg-yellow-500/5 rounded-full blur-2xl"
                aria-hidden="true"
            />
            <motion.div
                animate={{ y: [0, 25, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -z-0 bottom-1/3 left-1/4 w-40 h-40 bg-cyan-500/5 rounded-full blur-2xl"
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12 lg:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400">Stories</span>
                    </h2>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        Hear from our clients about their experience and success with us.
                    </p>
                </motion.div>

                {/* Video Testimonials Row */}
                <div className="relative mb-8 lg:mb-12">
                     <button onClick={() => handleNavigation('left', 1)} disabled={isAnimating} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[#2a2a28]/80 hover:bg-[#1a1a18] backdrop-blur-sm shadow-lg rounded-full p-2.5 transition hover:scale-110 disabled:opacity-50 -ml-2 lg:ml-2" aria-label="Previous testimonials">
                         <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                     </button>
                     <button onClick={() => handleNavigation('right', 1)} disabled={isAnimating} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#2a2a28]/80 hover:bg-[#1a1a18] backdrop-blur-sm shadow-lg rounded-full p-2.5 transition hover:scale-110 disabled:opacity-50 -mr-2 lg:mr-2" aria-label="Next testimonials">
                         <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                     </button>
                    
                     <div className="overflow-hidden">
                         <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex1 * (100 / videoItemsPerPage)}%)` }}>
                             {[...videoTestimonials, ...videoTestimonials].map((video, index) => (
                                 <div key={`video-${index}`} className="flex-shrink-0 w-full sm:w-1/3 lg:w-[calc(100%/7)] p-2">
                                     <VideoCard src={video.src} isMobile={isMobile} />
                                 </div>
                             ))}
                         </div>
                     </div>
                </div>

                {/* Written Testimonials Row */}
                <div className="relative">
                    <button onClick={() => handleNavigation('left', 2)} disabled={isAnimating} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#2a2a28]/80 hover:bg-[#1a1a18] backdrop-blur-sm shadow-lg rounded-full p-2.5 transition hover:scale-110 disabled:opacity-50 -ml-2 lg:ml-2" aria-label="Previous testimonials">
                        <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </button>
                    <button onClick={() => handleNavigation('right', 2)} disabled={isAnimating} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#2a2a28]/80 hover:bg-[#1a1a18] backdrop-blur-sm shadow-lg rounded-full p-2.5 transition hover:scale-110 disabled:opacity-50 -mr-2 lg:mr-2" aria-label="Next testimonials">
                        <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </button>

                    <div className="overflow-hidden">
                        <div className="flex transition-transform duration-700 ease-in-out -mx-2" style={{ transform: `translateX(-${currentIndex2 * (100 / 3)}%)` }}>
                           {[...testimonials, ...testimonials].map((testimonial, index) => (
                               <div key={`written-${index}`} className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-2">
                                    <WrittenReviewCard name={testimonial.name} rating={testimonial.rating} content={testimonial.content} avatar={testimonial.avatar} />
                               </div>
                           ))}
                        </div>
                    </div>
                </div>

                {/* Powered by Google */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-400 flex items-center justify-center space-x-2">
                        <span>Powered by</span>
                        <GoogleIcon />
                    </p>
                </div>

                {/* Indicators */}
                <div className="flex justify-center mt-6 space-x-2">
                    {testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleIndicatorClick(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${
                                currentIndex1 % testimonials.length === index ? 'bg-amber-600 scale-125' : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                            aria-label={`Go to testimonial set ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
