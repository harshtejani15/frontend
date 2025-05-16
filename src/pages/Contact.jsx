import React, { useState } from 'react';

const containerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, delayChildren: 0.3, staggerChildren: 0.2 } },
};

const itemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1, transition: { duration: 0.3 } },
};

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [submissionError, setSubmissionError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionMessage('');
    setSubmissionError(false);

    // Simulate an API call with a promise
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmissionMessage('Message sent! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmissionMessage('Failed to send message. Please try again.');
      setSubmissionError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-gradient-to-br from-gray-900 to-gray-800 animate-fade-in duration-500">
      <div className="container mx-auto px-4">
        <h1 className="motion-reduce:animate-none text-4xl font-bold text-center mb-8 text-white animate-slide-in-down duration-500 delay-100">
          Contact Us
        </h1>
        <form
          onSubmit={handleSubmit}
          className="motion-reduce:animate-none max-w-lg mx-auto bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/10 animate-slide-in-bottom duration-500 delay-200"
        >
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/20 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/20 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-black/20 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 min-h-[120px] resize-y"
              placeholder="Your Message"
              rows={5}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className={`w-full p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed animate-pulse' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submissionMessage && (
            <div className={`mt-4 p-3 rounded-md text-white ${submissionError ? 'bg-red-500' : 'bg-green-500'}`}>
              {submissionMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Contact;