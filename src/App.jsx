import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/home components/Hero';
import ProductShowcase from './components/home components/ProductShowcase';
import Features from './components/home components/Features';
import Mission from './components/home components/Mission';
import Chatbot from './components/Chatbot';
import TrustIndicators from './components/home components/TrustIndicators';
import Contact from './components/home components/Contact';
import Footer from './components/Footer';
import ProductsPage from './pages/ProductsPage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import HowWeWork from './components/home components/HowWeWork';
import JobsPage from './pages/JobsPage';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './mobileStyles.css';

// Mobile responsive wrapper component
const MobileResponsiveWrapper = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Function to check if the screen is mobile-sized
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up the event listener when component unmounts
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add a mobile class to the body for global mobile styles
  useEffect(() => {
    if (isMobile) {
      document.body.classList.add('mobile-view');
    } else {
      document.body.classList.remove('mobile-view');
    }
  }, [isMobile]);

  // Apply the mobile-specific CSS
  const mobileStyles = `
    .mobile-view main {
      overflow-x: hidden;
    }
    
    @media (max-width: 767px) {
      .container {
        padding-left: 16px;
        padding-right: 16px;
      }
      
      h1, h2, h3 {
        word-break: break-word;
      }
      
      .home-section {
        padding-top: 3rem;
        padding-bottom: 3rem;
      }
      
      .mobile-scroll-snap {
        scroll-snap-type: y mandatory;
      }
      
      .mobile-scroll-snap > section {
        scroll-snap-align: start;
      }
      
      /* Improve touch interactions */
      button, a {
        min-height: 44px;
        min-width: 44px;
      }
    }
  `;

  return (
    <>
      {isMobile && (
        <style>{mobileStyles}</style>
      )}
      {children}
    </>
  );
};

MobileResponsiveWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

function App() {
  return (
    
      <MobileResponsiveWrapper>
        <Router>
          <div className="min-h-screen bg-white">
            <Header />
            <Routes>
              <Route path="/" element={
                <main className="w-full overflow-hidden">
                  <Hero />
                  <ProductShowcase />
                  <HowWeWork />
                  <Features />
                  <Mission />
                  <TrustIndicators />
                  <Contact />
                </main>
              } />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
            </Routes>
            <Chatbot />
            <Footer />
          </div>
        </Router>
      </MobileResponsiveWrapper>
    
  );
}

export default App;