import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

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
          transformOrigin: "center center",
          width: "100%",
          maxWidth: "100%"
        }}
        className={`${className} w-full max-w-full`}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default ScrollZoom
