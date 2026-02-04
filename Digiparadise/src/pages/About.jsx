"use client"
import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FiAward, FiUsers, FiTrendingUp, FiHeart, FiCamera, FiVideo, FiFilm, FiZap, FiStar } from "react-icons/fi"
// Note: Card component import removed as it wasn't used in the provided file
// import Card from "../components/Card" 
import { useNavigate } from "react-router-dom"
import avni from "../assets/founders/avni.png"
import vaibhav from "../assets/founders/vaibhav.png"

// Floating Element from Hero/Services
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

// ScrollZoom Component with controlled scaling
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

// Enhanced CTA Components - Mobile Optimized
const FloatingIcon = ({ icon: Icon, delay = 0, duration = 20, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.3, 0.7, 0.3],
        y: [0, -15, 0], // Reduced movement for mobile
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1]
      }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut"
      }}
      className={`absolute ${className} hidden sm:block`} // Hide on mobile
    >
      <Icon size={24} className="text-white/30 sm:text-white/30" />
    </motion.div>
  );
};

const StudioLight = ({ delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.2, 0.8, 0.2],
        scale: [1, 1.2, 1],
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut"
      }}
      className={`absolute ${className} hidden sm:block`} // Hide on mobile
    >
      <div className="w-3 h-12 sm:w-4 sm:h-16 bg-white/40 rounded-full blur-sm transform -rotate-12"></div>
      <div className="w-1 h-14 sm:w-2 sm:h-20 bg-white/60 rounded-full blur-sm transform -rotate-12 absolute left-0.5 sm:left-1 -top-1 sm:-top-2"></div>
    </motion.div>
  );
};

const FilmStrip = () => {
  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: '100vw' }}
      transition={{ 
        duration: 25, 
        repeat: Infinity, 
        ease: "linear"
      }}
      className="absolute top-10 sm:top-20 w-24 h-4 sm:w-32 sm:h-6 bg-white/10 flex items-center justify-center hidden sm:flex"
      style={{
        backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(255,255,255,0.3) 6px, rgba(255,255,255,0.3) 10px)'
      }}
    >
      <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
    </motion.div>
  );
};

const CameraFlash = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0, 1, 0],
        scale: [0, 1.5, 0], // Reduced scale for mobile
      }}
      transition={{ 
        duration: 0.5, 
        repeat: Infinity, 
        repeatDelay: 4,
        delay,
      }}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"
    />
  );
};

