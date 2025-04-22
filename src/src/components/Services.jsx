import { motion } from 'framer-motion';
import { FaHandshake, FaLeaf, FaCheckCircle, FaChartLine, FaTruck, FaUserShield, FaUsers, FaBox, FaIndustry, FaGlobe, FaWarehouse, FaSearch, FaChartBar } from 'react-icons/fa';

const services = [
  {
    icon: <FaHandshake className="text-3xl" />,
    title: "Sell Directly, Earn More",
    description: "Bypass middlemen and sell directly to buyers for better prices, higher profits, and long-term business relationships.",
    cta: "Learn More",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: <FaLeaf className="text-3xl" />,
    title: "From Farm to Market, Perfected",
    description: "Get professional post-harvest services like cleaning, grading, milling, de-husking, and packaging to enhance product value.",
    cta: "View Services",
    color: "from-green-500 to-green-600"
  },
  {
    icon: <FaCheckCircle className="text-3xl" />,
    title: "Certified for Excellence",
    description: "Every batch undergoes multi-stage quality checks, lab testing, and certification to ensure premium quality and safety.",
    cta: "Our Standards",
    color: "from-yellow-500 to-yellow-600"
  },
  {
    icon: <FaChartLine className="text-3xl" />,
    title: "Real-Time Market Insights",
    description: "Stay ahead with accurate, live market prices and analytics tools to make informed selling decisions.",
    cta: "Track Prices",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: <FaTruck className="text-3xl" />,
    title: "Fast & Reliable Logistics",
    description: "Seamless transportation from farms to buyers with optimized routes and strategic logistics partnerships.",
    cta: "Explore Logistics",
    color: "from-red-500 to-red-600"
  },
  {
    icon: <FaUserShield className="text-3xl" />,
    title: "Built on Trust & Fairness",
    description: "Secure transactions, verified profiles, transparent deals, and dispute resolution for seamless trading.",
    cta: "How It Works",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    icon: <FaUsers className="text-3xl" />,
    title: "Empowering Farmers, Changing Lives",
    description: "Training, financial support, and access to affordable inputs to enhance farming practices and income.",
    cta: "Support Programs",
    color: "from-pink-500 to-pink-600"
  },
  {
    icon: <FaBox className="text-3xl" />,
    title: "Smart & Sustainable Packaging",
    description: "Choose from eco-friendly and customized packaging solutions that protect product freshness and quality.",
    cta: "Explore Packaging",
    color: "from-teal-500 to-teal-600"
  },
  {
    icon: <FaIndustry className="text-3xl" />,
    title: "Boost Value, Maximize Profits",
    description: "Increase returns with services like juicing, drying, grinding, and packaging of premium agricultural products.",
    cta: "See Processing",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: <FaGlobe className="text-3xl" />,
    title: "Connect with Buyers Worldwide",
    description: "Expand your market reach with access to local and global buyers for higher sales and demand.",
    cta: "Expand Markets",
    color: "from-cyan-500 to-cyan-600"
  },
  {
    icon: <FaWarehouse className="text-3xl" />,
    title: "Safe & Modern Storage",
    description: "Temperature-controlled and bulk storage options to maintain freshness and reduce waste.",
    cta: "View Storage",
    color: "from-emerald-500 to-emerald-600"
  },
  {
    icon: <FaSearch className="text-3xl" />,
    title: "Know Your Product's Journey",
    description: "Ensure transparency with batch tracking, certifications, and detailed product descriptions for buyers.",
    cta: "See Details",
    color: "from-violet-500 to-violet-600"
  },
  {
    icon: <FaChartBar className="text-3xl" />,
    title: "Smart Data for Smarter Decisions",
    description: "Get expert insights, market analysis, and crop forecasts to optimize your business strategy.",
    cta: "Get Insights",
    color: "from-rose-500 to-rose-600"
  }
];

const ServiceCard = ({ service, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Gradient Background on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      <div className="relative p-8 h-full flex flex-col">
        {/* Icon */}
        <div className="mb-6 text-primary-600 group-hover:text-white transition-colors duration-300">
          {service.icon}
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-white transition-colors duration-300">
            {service.title}
          </h3>
          <p className="text-gray-600 mb-6 group-hover:text-white/90 transition-colors duration-300">
            {service.description}
          </p>
        </div>

        {/* CTA Button */}
        <button className="inline-flex items-center text-primary-600 font-semibold group-hover:text-white transition-colors duration-300">
          {service.cta}
          <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-gray-600">
            Comprehensive solutions to support your agricultural business at every step
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;