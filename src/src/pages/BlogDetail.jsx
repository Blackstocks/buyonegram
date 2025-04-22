import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Maximize, Minimize } from 'lucide-react';
import { blogPosts } from '../data/blogData'; // Import from data file

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Find the blog post by id. In a real app, you'd fetch this data.
    const postId = parseInt(id, 10);
    const foundPost = blogPosts.find(p => p.id === postId);
    setPost(foundPost);

    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    // Add potential setup for animations (e.g., Framer Motion, GSAP) here if needed
  }, [id]);

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    const iframe = document.querySelector('iframe');
    if (iframe) {
      if (!isFullscreen) {
        if (iframe.requestFullscreen) {
          iframe.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    }
  };

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Back Button */}
       <Link
         to="/blog" // Assuming '/blog' is the path for the main blog listing
         className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors duration-200 text-gray-700 hover:text-black group"
       >
         <ArrowLeft className="w-5 h-5 mr-2 text-gray-600 group-hover:text-black transition-colors" />
         Back to Blog
       </Link>

      {/* Cinematic Hero Banner with Video */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] bg-gradient-to-b from-gray-900 to-gray-700 overflow-hidden">
        {/* Fixed iframe with proper YouTube parameters */}
        <iframe
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
          src={post.videoUrl}
          title={post.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
        {/* Add subtle gradient overlay with pointer-events-none to allow clicks to pass through */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none"></div>
        
        {/* Fullscreen toggle button */}
        <button 
          onClick={handleFullscreen} 
          className="absolute bottom-4 right-4 z-20 bg-black/30 text-white p-2 rounded hover:bg-black/50 transition-colors"
        >
          {isFullscreen ? <Minimize size={20}/> : <Maximize size={20}/>}
        </button>
      </div>

      {/* Main Content Area - Flowing Narrative Layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <article className="bg-white shadow-xl rounded-lg p-6 sm:p-10 -mt-24 sm:-mt-32 relative z-10">
          {/* Post Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-8 border-b pb-4">
            <span>{post.date}</span>
            <span>&bull;</span>
            <span>{post.readTime}</span>
          </div>

          {/* Full Description - Add typography styles */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {/* Render description - ideally process markdown if content is complex */}
            <p>{post.description}</p>
            {/* Add more paragraphs, headings, lists based on actual content structure */}
          </div>

          {/* Author's Advice Section */}
          <aside className="mt-12 sm:mt-16 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-l-4 border-green-500 relative">
             <span className="absolute -top-5 -left-4 text-6xl text-green-200 font-serif opacity-50 select-none">&ldquo;</span>
            <p className="text-lg sm:text-xl italic text-gray-800 mb-4">
              {post.authorAdvice}
            </p>
            <p className="text-sm text-gray-600 font-medium">&mdash; Author&apos;s Takeaway</p>
             <span className="absolute -bottom-5 -right-4 text-6xl text-blue-200 font-serif opacity-50 select-none">&rdquo;</span>
          </aside>
        </article>
      </div>

      {/* Consider adding Parallax background elements or further animations here */}
    </div>
  );
}

export default BlogDetail; 