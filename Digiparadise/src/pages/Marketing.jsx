import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { 
    ChevronLeft, 
    ChevronRight, 
    Play,
    Users, 
    TrendingUp, 
    Edit3, 
    Share2, 
    Type, 
    Search, 
    Bot,
    Target,
    BarChart,
    Brain,
    Rocket,
    Zap,
    Sparkles
} from "lucide-react";




// --- Feature Card ---
const FeatureCard = ({ feature, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="text-center p-6 bg-gradient-to-br from-amber-400/10 to-cyan-500/10 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl hover:border-yellow-500/40 transition-all duration-300 border border-yellow-500/20 h-full flex flex-col items-center justify-center"
    >
        <div className="flex-shrink-0 flex justify-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 mb-4">
            {feature.icon}
        </div>
        <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 mb-2">{feature.title}</h3>
        <p className="text-gray-300 leading-relaxed text-base">{feature.description}</p>
    </motion.div>
);

// --- Video Card ---
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



const CarAnimation = () => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const cycle = () => {
            setStage(0);
            setTimeout(() => setStage(1), 2500); // Car arrives
            setTimeout(() => setStage(2), 3500); // Fueling ends
            setTimeout(() => setStage(3), 5000); // Car leaves
        };
        
        cycle();
        const interval = setInterval(cycle, 7000); // Loop duration
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full max-w-5xl mx-auto h-80 bg-gradient-to-b from-gray-900/50 to-gray-800/50 rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                        background: stage >= 2 
                            ? ['radial-gradient(circle at 20% 50%, #06b6d4 0%, transparent 50%)', 'radial-gradient(circle at 80% 50%, #f59e0b 0%, transparent 50%)']
                            : 'radial-gradient(circle at 50% 50%, #374151 0%, transparent 50%)'
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
            </div>

            {/* Road */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-800 to-gray-700/50">
                <motion.div 
                    className="absolute top-1/2 left-0 right-0 h-1"
                    animate={{ x: stage >= 2 ? [-50, 0] : 0 }}
                    transition={{ duration: 0.5, repeat: stage >= 2 ? Infinity : 0 }}
                >
                    {[...Array(30)].map((_, i) => (
                        <div key={i} className="absolute top-0 h-1 w-8 bg-yellow-500/40" style={{ left: `${i * 60}px` }} />
                    ))}
                </motion.div>
            </div>

            {/* Metrics Display */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-900/80 backdrop-blur-md rounded-xl p-4 border border-gray-700"
                >
                    <p className="text-gray-400 text-xs mb-2">BEFORE</p>
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-red-500" />
                        <span className="text-white font-bold">Engagement</span>
                    </div>
                    <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                        <motion.div 
                            className="h-full bg-red-500"
                            initial={{ width: "15%" }}
                            animate={{ width: "15%" }}
                        />
                    </div>
                </motion.div>

                <AnimatePresence>
                    {stage >= 2 && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-gradient-to-r from-cyan-900/80 to-amber-900/80 backdrop-blur-md rounded-xl p-4 border border-cyan-500/50"
                        >
                            <p className="text-gray-300 text-xs mb-2">AFTER</p>
                            <div className="flex items-center gap-2 mb-1">
                                <Rocket className="w-4 h-4 text-cyan-400" />
                                <span className="text-white font-bold">Engagement</span>
                            </div>
                            <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-gradient-to-r from-cyan-500 to-amber-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "95%" }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Fuel Station Structure - Centered */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-24 left-1/2 transform -translate-x-1/2"
            >
                <div className="relative" style={{ width: '280px', height: '140px' }}>
                    
                    {/* Left Support Pillar */}
                    <div className="absolute left-8 bottom-0 w-6 h-32 bg-gradient-to-b from-gray-500 via-gray-600 to-gray-700 shadow-2xl">
                        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gray-400 to-gray-600" />
                        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-gray-700 to-gray-900" />
                    </div>

                    {/* Right Support Pillar */}
                    <div className="absolute right-8 bottom-0 w-6 h-32 bg-gradient-to-b from-gray-500 via-gray-600 to-gray-700 shadow-2xl">
                        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-gray-400 to-gray-600" />
                        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-gray-700 to-gray-900" />
                    </div>

                    {/* Overhead Canopy/Roof */}
                    <div className="absolute top-0 left-0 right-0" style={{ height: '80px' }}>
                        {/* Roof structure with 3D effect */}
                        <div className="relative">
                            {/* Top surface */}
                            <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-gray-400 to-gray-500 shadow-lg transform -skew-y-1" />
                            
                            {/* Main canopy body */}
                            <div className="absolute top-3 left-0 right-0 h-16 bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800 shadow-2xl">
                                {/* Inner glow effect */}
                                <div className="absolute inset-x-4 bottom-2 h-12 bg-gradient-to-b from-gray-900/50 to-transparent" />
                                
                                {/* Side edges for 3D effect */}
                                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-gray-800 to-gray-700" />
                                <div className="absolute right-0 top-0 bottom-0 w-2 bg-gradient-to-l from-gray-900 to-gray-700" />
                            </div>

                            {/* Bottom edge/trim */}
                            <div className="absolute top-19 left-0 right-0 h-2 bg-gradient-to-b from-gray-800 to-gray-900 shadow-xl transform skew-y-1" />

                            {/* DIGIPARADISE Sign on the front face of canopy */}
                            <motion.div 
                                className="absolute top-5 left-1/2 transform -translate-x-1/2 w-64 h-12 bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-lg shadow-2xl border-2 overflow-hidden"
                                style={{
                                    borderImage: 'linear-gradient(135deg, #06b6d4, #f59e0b, #06b6d4) 1'
                                }}
                                animate={{
                                    boxShadow: stage === 1 
                                        ? ['0 0 15px rgba(6, 182, 212, 0.4)', '0 0 25px rgba(245, 158, 11, 0.6)', '0 0 15px rgba(6, 182, 212, 0.4)']
                                        : '0 0 15px rgba(6, 182, 212, 0.3)'
                                }}
                                transition={{ duration: 0.8, repeat: stage === 1 ? Infinity : 0 }}
                            >
                                {/* Animated background shimmer */}
                                <motion.div
                                    className="absolute inset-0 opacity-30"
                                    style={{
                                        background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.5), transparent)',
                                        backgroundSize: '200% 100%'
                                    }}
                                    animate={{
                                        backgroundPosition: ['0% 0%', '200% 0%']
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                />

                                {/* Text content */}
                                <div className="relative z-10 h-full flex items-center justify-center gap-2 px-3">
                                    <motion.div
                                        animate={{ 
                                            rotate: stage === 1 ? [0, 360] : 0,
                                            scale: stage === 1 ? [1, 1.3, 1] : 1
                                        }}
                                        transition={{ 
                                            rotate: { duration: 0.8 },
                                            scale: { duration: 0.4, repeat: stage === 1 ? Infinity : 0 }
                                        }}
                                        className="bg-gradient-to-br from-cyan-500 to-amber-500 p-1.5 rounded shadow-lg"
                                    >
                                        <Zap className="w-4 h-4 text-white" fill="white" />
                                    </motion.div>
                                    
                                    <div className="text-center">
                                        <motion.h1 
                                            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-amber-400 font-black text-base tracking-widest leading-tight"
                                            animate={{
                                                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            style={{ backgroundSize: '200% 100%' }}
                                        >
                                            DIGIPARADISE
                                        </motion.h1>
                                        <p className="text-amber-400 text-xs font-bold tracking-wider">BOOST</p>
                                    </div>

                                    <motion.div
                                        animate={{ 
                                            rotate: stage === 1 ? [0, -360] : 0,
                                            scale: stage === 1 ? [1, 1.3, 1] : 1
                                        }}
                                        transition={{ 
                                            rotate: { duration: 0.8 },
                                            scale: { duration: 0.4, repeat: stage === 1 ? Infinity : 0 }
                                        }}
                                        className="bg-gradient-to-br from-amber-500 to-cyan-500 p-1.5 rounded shadow-lg"
                                    >
                                        <Zap className="w-4 h-4 text-white" fill="white" />
                                    </motion.div>
                                </div>

                                {/* Corner lights */}
                                <motion.div 
                                    className="absolute top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                                <motion.div 
                                    className="absolute top-0 right-0 w-2 h-2 bg-amber-400 rounded-full"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                                />
                            </motion.div>

                            {/* Roof edge lights */}
                            <div className="absolute bottom-0 left-4 right-4 flex justify-around">
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: i % 2 === 0 ? '#06b6d4' : '#f59e0b' }}
                                        animate={{
                                            opacity: [0.3, 1, 0.3]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: i * 0.2
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Energy particles when fueling */}
                    <AnimatePresence>
                        {stage === 1 && (
                            <>
                                {[...Array(25)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute bottom-0 left-1/2 w-2 h-2 rounded-full"
                                        style={{
                                            background: i % 2 === 0 ? '#06b6d4' : '#f59e0b',
                                        }}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{
                                            y: [0, -70],
                                            x: [-8, (Math.random() - 0.5) * 120],
                                            opacity: [1, 0],
                                            scale: [1, 0.2]
                                        }}
                                        exit={{ opacity: 0 }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: i * 0.06,
                                        }}
                                    />
                                ))}
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Slow Car Phase */}
            <AnimatePresence>
                {stage < 2 && (
                    <motion.div
                        className="absolute bottom-24"
                        initial={{ x: -100 }}
                        animate={{ 
                            // MODIFIED: Centered car (container width 1024 / 2 - car width 100 / 2 = 462)
                            x: stage === 0 ? 462 : 462
                        }}
                        transition={{ 
                            duration: stage === 0 ? 2.5 : 0,
                            ease: "linear"
                        }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                    >
                        <div className="relative">
                            <svg width="100" height="60" viewBox="0 0 100 60" className="drop-shadow-xl">
                                <rect x="10" y="30" width="70" height="20" rx="4" fill="#4B5563" />
                                <rect x="25" y="15" width="40" height="20" rx="4" fill="#6B7280" />
                                <rect x="28" y="18" width="15" height="12" rx="2" fill="#1F2937" />
                                <rect x="48" y="18" width="15" height="12" rx="2" fill="#1F2937" />
                                <circle cx="25" cy="52" r="6" fill="#1F2937" stroke="#374151" strokeWidth="2" />
                                <circle cx="65" cy="52" r="6" fill="#1F2937" stroke="#374151" strokeWidth="2" />
                            </svg>
                            
                            <motion.div
                                className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-3xl"
                                animate={{ 
                                    y: stage === 1 ? [0, -8, 0] : [0, -3, 0],
                                    scale: stage === 1 ? [1, 1.2, 1] : 1
                                }}
                                transition={{ 
                                    duration: stage === 1 ? 0.8 : 2, 
                                    repeat: Infinity 
                                }}
                            >
                                {stage === 1 ? '😊' : '😰'}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Fast Car Phase */}
            <AnimatePresence>
                {stage >= 2 && (
                    <>
                        <motion.div
                            className="absolute bottom-24"
                            // MODIFIED: Start from centered position
                            initial={{ x: 462 }}
                            animate={{ x: 1400 }}
                            transition={{ duration: 2.5, ease: "easeIn" }}
                        >
                            <div className="relative">
                                <svg width="120" height="70" viewBox="0 0 120 70" className="drop-shadow-2xl">
                                    <defs>
                                        <filter id="glow">
                                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                            <feMerge>
                                                <feMergeNode in="coloredBlur"/>
                                                <feMergeNode in="SourceGraphic"/>
                                            </feMerge>
                                        </filter>
                                        <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#06b6d4" />
                                            <stop offset="50%" stopColor="#f59e0b" />
                                            <stop offset="100%" stopColor="#06b6d4" />
                                        </linearGradient>
                                    </defs>
                                    <rect x="10" y="35" width="85" height="22" rx="5" fill="url(#carGradient)" filter="url(#glow)" />
                                    <rect x="30" y="18" width="50" height="22" rx="5" fill="url(#carGradient)" filter="url(#glow)" />
                                    <rect x="35" y="22" width="18" height="14" rx="2" fill="#fff" opacity="0.9" />
                                    <rect x="58" y="22" width="18" height="14" rx="2" fill="#fff" opacity="0.9" />
                                    <circle cx="30" cy="60" r="7" fill="#1F2937" stroke="url(#carGradient)" strokeWidth="3" />
                                    <circle cx="80" cy="60" r="7" fill="#1F2937" stroke="url(#carGradient)" strokeWidth="3" />
                                </svg>
                                
                                <motion.div
                                    className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-4xl"
                                    animate={{ 
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                >
                                    🚀
                                </motion.div>

                                {[...Array(4)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute top-1/2 right-full h-1 bg-gradient-to-r from-amber-500 to-transparent rounded-full"
                                        style={{ width: `${30 + i * 10}px`, marginTop: `${i * 8 - 12}px` }}
                                        animate={{ 
                                            x: [0, -30],
                                            opacity: [0.8, 0]
                                        }}
                                        transition={{ 
                                            duration: 0.4,
                                            repeat: Infinity,
                                            delay: i * 0.1
                                        }}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute bottom-24 rounded-full blur-sm"
                                style={{
                                    width: `${20 + i * 8}px`,
                                    height: `${20 + i * 8}px`,
                                    background: `radial-gradient(circle, ${i % 2 === 0 ? 'rgba(6, 182, 212, 0.3)' : 'rgba(245, 158, 11, 0.3)'} 0%, transparent 70%)`
                                }}
                                // MODIFIED: Adjusted start x
                                initial={{ x: 462 - i * 40, opacity: 0.6, scale: 0.5 }}
                                animate={{ 
                                    // MODIFIED: Adjusted animation x
                                    x: 462 - i * 40 - 80,
                                    opacity: 0,
                                    scale: 1.5
                                }}
                                transition={{ 
                                    duration: 1.5,
                                    delay: i * 0.1,
                                    repeat: Infinity
                                }}
                            />
                        ))}

                        {[...Array(10)].map((_, i) => (
                            <motion.div
                                key={`sparkle-${i}`}
                                className="absolute bottom-24"
                                initial={{ 
                                    // MODIFIED: Adjusted start x
                                    x: 462 + Math.random() * 100,
                                    y: Math.random() * 40 - 20,
                                    opacity: 1,
                                    scale: 1
                                }}
                                animate={{ 
                                    // MODIFIED: Adjusted animation x
                                    x: 462 + Math.random() * 100 - 50,
                                    y: Math.random() * 60 - 30,
                                    opacity: 0,
                                    scale: 0
                                }}
                                transition={{ 
                                    duration: 0.8,
                                    delay: i * 0.15,
                                    repeat: Infinity
                                }}
                            >
                                <Sparkles className="w-4 h-4 text-amber-400" />
                            </motion.div>
                        ))}
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};



// --- Static Data ---
const iconColor = "#d97706";

const servicesData = [
    { 
        icon: <Users size={32} color={iconColor} />, 
        title: "UGC / Ads", 
        description: "Authentic user-generated content and high-impact video ads that convert." 
    },
    { 
        icon: <TrendingUp size={32} color={iconColor} />, 
        title: "Performance Marketing", 
        description: "Data-driven campaigns focused on ROI, lead generation, and customer acquisition." 
    },
    { 
        icon: <Edit3 size={32} color={iconColor} />, 
        title: "Content Marketing", 
        description: "Strategic content creation (blogs, videos, social) to build your brand and engage your audience." 
    },
    { 
        icon: <Share2 size={32} color={iconColor} />, 
        title: "Social Media Management", 
        description: "Full-service management of your social channels, from content to community." 
    },
    { 
        icon: <Type size={32} color={iconColor} />, 
        title: "Content Writing", 
        description: "Compelling copy for websites, blogs, scripts, and marketing materials." 
    },
    { 
        icon: <Search size={32} color={iconColor} />, 
        title: "SEO", 
        description: "Optimize your online presence to rank higher and attract organic traffic." 
    },
    { 
        icon: <Bot size={32} color={iconColor} />, 
        title: "AI Videos", 
        description: "Leverage cutting-edge AI to produce engaging video content at scale." 
    },
];

const videoTestimonials = [
    { id: 1, src: "https://media.digiparadisestudios.com/testimonials/Testimonail%20video%2013.mp4" },
    { id: 2, src: "https://media.digiparadisestudios.com/testimonials/Testimonail%20video%2011.mp4" },
    { id: 3, src: "https://media.digiparadisestudios.com/testimonials/Testimonail%20video%2014.mp4" },
    { id: 4, src: "https://media.digiparadisestudios.com/testimonials/Testimonail%20video%209.mp4" },
    { id: 5, src: "https://media.digiparadisestudios.com/testimonials/Testimonail%20video%2010.mp4" },
    { id: 6, src: "https://media.digiparadisestudios.com/testimonials/Testimonail%20video%2012.mp4" },
    { id: 7, src: "https://media.digiparadisestudios.com/testimonials/Testimonail%20video%2015.mp4" },
];

const feedbackImages = [
    { id: 1, url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=600&fit=crop", client: "TechCorp", rating: 5 },
    { id: 2, url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=600&fit=crop", client: "StartupXYZ", rating: 5 },
    { id: 3, url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop", client: "BrandCo", rating: 5 },
    { id: 4, url: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=600&fit=crop", client: "MediaHub", rating: 4 },
    { id: 5, url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=600&fit=crop", client: "GrowthLab", rating: 5 },
    { id: 6, url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=600&fit=crop", client: "Innovate Inc", rating: 5 },
];

const whyData = [
    { 
        icon: <Target size={32} color={iconColor} />, 
        title: "Holistic Strategy", 
        description: "We blend creative content with data-driven performance marketing for a unified approach." 
    },
    { 
        icon: <Brain size={32} color={iconColor} />, 
        title: "Creative Powerhouse", 
        description: "Access our state-of-the-art studios and creative team for unparalleled content quality." 
    },
    { 
        icon: <BarChart size={32} color={iconColor} />, 
        title: "Data-Driven Decisions", 
        description: "Our strategies are backed by analytics, ensuring every move is optimized for ROI." 
    },
    { 
        icon: <Users size={32} color={iconColor} />, 
        title: "Audience-Centric", 
        description: "We dive deep into your target audience to create content that truly resonates and converts." 
    },
    { 
        icon: <Rocket size={32} color={iconColor} />, 
        title: "Speed & Agility", 
        description: "Our in-house production capabilities mean we can create and iterate on content faster." 
    },
    { 
        icon: <Bot size={32} color={iconColor} />, 
        title: "AI-Powered Efficiency", 
        description: "We use the latest AI tools to scale content production and uncover insights." 
    },
    { 
        icon: <TrendingUp size={32} color={iconColor} />, 
        title: "Focused on Growth", 
        description: "We are more than a service; we are your partner in scaling your brand and achieving your goals." 
    },
];

// --- Marketing Page Component ---
const Marketing = () => {
    const [currentIndex1, setCurrentIndex1] = useState(0);
    const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [videoItemsPerPage, setVideoItemsPerPage] = useState(1);
    const [feedbackItemsPerPage, setFeedbackItemsPerPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            setIsMobile(screenWidth < 640);
            
            // Video items
            if (screenWidth >= 1024) {
                setVideoItemsPerPage(7);
            } else if (screenWidth >= 640) {
                setVideoItemsPerPage(3);
            } else {
                setVideoItemsPerPage(1);
            }

            // Feedback items
            if (screenWidth >= 1024) {
                setFeedbackItemsPerPage(3);
            } else if (screenWidth >= 640) {
                setFeedbackItemsPerPage(2);
            } else {
                setFeedbackItemsPerPage(1);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNavigation = (direction) => {
        if (isAnimating) return;
        setIsAnimating(true);
        
        setCurrentIndex1(prev => {
            const newIndex = direction === 'left'
                ? (prev - 1 + videoTestimonials.length) % videoTestimonials.length
                : (prev + 1) % videoTestimonials.length;
            return newIndex;
        });
        
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handleFeedbackNavigation = (direction) => {
        setCurrentFeedbackIndex(prev => {
            const maxIndex = feedbackImages.length - feedbackItemsPerPage;
            if (direction === 'left') {
                return prev === 0 ? maxIndex : prev - 1;
            } else {
                return prev >= maxIndex ? 0 : prev + 1;
            }
        });
    };

    const visibleFeedbackRange = feedbackImages.length - feedbackItemsPerPage + 1;

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="pt-16 bg-[#262624] overflow-x-hidden"
        >
            <Navbar />

            {/* Header */}
            <section className="py-20 bg-gradient-to-br from-[#1a1a18] via-[#262624] to-[#2a2a28] relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                            Digiparadise{" "}
                            <span className="text-white">Media</span>
                        </h1>
                        <p className="text-xl text-gray-300">
                            From content creation to conversion, we are your dedicated growth partner.
                        </p>
                    </motion.div>
                    <motion.div animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-10 left-10 w-24 h-24 bg-yellow-500/15 rounded-full blur-xl" />
                    <motion.div animate={{ y: [0, 15, 0], rotate: [360, 180, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute bottom-10 right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-xl" />
                </div>
            </section>

            {/* Car Animation Section */}
            <section className="py-20 bg-gradient-to-br from-[#2a2a28] via-[#262624] to-[#1a1a18] relative overflow-hidden">
                <motion.div animate={{ y: [0, 20, 0], rotate: [0, 360, 0] }} transition={{ duration: 14, repeat: Infinity }} className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl" />
                <motion.div animate={{ y: [0, -20, 0], rotate: [360, 0, 360] }} transition={{ duration: 16, repeat: Infinity }} className="absolute bottom-10 right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }} 
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Watch Your Brand <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent">Accelerate</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">From slow growth to explosive results with Digiparadise</p>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <CarAnimation />
                    </motion.div>
                </div>
            </section>

            {/* Our Services Section */}
            <section id="services" className="py-20 bg-[#262624] relative overflow-hidden">
                <motion.div animate={{ y: [0, 20, 0], rotate: [360, 180, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute top-10 right-10 w-24 h-24 bg-amber-500/15 rounded-full blur-xl" />
                <motion.div animate={{ y: [0, -15, 0], x: [0, 10, 0] }} transition={{ duration: 9, repeat: Infinity }} className="absolute bottom-1/4 left-10 w-20 h-20 bg-cyan-500/15 rounded-full blur-lg" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Our <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent">Services</span></h2>
                        <p className="text-xl text-gray-300">A complete suite of marketing solutions.</p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {servicesData.slice(0, 4).map((service, index) => (
                            <FeatureCard feature={service} index={index} key={index} />
                        ))}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full lg:w-3/4 mx-auto">
                        {servicesData.slice(4).map((service, index) => (
                            <FeatureCard feature={service} index={index + 4} key={index + 4} />
                        ))}
                    </div>
                </div>
            </section>

            {/* The Content Junkyard Section */}
            <section id="work" className="py-20 bg-gradient-to-br from-[#1a1a18] via-[#2a2a28] to-[#262624] relative overflow-hidden">
                <motion.div animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }} transition={{ duration: 12, repeat: Infinity }} className="absolute top-10 left-0 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl" />
                <motion.div animate={{ y: [0, -25, 0], x: [0, 15, 0] }} transition={{ duration: 9, repeat: Infinity }} className="absolute top-1/2 right-10 w-14 h-14 bg-yellow-600/20 rounded-full blur-lg" />
                <div className="relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12 lg:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            The Content <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400">Junkyard</span>
                        </h2>
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                            See the raw, creative, and high-impact content we've produced.
                        </p>
                    </motion.div>

                    <div className="relative mb-8 lg:mb-12">
                        <button onClick={() => handleNavigation('left')} disabled={isAnimating} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[#2a2a28]/80 hover:bg-[#1a1a18] backdrop-blur-sm shadow-lg rounded-full p-2.5 transition hover:scale-110 disabled:opacity-50 -ml-2 lg:ml-2" aria-label="Previous testimonials">
                            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                        </button>
                        <button onClick={() => handleNavigation('right')} disabled={isAnimating} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#2a2a28]/80 hover:bg-[#1a1a18] backdrop-blur-sm shadow-lg rounded-full p-2.5 transition hover:scale-110 disabled:opacity-50 -mr-2 lg:mr-2" aria-label="Next testimonials">
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
                </div>
            </section>

            {/* Feedback Section */}
            <section id="feedback" className="py-20 bg-[#262624] relative overflow-hidden">
                <motion.div animate={{ y: [0, 15, 0], rotate: [0, 180, 360] }} transition={{ duration: 13, repeat: Infinity }} className="absolute top-10 right-10 w-24 h-24 bg-cyan-500/15 rounded-full blur-xl" />
                <motion.div animate={{ y: [0, -20, 0], x: [0, -10, 0] }} transition={{ duration: 11, repeat: Infinity }} className="absolute bottom-10 left-10 w-20 h-20 bg-amber-500/15 rounded-full blur-lg" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }} 
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Client <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent">Testimonials</span>
                        </h2>
                        <p className="text-xl text-gray-300">Real results from real partnerships</p>
                    </motion.div>

                    <div className="relative max-w-6xl mx-auto">
                        <button 
                            onClick={() => handleFeedbackNavigation('left')} 
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-cyan-500/20 to-amber-500/20 hover:from-cyan-500/40 hover:to-amber-500/40 backdrop-blur-md shadow-xl rounded-full p-3 transition-all hover:scale-110 border border-cyan-500/30 -ml-4 sm:ml-0"
                            aria-label="Previous feedback"
                        >
                            <ChevronLeft className="w-6 h-6 text-white" />
                        </button>
                        
                        <button 
                            onClick={() => handleFeedbackNavigation('right')} 
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-cyan-500/20 to-amber-500/20 hover:from-cyan-500/40 hover:to-amber-500/40 backdrop-blur-md shadow-xl rounded-full p-3 transition-all hover:scale-110 border border-cyan-500/30 -mr-4 sm:mr-0"
                            aria-label="Next feedback"
                        >
                            <ChevronRight className="w-6 h-6 text-white" />
                        </button>

                        <div className="overflow-hidden px-2 sm:px-16">
                            <motion.div 
                                className="flex gap-4 sm:gap-6"
                                animate={{ x: `-${currentFeedbackIndex * (100 / feedbackItemsPerPage)}%` }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                            >
                                {feedbackImages.map((image, index) => (
                                    <motion.div
                                        key={image.id}
                                        className="flex-shrink-0"
                                        style={{ width: `calc((100% - ${(feedbackItemsPerPage - 1) * 24}px) / ${feedbackItemsPerPage})` }}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-2 border-gradient-to-r from-cyan-500/30 to-amber-500/30 hover:border-cyan-500/60 transition-all duration-500 group bg-gradient-to-br from-gray-800 to-gray-900">
                                            <img 
                                                src={image.url} 
                                                alt={`${image.client} testimonial`}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                            />
                                            
                                            {/* Gradient Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                                            
                                            {/* Content */}
                                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                                <motion.div
                                                    initial={{ y: 20, opacity: 0 }}
                                                    whileInView={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    {/* Stars */}
                                                    <div className="flex gap-1 mb-3">
                                                        {[...Array(image.rating)].map((_, i) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{ scale: 0, rotate: -180 }}
                                                                whileInView={{ scale: 1, rotate: 0 }}
                                                                transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                                                            >
                                                                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                </svg>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                    
                                                    <h3 className="text-white font-bold text-lg mb-1">{image.client}</h3>
                                                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        "Outstanding results and exceptional service!"
                                                    </p>
                                                </motion.div>
                                            </div>

                                            {/* Shine Effect */}
                                            <motion.div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                                                initial={false}
                                                whileHover={{
                                                    background: [
                                                        'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
                                                        'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0) 50%, transparent 70%)'
                                                    ],
                                                    backgroundPosition: ['-200% 0', '200% 0']
                                                }}
                                                transition={{ duration: 1.5 }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Enhanced Indicators */}
                        <div className="flex justify-center gap-2 mt-10">
                            {[...Array(visibleFeedbackRange)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentFeedbackIndex(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        currentFeedbackIndex === index 
                                            ? 'w-12 bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 shadow-lg shadow-amber-500/50' 
                                            : 'w-2 bg-gray-600 hover:bg-gray-500'
                                    }`}
                                    aria-label={`Go to feedback ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-gradient-to-br from-[#1a1a18] via-[#2a2a28] to-[#262624] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Why Partner With <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent">Digiparadise</span>?</h2>
                        <p className="text-xl text-gray-300">We're not just a studio; we're a growth engine.</p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whyData.slice(0, 4).map((service, index) => (
                            <FeatureCard feature={service} index={index} key={index} />
                        ))}
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 w-full lg:w-3/4 mx-auto">
                        {whyData.slice(4).map((service, index) => (
                            <FeatureCard feature={service} index={index + 4} key={index + 4} />
                        ))}
                    </div>

                    <motion.div animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }} transition={{ duration: 12, repeat: Infinity }} className="absolute top-10 left-0 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl" />
                    <motion.div animate={{ y: [0, 20, 0], rotate: [360, 180, 0] }} transition={{ duration: 15, repeat: Infinity }} className="absolute bottom-10 right-0 w-24 h-24 bg-amber-500/15 rounded-full blur-xl" />
                </div>
            </section>
            
            <Footer />
        </motion.div>
    );
};

export default Marketing;