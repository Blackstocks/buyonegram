import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import PropTypes from 'prop-types';
import {
  moong, kalaChanna, kaliMasoor, moongDal, uradSabut, arharDal, moongMogar, channaDal, mothSabut,
  whiteMatar, sabudana, uradChilka, chitraRajma, cholaMogar, mishriCutting, mixDal, jhamboRajma, kabuliChanna,
  lobiya, masoorDal, mufliDana,
  // 500gm imports
  moong500, kalaChanna500, kaliMasoor500, moongDal500, uradSabut500, arharDal500, moongMogar500,
  channaDal500, mothSabut500, whiteMatar500, sabudana500, uradChilka500, chitraRajma500, cholaMogar500,
  mishriCutting500, mixDal500, jhamboRajma500, kabuliChanna500, lobiya500, masoorDal500, mufliDana500,
  // Package size imports
  pkg5kg, pkg30kg
} from "../assets";
import emailjs from '@emailjs/browser';
import { productsData, featuredProducts } from "../data/data";


const FeaturedProduct = ({ product, direction }) => {
  // Move useState to the top before any conditional returns
  const [currentWeight, setCurrentWeight] = useState(
    product && product.prices ? Object.keys(product.prices)[0] || '500gm' : '500gm'
  );
  
  if (!product) return null;
  
  const productName = product?.name || 'Product';
  const productDescription = product?.description || '';
  const productPrices = product?.prices || {};
  const productFeatures = product?.features || [];
  
  // Helper function to get the correct image based on weight
  const getProductImage = () => {
    // Product name in lowercase with spaces replaced by underscores
    const productKey = productName.toLowerCase().replace(/\s+/g, '_').replace(/[()]/g, '');
    
    // For 5kg and 30kg packages, use the standard package images
    if (currentWeight === '5kg') {
      return pkg5kg;
    } else if (currentWeight === '30kg') {
      return pkg30kg;
    } else if (currentWeight === '500gm') {
      // For 500gm, try to find the corresponding 500gm image
      const productTo500gmImage = {
        'arhar_dal': arharDal500,
        'bura': mishriCutting500,
        'channa_dal': channaDal500,
        'cholla_mogar': cholaMogar500,
        'kabuli_channa': kabuliChanna500,
        'kabuli_dollar': kabuliChanna500,
        'kala_channa': kalaChanna500,
        'lobiya': lobiya500,
        'masoor_dal': masoorDal500,
        'masoor_kali': kaliMasoor500,
        'masoor_malka': masoorDal500,
        'matar_green': whiteMatar500,
        'matar_safed': whiteMatar500,
        'mishri_cutting': mishriCutting500,
        'mix_dal': mixDal500,
        'moofhli_dana_desi': mufliDana500,
        'moong_chilka': moong500,
        'moong_dal': moongDal500,
        'moong_mogar_bold': moongMogar500,
        'moong_sabut': moong500,
        'moth_sabut': mothSabut500,
        'rajma_chitra': chitraRajma500,
        'rajma_jhambu': jhamboRajma500,
        'rajma_red': jhamboRajma500,
        'sabu_dana': sabudana500,
        'soyabean_dana': mufliDana500,
        'urad_chilka_daal': uradChilka500,
        'urad_mogar': uradChilka500,
        'urad_sabut': uradSabut500
      };
      
      return productTo500gmImage[productKey] || product?.image;
    } else if (currentWeight === '1kg') {
      // For 1kg, use the regular product image
      const productToRegularImage = {
        'arhar_dal': arharDal,
        'bura': mishriCutting,
        'channa_dal': channaDal,
        'cholla_mogar': cholaMogar,
        'kabuli_channa': kabuliChanna,
        'kabuli_dollar': kabuliChanna,
        'kala_channa': kalaChanna,
        'lobiya': lobiya,
        'masoor_dal': masoorDal,
        'masoor_kali': kaliMasoor,
        'masoor_malka': masoorDal,
        'matar_green': whiteMatar,
        'matar_safed': whiteMatar,
        'mishri_cutting': mishriCutting,
        'mix_dal': mixDal,
        'moofhli_dana_desi': mufliDana,
        'moong_chilka': moong,
        'moong_dal': moongDal,
        'moong_mogar_bold': moongMogar,
        'moong_sabut': moong,
        'moth_sabut': mothSabut,
        'rajma_chitra': chitraRajma,
        'rajma_jhambu': jhamboRajma,
        'rajma_red': jhamboRajma,
        'sabu_dana': sabudana,
        'soyabean_dana': mufliDana,
        'urad_chilka_daal': uradChilka,
        'urad_mogar': uradChilka,
        'urad_sabut': uradSabut
      };
      
      return productToRegularImage[productKey] || product?.image;
    }
    
    // Default to the regular image if none of the above match
    return product?.image;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, x: direction === 'left' ? -100 : 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction === 'left' ? 100 : -100 }}
      transition={{ 
        duration: 0.6,
        ease: "easeInOut",
        staggerChildren: 0.1
      }}
      className="grid items-center gap-8 md:grid-cols-2"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ 
          duration: 0.5,
          delay: 0.2
        }}
        className="p-8 bg-white shadow-lg rounded-2xl"
      >
        <motion.h3 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mb-6 text-4xl font-bold text-gray-800"
        >
          {productName}
        </motion.h3>
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 gap-4"
          >
            {Object.entries(productPrices).map(([weight, price], index) => (
              <motion.div
                key={weight}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.5 + (index * 0.1),
                  ease: "easeOut"
                }}
                className={`p-4 rounded-xl cursor-pointer ${
                  currentWeight === weight ? 'bg-primary-600 text-white' : price > 0 ? 'bg-primary-50' : 'bg-gray-100 opacity-60'
                }`}
                onClick={() => price > 0 && setCurrentWeight(weight)}
              >
                <p className={`font-semibold ${
                  currentWeight === weight ? 'text-white' : price > 0 ? 'text-primary-600' : 'text-gray-400'
                }`}>{weight}</p>
                <p className={`text-2xl font-bold ${
                  currentWeight === weight ? 'text-white' : price > 0 ? 'text-gray-800' : 'text-gray-400'
                }`}>
                  {price > 0 ? `₹${price}` : 'Not Available'}
                </p>
              </motion.div>
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-gray-600"
          >
            {productDescription}
          </motion.p>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="space-y-2"
          >
            {productFeatures.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.8 + (index * 0.1),
                  ease: "easeOut"
                }}
                className="flex items-center space-x-2 text-gray-700"
              >
                <span className="w-2 h-2 rounded-full bg-primary-600" />
                <span>{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.6, 
          delay: 0.3,
          ease: "easeOut"
        }}
        className="relative h-[500px] rounded-2xl overflow-hidden"
      >
        <motion.img
          src={getProductImage()}
          alt={productName}
          className="object-cover w-full h-full"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.4,
            ease: "easeOut"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

