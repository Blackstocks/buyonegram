import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// Custom hook to detect mobile viewport
export const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    // Initial check
    checkMobile();
    
    // Add listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  return isMobile;
};

// Mobile-optimized animation variants
export const mobileAnimationVariants = {
  // Fade in from bottom - smoother and shorter distance for mobile
  fadeInUp: {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    }
  },
  
  // Fade in from left - shorter distance for mobile
  fadeInLeft: {
    hidden: { opacity: 0, x: -15 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut" 
      }
    }
  },
  
  // Fade in from right - shorter distance for mobile
  fadeInRight: {
    hidden: { opacity: 0, x: 15 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.4,
        ease: "easeOut" 
      }
    }
  },
  
  // Scale in - gentler animation for mobile
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut" 
      }
    }
  },
  
  // Pop in - springier for interactive elements
  popIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        damping: 12,
        stiffness: 200,
        duration: 0.4
      }
    }
  },
  
  // Mobile-optimized staggered children
  staggerChildren: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07
      }
    }
  },
  
  // Mobile card hover - more subtle for mobile
  cardHover: {
    rest: { 
      scale: 1,
      y: 0,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    hover: { 
      scale: 1.02,
      y: -5,
      transition: { duration: 0.2, ease: "easeOut" }
    }
  },

  // New animation variants for mobile featured products
  featuredSlideLeft: {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.35,
        ease: [0.25, 0.1, 0.25, 1.0] // Custom cubic easing
      }
    },
    exit: { 
      opacity: 0, 
      x: -30,
      transition: { 
        duration: 0.25,
        ease: "easeIn" 
      }
    }
  },

  featuredSlideRight: {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.35,
        ease: [0.25, 0.1, 0.25, 1.0] // Custom cubic easing
      }
    },
    exit: { 
      opacity: 0, 
      x: 30,
      transition: { 
        duration: 0.25,
        ease: "easeIn" 
      }
    }
  },

  // Mobile optimized fade for product cards
  productCard: {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.3,
        ease: "easeOut" 
      }
    }
  },

  // Smoother mobile buttons animation
  buttonTap: {
    tap: { 
      scale: 0.97,
      backgroundColor: "rgb(var(--primary-700))" 
    },
    hover: { 
      scale: 1.0,
    }
  }
};

// Mobile-optimized motion components
export const MobileMotionDiv = ({ 
  children, 
  animation = "fadeInUp", 
  delay = 0, 
  className = "", 
  ...props 
}) => {
  const isMobile = useMobileDetect();
  const variant = mobileAnimationVariants[animation];
  
  // Only animate on mobile
  if (isMobile) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variant}
        transition={{ delay }}
        className={`${className} mobile-animation`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  
  // On desktop, just render without animation
  return <div className={className} {...props}>{children}</div>;
};

// Mobile staggered list - for optimized list animations on mobile
export const MobileStaggerList = ({ 
  children, 
  animation = "fadeInUp", 
  className = "", 
  ...props 
}) => {
  const isMobile = useMobileDetect();
  const itemVariant = mobileAnimationVariants[animation];
  
  // Only animate on mobile
  if (isMobile) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={mobileAnimationVariants.staggerChildren}
        className={`${className} mobile-stagger-list`}
        {...props}
      >
        {Array.isArray(children) 
          ? children.map((child, index) => (
              <motion.div key={index} variants={itemVariant}>
                {child}
              </motion.div>
            ))
          : children
        }
      </motion.div>
    );
  }
  
  // On desktop, just render without animation
  return <div className={className} {...props}>{children}</div>;
};

// Mobile tap animation - for better mobile button feedback
export const MobileTapButton = ({ 
  children, 
  onClick, 
  className = "",
  ...props 
}) => {
  const isMobile = useMobileDetect();
  
  if (isMobile) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`${className} mobile-tap-button`}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
  
  return (
    <button
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};

// Mobile image card - for product images on mobile
export const MobileImageCard = ({ 
  src, 
  alt, 
  className = "", 
  ...props 
}) => {
  const isMobile = useMobileDetect();
  
  if (isMobile) {
    return (
      <motion.div
        className={`mobile-image-container ${className}`}
        initial="rest"
        whileHover="hover"
        variants={mobileAnimationVariants.cardHover}
        {...props}
      >
        <motion.img
          src={src}
          alt={alt}
          className="object-contain w-full h-full"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    );
  }
  
  return (
    <div className={`${className}`} {...props}>
      <img 
        src={src} 
        alt={alt} 
        className="object-contain w-full h-full"
      />
    </div>
  );
};

// New component for mobile featured product
export const MobileFeaturedProduct = ({
  children,
  direction = 'left',
  className = "",
  ...props
}) => {
  const isMobile = useMobileDetect();
  const variant = direction === 'left' 
    ? mobileAnimationVariants.featuredSlideLeft 
    : mobileAnimationVariants.featuredSlideRight;
    
  if (isMobile) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variant}
        className={`${className} mobile-featured-product`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  
  // Return children as is for desktop
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

// New component for mobile product card grid with optimized loading
export const MobileProductGrid = ({
  children,
  className = "",
  ...props
}) => {
  const isMobile = useMobileDetect();
  
  if (isMobile) {
    return (
      <motion.div
        className={`${className} mobile-product-grid`}
        initial="hidden"
        animate="visible"
        variants={mobileAnimationVariants.staggerChildren}
        {...props}
      >
        {Array.isArray(children) 
          ? children.map((child, index) => (
              <motion.div 
                key={index} 
                variants={mobileAnimationVariants.productCard}
                custom={index}
                transition={{
                  delay: index * 0.03, // Smaller delays for smoother mobile experience
                  duration: 0.3
                }}
              >
                {child}
              </motion.div>
            ))
          : children
        }
      </motion.div>
    );
  }
  
  // Return children as is for desktop
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

// Prop types
MobileMotionDiv.propTypes = {
  children: PropTypes.node.isRequired,
  animation: PropTypes.string,
  delay: PropTypes.number,
  className: PropTypes.string
};

MobileStaggerList.propTypes = {
  children: PropTypes.node.isRequired,
  animation: PropTypes.string,
  className: PropTypes.string
};

MobileTapButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
};

MobileImageCard.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string
};

MobileFeaturedProduct.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['left', 'right']),
  className: PropTypes.string
};

MobileProductGrid.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}; 