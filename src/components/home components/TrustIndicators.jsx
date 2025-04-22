import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { client1, client2, client3, client4, client5, client6, client7, client8, client9 } from '../../assets';
import LazyImage from '../LazyImage';

const clients = [
  { name: 'Aadhar Mart', logo: client1 },
  { name: 'Ipermart', logo: client2 },
  { name: 'Nr Mart', logo: client3 },
  { name: 'Q3', logo: client4 },
  { name: 'DMart', logo: client5 },
  { name: 'Madhur', logo: client6 },
  { name: 'Ebazzar', logo: client7 },
  { name: 'DesiMall', logo: client8 },
  { name: 'ONDC', logo: client9 }
];

const TrustIndicators = () => {
  const sliderRef = useRef(null);
  const controls = useAnimationControls();
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

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollWidth = slider.scrollWidth;
    const clientWidth = slider.clientWidth;
    
    const animate = async () => {
      // Different animation speed based on device
      const duration = isMobile ? 15 : 20;
      
      await controls.start({
        x: -scrollWidth + clientWidth,
        transition: {
          duration: duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    };

    animate();
  }, [controls, isMobile]);

  // Mobile-specific animations
  const mobileCardAnimation = {
    offscreen: { opacity: 0, y: 10 },
    onscreen: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="py-12 md:py-16 overflow-hidden bg-white">
      <div className="container px-4 mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 md:mb-12 text-2xl md:text-3xl font-bold text-center text-gray-800"
        >
          Trusted by Industry Leaders
        </motion.h2>

        {/* Clients */}
        <div className="mb-12 md:mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mb-6 md:mb-8 text-lg md:text-xl font-semibold text-center text-gray-700"
          >
            Our Clients
          </motion.h3>
          
          {/* Infinite Slider */}
          <div className="relative w-full overflow-hidden">
            <motion.div 
              ref={sliderRef}
              className="flex gap-4 md:gap-8 py-4"
              animate={controls}
            >
              {/* First set */}
              {clients.map((client, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 w-36 h-28 md:w-64 md:h-40"
                >
                  <motion.div
                    initial={isMobile ? "offscreen" : { opacity: 1 }}
                    whileInView={isMobile ? "onscreen" : { opacity: 1 }}
                    variants={isMobile ? mobileCardAnimation : undefined}
                    viewport={{ once: true }}
                    className="flex items-center justify-center w-full h-full p-3 md:p-4 transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-center w-full h-full overflow-hidden">
                      <LazyImage
                        src={client.logo}
                        alt={client.name}
                        className="w-3/4 transition-transform duration-300 transform h-3/4 hover:scale-110"
                        centerImage={true}
                        onError={(e) => {
                          e.target.src = '/clients/placeholder.png';
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {clients.map((client, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 w-36 h-28 md:w-64 md:h-40"
                >
                  <motion.div
                    initial={isMobile ? "offscreen" : { opacity: 1 }}
                    whileInView={isMobile ? "onscreen" : { opacity: 1 }}
                    variants={isMobile ? mobileCardAnimation : undefined}
                    viewport={{ once: true }}
                    className="flex items-center justify-center w-full h-full p-3 md:p-4 transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-center w-full h-full overflow-hidden">
                      <LazyImage
                        src={client.logo}
                        alt={client.name}
                        className="w-3/4 transition-transform duration-300 transform h-3/4 hover:scale-110"
                        centerImage={true}
                        onError={(e) => {
                          e.target.src = '/clients/placeholder.png';
                        }}
                      />
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;