FeaturedProduct.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    prices: PropTypes.object,
    features: PropTypes.arrayOf(PropTypes.string)
  }),
  direction: PropTypes.oneOf(['left', 'right'])
};

FeaturedProduct.defaultProps = {
  product: null,
  direction: 'left'
};

const ProductCard = ({ product, onBuyNowClick, selectedWeight, setSelectedWeight }) => {
  const productName = product?.product || 'Product';
  const price = product?.[selectedWeight] || 0;
  const formattedPrice = typeof price === 'number' ? price.toFixed(2) : '0.00';
  
  // Helper function to get the correct image based on weight
  const getProductImage = () => {
    // Product name in lowercase with spaces replaced by underscores
    const productKey = productName.toLowerCase().replace(/\s+/g, '_').replace(/[()]/g, '');
    
    // For 5kg and 30kg packages, use the standard package images
    if (selectedWeight === '5kg') {
      return pkg5kg;
    } else if (selectedWeight === '30kg') {
      return pkg30kg;
    } else if (selectedWeight === '500gm') {
      // For 500gm, try to find the corresponding 500gm image
      // This uses dynamic access to the imported images
      // Create mapping for product names to their 500gm image variables
      const productTo500gmImage = {
        'arhar_dal': arharDal500,
        'bura': mishriCutting500,
        'channa_dal': channaDal500,
        'cholla_mogar': cholaMogar500,
        'kabuli_channa': kabuliChanna500,
        'kabuli_dollar': kabuliChanna500,
        'kala_channa': kalaChanna500,
        'lobiya': lobiya500,
        'masoor_dal': masoorDal500,
        'masoor_kali': kaliMasoor500,
        'masoor_malka': masoorDal500,
        'matar_green': whiteMatar500,
        'matar_safed': whiteMatar500,
        'mishri_cutting': mishriCutting500,
        'mix_dal': mixDal500,
        'moofhli_dana_desi': mufliDana500,
        'moong_chilka': moong500,
        'moong_dal': moongDal500,
        'moong_mogar_bold': moongMogar500,
        'moong_sabut': moong500,
        'moth_sabut': mothSabut500,
        'rajma_chitra': chitraRajma500,
        'rajma_jhambu': jhamboRajma500,
        'rajma_red': jhamboRajma500,
        'sabu_dana': sabudana500,
        'soyabean_dana': mufliDana500,
        'urad_chilka_daal': uradChilka500,
        'urad_mogar': uradChilka500,
        'urad_sabut': uradSabut500
      };
      
      return productTo500gmImage[productKey] || product?.image;
    } else if (selectedWeight === '1kg') {
      // For 1kg, use the regular product image
      const productToRegularImage = {
        'arhar_dal': arharDal,
        'bura': mishriCutting,
        'channa_dal': channaDal,
        'cholla_mogar': cholaMogar,
        'kabuli_channa': kabuliChanna,
        'kabuli_dollar': kabuliChanna,
        'kala_channa': kalaChanna,
        'lobiya': lobiya,
        'masoor_dal': masoorDal,
        'masoor_kali': kaliMasoor,
        'masoor_malka': masoorDal,
        'matar_green': whiteMatar,
        'matar_safed': whiteMatar,
        'mishri_cutting': mishriCutting,
        'mix_dal': mixDal,
        'moofhli_dana_desi': mufliDana,
        'moong_chilka': moong,
        'moong_dal': moongDal,
        'moong_mogar_bold': moongMogar,
        'moong_sabut': moong,
        'moth_sabut': mothSabut,
        'rajma_chitra': chitraRajma,
        'rajma_jhambu': jhamboRajma,
        'rajma_red': jhamboRajma,
        'sabu_dana': sabudana,
        'soyabean_dana': mufliDana,
        'urad_chilka_daal': uradChilka,
        'urad_mogar': uradChilka,
        'urad_sabut': uradSabut
      };
      
      return productToRegularImage[productKey] || product?.image;
    }
    
    // Default to the regular image if none of the above match
    return product?.image || `/products/${productName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ 
        duration: 0.3,
        ease: "easeOut"
      }}
      className="overflow-hidden bg-white shadow-lg rounded-2xl"
    >
      <div className="relative w-full overflow-hidden aspect-square">
        <motion.img
          src={getProductImage()}
          alt={productName}
          className="object-contain w-full h-full p-4"
          whileHover={{ scale: 1.1 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
          onError={(e) => {
            e.target.src = '/products/placeholder.jpg';
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <motion.div 
        className="p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.h3 
          className="mb-4 text-xl font-semibold text-gray-800"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {productName}
        </motion.h3>

        <motion.div 
          className="grid grid-cols-2 gap-2 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {['500gm', '1kg', '5kg', '30kg'].map((weight) => (
            <motion.button
              key={weight}
              onClick={() => product?.[weight] > 0 ? setSelectedWeight(weight) : null}
              whileHover={{ scale: product?.[weight] > 0 ? 1.05 : 1 }}
              whileTap={{ scale: product?.[weight] > 0 ? 0.95 : 1 }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedWeight === weight && product?.[weight] > 0
                  ? 'bg-primary-600 text-white'
                  : product?.[weight] > 0 
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
              }`}
            >
              {weight}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          className="p-4 mb-4 text-center bg-gray-50 rounded-xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="mb-1 text-sm text-gray-500">Price</p>
          <p className="text-2xl font-bold text-primary-600">
            ₹{formattedPrice}
          </p>
        </motion.div>
        
        <motion.button
          onClick={() => onBuyNowClick(product, selectedWeight)}
          whileHover={{ scale: 1.03, backgroundColor: "" }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 font-medium text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700"
        >
          Buy Now
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    product: PropTypes.string,
    image: PropTypes.string,
    '500gm': PropTypes.number,
    '1kg': PropTypes.number,
    '5kg': PropTypes.number,
    '30kg': PropTypes.number
  }),
  onBuyNowClick: PropTypes.func.isRequired,
  selectedWeight: PropTypes.string.isRequired,
  setSelectedWeight: PropTypes.func.isRequired
};

