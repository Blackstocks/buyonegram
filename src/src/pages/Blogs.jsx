import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock } from 'lucide-react';
import { blogPosts, blogShortPosts } from '../data/blogData'; // Import blogShortPosts
import { useEffect, useRef, useState } from 'react'; // Added useState

function Blogs() {
  const sliderRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const totalPosts = blogShortPosts.length;
  
  useEffect(() => {
    // Automatically transition to next post every 3 seconds
    const interval = setInterval(() => {
      setStartIndex((current) => (current + 1) % totalPosts);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [totalPosts]);
  
  // Function to get visible posts (3 at a time)
  const getVisiblePosts = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (startIndex + i) % totalPosts;
      result.push({
        ...blogShortPosts[index],
        key: `post-${startIndex}-${i}`  // Add unique key for animation
      });
    }
    return result;
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add animation styles */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateX(30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          .animate-fadeIn {
            animation: fadeIn 0.7s ease-out forwards;
          }
        `}
      </style>
      
      {/* Hero Section with Animated Background */}
      <div className="bg-gradient-to-br from-[#2B5F1E] to-[#1a4011] py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMC0yYzguODM3IDAgMTYgNy4xNjMgMTYgMTZzLTcuMTYzIDE2LTE2IDE2LTE2LTcuMTYzLTE2LTE2IDcuMTYzLTE2IDE2LTE2eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Agricultural Insights & Updates
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Stay informed with the latest developments in agriculture and grain trading
            </p>
          </div>
        </div>
      </div>

      {/* Blog Slider Section with One-by-One Animation */}
      <div className="relative py-12 bg-gradient-to-r from-green-50 to-emerald-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Latest Updates
          </h2>
          <div className="h-1 w-24 bg-green-500 mx-auto mt-2 rounded-full"></div>
        </div>
        
        {/* Add enhanced animation styles */}
        <style>
          {`
            /* Perspective container for 3D effects */
            .perspective-container {
              perspective: 2000px;
              perspective-origin: center;
            }
            
            /* Keyframes for the first card */
            @keyframes slideInRotate {
              0% {
                opacity: 0;
                transform: translateX(100px) rotateY(45deg) scale(0.8);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
              }
              100% {
                opacity: 1;
                transform: translateX(0) rotateY(0) scale(1);
                box-shadow: 0 20px 25px rgba(0, 0, 0, 0.2);
              }
            }
            
            /* Keyframes for the middle card */
            @keyframes popUp {
              0% {
                opacity: 0;
                transform: translateY(60px) scale(0.85);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
              }
              50% {
                transform: translateY(-10px) scale(1.02);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
                box-shadow: 0 20px 25px rgba(0, 0, 0, 0.2);
              }
            }
            
            /* Keyframes for the third card */
            @keyframes fadeInFlip {
              0% {
                opacity: 0;
                transform: translateX(-100px) rotateY(-45deg) scale(0.8);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
              }
              100% {
                opacity: 1;
                transform: translateX(0) rotateY(0) scale(1);
                box-shadow: 0 20px 25px rgba(0, 0, 0, 0.2);
              }
            }
            
            /* Glowing border animation */
            @keyframes glowingBorder {
              0% {
                box-shadow: 0 0 5px rgba(43, 95, 30, 0.3), 0 0 10px rgba(43, 95, 30, 0.2), 0 0 15px rgba(43, 95, 30, 0.1);
              }
              50% {
                box-shadow: 0 0 10px rgba(43, 95, 30, 0.5), 0 0 20px rgba(43, 95, 30, 0.3), 0 0 30px rgba(43, 95, 30, 0.2);
              }
              100% {
                box-shadow: 0 0 5px rgba(43, 95, 30, 0.3), 0 0 10px rgba(43, 95, 30, 0.2), 0 0 15px rgba(43, 95, 30, 0.1);
              }
            }
            
            /* Individual animation classes */
            .animate-card-1 {
              animation: slideInRotate 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
              animation-delay: 0.1s;
            }
            
            .animate-card-2 {
              animation: popUp 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
              animation-delay: 0.3s;
            }
            
            .animate-card-3 {
              animation: fadeInFlip 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
              animation-delay: 0.5s;
            }
            
            .hover-glow:hover {
              animation: glowingBorder 2s infinite;
              transform: translateY(-10px) scale(1.02);
              transition: transform 0.3s ease;
            }
            
            /* Image zoom effect */
            .img-container {
              overflow: hidden;
            }
            
            .img-zoom {
              transition: transform 0.5s ease;
            }
            
            .img-zoom:hover {
              transform: scale(1.15);
            }
            
            /* Active indicator animation */
            @keyframes pulseIndicator {
              0% {
                transform: scale(1);
                background-color: #22c55e;
              }
              50% {
                transform: scale(1.2);
                background-color: #16a34a;
              }
              100% {
                transform: scale(1);
                background-color: #22c55e;
              }
            }
            
            .active-indicator {
              animation: pulseIndicator 1.5s infinite;
            }
          `}
        </style>
        
        <div 
          ref={sliderRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 perspective-container"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisiblePosts().map((post, index) => (
              <div 
                key={post.key}
                className={`bg-white rounded-xl overflow-hidden transform transition-all duration-700 hover-glow animate-card-${index + 1} backdrop-blur-sm backdrop-filter bg-opacity-90 border border-white/20`}
                style={{opacity: 0}} // Initial state for animation
              >
                <div className="img-container h-52 overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover img-zoom"
                  />
                </div>
                <div className="p-6 relative">
                  {/* Decorative accent */}
                  <div className="absolute top-0 right-0 w-1/3 h-1 bg-gradient-to-r from-transparent to-green-500 rounded-full"></div>
                  
                  <div className="text-sm text-gray-500 mb-2 flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-green-600" />
                    {post.date}
                  </div>
                  <h3 className="font-bold text-xl mb-3 text-gray-800 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.shortDescription}</p>
                  <Link
                    to={post.viewPostLink}
                    className="inline-flex items-center text-green-600 hover:text-green-700 text-sm font-medium group"
                  >
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Post navigation indicators */}
        <div className="flex justify-center mt-8">
          {blogShortPosts.map((_, index) => (
            <button
              key={index}
              onClick={() => setStartIndex(index)}
              className={`h-2 w-2 rounded-full mx-1 transition-all duration-300 ${
                index >= startIndex && index < startIndex + 3 || 
                (startIndex + 3 > totalPosts && index < (startIndex + 3) % totalPosts) 
                  ? 'active-indicator w-4' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Blog Posts Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-8 sm:gap-12">
          {blogPosts.map((post, index) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <div className={`grid md:grid-cols-2 ${index % 2 === 0 ? '' : 'md:grid-flow-col-dense'}`}>
                <div className={`h-full ${index % 2 === 0 ? '' : 'md:order-2'}`}>
                  <div className="w-full h-full">
                    <img src={post.imageUrl} alt=""  className="w-full h-full min-h-[300px]"/>
                  </div>
                </div>
                <div className={`flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br from-white to-gray-50 ${index % 2 === 0 ? '' : 'md:order-1'}`}>
                  <div>
                    {/* Meta information */}
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                      {post.shortDescription}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors duration-200 text-base sm:text-lg font-medium group"
                    >
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 mr-2 transform group-hover:scale-110 transition-transform duration-200" />
                      Read More
                    </Link>
                    {/* Tags */}
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Blogs;