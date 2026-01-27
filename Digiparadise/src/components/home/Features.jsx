import { motion } from "framer-motion";
import { 
    Palette, 
    Layers, 
    Sparkles, 
    MapPin, 
    Video, 
    Users, 
    Zap, 
    BadgeIndianRupee, 
    LayoutGrid 
} from "lucide-react";

const FeatureCard = ({ feature, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="text-center p-6 bg-gradient-to-br from-[#2a2a28] to-yellow-500/10 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl hover:border-yellow-500/40 transition-all duration-300 border border-yellow-500/20 h-full flex flex-col items-center justify-center"
    >
        <div className="flex justify-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 mb-4">{feature.icon}</div>
        <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
        <p className="text-gray-300 leading-relaxed text-base">{feature.description}</p>
    </motion.div>
);

const Features = () => {
    const iconColor = "#d97706"; // amber-600
    const featureData = [
        { 
            icon: <Palette color={iconColor} size={32} />, 
            title: "Your Vision, Our Canvas", 
            description: "90% customizable sets & moods." 
        },
        { 
            icon: <Layers color={iconColor} size={32} />, 
            title: "40+ Unique Setups", 
            description: "Never repeat content, always stay fresh." 
        },
        { 
            icon: <Sparkles color={iconColor} size={32} />, 
            title: "Aesthetic Guarantee", 
            description: "Every corner is Instagram-worthy." 
        },
        { 
            icon: <MapPin color={iconColor} size={32} />, 
            title: "Prime Delhi Location", 
            description: "Central, easy, no long drives." 
        },
        { 
            icon: <Video color={iconColor} size={32} />, 
            title: "Top-Tier Gear", 
            description: "4K cameras, pro mics & lighting." 
        },
        { 
            icon: <Users color={iconColor} size={32} />, 
            title: "Expert Team", 
            description: "Professionals who guide, not just record." 
        },
        { 
            icon: <Zap color={iconColor} size={32} />, 
            title: "Fast Turnaround", 
            description: "Content ready in record time." 
        },
        { 
            icon: <BadgeIndianRupee color={iconColor} size={32} />, 
            title: "Budget-Friendly Creativity", 
            description: "Premium studio, smart pricing." 
        },
        { 
            icon: <LayoutGrid color={iconColor} size={32} />, 
            title: "All-in-One Hub", 
            description: "Podcasts, ads, UGCs, fashion, product, e-com." 
        },
    ];

    return (
        <div className="relative overflow-hidden py-16 sm:py-24 bg-[#262624] font-sans">
            {/* Floating Elements */}
            <motion.div
                animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -z-0 top-1/4 left-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"
                aria-hidden="true"
            />
            <motion.div
                animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -z-0 bottom-1/4 right-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl"
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
                        Why Choose{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400">
                            DigiParadise
                        </span>
                        ?
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Professional-grade equipment and an expert team to bring your creative vision to life.
                    </p>
                </motion.div>

                {/* Mobile & Tablet View (up to lg) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
                    {featureData.map((feature, index) => {
                        const isLastItem = index === featureData.length - 1;
                        const isOddNumberOfItems = featureData.length % 2 !== 0;

                        if (isLastItem && isOddNumberOfItems) {
                            return (
                                <div key={index} className="sm:col-span-2 flex justify-center">
                                    <div className="w-full max-w-sm">
                                        <FeatureCard feature={feature} index={index} />
                                    </div>
                                </div>
                            );
                        }
                        return <FeatureCard key={index} feature={feature} index={index} />;
                    })}
                </div>
                
                {/* Desktop View (lg and up) */}
                <div className="hidden lg:flex flex-col items-center gap-8">
                    {/* First row with 5 cards */}
                    <div className="grid grid-cols-5 gap-8 w-full">
                        {featureData.slice(0, 5).map((feature, index) => (
                            <FeatureCard feature={feature} index={index} key={index} />
                        ))}
                    </div>
                    {/* Second row with 4 cards, centered to align with the row above */}
                    <div className="grid grid-cols-4 gap-8 w-4/5">
                        {featureData.slice(5).map((feature, index) => (
                            <FeatureCard feature={feature} index={index + 5} key={index} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Features;
