import { motion } from 'framer-motion';
import { FaCheckCircle, FaExchangeAlt, FaIndustry, FaWarehouse, FaChartLine, FaMobileAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const missionPoints = [
  {
    icon: <FaCheckCircle className="text-4xl text-primary-600" />,
    title: "Verified Farmer Network",
    description: "We collaborate with certified farmers and FPOs to ensure high-quality, sustainably grown produce with traceable origins."
  },
  {
    icon: <FaExchangeAlt className="text-4xl text-primary-600" />,
    title: "Transparent Trade Ecosystem",
    description: "From pricing to product quality, every step of the trade is visible and verified building trust and accountability across the supply chain."
  },
  {
    icon: <FaIndustry className="text-4xl text-primary-600" />,
    title: "Value Addition at Source",
    description: "We support on-site grading, cleaning, and primary processing to enhance product value and boost farmer profitability before distribution begins."
  },
  {
    icon: <FaWarehouse className="text-4xl text-primary-600" />,
    title: "Minimizing Post-Harvest Losses",
    description: "Through optimized handling, warehousing, and packaging solutions, we reduce waste, preserve quality, and ensure more produce reaches the market."
  },
  {
    icon: <FaChartLine className="text-4xl text-primary-600" />,
    title: "Scalable Supply Chain",
    description: "Our tech-enabled infrastructure seamlessly handles everything from small-scale orders to bulk container shipments, ensuring reliability at every level."
  },
  {
    icon: <FaMobileAlt className="text-4xl text-primary-600" />,
    title: "Data-Driven Market Insights",
    description: "Real-time analytics help farmers and buyers make smarter decisions based on demand trends, pricing forecasts, and market opportunities."
  }
];

const impactStats = [
  { value: "125+", label: "Verified Suppliers" },
  { value: "62+", label: "Agricultural Products" },
  { value: "7+", label: "Countries Served" },
  { value: "3258+", label: "Active Buyers" }
];

const Mission = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if the viewport is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile-specific animations
  const mobileCardAnimation = {
    offscreen: { 
      opacity: 0, 
      y: 15,
      scale: 0.95
    },
    onscreen: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.4,
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <h2 className="mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
            Our Mission
          </h2>
          <p className="max-w-4xl mx-auto text-lg md:text-xl leading-relaxed text-gray-600">
            At Buy One Gram, where shaping a future where farmers and corporate buyers grow together through trust, technology, and efficiency. Our platform bridges the gap between grassroots producers and global markets by enabling transparent trade, scalable logistics, and smart supply chains.
          </p>
        </motion.div>

        <div className="grid gap-6 md:gap-8 mb-12 md:mb-16 md:grid-cols-2 lg:grid-cols-3">
          {missionPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={isMobile ? "offscreen" : { opacity: 0, y: 20 }}
              whileInView={isMobile ? "onscreen" : { opacity: 1, y: 0 }}
              variants={isMobile ? mobileCardAnimation : undefined}
              viewport={{ once: true }}
              transition={!isMobile ? { duration: 0.6, delay: index * 0.1 } : undefined}
              className="p-6 md:p-8 transition-shadow duration-300 bg-white shadow-lg rounded-2xl hover:shadow-xl"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-3 mb-4 rounded-lg bg-primary-50">
                  {point.icon}
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-gray-800">
                    {point.title}
                  </h3>
                  <p className="leading-relaxed text-gray-600">
                    {point.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={isMobile ? "offscreen" : { opacity: 0, y: 20 }}
          whileInView={isMobile ? "onscreen" : { opacity: 1, y: 0 }}
          variants={isMobile ? mobileCardAnimation : undefined}
          viewport={{ once: true }}
          transition={!isMobile ? { duration: 0.6 } : undefined}
          className="p-6 md:p-8 lg:p-12 mb-12 md:mb-16 text-white bg-primary-600 rounded-xl md:rounded-3xl"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="mb-4 md:mb-6 text-xl md:text-2xl lg:text-3xl font-bold">
              Our Technology-Driven Approach
            </h3>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed opacity-90">
              Our digital B2B platform and wholesale app simplify the entire buying journey—from product discovery to payment and delivery. With Buy One Gram, you get:
            </p>
            <ul className="grid max-w-2xl gap-3 md:gap-4 mx-auto mt-6 text-base md:text-lg text-left md:grid-cols-2">
              <li className="flex items-center"><span className="mr-2">•</span> Verified product quality</li>
              <li className="flex items-center"><span className="mr-2">•</span> Timely delivery</li>
              <li className="flex items-center"><span className="mr-2">•</span> Secure transactions</li>
              <li className="flex items-center"><span className="mr-2">•</span> Real-time tracking</li>
              <li className="flex items-center md:col-span-2"><span className="mr-2">•</span> Direct access to a trusted farmer network</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={isMobile ? "offscreen" : { opacity: 0, y: 20 }}
          whileInView={isMobile ? "onscreen" : { opacity: 1, y: 0 }}
          variants={isMobile ? mobileCardAnimation : undefined}
          viewport={{ once: true }}
          transition={!isMobile ? { duration: 0.6 } : undefined}
          className="text-center"
        >
          <h3 className="mb-8 md:mb-10 text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
            Our Impact at a Glance
          </h3>
          <div className="grid grid-cols-2 gap-4 md:gap-8 md:grid-cols-4">
            {impactStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={isMobile ? "offscreen" : { opacity: 0, scale: 0.9 }}
                whileInView={isMobile ? "onscreen" : { opacity: 1, scale: 1 }}
                variants={isMobile ? {
                  offscreen: { opacity: 0, scale: 0.8 },
                  onscreen: { 
                    opacity: 1, 
                    scale: 1,
                    transition: { 
                      duration: 0.3,
                      type: "spring",
                      stiffness: 150
                    }
                  }
                } : undefined}
                viewport={{ once: true, margin: "-10%" }}
                transition={!isMobile ? { duration: 0.4, delay: index * 0.1 } : undefined}
                className="p-4 md:p-6 transition-shadow duration-300 bg-white shadow-md rounded-xl hover:shadow-lg"
              >
                <h4 className="mb-1 md:mb-2 text-2xl md:text-3xl lg:text-4xl font-bold text-primary-600">{stat.value}</h4>
                <p className="text-sm md:text-base text-gray-700">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Mission;