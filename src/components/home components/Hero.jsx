import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link, useLocation } from 'react-router-dom';
import { 
  masoorDal,
  moong,
  kabuliChanna
} from '../../public';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const location = useLocation();
  
  const images = [masoorDal, moong, kabuliChanna];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Check if URL has #contact hash and scroll to it
    if (location.hash === '#contact') {
      setTimeout(() => scrollToContact(), 100);
    }
  }, [location]);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const image = imageRef.current;

    gsap.fromTo(text,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(image,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // Image slider interval
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Slightly longer duration for better viewing
    
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-[90vh] flex items-center pt-20 relative overflow-hidden bg-dot-pattern"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full opacity-30 blur-3xl bg-primary-100" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl bg-secondary-100" />
      </div>

      <div className="container relative z-10 mx-auto container-padding">
        <div className="flex flex-wrap gap-12 items-center lg:gap-0">
          <div
            ref={textRef}
            className="w-full lg:w-1/2 lg:pr-12"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold rounded-full bg-primary-100 text-primary-700">
                Trusted by 1500+ Businesses
              </span>
              <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl text-balance">
                Bridging Local <span className="mb-6 text-5xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-green-500 to-yellow-400 md:text-6xl lg:text-7xl text-balance">Harvests</span> with Global Demand
              </h1>
              <p className="mb-8 max-w-2xl text-xl leading-relaxed text-neutral-600">
                Welcome to Buy One Gram – the B2B marketplace revolutionizing the way agricultural trade works. We connect verified farmers with global buyers, delivering premium pulses and beans with transparency, quality, and trust.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <button className="btn-primary">
                  Explore Our Range
                  </button>
                </Link>
                <button onClick={scrollToContact} className="btn-secondary">
                  Become a Supplier
                </button>
              </div>
            </motion.div>
          </div>

          <div
            ref={imageRef}
            className="w-full lg:w-1/2"
          >
            <motion.div
              className="relative w-full h-[500px] lg:h-[600px]"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="overflow-hidden absolute inset-0 rounded-2xl shadow-strong">
                {images.map((img, index) => (
                  <motion.div 
                    key={index}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: index === currentImageIndex ? 1 : 0,
                      scale: index === currentImageIndex ? 1 : 1.05
                    }}
                    transition={{ 
                      opacity: { duration: 1.2, ease: "easeInOut" },
                      scale: { duration: 1.2, ease: "easeInOut" }
                    }}
                  >
                    <img
                      src={img}
                      alt={`Agricultural Product ${index + 1}`}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;