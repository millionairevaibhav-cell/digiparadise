"use client"

import { useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"

// --- INLINE SVG ICONS ---
const FiMail = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);
const FiLock = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);
const FiEye = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
);
const FiEyeOff = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
);
const FiAlertCircle = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
);
const FiCheckCircle = ({ size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
);
// --- END INLINE SVG ICONS ---

const Button = ({ children, ...props }) => <button {...props}>{children}</button>;
const Card = ({ children, className }) => <div className={className}>{children}</div>;


// ScrollZoom Component with controlled scaling
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

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    if (error) setError("")
    if (success) setSuccess("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }
    
    setIsSubmitting(true)
    setError("")
    setSuccess("")
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem('authToken', data.data.token)
        localStorage.setItem('user', JSON.stringify(data.data.user))
        
        setSuccess("Login successful! Redirecting...")
        setTimeout(() => {
          navigate("/")
          window.location.reload() // Refresh to update navbar
        }, 1500)
      } else {
        setError(data.message || "Login failed. Please try again.")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="pt-16 min-h-screen bg-yellow-50 overflow-x-hidden"
    >
      {/* Header Section */}
      <ScrollZoom className="py-20 bg-gradient-to-br from-amber-50 via-white to-yellow-50 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link to="/" className="inline-flex items-center space-x-3">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center shadow-xl shadow-yellow-200">
                <span className="text-white font-bold text-2xl">D</span>
              </div>
              <span className="text-3xl font-bold text-gray-900">Digiparadise</span>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">Back</span>
            </h1>
            <p className="text-xl text-gray-600">
              Sign in to your account to continue your creative journey
            </p>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-10 left-10 w-24 h-24 bg-yellow-300/20 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [0, 15, 0], rotate: [360, 180, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-10 right-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl"
          />
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute top-1/3 right-0 w-16 h-16 bg-yellow-400/20 rounded-full blur-lg"
          />
        </div>
      </ScrollZoom>

      {/* Form Section */}
      <ScrollZoom className="py-20 bg-yellow-50">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-8 bg-gradient-to-br from-white to-yellow-50 border border-yellow-100 shadow-xl hover:shadow-2xl transition-shadow rounded-xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                <p className="text-gray-600">Enter your credentials to access your account</p>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3"
                >
                  <FiAlertCircle className="text-red-500 flex-shrink-0" size={20} />
                  <p className="text-red-700 text-sm">{error}</p>
                </motion.div>
              )}

              {/* Success Message */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3"
                >
                  <FiCheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <p className="text-green-700 text-sm">{success}</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-4 py-3 border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="your@email.com"
                    />
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }} 
                  whileInView={{ opacity: 1, x: 0 }} 
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full pl-10 pr-12 py-3 border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isSubmitting}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between"
                >
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      disabled={isSubmitting}
                      className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                  </label>
                  <Link 
                    to="#" 
                    className="text-sm text-yellow-600 hover:text-yellow-700 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none py-3 rounded-lg font-semibold"
                  >
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </Button>
                </motion.div>
              </form>

              <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-8 text-center"
              >
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link 
                    to="/signup" 
                    className="text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
                  >
                    Sign up
                  </Link>
                </p>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </ScrollZoom>

      {/* CTA Section */}
      <ScrollZoom className="py-20 bg-gradient-to-r from-yellow-400 to-amber-500 relative overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 360, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [360, 0, 360] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"
        />
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
          >
            Ready to Create Something Amazing?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/90 mb-8"
          >
            Join thousands of creators who trust Digiparadise for their content creation needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center bg-white text-yellow-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started Today
            </Link>
          </motion.div>
        </div>
      </ScrollZoom>
    </motion.div>
  )
}

export default SignIn

