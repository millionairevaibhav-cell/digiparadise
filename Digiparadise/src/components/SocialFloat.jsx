"use client"
import { motion } from "framer-motion"
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi"

const SocialFloat = () => {
  const socialLinks = [
    { icon: FiFacebook, href: "#", color: "hover:bg-blue-600" },
    { icon: FiInstagram, href: "#", color: "hover:bg-pink-600" },
    { icon: FiTwitter, href: "#", color: "hover:bg-blue-400" },
    { icon: FiYoutube, href: "#", color: "hover:bg-red-600" },
  ]

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 space-y-3"
    >
      {socialLinks.map((social, index) => (
        <motion.a
          key={index}
          href={social.href}
          whileHover={{ scale: 1.1, x: -5 }}
          className={`block w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 ${social.color} transition-colors duration-200`}
        >
          <social.icon size={20} />
        </motion.a>
      ))}
    </motion.div>
  )
}

export default SocialFloat
