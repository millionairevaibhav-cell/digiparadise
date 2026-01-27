"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { FiCheck, FiStar, FiClock, FiUsers } from "react-icons/fi"
import Button from "../components/Button"
import Card from "../components/Card"

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

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("hourly")

  const pricingPlans = [
    {
      name: "Basic Studio",
      description: "Perfect for solo creators and small projects",
      price: { hourly: 1500, daily: 8000 },
      features: [
        "Single camera setup",
        "Basic lighting kit",
        "Wireless microphone",
        "2 hours recording time",
        "Basic editing included",
        "HD video output",
      ],
      popular: false,
      icon: FiUsers,
    },
    {
      name: "Professional Studio",
      description: "Ideal for professional content creators",
      price: { hourly: 2500, daily: 15000 },
      features: [
        "Multi-camera setup (3 cameras)",
        "Professional lighting kit",
        "Multiple microphones",
        "4 hours recording time",
        "Advanced editing included",
        "4K video output",
        "Color grading",
        "Audio enhancement",
      ],
      popular: true,
      icon: FiStar,
    },
    {
      name: "Premium Studio",
      description: "Complete solution for enterprises and agencies",
      price: { hourly: 4000, daily: 25000 },
      features: [
        "Full studio access",
        "Unlimited cameras",
        "Professional crew included",
        "Full day recording",
        "Complete post-production",
        "4K/8K video output",
        "Motion graphics",
        "Sound design",
        "Multiple revisions",
        "Rush delivery available",
      ],
      popular: false,
      icon: FiClock,
    },
  ]

  const addOns = [
    { name: "Additional Hour", price: 500 },
    { name: "Rush Editing (24hrs)", price: 2000 },
    { name: "Motion Graphics", price: 3000 },
    { name: "Color Grading", price: 1500 },
    { name: "Audio Mixing", price: 1000 },
    { name: "Teleprompter", price: 800 },
  ]

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="pt-16 bg-white dark:bg-[#262624] overflow-x-hidden"
    >
      {/* Header */}
      <ScrollZoom className="py-16 bg-gradient-to-br from-amber-50 via-white to-yellow-50 dark:from-[#1a1a18] dark:via-[#262624] dark:to-[#2a2a28] relative">
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 15, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/20 dark:bg-yellow-500/15 rounded-full blur-lg"
        />
        <motion.div
          animate={{ y: [0, 25, 0], x: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-10 right-10 w-32 h-32 bg-amber-200/30 dark:bg-amber-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-1/2 right-20 w-16 h-16 bg-yellow-400/25 dark:bg-yellow-600/20 rounded-full blur-md"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Studio{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-amber-600 dark:from-yellow-400 dark:to-amber-500 bg-clip-text text-transparent">
                Pricing
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Transparent pricing for professional video production and podcast recording
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex bg-white dark:bg-[#2a2a28] rounded-lg p-1 shadow-lg border border-yellow-200 dark:border-yellow-500/20">
              <button
                onClick={() => setBillingCycle("hourly")}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  billingCycle === "hourly"
                    ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Hourly
              </button>
              <button
                onClick={() => setBillingCycle("daily")}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                  billingCycle === "daily"
                    ? "bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-md"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Daily
              </button>
            </div>
          </motion.div>
        </div>
      </ScrollZoom>

      {/* Pricing Cards */}
      <ScrollZoom className="py-16 bg-white dark:bg-[#262624]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <Card
                  className={`p-6 h-full ${
                    plan.popular
                      ? "ring-2 ring-yellow-500 bg-gradient-to-br from-white to-yellow-50 dark:from-[#2a2a28] dark:to-yellow-500/5"
                      : "bg-white dark:bg-[#2a2a28] border border-yellow-100 dark:border-yellow-500/20"
                  }`}
                >
                  <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-yellow-200 dark:shadow-yellow-500/20">
                      <plan.icon size={28} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{plan.description}</p>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      ₹{plan.price[billingCycle].toLocaleString()}
                      <span className="text-base font-normal text-gray-600 dark:text-gray-300">
                        /{billingCycle === "hourly" ? "hour" : "day"}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <FiCheck className="text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" size={16} />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700"
                        : ""
                    }`}
                    variant={plan.popular ? "primary" : "outline"}
                    size="lg"
                  >
                    Book {plan.name}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollZoom>

      {/* Add-ons Section */}
      <ScrollZoom className="py-16 bg-gradient-to-br from-yellow-50 via-amber-50 to-white dark:from-[#1a1a18] dark:via-[#2a2a28] dark:to-[#262624] relative">
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -25, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-20 right-20 w-24 h-24 bg-yellow-300/20 dark:bg-yellow-500/15 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-20 left-20 w-28 h-28 bg-amber-200/30 dark:bg-amber-500/20 rounded-full blur-xl"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Add-On{" "}
              <span className="bg-gradient-to-r from-yellow-500 to-amber-600 dark:from-yellow-400 dark:to-amber-500 bg-clip-text text-transparent">
                Services
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Enhance your studio experience with our additional services</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {addOns.map((addon, index) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-[#2a2a28] rounded-lg p-5 shadow-lg hover:shadow-xl transition-shadow duration-200 border border-yellow-100 dark:border-yellow-500/20"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">{addon.name}</h3>
                  <span className="text-lg font-bold bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent">
                    ₹{addon.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollZoom>

      {/* CTA Section */}
      <ScrollZoom className="py-16 bg-gradient-to-r from-yellow-400 to-amber-500 dark:from-yellow-500 dark:to-amber-600 relative overflow-hidden">
        {/* Background Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 360, 0] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [360, 0, 360] }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -15, 0], x: [0, 25, 0] }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY }}
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/8 rounded-full blur-xl"
        />

        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Studio?</h2>
            <p className="text-lg mb-6 opacity-90">Contact us for custom packages and group discounts</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" className="bg-white text-yellow-600 hover:bg-gray-100">
                Book Now
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-yellow-600 bg-transparent"
              >
                Get Quote
              </Button>
            </div>
          </motion.div>
        </div>
      </ScrollZoom>
    </motion.div>
  )
}

export default Pricing