import { useState, useRef, useEffect } from 'react';
import { FaEnvelope, FaPhone, FaClock, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const formRef = useRef();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    // Initialize EmailJS
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key';
    emailjs.init(publicKey);
    
    // Check for mobile viewport
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    
    // EmailJS configuration
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
    
    emailjs.sendForm(serviceId, templateId, formRef.current)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        // Reset form
        setFormData({
          from_name: '',
          from_email: '',
          subject: '',
          message: ''
        });
        formRef.current.reset();
      })
      .catch((error) => {
        console.error('FAILED...', error);
        setStatus({ type: 'error', message: `Failed to send message: ${error.text}` });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Mobile-specific animation classes
  const mobileAnimation = isMobile ? 'transition-transform duration-300 hover:scale-102 active:scale-98' : '';
  const fadeInUpClass = isMobile ? 'animate-fadeInUp' : '';

  return (
    <section id="contact" className="py-10 md:py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <h2 className="mb-8 md:mb-12 text-2xl md:text-3xl font-bold text-center text-gray-800">
          Get in Touch
        </h2>

        <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <div className={`p-5 md:p-8 bg-white rounded-lg shadow-md ${fadeInUpClass}`} 
               style={isMobile ? {animationDelay: '0.1s'} : {}}>
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="mb-4 md:mb-6">
                <label className="block mb-2 text-gray-700" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-primary ${mobileAnimation}`}
                  required
                />
              </div>

              <div className="mb-4 md:mb-6">
                <label className="block mb-2 text-gray-700" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="from_email"
                  value={formData.from_email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-primary ${mobileAnimation}`}
                  required
                />
              </div>

              <div className="mb-4 md:mb-6">
                <label className="block mb-2 text-gray-700" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-primary ${mobileAnimation}`}
                  required
                />
              </div>

              <div className="mb-4 md:mb-6">
                <label className="block mb-2 text-gray-700" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={isMobile ? "3" : "4"}
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:border-primary ${mobileAnimation}`}
                  required
                ></textarea>
              </div>

              <input type="hidden" name="to_email" value="hanshulkumawat22@gmail.com" />

              {status && (
                <div className={`mb-4 p-3 rounded-lg ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full py-3 md:py-4 text-white font-semibold tracking-wide text-base transition-all duration-300 rounded-lg 
                bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary hover:via-primary hover:to-primary/90 bg-[#2e7d32]
                disabled:opacity-70 overflow-hidden ${isMobile ? 'active:transform active:translate-y-0.5' : ''}`}
              >
                <div className="absolute inset-0 w-full h-full transition-all duration-300 
                  bg-gradient-to-r from-transparent via-white/5 to-transparent 
                  group-hover:translate-x-full"></div>
                
                <div className="absolute inset-0 border border-white/10 rounded-lg"></div>
                
                <div className="relative flex items-center justify-center space-x-3">
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      SENDING...
                    </span>
                  ) : (
                    <>
                      <FaPaperPlane className="text-lg relative" />
                      <span className="relative">SEND MESSAGE</span>
                    </>
                  )}
                </div>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 md:space-y-8">
            <div className={`flex items-start space-x-4 p-3 md:p-0 rounded-lg ${isMobile ? 'bg-white/80 shadow-sm animate-fadeInRight' : ''}`}
                 style={isMobile ? {animationDelay: '0.2s'} : {}}>
              <FaMapMarkerAlt className={`mt-1 text-xl md:text-2xl text-primary ${isMobile ? 'animate-pulse' : ''}`} />
              <div>
                <h3 className="mb-1 md:mb-2 text-lg md:text-xl font-semibold text-gray-800">
                  Office Location
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Rajasthan Centre of Advanced Technology(R-CAT)<br />
                  Sitapura,Jaipur<br />
                  India,
                </p>
              </div>
            </div>

            <div className={`flex items-start space-x-4 p-3 md:p-0 rounded-lg ${isMobile ? 'bg-white/80 shadow-sm animate-fadeInRight' : ''}`}
                 style={isMobile ? {animationDelay: '0.3s'} : {}}>
              <FaEnvelope className={`mt-1 text-xl md:text-2xl text-primary ${isMobile ? 'animate-pulse' : ''}`} />
              <div>
                <h3 className="mb-1 md:mb-2 text-lg md:text-xl font-semibold text-gray-800">
                  Email Us
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  buy1gram@gmail.com<br />
                </p>
              </div>
            </div>

            <div className={`flex items-start space-x-4 p-3 md:p-0 rounded-lg ${isMobile ? 'bg-white/80 shadow-sm animate-fadeInRight' : ''}`}
                 style={isMobile ? {animationDelay: '0.4s'} : {}}>
              <FaPhone className={`mt-1 text-xl md:text-2xl text-primary ${isMobile ? 'animate-pulse' : ''}`} />
              <div>
                <h3 className="mb-1 md:mb-2 text-lg md:text-xl font-semibold text-gray-800">
                  Call Us
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  +91 8619641968<br />
                </p>
              </div>
            </div>

            <div className={`flex items-start space-x-4 p-3 md:p-0 rounded-lg ${isMobile ? 'bg-white/80 shadow-sm animate-fadeInRight' : ''}`}
                 style={isMobile ? {animationDelay: '0.5s'} : {}}>
              <FaClock className={`mt-1 text-xl md:text-2xl text-primary ${isMobile ? 'animate-pulse' : ''}`} />
              <div>
                <h3 className="mb-1 md:mb-2 text-lg md:text-xl font-semibold text-gray-800">
                  Business Hours
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 2:00 PM<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;