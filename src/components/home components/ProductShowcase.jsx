import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { 
  masoorDal, 
  arharDal2, 
  channaDal, 
  mixDal,
  jhamboRajma,
  kabuliChanna, 
  mufliDana, 
  mothSabut 
} from '../../assets';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    name: ['Masoor Dal', 'Channa Dal'],
    images: [masoorDal, channaDal],
  },
  {
    id: 2,
    name: ['Arhar Dal','Mix Dal'],
    images: [arharDal2, mixDal],
  },
  {
    id: 3,
    name: ['Jhambo Rajma','Kabuli Channa'],
    images: [jhamboRajma, kabuliChanna],
  },
  {
    id: 4,
    name: ['Moth Sabut','Mufli Dana'],
    images: [mothSabut, mufliDana],
  },
];


const ProductCard = ({ product, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => prevIndex === 0 ? 1 : 0);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative mb-4 overflow-hidden rounded-2xl bg-neutral-100">
        <div className="aspect-[3/4] w-full relative">
          {product.images.map((img, imgIndex) => (
            <motion.div 
              key={imgIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: imgIndex === currentImageIndex ? 1 : 0,
                scale: imgIndex === currentImageIndex ? 1 : 1.05
              }}
              transition={{ 
                opacity: { duration: 1.2, ease: "easeInOut" },
                scale: { duration: 1.2, ease: "easeInOut" }
              }}
            >
              <img
                src={img}
                alt={`${product.name} ${imgIndex + 1}`}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <motion.h3 
          className="text-xl font-semibold transition-colors duration-300 text-neutral-800 group-hover:text-primary-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {product.name[currentImageIndex]}
        </motion.h3>
      </div>
    </motion.div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.arrayOf(PropTypes.string).isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired
};

const ProductShowcase = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center+=100',
        toggleActions: 'play none none reverse'
      }
    });

    tl.fromTo(
      titleRef.current.children,
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2
      }
    );
  }, []);

  return (
    <section ref={sectionRef} id="products" className="py-24 bg-white">
      <div className="container px-4 mx-auto">
        <div ref={titleRef} className="mb-16 space-y-4 text-center">
          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl text-neutral-800">
            Best Seller&apos;s
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-neutral-600">
          Discover our selection of premium quality pulses and beans sourced from trusted farmers worldwide:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/products" className="inline-block px-8 py-4 text-lg btn-primary">
              VIEW ALL
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;