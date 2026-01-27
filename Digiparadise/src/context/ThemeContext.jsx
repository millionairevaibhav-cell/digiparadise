"use client"

import { createContext, useContext } from "react"

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  // Always light theme - no functionality needed
  const toggleTheme = () => {
    // Empty function - does nothing
  }

  return (
    <ThemeContext.Provider value={{ isDark: false, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}