ProductCard.defaultProps = {
  product: {}
};

const ProductsPage = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('left');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('500gm');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // For inquiry modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('500gm');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    message: '',
    product: '',
    weight: '',
    price: 0
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const handleOpenModal = (product, weight) => {
    const productName = product?.product || 'Product';
    const price = product?.[weight] || 0;
    
    setSelectedProduct(product);
    setSelectedSize(weight);
    setFormData({
      ...formData,
      product: productName,
      weight: weight,
      price: price,
      message: `I'm interested in purchasing ${productName} (${weight}) at ₹${price.toFixed(2)}.`
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSubmitResult(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          from_contact: formData.contact,
          product_name: formData.product,
          product_weight: formData.weight,
          product_price: typeof formData.price === 'number' ? formData.price.toFixed(2) : '0.00',
          message: formData.message
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      setSubmitResult({
        success: true,
        message: 'Your inquiry has been sent successfully!'
      });
      
      // Reset form fields but keep modal open to show success message
      setFormData({
        name: '',
        email: '',
        contact: '',
        message: '',
        product: '',
        weight: '',
        price: 0
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitResult({
        success: false,
        message: 'Failed to send inquiry. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Initialize EmailJS
  useEffect(() => {
    const initEmailJS = () => {
      try {
        emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
        console.log("EmailJS initialized successfully");
      } catch (error) {
        console.error('Error initializing EmailJS:', error);
      }
    };
    
    initEmailJS();
  }, []);

  const nextProduct = () => {
    setSlideDirection('right');
    setCurrentProductIndex((prev) =>
      prev === featuredProducts.length - 1 ? 0 : prev + 1
    );
  };

  const prevProduct = () => {
    setSlideDirection('left');
    setCurrentProductIndex((prev) =>
      prev === 0 ? featuredProducts.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextProduct, 5000);
    return () => clearInterval(timer);
  }, []);

  // Category mapping for products
  const productCategories = {
    // Pulses
    'Arhar Dal': 'pulses',
    'Channa Dal': 'pulses',
    'Lobiya': 'pulses',
    'Masoor Dal': 'pulses',
    'Masoor Kali': 'pulses',
    'Masoor Malka': 'pulses',
    'Moong Chilka': 'pulses',
    'Moong Mogar (Bold)': 'pulses',
    'Moong Sabut': 'pulses',
    'Rajma Chitra': 'pulses',
    'Rajma Jhambu': 'pulses',
    'Rajma Red': 'pulses',
    'Urad Chilka Daal': 'pulses',
    'Urad Mogar': 'pulses',
    'Urad Sabut': 'pulses',
    'Kala Channa': 'pulses',
    'Kabuli Channa': 'pulses',
    'Kabuli Dollar': 'pulses',
    'Cholla Mogar': 'pulses',
    'Moth Sabut': 'pulses',
    'Mix Dal': 'pulses',
    
    // Grains
    'Matar Green': 'grains',
    'Matar Safed': 'grains',
    'Sabu Dana': 'grains',
    'Soyabean Dana': 'grains',
    'Moofhli Dana (Desi)': 'grains',
    
    // Sugar
    'Bura': 'sugar',
    'Mishri Cutting': 'sugar',
  };

  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.product.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
      productCategories[product.product] === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Calculate product details for modal
  const productName = selectedProduct?.product || 'Product';
  const price = selectedProduct?.[selectedSize] || 0;
  const formattedPrice = typeof price === 'number' ? price.toFixed(2) : '0.00';

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <section className="relative py-16 text-white bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold">Featured Product</h2>

          <div className="absolute z-10 -translate-y-1/2 top-1/2 left-4">
            <motion.button
              onClick={prevProduct}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 transition-colors rounded-full bg-white/20 hover:bg-white/30"
            >
              <FaChevronLeft className="text-xl text-white" />
            </motion.button>
          </div>
          <div className="absolute z-10 -translate-y-1/2 top-1/2 right-4">
            <motion.button
              onClick={nextProduct}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 transition-colors rounded-full bg-white/20 hover:bg-white/30"
            >
              <FaChevronRight className="text-xl text-white" />
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            <FeaturedProduct
              key={currentProductIndex}
              product={featuredProducts[currentProductIndex]}
              direction={slideDirection}
            />
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-2">
            {featuredProducts.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setSlideDirection(index > currentProductIndex ? 'right' : 'left');
                  setCurrentProductIndex(index);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentProductIndex ? 'bg-white' : 'bg-white/30'
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-4 pl-12 pr-4 text-lg border-2 border-gray-200 rounded-xl focus:border-primary-600 focus:outline-none"
              />
              <FaSearch className="absolute text-xl text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <motion.button
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 font-medium transition-colors rounded-lg shadow-sm ${
                selectedCategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Categories
            </motion.button>
            <motion.button
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory('pulses')}
              className={`px-6 py-3 font-medium transition-colors rounded-lg shadow-sm ${
                selectedCategory === 'pulses'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Pulses
            </motion.button>
            <motion.button
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory('grains')}
              className={`px-6 py-3 font-medium transition-colors rounded-lg shadow-sm ${
                selectedCategory === 'grains'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Grains
            </motion.button>
            <motion.button
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory('sugar')}
              className={`px-6 py-3 font-medium transition-colors rounded-lg shadow-sm ${
                selectedCategory === 'sugar'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Sugar
            </motion.button>
            <motion.button
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled
              className="px-6 py-3 font-medium text-gray-400 transition-colors bg-gray-100 rounded-lg shadow-sm cursor-not-allowed"
            >
              Millets
            </motion.button>
            <motion.button
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled
              className="px-6 py-3 font-medium text-gray-400 transition-colors bg-gray-100 rounded-lg shadow-sm cursor-not-allowed"
            >
              Masale
            </motion.button>
            <motion.button
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled
              className="px-6 py-3 font-medium text-gray-400 transition-colors bg-gray-100 rounded-lg shadow-sm cursor-not-allowed"
            >
              Others
            </motion.button>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            {['500gm', '1kg', '5kg', '30kg'].map((weight) => (
              <motion.button
                key={weight}
                onClick={() => setSelectedWeight(weight)}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedWeight === weight
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
              >
                {weight}
              </motion.button>
            ))}
          </div>

          <motion.div 
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
              >
                <ProductCard 
                  product={product} 
                  onBuyNowClick={handleOpenModal}
                  selectedWeight={selectedWeight}
                  setSelectedWeight={setSelectedWeight}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Inquiry Modal - Placed at the page level, outside of product cards */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ 
                type: "spring",
                damping: 20,
                stiffness: 300,
                mass: 0.8
              }}
              className="w-full max-w-md p-6 bg-white shadow-2xl rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Product Inquiry</h3>
                <button 
                  onClick={handleCloseModal}
                  className="p-1 text-gray-500 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="mb-6 text-gray-600">
                {productName} ({selectedSize}) - ₹{formattedPrice}
              </p>

              {submitResult ? (
                <div className="space-y-4">
                  <div className="p-4 mb-6 text-green-700 bg-green-100 rounded-lg">
                    <p>{submitResult.message}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-primary-50">
                    <p className="mb-2 text-primary-700">Download our FreshStock app for a better experience:</p>
                    <a 
                      href="https://play.google.com/store/apps/details?id=com.freshstock.app" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block w-full px-4 py-2 text-center text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700"
                    >
                      Download FreshStock App
                    </a>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="w-full px-4 py-2 font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Contact Number</label>
                      <input
                        type="tel"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block mb-1 text-sm font-medium text-gray-700">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-6">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="flex-1 px-4 py-2 font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-4 py-2 font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-70"
                    >
                      {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductsPage;