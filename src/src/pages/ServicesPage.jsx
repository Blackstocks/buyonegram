import { motion } from 'framer-motion';
import { FaHandshake, FaLeaf, FaCheckCircle, FaTruck, FaUserShield, FaUsers, FaBox, FaWarehouse, FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { MobileMotionDiv, MobileStaggerList, useMobileDetect } from '../components/MobileAnimations';

const services = [
  {
    icon: <FaHandshake className="text-3xl" />,
    title: "Direct Farm Trading",
    description: "We help you connect directly with trusted Farmers, ensuring better prices and long-term trade relationships—without middlemen. Buy and sell agricultural produce in bulk with ease.",
    category: "Trading"
  },
  {
    icon: <FaLeaf className="text-3xl" />,
    title: "Post-Harvest Handling",
    description: "From cleaning to grading and proper packaging, we prepare your produce to meet market standards and fetch better returns.",
    category: "Processing"
  },
  {
    icon: <FaCheckCircle className="text-3xl" />,
    title: "Assured Quality Checks",
    description: "Every batch goes through careful inspection and double shorting process to meet our quality standards. We proudly offer a 100% Product Quality Guarantee.",
    category: "Quality"
  },
  {
    icon: <FaTruck className="text-3xl" />,
    title: "Reliable Transportation",
    description: "We offer dependable transport services—from your farm to buyers or markets—ensuring timely and safe delivery of your goods.",
    category: "Logistics"
  },
  {
    icon: <FaUserShield className="text-3xl" />,
    title: "Trusted Trade Practices",
    description: "All dealings are conducted with verified parties and transparent processes to ensure safety and fairness in every transaction.",
    category: "Security"
  },
  {
    icon: <FaUsers className="text-3xl" />,
    title: "Farmer-Centric Support",
    description: "We provide training, advisory, and financial guidance to help farmers grow sustainably and improve productivity.",
    category: "Support"
  },
  {
    icon: <FaBox className="text-3xl" />,
    title: "Purposeful Packaging",
    description: "We use strong and sustainable packaging that maintains product freshness and meets retail expectations.",
    category: "Packaging"
  },
  {
    icon: <FaWarehouse className="text-3xl" />,
    title: "Safe Storage Facilities",
    description: "We store our products in cold-dry and safe storage to ensure proper maintenance and preserve their shelf live.",
    category: "Storage"
  },
  {
    icon: <FaSearch className="text-3xl" />,
    title: "Clear Product Identity",
    description: "We maintain simple, transparent record-keeping so every product's origin and handling can be easily traced when needed.",
    category: "Traceability"
  }
];

// Desktop version of service card
const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="overflow-hidden transition-all duration-300 bg-white shadow-lg group rounded-2xl hover:shadow-xl"
    >
      <div className="p-8">
        {/* Icon with gradient background */}
        <div className="flex items-center justify-center w-16 h-16 mb-6 transition-transform duration-300 rounded-full bg-gradient-to-br from-primary-50 to-primary-100 group-hover:scale-110">
          <div className="transition-colors duration-300 text-primary-600 group-hover:text-primary-700">
            {service.icon}
          </div>
        </div>

        {/* Content */}
        <h3 className="mb-3 text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-primary-600">
          {service.title}
        </h3>
        <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
          {service.description}
        </p>

        {/* Category Tag */}
        <div className="inline-block px-3 py-1 mt-6 text-sm font-medium rounded-full bg-primary-50 text-primary-600">
          {service.category}
        </div>
      </div>
    </motion.div>
  );
};

// Mobile-optimized service card
const MobileServiceCard = ({ service }) => {
  return (
    <div className="overflow-hidden bg-white shadow service-card-mobile">
      <div className="p-4">
        {/* Icon with gradient background */}
        <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="text-primary-600">{service.icon}</div>
        </div>

        {/* Content */}
        <h3 className="mb-2 text-lg font-bold text-gray-800">
          {service.title}
        </h3>
        <p className="text-sm text-gray-600">
          {service.description}
        </p>

        {/* Category Tag */}
        <div className="inline-block px-2 py-1 mt-3 text-xs font-medium rounded-full bg-primary-50 text-primary-600">
          {service.category}
        </div>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired
};

MobileServiceCard.propTypes = {
  service: PropTypes.shape({
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired
};

const ServicesPage = () => {
  const isMobile = useMobileDetect();

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      {/* Hero Section */}
      <section className={`py-12 md:py-20 text-white bg-gradient-to-r from-primary-600 to-primary-700 ${isMobile ? 'services-hero-mobile' : ''}`}>
        <div className="container px-4 mx-auto">
          {isMobile ? (
            <MobileMotionDiv animation="fadeInUp" className="text-center">
              <h1 className="mb-4 text-3xl font-bold">Our Services</h1>
              <p className="opacity-90">
                Smart, Scalable, and End-to-End Solutions for Modern Agriculture
              </p>
            </MobileMotionDiv>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <h1 className="mb-6 text-4xl font-bold md:text-5xl">Our Services</h1>
              <p className="text-xl opacity-90">
                Smart, Scalable, and End-to-End Solutions for Modern Agriculture
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-16">
        <div className="container px-4 mx-auto">
          {isMobile ? (
            <MobileStaggerList animation="fadeInUp" className="space-y-4 services-list-mobile">
              {services.map((service) => (
                <MobileServiceCard key={service.title} service={service} />
              ))}
            </MobileStaggerList>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;