"use client"
import { motion } from "framer-motion"

const Card = ({ children, className = "", hover = true, glassmorphism = false, ...props }) => {
  const baseClasses = "rounded-xl shadow-lg transition-all duration-300"
  const glassClasses = glassmorphism ? "glassmorphism" : "bg-white dark:bg-gray-800"
  const hoverClasses = hover ? "hover:shadow-xl hover:-translate-y-1" : ""

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -5 } : {}}
      className={`${baseClasses} ${glassClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default Card
