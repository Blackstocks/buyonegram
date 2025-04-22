import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { blogPosts, blogShortPosts } from '../data/blogData';
import { useEffect, useRef, useState } from 'react';

function Blogs() {
  const sliderRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const totalPosts = blogShortPosts.length;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((current) => (current + 1) % totalPosts);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [totalPosts]);
  
  const handlePrevious = () => {
    setStartIndex((current) => (current - 1 + totalPosts) % totalPosts);
  };
  
  const handleNext = () => {
    setStartIndex((current) => (current + 1) % totalPosts);
  };
  
  // Function to get visible posts (3 at a time)
  const getVisiblePosts = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (startIndex + i) % totalPosts;
      result.push({
        ...blogShortPosts[index],
        key: `post-${startIndex}-${i}`
      });
    }
    return result;
  };
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#2B5F1E] to-[#1a4011] py-16 sm:py-24 relative overflow-hidden">
        {/* Organic pattern overlay */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnptMC0yYzguODM3IDAgMTYgNy4xNjMgMTYgMTZzLTcuMTYzIDE2LTE2IDE2LTE2LTcuMTYzLTE2LTE2IDcuMTYzLTE2IDE2LTE2eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMSIvPjwvZz48L3N2Zz4=')]"></div>
        
        <div className="relative max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-6xl">
              Agricultural Insights & Updates
            </h1>
            <p className="max-w-2xl mx-auto text-lg font-light md:text-xl text-white/90">
              Stay informed with the latest developments in agriculture and grain trading
            </p>
          </div>
        </div>
      </div>

      {/* Featured Blog Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="relative inline-block text-3xl font-bold text-gray-900">
              Featured Articles
              <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-green-500 rounded-full"></span>
            </h2>
            <div className="flex space-x-2">
              <button 
                onClick={handlePrevious}
                className="p-2 text-green-700 transition-colors duration-200 rounded-full bg-green-50 hover:bg-green-100"
                aria-label="Previous articles"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={handleNext}
                className="p-2 text-green-700 transition-colors duration-200 rounded-full bg-green-50 hover:bg-green-100"
                aria-label="Next articles"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <div 
            ref={sliderRef}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {getVisiblePosts().map((post, index) => (
              <Link
                to={post.viewPostLink}
                key={post.key}
                className="group"
              >
                <div 
                  className="flex flex-col h-full overflow-hidden transition-all duration-300 bg-white shadow-sm rounded-xl hover:shadow-xl"
                  style={{
                    animation: `fadeIn 0.6s ease-out forwards ${index * 0.15}s`,
                    opacity: 0
                  }}
                >
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  
                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center mb-3 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5 mr-1 text-green-600" />
                      <span>{post.date}</span>
                    </div>
                    
                    <h3 className="mb-3 text-xl font-bold text-gray-800 transition-colors duration-200 group-hover:text-green-700">
                      {post.title}
                    </h3>
                    
                    <p className="flex-1 mb-4 text-sm text-gray-600 line-clamp-3">
                      {post.shortDescription}
                    </p>
                    
                    <div className="inline-flex items-center mt-auto text-sm font-medium text-green-600 group">
                      <span className="mr-2">Read Full Article</span>
                      <span className="transition-transform duration-300 transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Post navigation indicators */}
          <div className="flex justify-center mt-10 space-x-2">
            {blogShortPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setStartIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index >= startIndex && index < startIndex + 3 || 
                  (startIndex + 3 > totalPosts && index < (startIndex + 3) % totalPosts) 
                    ? 'w-8 bg-green-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Blog Posts Section */}
      <div className="py-16 bg-gray-50">
  <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
    <h2 className="relative inline-block mb-12 text-3xl font-bold text-gray-900">
      Latest Articles
      <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-green-500 rounded-full"></span>
    </h2>

    <div className="space-y-12">
      {blogPosts.map((post, index) => (
        <div
          key={post.id}
          className="overflow-hidden transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-xl"
        >
          <div
            className={`md:flex ${
              index % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            <div className="md:flex-shrink-0 md:w-2/5">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="object-cover w-full h-full md:h-full md:w-full"
              />
            </div>

            <div className="flex flex-col justify-between p-6 md:p-8">
              <div>
                <div className="flex items-center mb-4 space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5 text-green-600" />
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5 text-green-600" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="mb-4 text-2xl font-bold leading-tight text-gray-900">
                  {post.title}
                </h3>

                <p className="mb-6 text-gray-600 line-clamp-3">
                  {post.shortDescription}
                </p>
              </div>

              <Link
                to={`/blog/${post.id}`}
                className="inline-flex items-center font-medium text-green-600 transition-colors duration-200 hover:text-green-700 group"
              >
                <span className="mr-2">Read Full Article</span>
                <span className="transition-transform duration-300 transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>


      {/* Add animation styles */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
}

export default Blogs;