"use client"

import { useEffect, useRef } from "react"

const ScrollZoomEffect = ({ children }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * 0.00002 // Changed from negative to positive
      const scale = 1 + rate // This will now scale UP as you scroll down

      if (containerRef.current) {
        containerRef.current.style.transform = `scale(${Math.min(scale, 1.5)})` // Cap at 1.5x scale
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="zoom-container">
      {children}
    </div>
  )
}

export default ScrollZoomEffect
