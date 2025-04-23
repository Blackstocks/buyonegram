import { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaMapMarkerAlt, FaTimes, FaYoutube, FaGlobe } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <footer className="pt-16 pb-8 text-white bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">BuyOneGram</h3>
            <p className="leading-relaxed text-gray-300">
              Connecting farmers and buyers worldwide through our innovative B2B marketplace.
            </p>
            <div className="flex pt-2 space-x-4">
              <a href="https://www.facebook.com/buyonegram/" className="text-gray-400 transition-all duration-300 hover:text-white hover:scale-110">
                <FaFacebook size={24} />
              </a>
              <a href="https://x.com/buyonegram/" className="text-gray-400 transition-all duration-300 hover:text-white hover:scale-110">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.linkedin.com/company/buy-one-gram-private-limited/" className="text-gray-400 transition-all duration-300 hover:text-white hover:scale-110">
                <FaLinkedin size={24} />
              </a>
              <a href="https://www.instagram.com/buyonegram/" className="text-gray-400 transition-all duration-300 hover:text-white hover:scale-110">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.youtube.com/@buyonegram" className="text-gray-400 transition-all duration-300 hover:text-white hover:scale-110">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="pb-2 text-xl font-semibold text-white border-b border-gray-700">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="inline-block text-gray-300 transition-all duration-300 hover:text-white hover:translate-x-1">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="inline-block text-gray-300 transition-all duration-300 hover:text-white hover:translate-x-1">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="inline-block text-gray-300 transition-all duration-300 hover:text-white hover:translate-x-1">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="inline-block text-gray-300 transition-all duration-300 hover:text-white hover:translate-x-1">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="pb-2 text-xl font-semibold text-white border-b border-gray-700">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="inline-block text-gray-300 transition-all duration-300 hover:text-white hover:translate-x-1">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="inline-block text-gray-300 transition-all duration-300 hover:text-white hover:translate-x-1">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="inline-block text-gray-300 transition-all duration-300 hover:text-white hover:translate-x-1">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="inline-block text-gray-300 transition-all duration-300 hover:text-white hover:translate-x-1">
                  Shipping Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Subdomains */}
          <div className="space-y-4">
            <h3 className="pb-2 text-xl font-semibold text-white border-b border-gray-700">Subdomains</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://visit.buyonegram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-2 text-gray-300 transition-all duration-300 group hover:text-white"
                >
                  <FaGlobe className="text-gray-400 group-hover:text-primary-500" />
                  <span className="border-b border-transparent group-hover:border-white">
                    visit.buyonegram.com
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="https://spinwheel.buyonegram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-2 text-gray-300 transition-all duration-300 group hover:text-white"
                >
                  <FaGlobe className="text-gray-400 group-hover:text-primary-500" />
                  <span className="border-b border-transparent group-hover:border-white">
                    spinwheel.buyonegram.com
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="https://thanks.buyonegram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-2 text-gray-300 transition-all duration-300 group hover:text-white"
                >
                  <FaGlobe className="text-gray-400 group-hover:text-primary-500" />
                  <span className="border-b border-transparent group-hover:border-white">
                    thanks.buyonegram.com
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <h3 className="pb-2 text-xl font-semibold text-white border-b border-gray-700">Our Location</h3>
            <button
              onClick={() => setIsMapOpen(true)}
              className="flex items-center space-x-2 text-gray-300 transition-all duration-300 hover:text-white group"
            >
              <FaMapMarkerAlt className="text-2xl transition-transform duration-300 text-primary-500 group-hover:scale-110" />
              <span className="border-b border-transparent group-hover:border-white">View on Map</span>
            </button>
            <p className="leading-relaxed text-gray-300">
              G-222, RIICO, sitapura industrial area, tonk road Jaipur, rajasthan 302019
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 text-center border-t border-gray-700">
          <p className="text-sm text-gray-400">&copy; 2020 BuyOneGram. All rights reserved.</p>
        </div>
      </div>

      {/* Map Modal */}
      <AnimatePresence>
        {isMapOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex fixed inset-0 z-50 justify-center items-center p-4 bg-black/70"
            onClick={() => setIsMapOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="overflow-hidden relative w-full max-w-4xl bg-white rounded-xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsMapOpen(false)}
                className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>

              {/* Map */}
              <div className="w-full aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14231.377084642247!2d75.814986!3d26.908437!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db7014dfc1693%3A0x53d6751a2228cb7d!2sRajasthan%20Centre%20of%20Advanced%20Technology%20(R-CAT)!5e0!3m2!1sen!2sin!4v1743696428677!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;