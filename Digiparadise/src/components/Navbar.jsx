"use client"

import { useState, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import dp from '../assets/35.png'

// --- SVG Icons ---
const FiMenu = (props) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" {...props}>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const FiX = (props) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const FiUser = (props) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" {...props}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const FiFacebook = (props) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" {...props}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
);

const FiInstagram = (props) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" {...props}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
);

const FiTwitter = (props) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" {...props}>
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
    </svg>
);

const FiYoutube = (props) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" {...props}>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 11.75a29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
    </svg>
);

const FiChevronDown = (props) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" {...props}>
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);

const FiLogOut = (props) => (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" {...props}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);

// Social Dropdown Component
const SocialDropdown = ({ isMobile = false, onToggle = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false)

  const socialLinks = [
    { icon: FiFacebook, href: "https://www.facebook.com/people/Digiparadise-Studios/61576784010749/#", label: "Facebook", color: "hover:bg-blue-900/50 hover:text-blue-300", borderColor: "hover:border-blue-700" },
    { icon: FiInstagram, href: "https://www.instagram.com/digiparadisestudio/?hl=en", label: "Instagram", color: "hover:bg-pink-900/50 hover:text-pink-300", borderColor: "hover:border-pink-700" },
    { icon: FiTwitter, href: "https://twitter.com/digiparadise", label: "Twitter", color: "hover:bg-sky-900/50 hover:text-sky-300", borderColor: "hover:border-sky-700" },
    { icon: FiYoutube, href: "https://www.youtube.com/watch?v=_TML-m0jTTQ&pp=ygUUZGlnaXBhcmFkaXNlIHN0dWRpb3M%3D", label: "YouTube", color: "hover:bg-red-900/50 hover:text-red-300", borderColor: "hover:border-red-700" },
  ]

  const handleToggle = () => {
    const newState = !isOpen
    setIsOpen(newState)
    if (isMobile) {
      onToggle(newState)
    }
  }

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
          isMobile 
            ? "text-white hover:text-amber-600 w-full text-left"
            : 'text-white hover:text-gray-200'
        }`}
      >
        Follow
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40"
              onClick={() => handleToggle()}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={`absolute z-50 bg-[#262624]/90 backdrop-blur-md rounded-xl shadow-2xl border border-yellow-500/20 p-4 min-w-[220px] ${
                isMobile ? "top-full left-0 mt-2" : "top-full left-0 mt-2"
              }`}
            >
              <div className="text-left mb-3">
                <h3 className="text-sm font-semibold text-white mb-1">
                  Connect With Us
                </h3>
                <p className="text-xs text-gray-400">
                  Follow for updates and insights
                </p>
              </div>
              
              <div className="space-y-2">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.15 }}
                    whileHover={{ x: 4 }}
                    className={`flex items-center space-x-3 p-2.5 rounded-lg bg-[#2a2a28] text-gray-300 ${social.color} ${social.borderColor} border border-yellow-500/10 transition-all duration-200`}
                    onClick={() => handleToggle()}
                  >
                    <social.icon size={16} />
                    <span className="text-sm font-medium">{social.label}</span>
                  </motion.a>
                ))}
              </div>
              
              <div className="absolute -top-2 left-6 w-4 h-4 bg-[#262624] border border-yellow-500/20 rotate-45 border-b-0 border-r-0"></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  // const [scrolled, setScrolled] = useState(false) // Removed scrolled state
  const [user, setUser] = useState(null)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [socialDropdownOpen, setSocialDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // Removed useEffect for scroll handling

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
    setUser(null)
    setShowUserDropdown(false)
    navigate("/")
  }

  const handleSocialDropdownToggle = (isOpen) => {
    setSocialDropdownOpen(isOpen)
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Gallery", path: "/gallery" },
    { name: "Marketing", path: "/marketing" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg bg-black/30 shadow-lg border-b border-white/10`}
    >
      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, 5, 0], x: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -z-10 top-0 left-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl"
        aria-hidden="true"
      />
      <motion.div
        animate={{ y: [0, -5, 0], x: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -z-10 top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl"
        aria-hidden="true"
      />

      <style>{`
          .font-kardust { font-family: 'Kardust Expanded Bold', sans-serif; }
      `}</style>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <Link to="/" className="flex items-center space-x-2 -ml-1 sm:ml-0 lg:flex">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md lg:block">
              <img src={dp} alt="Digiparadise Studios Logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full" />
            </div>
            <span className={`hidden lg:block text-base sm:text-xl font-bold font-kardust tracking-wide transition-colors duration-300 text-white`}>
              Digiparadise Studios
            </span>
          </Link>

          <div className="absolute left-1/2 transform -translate-x-1/2 lg:hidden">
            <span className={`text-base sm:text-xl font-bold font-kardust tracking-wide transition-colors duration-300 text-white`}>
              Digiparadise Studios
            </span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600"
                  />
                )}
              </Link>
            ))}
            
            <SocialDropdown isMobile={false} />
            
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-200 bg-white/10 hover:bg-white/20 text-white border border-white/20`}
                >
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-sm font-medium hidden md:block">
                    {user?.name?.split(' ')[0] || 'User'}
                  </span>
                  <FiChevronDown size={14} className={`transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showUserDropdown && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 z-40"
                        onClick={() => setShowUserDropdown(false)}
                      />
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -8 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full right-0 mt-2 z-50 bg-[#262624]/90 backdrop-blur-md rounded-xl shadow-2xl border border-yellow-500/20 p-3 min-w-[200px]"
                      >
                        <div className="px-3 py-2 border-b border-yellow-500/10 mb-2">
                          <p className="text-sm font-medium text-white truncate">
                            {user?.name || 'User'}
                          </p>
                          <p className="text-xs text-gray-400 truncate">
                            {user?.email || ''}
                          </p>
                        </div>
                        
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 w-full p-2.5 rounded-lg bg-red-900/40 hover:bg-red-900/60 text-red-300 transition-all duration-200"
                        >
                          <FiLogOut size={16} />
                          <span className="text-sm font-medium">Sign Out</span>
                        </button>
                        
                        <div className="absolute -top-2 right-6 w-4 h-4 bg-[#262624] border border-yellow-500/20 rotate-45 border-b-0 border-r-0"></div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/signin"
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white rounded-lg transition-colors duration-200 shadow-md"
              >
                <FiUser size={16} />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          <div className="lg:hidden z-10">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors duration-200 text-white hover:text-amber-600`}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
        {isOpen &&
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-[#2a2a28]/95 backdrop-blur-md overflow-hidden mx-1 rounded-xl shadow-lg border border-yellow-500/20 mb-2"
          >
            <div className="py-4 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 text-base font-medium rounded-lg mx-2 transition-all duration-200 ${
                      location.pathname === item.path
                        ? "text-amber-600 bg-black/30"
                        : "text-white hover:bg-black/20"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="px-4"
              >
                <SocialDropdown isMobile={true} onToggle={handleSocialDropdownToggle} />
              </motion.div>
              
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: (navItems.length + 1) * 0.05 }}
                className="px-4 pt-2"
              >
                {user ? (
                  <>
                    <div className="px-4 py-2 bg-black/20 rounded-lg mb-2">
                      <p className="text-sm font-medium text-white">
                        Welcome, {user?.name?.split(' ')[0] || 'User'}!
                      </p>
                      <p className="text-xs text-gray-400">
                        {user?.email || ''}
                      </p>
                    </div>
                    <button
                      onClick={() => { setIsOpen(false); handleLogout(); }}
                      className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-red-700 hover:bg-red-800 text-white rounded-lg transition-colors duration-200"
                    >
                      <FiLogOut size={16} />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/signin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white rounded-lg transition-colors duration-200 shadow-md"
                  >
                    <FiUser size={16} />
                    <span className="font-medium">Sign In</span>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        }
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navbar

