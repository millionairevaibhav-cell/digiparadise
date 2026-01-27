import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import dp from '../assets/miss/dp.png'
import { 
  ChevronRight, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Mic, 
  Users, 
  Check, 
  X,
  ArrowLeft,
  Home,
  MapPin,
  Star,
  Heart
} from "lucide-react"

// Fixed ScrollZoom Component
const ScrollZoom = ({ children, className = "" }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  
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

const BookStudio = () => {
  const [step, setStep] = useState(1)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formData, setFormData] = useState({
    shootType: '',
    date: '',
    time: '',
    duration: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    selectedRoom: null,
    specialRequests: ''
  })

  // Sample room data with multiple photos
  const rooms = [
    {
      id: 1,
      name: "Premium Podcast Studio",
      type: "podcast",
      description: "Soundproof booth with professional microphones and acoustic treatment",
      price: "₹4,000/hour",
      features: ["Soundproof booth", "Professional mics", "Multi-track recording", "Live streaming setup"],
      images: [
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop"
      ],
      availability: "Available"
    },
    {
      id: 2,
      name: "Video Production Suite A",
      type: "video",
      description: "4K camera setup with professional lighting and green screen facility",
      price: "₹4,000/hour",
      features: ["4K cameras", "Professional lighting", "Green screen", "Teleprompter"],
      images: [
        "https://images.unsplash.com/photo-1492619392331-c0348df531a2?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop"
      ],
      availability: "Available"
    },
    {
      id: 3,
      name: "Content Creator Studio",
      type: "individual",
      description: "Perfect for solo content creators with versatile setup options",
      price: "₹,2500/hour",
      features: ["Flexible lighting", "Multiple backdrops", "Ring lights", "Phone/camera mounts"],
      images: [
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop"
      ],
      availability: "Available"
    },
    {
      id: 4,
      name: "Video Production Suite B",
      type: "video",
      description: "Large studio space for bigger productions and team shoots",
      price: "₹5,500/hour",
      features: ["Large space", "Multiple camera angles", "Advanced lighting", "Editing suite access"],
      images: [
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop"
      ],
      availability: "Limited"
    },
    {
      id: 5,
      name: "Intimate Podcast Booth",
      type: "podcast",
      description: "Cozy setup perfect for interview-style podcasts",
      price: "₹3,000/hour",
      features: ["2-person setup", "Warm lighting", "Comfortable seating", "High-quality audio"],
      images: [
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
      ],
      availability: "Available"
    },
    {
      id: 6,
      name: "Solo Creator Space",
      type: "individual",
      description: "Minimalist setup for professional individual content",
      price: "₹2,000/hour",
      features: ["Clean aesthetic", "Natural lighting", "Minimal setup", "Quick turnaround"],
      images: [
        "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop"
      ],
      availability: "Available"
    }
  ]

  const shootTypes = [
    { 
      id: 'podcast', 
      name: 'Podcast Recording', 
      icon: Mic, 
      description: 'Professional audio recording with soundproof environment' 
    },
    { 
      id: 'individual', 
      name: 'Individual Shoot', 
      icon: User, 
      description: 'Solo content creation with flexible setup options' 
    },
    { 
      id: 'video', 
      name: 'Video Production', 
      icon: Camera, 
      description: 'Complete video production with professional equipment' 
    }
  ]

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
  ]

  const durations = ['1 hour', '2 hours', '3 hours', '4 hours', 'Half day (6 hours)', 'Full day (10 hours)']

  const filteredRooms = formData.shootType 
    ? rooms.filter(room => room.type === formData.shootType) 
    : rooms

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    setStep(prev => prev + 1)
  }

  const handlePrevStep = () => {
    setStep(prev => prev - 1)
  }

  const handleConfirmBooking = () => {
    setShowConfirmation(true)
  }

  const handleGoHome = () => {
    window.location.href = '/'
  }

  const calculateTotal = () => {
    if (!formData.selectedRoom || !formData.duration) return 0
    const basePrice = parseInt(formData.selectedRoom.price.replace('₹', '').replace(',', '').split('/')[0])
    const hours = formData.duration.includes('Full day') ? 10 : 
                  formData.duration.includes('Half day') ? 6 : 
                  parseInt(formData.duration)
    return basePrice * hours
  }

  const RoomCard = ({ room, isSelected, onSelect }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    return (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden shadow-lg hover:shadow-xl ${
      isSelected
        ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 shadow-xl'
        : 'border-yellow-100 dark:border-yellow-500/20 bg-white dark:bg-[#2a2a28] hover:border-yellow-300 hover:shadow-xl'
    }`}
    onClick={() => onSelect(room)}
  >
    {/* Floating Elements - Similar to Home.jsx */}
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute top-2 right-2 w-8 h-8 bg-yellow-300/30 dark:bg-yellow-500/20 rounded-full blur-lg"
    />
    <motion.div
      animate={{ y: [0, 15, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute bottom-2 left-2 w-12 h-12 bg-amber-200/40 dark:bg-amber-500/20 rounded-full blur-lg"
    />

    {/* Availability Badge */}
    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold z-10 shadow-lg ${
      room.availability === 'Available'
        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border border-green-200 dark:border-green-500/30'
        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-500/30'
    }`}>
      {room.availability}
    </div>

    <div className="relative mb-4 rounded-xl overflow-hidden group">
      <motion.img
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
        src={room.images[currentImageIndex]}
        alt={room.name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
     
      {/* Image Navigation */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {room.images.map((_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation()
              setCurrentImageIndex(index)
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-200 shadow-lg ${
              index === currentImageIndex
                ? 'bg-yellow-500 shadow-yellow-200 scale-125'
                : 'bg-white/60 hover:bg-white/80 shadow-black/20'
            }`}
          />
        ))}
      </div>

      {/* Photo Counter */}
      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-medium border border-white/20">
        {currentImageIndex + 1} / {room.images.length}
      </div>
    </div>
   
    <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-2 leading-tight">{room.name}</h3>
    <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2 leading-relaxed">{room.description}</p>
    
    <div className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600 font-bold text-lg sm:text-xl mb-4">
      {room.price}
    </div>
   
    <ul className="space-y-2 mb-4">
      {room.features.map((feature, index) => (
        <li key={index} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
          <Check className="text-yellow-500 mr-2 flex-shrink-0" size={14} />
          <span className="leading-relaxed">{feature}</span>
        </li>
      ))}
    </ul>

    {isSelected && (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex items-center justify-center text-yellow-600 dark:text-yellow-400 font-semibold bg-yellow-100 dark:bg-yellow-500/20 py-3 rounded-xl border border-yellow-200 dark:border-yellow-500/30 shadow-lg"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Check className="mr-2" size={18} />
        </motion.div>
        Selected Studio
      </motion.div>
    )}

    {/* Bottom gradient overlay for depth */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400/30 via-amber-500/30 to-yellow-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </motion.div>
)
  }

  // Confirmation Modal
  const ConfirmationModal = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start pt-16 justify-cente pb-1 p-4"
    onClick={() => setShowConfirmation(false)}
  >
    {/* Floating Elements - Similar to Home.jsx */}
    <motion.div
      animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute top-20 left-10 w-16 h-16 bg-yellow-300/30 dark:bg-yellow-500/20 rounded-full blur-xl"
    />
    <motion.div
      animate={{ y: [0, 15, 0], rotate: [0, -3, 3, 0] }}
      transition={{ duration: 5, repeat: Infinity }}
      className="absolute bottom-20 right-10 w-24 h-24 bg-amber-200/40 dark:bg-amber-500/20 rounded-full blur-xl"
    />
    <motion.div
      animate={{ y: [0, -10, 0], x: [0, 5, -5, 0] }}
      transition={{ duration: 6, repeat: Infinity }}
      className="absolute top-40 right-20 w-12 h-12 bg-yellow-400/25 dark:bg-yellow-600/15 rounded-full blur-lg"
    />

    {/* Main Modal - Horizontal Layout */}
    <motion.div
      initial={{ scale: 0.3, opacity: 0, rotateY: -90 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      exit={{ scale: 0.3, opacity: 0, rotateY: 90 }}
      transition={{ 
        duration: 0.8, 
        type: "spring", 
        bounce: 0.4,
        staggerChildren: 0.1 
      }}
      className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden max-w-3xl w-full mx-auto border border-gray-200 dark:border-gray-700 relative"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[320px]">
        
        {/* Left Side - Visual & Title */}
        <div className="bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 p-6 lg:p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-16 h-16 bg-white rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white rounded-full blur-lg"></div>
          </div>
          
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
            className="relative z-10 w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-xl"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img 
              src={dp}
              alt="Description" 
              className="w-full h-auto"
              size={54}
            />
            </motion.div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl lg:text-2xl font-bold text-white mb-3 mt-3 leading-tight"
          >
            Thanks for choosing{" "}
            <span className="font-bold text-white">
              DigiParadise!
            </span>{" "}
            🎉
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/90 text-base leading-relaxed"
          >
            Your studio booking has been confirmed. We're excited to help you create amazing content!
          </motion.p>
        </div>

        {/* Right Side - Details & Action */}
        <div className="p-6 lg:p-8 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-3"
          >
            <h3 className="font-bold text-gray-800 dark:text-white mb-4 text-lg">
              Booking Summary:
            </h3>
            
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="flex justify-between items-center py-1.5 border-b border-gray-100 dark:border-gray-700"
              >
                <span className="text-gray-600 dark:text-gray-400">Studio:</span>
                <span className="font-semibold text-gray-800 dark:text-white">{formData.selectedRoom?.name}</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700"
              >
                <span className="text-gray-600 dark:text-gray-400">Date:</span>
                <span className="font-semibold text-gray-800 dark:text-white">{formData.date}</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700"
              >
                <span className="text-gray-600 dark:text-gray-400">Time:</span>
                <span className="font-semibold text-gray-800 dark:text-white">{formData.time}</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700"
              >
                <span className="text-gray-600 dark:text-gray-400">Duration:</span>
                <span className="font-semibold text-gray-800 dark:text-white">{formData.duration}</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 }}
                // className="flex justify-between items-center py-3 border-t-2 border-yellow-200 dark:border-yellow-500/30 mt-4"
              >
                <span className="text-gray-700 dark:text-gray-300 font-medium text-lg">Total:</span>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600 text-xl">
                  ₹{calculateTotal().toLocaleString()}
                </span>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mb-6 p-1 bg-yellow-50 dark:bg-yellow-500/10 rounded-xl border border-yellow-200 dark:border-yellow-500/20"
          >
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              📧 A confirmation email has been sent to{" "}
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                {formData.email}
              </span>
            </p>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            whileHover={{ 
              scale: 1.05, 
              y: -2,
              boxShadow: "0 10px 25px rgba(251, 191, 36, 0.3)"
            }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoHome}
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white py-4 rounded-full font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg group"
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Home size={20} />
            </motion.div>
            <span className="group-hover:tracking-wide transition-all duration-300">
              Visit Home
            </span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              →
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 opacity-80" />
      
      {/* Corner decorative elements */}
      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-yellow-200/20 to-transparent dark:from-yellow-500/10 rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-amber-200/20 to-transparent dark:from-amber-500/10 rounded-tl-full" />
    </motion.div>
  </motion.div>
)


    return (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }} 
    className="min-h-screen bg-white dark:bg-gray-900 relative overflow-x-hidden"
  >
    {/* Header */}
   
    {/* Background Elements */}
    <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-500/5 dark:to-amber-600/5 pointer-events-none" />
    
    {/* Floating Background Elements */}
    <motion.div
      animate={{ y: [0, -20, 0] }}
      transition={{ duration: 3, repeat: Infinity }}
      className="absolute top-16 sm:top-20 left-4 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 bg-yellow-300/20 dark:bg-yellow-500/10 rounded-full blur-xl pointer-events-none"
    />
    <motion.div
      animate={{ y: [0, 20, 0] }}
      transition={{ duration: 4, repeat: Infinity }}
      className="absolute bottom-16 sm:bottom-20 right-4 sm:right-10 w-20 sm:w-32 h-20 sm:h-32 bg-amber-200/30 dark:bg-amber-500/15 rounded-full blur-xl pointer-events-none"
    />

    {/* Step 1: Shoot Type Selection */}
    {step === 1 && (
      <ScrollZoom className="py-12 mt-4 sm:py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4 sm:mb-6 leading-tight">
              What type of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                shoot
              </span>{" "}
              do you need?
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Choose the type of content you'll be creating
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {shootTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl ${
                  formData.shootType === type.id
                    ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-500/10 shadow-yellow-200/50 dark:shadow-yellow-500/20'
                    : 'border-yellow-100 dark:border-yellow-500/20 bg-white dark:bg-[#2a2a28] hover:border-yellow-300 dark:hover:border-yellow-400'
                }`}
                onClick={() => handleInputChange('shootType', type.id)}
              >
                <div className="text-center">
                  <motion.div 
                    className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      formData.shootType === type.id
                        ? 'bg-gradient-to-br from-yellow-400 to-amber-600 text-white shadow-lg shadow-yellow-200'
                        : 'bg-yellow-50 dark:bg-[#2a2a28] text-yellow-600 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/30'
                    }`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <type.icon size={24} className="sm:w-7 sm:h-7" />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-2 sm:mb-3">
                    {type.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm lg:text-base leading-relaxed">
                    {type.description}
                  </p>
                  {formData.shootType === type.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 sm:mt-4 flex items-center justify-center text-yellow-600 dark:text-yellow-400 font-medium"
                    >
                      <Check className="mr-2" size={18} />
                      Selected
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {formData.shootType && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-8"
            >
              <button
                onClick={handleNextStep}
                className="group bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 xs:px-8 py-3 xs:py-4 rounded-full text-base xs:text-lg font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 flex items-center space-x-2 xs:space-x-3 mx-auto shadow-lg hover:shadow-xl"
              >
                <span>Continue</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform w-4 h-4 xs:w-5 xs:h-5" />
              </button>
            </motion.div>
          )}
        </div>
      </ScrollZoom>
    )}
{/* Step 2: Date & Time Selection */}
    {step === 2 && (
      <ScrollZoom className="py-12 sm:py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-4 sm:mb-6 leading-tight">
              When would you like to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-amber-600">
                book?
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Select your preferred date and time
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* Date Selection */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-[#2a2a28] p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-yellow-100 dark:border-yellow-500/20"
            >
              <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-4 flex items-center">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-yellow-200"
                >
                  <Calendar className="text-white" size={20} />
                </motion.div>
                Select Date
              </h3>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-4 border border-yellow-200 dark:border-yellow-500/30 rounded-xl bg-yellow-50 dark:bg-[#2a2a28] text-black dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 font-medium"
              />
            </motion.div>

            {/* Time & Duration Selection */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-[#2a2a28] p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-yellow-100 dark:border-yellow-500/20"
            >
              <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-4 flex items-center">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-yellow-200"
                >
                  <Clock className="text-white" size={20} />
                </motion.div>
                Time & Duration
              </h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Time
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="w-full p-4 border border-yellow-200 dark:border-yellow-500/30 rounded-xl bg-yellow-50 dark:bg-[#2a2a28] text-black dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 font-medium"
                >
                  <option value="">Select time</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Duration
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full p-4 border border-yellow-200 dark:border-yellow-500/30 rounded-xl bg-yellow-50 dark:bg-[#2a2a28] text-black dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 font-medium"
                >
                  <option value="">Select duration</option>
                  {durations.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <button
              onClick={handlePrevStep}
              className="border-2 border-yellow-200 dark:border-yellow-500/30 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-full font-semibold hover:bg-yellow-50 dark:hover:bg-yellow-500/10 hover:border-yellow-300 dark:hover:border-yellow-400 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
            
            {formData.date && formData.time && formData.duration && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleNextStep}
                className="group bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-6 xs:px-8 py-3 xs:py-4 rounded-full text-base xs:text-lg font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 flex items-center space-x-2 xs:space-x-3 shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
              >
                <span>Continue</span>
                <ChevronRight className="group-hover:translate-x-1 transition-transform w-4 h-4 xs:w-5 xs:h-5" />
              </motion.button>
            )}
          </div>
        </div>
      </ScrollZoom>
    )}

    {/* Step 3: Room Selection */}
    {step === 3 && (
      <ScrollZoom className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Studio
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Select the perfect studio for your {formData.shootType} session
            </p>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              {filteredRooms.length} studios available for your selection
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <RoomCard 
                  room={room} 
                  isSelected={formData.selectedRoom?.id === room.id}
                  onSelect={(room) => handleInputChange('selectedRoom', room)}
                />
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevStep}
              className="border-2 border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center space-x-2"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
            
            {formData.selectedRoom && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleNextStep}
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 flex items-center space-x-2 shadow-lg"
              >
                <span>Continue</span>
                <ChevronRight size={18} />
              </motion.button>
            )}
          </div>
        </div>
      </ScrollZoom>
    )}

    {/* Step 4: Personal Details & Confirmation */}
    {step === 4 && (
      <ScrollZoom className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Your Booking
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Enter your details to finalize the booking
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Details Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-[#2a2a28] p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <User className="mr-3 text-yellow-500" size={24} />
                Personal Details
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <Mail className="mr-2" size={16} />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                    <Phone className="mr-2" size={16} />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    value={formData.specialRequests}
                    onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Any special requirements or requests..."
                  />
                </div>
              </div>
            </motion.div>

            {/* Booking Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-[#2a2a28] p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Star className="mr-3 text-yellow-500" size={24} />
                Booking Summary
              </h3>
              
              {formData.selectedRoom && (
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden">
                    <img 
                      src={formData.selectedRoom.images[0]} 
                      alt={formData.selectedRoom.name}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-gray-600 dark:text-gray-300 text-sm">Studio:</span>
                      <span className="font-medium text-gray-900 dark:text-white text-right">
                        {formData.selectedRoom.name}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300 text-sm">Shoot Type:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {shootTypes.find(type => type.id === formData.shootType)?.name}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300 text-sm">Date:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formData.date}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300 text-sm">Time:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formData.time}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300 text-sm">Duration:</span>
                      <span className="font-medium text-gray-900 dark:text-white">{formData.duration}</span>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-3 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">Total Amount:</span>
                        <span className="text-2xl font-bold text-yellow-600">
                          ₹{calculateTotal().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevStep}
              className="border-2 border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center space-x-2"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>
            
            {formData.firstName && formData.lastName && formData.email && formData.phone && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={handleConfirmBooking}
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-8 py-3 rounded-full font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Check size={18} />
                <span>Confirm Booking</span>
              </motion.button>
            )}
          </div>
        </div>
      </ScrollZoom>
    )}

    {/* Confirmation Modal */}
    {showConfirmation && <ConfirmationModal />}
  </motion.div>);
}
export default BookStudio