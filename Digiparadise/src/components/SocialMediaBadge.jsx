import React, { useState, useEffect } from 'react';
import { Share2, Facebook, Twitter, Instagram, Linkedin, Youtube, MessageCircle, X } from 'lucide-react';

const SocialMediaBadge = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <Facebook size={16} />,
      url: 'https://www.facebook.com/people/Digiparadise-Studios/61576784010749/#',
      bgColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Twitter', 
      icon: <Twitter size={16} />,
      url: 'https://x.com/digiparadise',
      bgColor: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'Instagram',
      icon: <Instagram size={16} />,
      url: 'https://www.instagram.com/digiparadisestudio/?hl=en', 
      bgColor: 'bg-gradient-to-br from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={16} />,
      url: 'https://www.linkedin.com/company/digiparadise-studios/',
      bgColor: 'bg-blue-700 hover:bg-blue-800'
    },
    {
      name: 'YouTube',
      icon: <Youtube size={16} />,
      url: 'https://www.youtube.com/watch?v=_TML-m0jTTQ&pp=ygUUZGlnaXBhcmFkaXNlIHN0dWRpb3M%3D',
      bgColor: 'bg-red-600 hover:bg-red-700'
    },
  ];

  // Handle scroll visibility - only hide if BOTH conditions are met: closed AND no scroll for 5 seconds
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(true);
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      // Set new timeout to hide after 5 seconds - but ONLY if badge is closed
      const newTimeout = setTimeout(() => {
        if (!isExpanded) { // Only hide if badge is closed
          setIsVisible(false);
        }
      }, 5000);
      
      setScrollTimeout(newTimeout);
    };

    // Initial timeout for when page loads
    const initialTimeout = setTimeout(() => {
      if (!isExpanded) { // Only hide if badge is closed
        setIsVisible(false);
      }
    }, 5000);
    setScrollTimeout(initialTimeout);

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [scrollTimeout, isExpanded]);

  // When badge is opened, ensure it stays visible
  useEffect(() => {
    if (isExpanded) {
      setIsVisible(true);
    }
  }, [isExpanded]);

  // Add animation styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes pulse {
        0%, 100% {
          opacity: 0.2;
        }
        50% {
          opacity: 0.4;
        }
      }
      
      .animate-pulse-custom {
        animation: pulse 2s infinite;
      }

      .glassmorphism {
        background: rgba(255, 255, 255, 0.25);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.18);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      <div className={`fixed right-0 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      } ${isExpanded ? 'w-[calc(100%-2rem)] sm:w-auto mx-4 sm:mx-0' : ''}`}>
        {/* Main Toggle Button */}
        <div className="relative">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`${
              isExpanded 
                ? 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 shadow-red-500/25' 
                : 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 shadow-yellow-500/25'
            } text-white p-3 rounded-l-full shadow-lg transition-all duration-300 transform hover:scale-105 group relative overflow-hidden`}
          >
            {/* Background pulse effect */}
            {!isExpanded && (
              <div className="absolute inset-0 rounded-l-full bg-yellow-300 animate-pulse-custom"></div>
            )}
            
            {/* Icon with rotation */}
            <div className="relative z-10">
              {isExpanded ? (
                <X 
                  size={20} 
                  className="transition-transform duration-300 transform rotate-0 hover:rotate-90" 
                />
              ) : (
                <Share2 
                  size={20} 
                  className="transition-transform duration-300 group-hover:rotate-12" 
                />
              )}
            </div>
          </button>

          {/* Social Media Panel */}
          <div className={`absolute right-14 top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-in-out ${
            isExpanded 
              ? 'opacity-100 translate-x-0 scale-100 visible' 
              : 'opacity-0 translate-x-8 scale-95 invisible pointer-events-none'
          }`}>
            <div className="glassmorphism rounded-2xl p-4 shadow-2xl min-w-[260px] border border-white/20">
              {/* Header */}
              <div className="text-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Share2 size={18} className="text-white" />
                </div>
                <h3 className="text-base font-bold text-gray-800 dark:text-white mb-1">
                  Connect With Us
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  Stay updated with Digiparadise Studios
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-2">
                {socialLinks.map((social, index) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-3 p-2.5 rounded-lg text-white transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-lg group ${social.bgColor} relative overflow-hidden`}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      animation: isExpanded ? 'slideInRight 0.5s ease-out forwards' : 'none'
                    }}
                  >
                    {/* Background shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    
                    <span className="flex-shrink-0 p-1 rounded-md bg-white bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300 relative z-10">
                      {social.icon}
                    </span>
                    <span className="font-medium text-sm relative z-10">{social.name}</span>
                    
                    {/* Hover arrow */}
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 relative z-10">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </a>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-white border-opacity-20 dark:border-gray-600 text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Follow us for updates & offers
                </p>
                <div className="flex justify-center space-x-1 mt-2">
                  <div className="w-1 h-1 bg-yellow-500 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-1 h-1 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm md:hidden z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default SocialMediaBadge;