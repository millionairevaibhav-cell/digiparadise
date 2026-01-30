import { motion } from "framer-motion";
import { Check, Mic, Video, Camera, Scissors, Megaphone, FileText } from "lucide-react";

const servicesData = [
    {
        icon: Mic,
        title: "Podcast Production",
        description: "Professional podcast solutions for creators, brands, and businesses.",
        features: [
            "Soundproof podcast studio with acoustic treatment",
            "5 Different theme based studios",
            "Rode Podcasting microphones & multi-track recording",
            "Video podcast recording (multi-cam setup)",
            "End-to-end editing & distribution support",
        ],
    },
    {
        icon: Video,
        title: "Video Production & Shoots",
        description: "High-quality video solutions for every content need.",
        features: [
            "Corporate films & ad shoots",
            "UGC-style videos for brands",
            "Fashion & clothing shoots",
            "E-commerce & product shoots",
            "Green screen & 4K multi-camera setups",
        ],
    },
    {
        icon: Camera,
        title: "Photography & Creative Shoots",
        description: "Professional photography tailored for businesses and creators.",
        features: [
            "Fashion photography",
            "E-commerce product shoots",
            "Lifestyle & influencer shoots",
            "Catalog & lookbook creation",
            "Creative campaign photography",
        ],
    },
    {
        icon: Scissors,
        title: "Post Production",
        description: "Expert editing and finishing for a polished, market-ready output.",
        features: [
            "Video editing & audio mixing",
            "Color grading & retouching",
            "Motion graphics & VFX",
            "Social media adaptation (reels, shorts, YouTube formats)",
        ],
    },
    {
        icon: Megaphone,
        title: "Social Media Marketing",
        description: "Grow and engage your audience with impactful strategies.",
        features: [
            "Social media strategy & management",
            "Scriptwriting & storytelling",
            "SEO-driven content strategies",
            "Content calendar planning",
            "Paid ads (Meta, Google, YouTube)",
            "Influencer collaboration support",
        ],
    },
];

const Services = () => {
    return (
        <div className="relative overflow-hidden py-12 sm:py-20 bg-[#262624]">
            {/* Floating Elements */}
            <motion.div
                animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -z-0 top-10 left-10 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl"
                aria-hidden="true"
            />
            <motion.div
                animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -z-0 bottom-20 right-20 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl"
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Our{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400">
                            Services
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                        Complete production solutions for all your creative needs
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center items-stretch -mx-4">
                    {servicesData.map((service, index) => (
                        <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="p-6 bg-gradient-to-br from-[#2a2a28] to-yellow-500/10 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group border border-yellow-500/20 hover:border-yellow-500/40 flex flex-col h-full"
                            >
                                <div className="text-center mb-5">
                                    <motion.div
                                        whileHover={{ rotate: 15, scale: 1.1 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                        className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg shadow-yellow-500/50"
                                    >
                                        <service.icon className="w-8 h-8 text-white" />
                                    </motion.div>
                                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 mb-2">{service.title}</h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
                                </div>

                                <ul className="space-y-2 mt-auto">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start space-x-3">
                                            <Check className="text-amber-600 flex-shrink-0 mt-1" size={16} />
                                            <span className="text-gray-300 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* --- Updated Download Catalogue Section --- */}
                <div className="mt-16 flex justify-center">
                    <motion.div 
                        className="relative w-full max-w-lg h-48 rounded-2xl overflow-hidden border border-yellow-500/20 group"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {/* Blurred Background Image */}
                        <img 
                            src="https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/cat.png" 
                            alt="Catalogue Preview"
                            className="absolute inset-0 w-full h-full object-cover blur-sm scale-110 group-hover:scale-100 transition-transform duration-500"
                            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x300/2a2a28/ffffff?text=Catalogue'; }}
                        />
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black/30"></div>
                        
                        {/* Button Centered on Top */}
                        <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
                            <a
                                href="https://pub-9cb2f134c83e44329d174635cb07b826.r2.dev/Catalogue%20digiparadise_.pdf"
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-8 py-3 text-white font-semibold rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-[#2a2a28] to-yellow-500/20 backdrop-blur-md border border-yellow-500/20 hover:border-yellow-500/40"
                            >
                                <FileText className="w-5 h-5" />
                                Download Catalogue
                            </a>
                        </div>
                    </motion.div>
                </div>
                {/* --- End of Updated Section --- */}

            </div>
        </div>
    );
};

export default Services;