import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaBriefcase, FaMapMarkerAlt, FaClock, FaTimes } from 'react-icons/fa';

import emailjs from '@emailjs/browser';
import PropTypes from 'prop-types';

const jobListings = [
  {
    id: 1,
    title: 'Marketing Intern',
    department: 'Marketing',
    location: 'Jaipur',
    type: 'Internship',
    experience: '0-1 years',
    postedDate: '2024-03-20',
    duration: '3 Months',
    salary: '₹10,000-15,000/month',
  },
  {
    id: 2,
    title: 'Sales Intern',
    department: 'Sales',
    location: 'Jaipur',
    type: 'Internship',
    experience: '0-1 years',
    postedDate: '2024-03-20',
    duration: '6 Months',
    salary: '₹15,000-20,000/month',
  },
  {
    id: 3,
    title: 'HR Intern',
    department: 'Human Resources',
    location: 'Jaipur',
    type: 'Internship',
    experience: '0-1 years',
    postedDate: '2024-03-20',
    duration: '3 Months',
    salary: 'Up to ₹5,000/month',
  },
  {
    id: 4,
    title: 'IT/Software Intern',
    department: 'Engineering',
    location: 'Jaipur',
    type: 'Internship',
    experience: '0-1 years',
    postedDate: '2024-03-20',
    duration: '3-6 Months',
    salary: 'Up to ₹5,000/month',
  },
  {
    id: 5,
    title: 'Accountant',
    department: 'Finance',
    location: 'Jaipur',
    type: 'Full-time',
    experience: '0-2 years',
    postedDate: '2024-03-20',
    salary: 'Based on experience',
  },
  {
    id: 6,
    title: 'Inventory In-Charge',
    department: 'Operations',
    location: 'Jaipur',
    type: 'Full-time',
    experience: '1-2 years',
    postedDate: '2024-03-20',
    salary: 'Based on experience',
  }
];

const JobCard = ({ job, onApply }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
          <div className="space-y-2">
            <div className="flex items-center text-gray-600">
              <FaBriefcase className="mr-2" />
              {job.department} • {job.type}
            </div>
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="mr-2" />
              {job.location}
            </div>
            <div className="flex items-center text-gray-600">
              <FaClock className="mr-2" />
              {job.experience}
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-primary-600 font-semibold">{job.salary}</span>
          <p className="text-sm text-gray-500 mt-1">
            Posted: {new Date(job.postedDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <button className="text-primary-600 hover:text-primary-700 font-medium">
          View Details
        </button>
        <button 
          onClick={() => onApply(job)}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Apply Now
        </button>
      </div>
    </motion.div>
  );
};

// PropTypes validation
JobCard.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    department: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    experience: PropTypes.string.isRequired,
    postedDate: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    duration: PropTypes.string
  }).isRequired,
  onApply: PropTypes.func.isRequired
};

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    type: '',
    experience: '',
    location: '',
  });
 
  const formRef = useRef(null);
  
  // Application modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cvLink: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

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

  const handleApply = (job) => {
    setSelectedJob(job);
    setShowModal(true);
    // Reset form data and status
    setFormData({
      name: '',
      email: '',
      phone: '',
      cvLink: '',
      message: ''
    });
    setSubmitResult(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_JOB_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      setSubmitResult({
        success: true,
        message: 'Your application has been submitted successfully!'
      });
      
      // Reset form but keep modal open to show success message
      setFormData({
        name: '',
        email: '',
        phone: '',
        cvLink: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending application:', error);
      setSubmitResult({
        success: false,
        message: 'Failed to submit application. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const filterOptions = {
    department: ['All', 'Engineering', 'Marketing', 'Sales', 'Design'],
    type: ['All', 'Full-time', 'Part-time', 'Internship', 'Contract'],
    experience: ['All', '0-1 years', '1-3 years', '3-5 years', '5+ years'],
    location: ['All', 'Jaipur', 'Remote', 'Hybrid'],
  };

  const handleFilterChange = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const filteredJobs = jobListings.filter(job => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.department === '' || filters.department === 'All' || job.department === filters.department) &&
      (filters.type === '' || filters.type === 'All' || job.type === filters.type) &&
      (filters.experience === '' || filters.experience === 'All' || job.experience === filters.experience) &&
      (filters.location === '' || filters.location === 'All' || job.location.includes(filters.location))
    );
  });

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Team
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Build your career with AgroPulse and help transform agricultural commerce
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 rounded-xl text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            
            
          </div>
        </div>
      </section>

      

      {/* Filters and Listings */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <FaFilter className="text-primary-600 mr-2" />
                <h2 className="text-xl font-semibold">Filters</h2>
              </div>
              
              {Object.entries(filterOptions).map(([category, options]) => (
                <div key={category} className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-3 capitalize">
                    {category}
                  </h3>
                  <select
                    value={filters[category]}
                    onChange={(e) => handleFilterChange(category, e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {options.map(option => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Job Listings */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  {filteredJobs.length} Positions Available
                </h2>
                <select
                  className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  defaultValue="newest"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="salary-high">Highest Salary</option>
                  <option value="salary-low">Lowest Salary</option>
                </select>
              </div>

              <div className="space-y-6">
                {filteredJobs.map(job => (
                  <JobCard key={job.id} job={job} onApply={handleApply} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" onClick={handleCloseModal}>
              <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

            <div className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {submitResult ? 'Application Status' : `Apply for ${selectedJob?.title}`}
                    </h3>
                    <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                      <FaTimes />
                    </button>
                  </div>
                </div>
                
                {submitResult ? (
                  <div className={`mt-4 p-4 rounded ${submitResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    <p>{submitResult.message}</p>
                    {submitResult.success && (
                      <button 
                        onClick={handleCloseModal}
                        className="mt-4 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                      >
                        Close
                      </button>
                    )}
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="mt-4">
                    <input type="hidden" name="job_title" value={selectedJob?.title || ''} />
                    <input type="hidden" name="job_department" value={selectedJob?.department || ''} />
                    <input type="hidden" name="job_type" value={selectedJob?.type || ''} />
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input
                          type="text"
                          name="from_name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                          type="email"
                          name="from_email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          required
                          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">CV/Resume Link</label>
                        <input
                          type="url"
                          name="cv_link"
                          value={formData.cvLink}
                          onChange={(e) => setFormData({...formData, cvLink: e.target.value})}
                          placeholder="https://drive.google.com/your-cv-link"
                          required
                          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                        <p className="mt-1 text-xs text-gray-500">Please provide a link to your CV/resume (Google Drive, Dropbox, etc.)</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Additional Information</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          rows="3"
                          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        ></textarea>
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-3">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none disabled:opacity-70"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;