const About = () => {
  const stats = [
    { icon: FiUsers, number: "500+", label: "Happy Clients" },
    { icon: FiAward, number: "50+", label: "Awards Won" },
    { icon: FiTrendingUp, number: "1000+", label: "Projects Completed" },
    { icon: FiHeart, number: "5", label: "Years Experience" },
  ]

  const navigate = useNavigate()
  const team = [
    {
      name: "Avni Gupta",
      role: "Founder",
      image: avni,
      bio: "Creative strategist passionate about content, community, and digital storytelling.",
    },
    {
      name: "Vaibhav",
      role: "Founder",
      image: vaibhav,
      bio: "Visionary leader driving digital innovation and brand experiences.",
    },
    // ...other team members commented out as in original file
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="pt-16 bg-[#262624] text-gray-300 overflow-x-hidden" // Applied dark theme
    >
      {/* Hero Section - Mobile Optimized */}
      <ScrollZoom className="py-8 sm:py-14 bg-gradient-to-br from-[#1a1a18] via-[#262624] to-[#2a2a28] relative overflow-hidden">
        {/* Floating Elements */}
        <FloatingElement className="top-10 left-10 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl" />
        <FloatingElement className="bottom-20 right-20 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl" delay={2} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                About{" "}
                <span className="bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 text-transparent">
                  Digiparadise
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed">
                We are a passionate team of creators, storytellers, and technical experts dedicated to bringing your
                vision to life through professional video production and podcast recording services.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-amber-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-gray-400">State-of-the-art equipment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-amber-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-gray-400">Professional team with years of experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-amber-400 rounded-full flex-shrink-0"></div>
                  <span className="text-sm sm:text-base text-gray-400">Located in the heart of Delhi</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative order-1 lg:order-2"
            >
              <img
                src="https://lh3.googleusercontent.com/p/AF1QipNOSnlJ2SKCmXJF3yOFDmIFBVMOdhdh8KKJvOb3=s1360-w1360-h1020-rw"
                alt="Digiparadise Studios Interior"
                className="w-full h-auto rounded-xl sm:rounded-2xl shadow-lg border border-yellow-500/30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl sm:rounded-2xl"></div>
              
              {/* Floating Elements - Simplified for mobile */}
              <motion.div
                animate={{ y: [0, -15, 0], x: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                className="absolute top-3 sm:top-5 right-3 sm:right-5 w-8 h-8 sm:w-12 sm:h-12 bg-yellow-500/15 rounded-full blur-lg"
              />
              <motion.div
                animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
                className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 w-10 h-10 sm:w-14 sm:h-14 bg-amber-500/20 rounded-full blur-xl"
              />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="absolute top-1/2 left-0 w-6 h-6 sm:w-8 sm:h-8 bg-cyan-500/15 rounded-full blur-md"
              />
            </motion.div>
          </div>
        </div>
      </ScrollZoom>

      {/* Stats Section - Mobile Optimized */}
      {/* <ScrollZoom className="py-12 sm:py-20 bg-[#262624]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-3 sm:p-6 bg-gradient-to-br from-[#2a2a28] to-yellow-500/10 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-shadow border border-yellow-500/20 hover:border-yellow-500/40"
              >
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-yellow-500/20">
                  <stat.icon size={20} className="sm:w-8 sm:h-8 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent mb-1 sm:mb-2">
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollZoom> */}

      {/* Mission Section - Mobile Optimized */}
      <ScrollZoom className="py-12 sm:py-20 bg-gradient-to-br from-[#1a1a18] via-[#262624] to-[#2a2a28]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8 leading-tight">
              Our{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
                Mission
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              To democratize professional content creation by providing accessible, high-quality video production and
              podcast recording services. We believe every story deserves to be told with excellence, and we're here to
              make that happen with cutting-edge technology and creative expertise.
            </p>
          </motion.div>
          
          {/* Floating Elements - Hidden on mobile for cleaner look */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-5 sm:top-10 left-5 sm:left-10 w-16 h-16 sm:w-24 sm:h-24 bg-yellow-500/15 rounded-full blur-xl hidden sm:block"
          />
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [360, 180, 0] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-20 h-20 sm:w-32 sm:h-32 bg-amber-500/20 rounded-full blur-xl hidden sm:block"
          />
          <motion.div
            animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-1/3 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-cyan-500/15 rounded-full blur-lg hidden sm:block"
          />
          <motion.div
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-1/3 left-0 w-14 h-14 sm:w-20 sm:h-20 bg-amber-500/20 rounded-full blur-xl hidden sm:block"
          />
        </div>
      </ScrollZoom>

      {/* Team Section - Mobile Optimized with Proper Flex Layout */}
      <ScrollZoom className="py-8 sm:py-12 lg:py-20 bg-[#262624]">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 text-white mb-3 sm:mb-4 leading-tight px-2">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent">Team</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-300 px-2">
              The creative minds behind Digiparadise Studios
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {/* Founders Row - Mobile: 1 card per row, Desktop: 2 cards centered */}
            <div className="flex flex-col sm:flex-row sm:justify-center items-center gap-3 sm:gap-6 lg:gap-8 mb-4 sm:mb-6 lg:mb-8">
              {team.slice(0, 2).map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="w-full max-w-[280px] sm:w-[calc(50%-0.75rem)] sm:max-w-sm mx-auto overflow-hidden bg-gradient-to-br from-[#2a2a28] to-yellow-500/10 backdrop-blur-md border border-yellow-500/20 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1 leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-amber-500 font-medium mb-2 text-xs sm:text-sm lg:text-base">
                      {member.role}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Rest of Team - Proper Flex Layout with Even Spacing */}
            <div className="flex flex-wrap justify-evenly gap-y-6 sm:gap-y-8">
              {team.slice(2).map((member, index) => (
                <motion.div
                  key={index + 2}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index + 2) * 0.2 }}
                  className="w-full max-w-[280px] sm:w-[280px] lg:w-[300px] mx-auto overflow-hidden bg-gradient-to-br from-[#2a2a28] to-yellow-500/10 backdrop-blur-md border border-yellow-500/20 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 group flex-shrink-0"
                  style={{
                    flexBasis: 'calc(33.333% - 1rem)',
                    maxWidth: '300px',
                    minWidth: '280px'
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1 leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-amber-500 font-medium mb-2 text-xs sm:text-sm lg:text-base">
                      {member.role}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ScrollZoom>

      {/* Enhanced CTA Section - Fully Mobile Optimized */}
      <ScrollZoom className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-60 bg-gradient-to-br from-[#1a1a18] via-[#262624] to-[#2a2a28] relative overflow-hidden">
        {/* Simplified Background Elements - Mobile optimized */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 180, 0] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-3 sm:top-5 lg:top-10 left-3 sm:left-5 lg:left-10 w-12 h-12 sm:w-20 sm:h-20 lg:w-32 lg:h-32 bg-white/5 rounded-full blur-xl sm:blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 15, 0], rotate: [180, 0, 180] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-3 sm:bottom-5 lg:bottom-10 right-3 sm:right-5 lg:right-10 w-16 h-16 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-white/5 rounded-full blur-2xl sm:blur-3xl"
        />

        {/* Film Strip Animation - Hidden on mobile for performance */}
        <div className="hidden md:block">
          <FilmStrip />
        </div>
        
        {/* Studio Equipment Icons - Only show on larger screens */}
        <div className="hidden lg:block">
          <FloatingIcon 
            icon={FiCamera} 
            delay={0} 
            duration={22} 
            className="top-16 left-20" 
          />
          <FloatingIcon 
            icon={FiVideo} 
            delay={5} 
            duration={25} 
            className="top-32 right-16" 
          />
          <FloatingIcon 
            icon={FiFilm} 
            delay={10} 
            duration={18} 
            className="bottom-20 left-16" 
          />
          <FloatingIcon 
            icon={FiZap} 
            delay={3} 
            duration={20} 
            className="top-1/4 left-1/3" 
          />
          <FloatingIcon 
            icon={FiStar} 
            delay={8} 
            duration={23} 
            className="bottom-32 right-1/3" 
          />
        </div>

        {/* Studio Lights - Only show on desktop */}
        <div className="hidden xl:block">
          <StudioLight delay={0} className="top-10 left-1/3" />
          <StudioLight delay={2} className="top-16 right-1/4" />
          <StudioLight delay={4} className="bottom-20 left-1/4" />
          <StudioLight delay={1} className="bottom-24 right-1/3" />
        </div>

        {/* Camera Flash Effects - Reduced on mobile */}
        <div className="hidden sm:block">
          <CameraFlash delay={0} />
          <CameraFlash delay={6} />
        </div>

        {/* Floating Particles - Mobile optimized */}
        <div className="hidden sm:block">
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: '100vh', opacity: 0 }}
              animate={{ 
                y: '-100px',
                opacity: [0, 0.4, 0],
                x: [0, Math.sin(i) * 15, 0]
              }}
              transition={{ 
                duration: 6 + i * 2, 
                repeat: Infinity, 
                delay: i * 2,
                ease: "easeOut"
              }}
              className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white/30 rounded-full"
              style={{ left: `${20 + i * 40}%` }}
            />
          ))}
        </div>
        
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 leading-tight px-2"
          >
            Ready to Work With Us?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg xl:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed px-2 max-w-3xl mx-auto"
          >
            Let's bring your creative vision to life with our professional team and state-of-the-art facilities
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center px-2"
          >
            <motion.button
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                const message = "Hi! I'm interested in your photography/videography services. Could you please share more details?";
                const whatsappURL = `https://wa.me/917042547398?text=${encodeURIComponent(message)}`;
                window.open(whatsappURL, '_blank');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-gradient-to-br from-yellow-400 to-amber-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base lg:text-lg font-semibold hover:shadow-xl transition-all duration-300 shadow-lg min-w-[200px] sm:min-w-0"
            >
              <span>Get in Touch</span>
            </motion.button>
          </motion.div>
        </div>
      </ScrollZoom>
    </motion.div>
  )
}

export default About