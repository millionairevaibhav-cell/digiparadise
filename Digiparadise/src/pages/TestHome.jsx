import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Camera, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Import segregated components
import PopupForm from "../components/home/PopupForm";
import Hero from "../components/home/Hero";
import PhotoSlider from "../components/home/PhotoSlider.jsx,Hero";
import StudiosGallery from "../components/home/StudiosGallery";
import Stats from "../components/home/Stats";
import Features from "../components/home/Features";
import Services from "../components/home/Services";
import Testimonials from "../components/home/Testimonials";
import PhotoGridCTA from "../components/home/PhotoGridCTA";

// Sample user avatar - replace with your actual image
const user = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face";

const TestHome = () => {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const [hasFormBeenClosed, setHasFormBeenClosed] = useState(false); // Track if user has closed the form
    const navigate = useNavigate();

    // Function to check user authentication status from localStorage
    const checkUserAuth = useCallback(() => {
        try {
            // Get user object from localStorage
            const userString = localStorage.getItem('user');
            const token = localStorage.getItem('authToken');
            
            console.log('Checking auth - userString:', userString ? 'exists' : 'null', 'token:', token ? 'exists' : 'null');
            
            if (!token || !userString) {
                console.log('No token or user data found, setting currentUser to null');
                setCurrentUser(null);
                setIsCheckingAuth(false);
                return;
            }

            // Parse user object
            const userData = JSON.parse(userString);
            console.log('Parsed user data:', userData);
            setCurrentUser(userData);
        } catch (error) {
            console.error('Auth check error:', error);
            setCurrentUser(null);
        } finally {
            setIsCheckingAuth(false);
        }
    }, []);

    // Function to determine if form should be shown
    const shouldShowForm = useCallback(() => {
        console.log('shouldShowForm called - isCheckingAuth:', isCheckingAuth, 'currentUser:', currentUser);
        
        if (isCheckingAuth) {
            console.log('Still checking auth, not showing form');
            return false;
        }
        
        // If user is not logged in, show the form
        if (!currentUser) {
            console.log('No current user, should show form');
            return true;
        }
        
        // If user is logged in, check formFilled status
        // Show form only if formFilled is 0 or undefined
        const shouldShow = currentUser.formFilled === 0 || currentUser.formFilled === undefined;
        console.log('User exists, formFilled:', currentUser.formFilled, 'shouldShow:', shouldShow);
        return shouldShow;
    }, [isCheckingAuth, currentUser]);

    // Check authentication on component mount
    useEffect(() => {
        console.log('Component mounted, checking auth...');
        checkUserAuth();
    }, [checkUserAuth]);

    // This effect manages the timer for showing the popup form.
    useEffect(() => {
        console.log('Timer effect triggered');
    
        // Conditions for setting a timer:
        // 1. Auth check must be complete.
        // 2. The form should be eligible to be shown.
        // 3. The form must not currently be visible.
        if (!isCheckingAuth && shouldShowForm() && !isFormVisible) {
            // Use a 1-minute delay if the user has closed it before, otherwise use the initial 20-second delay.
            const delay = hasFormBeenClosed ? 60000 : 20000;
            const delayInSeconds = delay / 1000;
    
            console.log(`Setting timer for ${delayInSeconds} seconds...`);
    
            const timer = setTimeout(() => {
                // Check again right before showing (in case user data changed)
                if (shouldShowForm()) {
                    console.log(`Timer executed after ${delayInSeconds}s - showing form`);
                    setIsFormVisible(true);
                }
            }, delay);
    
            // Cleanup timer on unmount or if dependencies change
            return () => {
                console.log('Cleaning up timer');
                clearTimeout(timer);
            };
        }
    }, [isCheckingAuth, shouldShowForm, isFormVisible, hasFormBeenClosed]);

    // Data for components
    const services = [
        { icon: Mic, title: "Podcast Studio", description: "Professional podcast recording with acoustic treatment and premium microphones.", features: ["Soundproof booth", "Multi-track recording", "Live streaming support"] },
        { icon: Camera, title: "Video Production", description: "Complete video production solutions for content creators and businesses.", features: ["4K camera setup", "Professional lighting", "Green screen facility"] },
        { icon: Edit3, title: "Post Production", description: "Expert editing and post-production to ensure high-quality final output.", features: ["Color grading", "Audio mixing", "Motion graphics and VFX"] },
        { icon: Camera, title: "Social Media Marketing", description: "Boost your online presence with tailored social media strategies.", features: ["Content strategy", "Campaign management", "Analytics & reporting"] },
        { icon: Mic, title: "Content Marketing", description: "Engaging content solutions that attract and retain your target audience.", features: ["Blog and article creation", "SEO optimization", "Email marketing"] },
    ];

    const testimonials = [
        { name: "Rajesh Kumar", role: "Tech Podcast Host", content: "The audio quality is incredible! My podcast has never sounded better.", rating: 5, avatar: user },
        { name: "Priya Sharma", role: "YouTube Creator", content: "Professional setup and amazing team. Highly recommend for video content.", rating: 5, avatar: user },
        { name: "Mumbai Startup", role: "Corporate Client", content: "Perfect for our product launches and corporate videos. Top-notch service!", rating: 5, avatar: user },
        { name: "Anita Desai", role: "Wedding Videographer", content: "Exceptional quality and attention to detail. Every wedding video comes out perfect!", rating: 5, avatar: user },
        { name: "Vikram Singh", role: "Music Producer", content: "State-of-the-art equipment and acoustics. My tracks sound professional every time.", rating: 5, avatar: user },
        { name: "Deepika Patel", role: "Content Creator", content: "The team understands my vision perfectly. Great collaboration and results!", rating: 5, avatar: user },
        { name: "Bangalore Tech Hub", role: "IT Company", content: "Reliable partner for all our corporate presentations and training videos.", rating: 5, avatar: user },
        { name: "Sanjay Mehta", role: "Documentary Filmmaker", content: "Professional grade equipment and skilled operators. Couldn't ask for more!", rating: 5, avatar: user },
        { name: "Kavya Krishnan", role: "Fashion Blogger", content: "Perfect lighting and camera work. My content looks magazine-quality now!", rating: 5, avatar: user },
        { name: "Digital Marketing Agency", role: "Marketing Team", content: "Fast turnaround and excellent results. Our clients love the video campaigns!", rating: 5, avatar: user },
        { name: "Rohit Agarwal", role: "Event Organizer", content: "Captured every moment beautifully. The event highlights reel was spectacular!", rating: 5, avatar: user },
        { name: "Meera Joshi", role: "Online Educator", content: "Crystal clear video quality makes my online courses so much more engaging.", rating: 5, avatar: user }
    ];

    const stats = [
        { number: "360+", label: "Happy Clients" },
        { number: "430+", label: "Projects Done" },
        { number: "9M+", label: "Audience reached" },
        { number: "3M+", label: "Engagement" },
    ];

    // Handle form close
    const handleFormClose = () => {
        console.log('Form closed by user.');
        setIsFormVisible(false);
        setHasFormBeenClosed(true); // Set flag to indicate user has closed the form
    };

    // Handle form submission (called from PopupForm component)
    const handleFormSubmitted = (updatedUserData) => {
        console.log('Form submitted, updating current user:', updatedUserData);
        setCurrentUser(updatedUserData);
        setIsFormVisible(false);
    };

    return (
        <div className="antialiased">

            <AnimatePresence>
                {isFormVisible && (
                    <PopupForm 
                        onClose={handleFormClose} 
                        userEmail={currentUser?.email}
                        onFormSubmitted={handleFormSubmitted}
                    />
                )}
            </AnimatePresence>
            
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="overflow-x-hidden"
            >
                <PhotoSlider />
                <Hero />
                <StudiosGallery />
                <Stats stats={stats} />
                <Features />
                <Services services={services} />
                <Testimonials testimonials={testimonials} />
                {/* <PhotoGridCTA /> */}
                {/* <div className="pb-20 sm:pb-24"></div> */}
            </motion.div>
        </div>
    );
};

export default TestHome;