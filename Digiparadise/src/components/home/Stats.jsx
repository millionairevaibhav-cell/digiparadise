import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";

// Helper component for the animated number
const AnimatedNumber = ({ targetNumber }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const numberValue = parseInt(targetNumber.match(/\d+/), 10);
  const suffix = targetNumber.match(/[a-zA-Z+]+/) ? targetNumber.match(/[a-zA-Z+]+/)[0] : '';

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, numberValue, {
        duration: 2.5,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, count, numberValue]);

  return (
    <div className="flex items-center justify-center" ref={ref}>
      <motion.span>{rounded}</motion.span>
      <span>{suffix}</span>
    </div>
  );
};

// Main Stats component
const Stats = () => {
    const stats = [
    {
      number: "360+",
      label: "Brands & Creators",
      description: "Studios, creators & startups served",
    },
    {
      number: "430+",
      label: "Projects Delivered",
      description: "Podcasts • Ads • UGC • Fashion shoots",
    },
    {
      number: "25M+",
      label: "Views Generated",
      description: "Cross-platform reach",
    },
    {
      number: "5M+",
      label: "Engagements",
      description: "Likes • Shares • Comments",
    },
  ];

  return (
    <div className="relative overflow-hidden py-16 sm:py-24 bg-[#262624]">
        {/* Floating Elements */}
        <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -z-0 top-20 right-10 w-24 h-24 bg-yellow-500/15 rounded-full blur-2xl"
            aria-hidden="true"
        />
        <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -z-0 bottom-10 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl"
            aria-hidden="true"
        />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
        >
          The{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400">
            DigiParadise
          </span>{" "}
          Impact
        </motion.h2>
        <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto text-base sm:text-lg text-gray-300 mb-12 sm:mb-16"
        >
          Trusted by creators and brands — proven results across podcasts, ads,
          and shoots.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="text-center p-6 bg-gradient-to-br from-[#2a2a28] to-yellow-500/10 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-yellow-500/20 hover:border-yellow-500/40"
            >
              <div className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-400 to-cyan-400 mb-2">
                <AnimatedNumber targetNumber={stat.number} />
              </div>
              <div className="text-white font-semibold text-base lg:text-lg mb-1">{stat.label}</div>
              <div className="text-gray-300 text-sm">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
