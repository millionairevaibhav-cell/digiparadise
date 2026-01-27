"use client"
import { motion } from "framer-motion"
import { FiSun, FiMoon } from "react-icons/fi"
import { useTheme } from "../context/ThemeContext"

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full p-1 transition-colors duration-300"
    >
      <motion.div
        animate={{
          x: isDark ? 24 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-4 h-4 bg-white rounded-full shadow-md flex items-center justify-center"
      >
        {isDark ? <FiMoon size={10} className="text-gray-800" /> : <FiSun size={10} className="text-yellow-500" />}
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle
