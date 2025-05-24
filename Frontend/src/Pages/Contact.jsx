import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header - Same as landing page */}
      <header className="bg-gray-800/80 backdrop-blur-lg shadow-xl sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center"
            >
              <div className="shbox rounded-full p-2 bg-gradient-to-br from-yellow-400 to-amber-600">
                <CpuChipIcon className="h-8 w-8 text-gray-900" />
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">
                EmoAI ChatBot
              </span>
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-6"
            >
              <Link
                to="/features"
                className="text-gray-300 hover:text-yellow-400 transition-colors hidden md:block"
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="text-gray-300 hover:text-yellow-400 transition-colors hidden md:block"
              >
                Pricing
              </Link>
              <Link
                to="/about"
                className="text-gray-300 hover:text-yellow-400 transition-colors hidden md:block"
              >
                About
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-amber-500 hover:to-yellow-500 text-gray-900 md:px-6 md:py-2 px-4 py-1 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                Get Started
                <SparklesIcon className="h-4 w-4 " />
              </Link>
            </motion.div>
          </div>
        </nav>
      </header>

      {/* Contact Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-800 to-gray-900 py-20 overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent mb-6 leading-tight">
              Let's Connect
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We'd love to hear from you! Reach out to our team for any
              questions, feedback, or partnership opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-700/50 p-8 rounded-2xl border border-gray-600 backdrop-blur-sm"
            >
              <h2 className="text-3xl font-bold text-yellow-400 mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-gray-600/50 border border-gray-500">
                    <EnvelopeIcon className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-1">
                      Email Us
                    </h3>
                    <p className="text-gray-300">support@emoai.in</p>
                    <p className="text-gray-300">business@emoai.in</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-gray-600/50 border border-gray-500">
                    <PhoneIcon className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-1">
                      Call Us
                    </h3>
                    <p className="text-gray-300">+91 98765 43210</p>
                    <p className="text-gray-300">Mon-Fri, 10am-7pm IST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-gray-600/50 border border-gray-500">
                    <MapPinIcon className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-1">
                      Visit Us
                    </h3>
                    <p className="text-gray-300">202, Tech Park Road</p>
                    <p className="text-gray-300">Tallital , Nainital 263002</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-gray-600/50 border border-gray-500">
                    <ClockIcon className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-400 mb-1">
                      Support Hours
                    </h3>
                    <p className="text-gray-300">24/7 Chat Support</p>
                    <p className="text-gray-300">
                      Phone: Mon-Fri, 10am-7pm IST
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-600">
                <h3 className="text-lg font-semibold text-yellow-400 mb-4">
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="p-2 rounded-full bg-gray-600 hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                  >
                    <TwitterIcon className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="p-2 rounded-full bg-gray-600 hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                  >
                    <LinkedInIcon className="h-5 w-5" />
                  </a>
                  <a
                    href="https://github.com/201Harsh"
                    className="p-2 rounded-full bg-gray-600 hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                  >
                    <GitHubIcon className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/201harshs/"
                    className="p-2 rounded-full bg-gray-600 hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-700/50 p-8 rounded-2xl border border-gray-600 backdrop-blur-sm"
            >
              <h2 className="text-3xl font-bold text-yellow-400 mb-6">
                Send Us a Message
              </h2>

              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-200"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-200"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-300 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-200"
                  >
                    <option value="">Select a subject</option>
                    <option value="support">Technical Support</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows="5"
                    className="w-full px-4 py-3 bg-gray-600 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-gray-200"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>

                <div className="flex items-center">
                  <input
                    id="consent"
                    type="checkbox"
                    className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-500 rounded bg-gray-600"
                  />
                  <label htmlFor="consent" className="ml-2 text-gray-300">
                    I agree to the privacy policy and terms of service
                  </label>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-amber-500 hover:to-yellow-500 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Send Message
                  <ChatBubbleLeftRightIcon className="h-5 w-5 inline-block ml-2" />
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-yellow-400 mb-6">
            Common Questions
          </h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-10">
            Check our FAQ section for quick answers to common inquiries.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                question: "How do I get started with EmoAI?",
                icon: "🚀",
              },
              {
                question: "What payment methods do you accept?",
                icon: "💳",
              },
              {
                question: "Can I cancel my subscription anytime?",
                icon: "🔄",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 text-center cursor-pointer hover:border-yellow-400 transition-colors"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-lg font-semibold text-yellow-400">
                  {item.question}
                </h4>
              </motion.div>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="mt-10 inline-block"
          >
            <Link
              to="/faq"
              className="border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 px-6 py-3 rounded-full font-semibold transition-all duration-300 inline-flex items-center"
            >
              View Full FAQ
              <ChevronRightIcon className="h-5 w-5 ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer - Same as landing page */}
      <footer className="bg-gray-900 border-t border-gray-700">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center mb-4">
                <CpuChipIcon className="h-8 w-8 text-yellow-400" />
                <span className="ml-2 text-xl text-yellow-400">
                  EmoAI ChatBot
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                The world's most emotionally intelligent AI companion.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <TwitterIcon className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <LinkedInIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/201Harsh"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <GitHubIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/201harshs/"
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <InstagramIcon className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h5 className="text-lg font-semibold text-yellow-400 mb-4">
                Product
              </h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Demo
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Roadmap
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Changelog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-semibold text-yellow-400 mb-4">
                Resources
              </h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    API Reference
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Support
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-semibold text-yellow-400 mb-4">
                Company
              </h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              <p>
                Made with ❤️ by{" "}
                <a
                  href="https://www.instagram.com/201harshs/"
                  className="text-yellow-400 font-semibold"
                >
                  Harsh
                </a>{" "}
                - © {new Date().getFullYear()}
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Reuse the same icon components from your landing page
function CpuChipIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
      />
    </svg>
  );
}

function SparklesIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  );
}

function ChevronRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

// Reuse the social media icons from your landing page
function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function GitHubIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}