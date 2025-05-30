import { motion } from "framer-motion";
import {
  CpuChipIcon,
  SparklesIcon,
  ChevronRightIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  HeartIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const openPositions = [
  {
    title: "AI Research Scientist",
    department: "Research & Development",
    type: "Full-time",
    location: "Remote",
    description: "Lead our efforts in advancing emotional intelligence models and natural language understanding."
  },
  {
    title: "Frontend Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    description: "Build beautiful, responsive interfaces for our emotional AI platform using React and modern web technologies."
  },
  {
    title: "UX Researcher",
    department: "Design",
    type: "Full-time",
    location: "Remote",
    description: "Study human-AI interaction patterns to improve emotional connection in our products."
  },
  {
    title: "DevOps Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote",
    description: "Maintain and scale our infrastructure to support millions of emotional interactions daily."
  }
];

const benefits = [
  {
    title: "Competitive Compensation",
    icon: BriefcaseIcon,
    description: "Salary, equity, and bonuses that match your skills and contributions."
  },
  {
    title: "Flexible Work",
    icon: BuildingOfficeIcon,
    description: "Work remotely from anywhere or from our offices in major tech hubs."
  },
  {
    title: "Career Growth",
    icon: ChartBarIcon,
    description: "Continuous learning opportunities and clear paths for advancement."
  },
  {
    title: "Health & Wellness",
    icon: HeartIcon,
    description: "Comprehensive medical, dental, and vision coverage for you and your family."
  },
  {
    title: "Work-Life Balance",
    icon: ArrowPathIcon,
    description: "Unlimited PTO and flexible schedules to maintain your well-being."
  }
];

export default function Careers() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800/80 backdrop-blur-lg shadow-xl sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="shbox rounded-full p-2 bg-gradient-to-br from-yellow-400 to-amber-600">
                <CpuChipIcon className="h-8 w-8 text-gray-900" />
              </div>
              <Link to="/" className="ml-3 text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">
                EmoAI ChatBot
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/features" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Features
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">
                About
              </Link>
              <Link to="/careers" className="text-yellow-400 font-medium">
                Careers
              </Link>
              <Link
                to="/authprompt"
                className="bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-amber-500 hover:to-yellow-500 text-gray-900 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hidden md:flex items-center gap-2"
              >
                Get Started
                <SparklesIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent mb-6"
          >
            Build the Future of Emotional AI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Join our mission to create technology that understands, connects, and enhances human emotional well-being.
          </motion.p>
        </section>

        {/* Why Join Us */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-8">Why Join EmoAI?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Our Culture</h3>
              <p className="text-gray-300 mb-6">
                At EmoAI, we believe that emotional intelligence should be at the core of both our products and our workplace. We foster an environment of empathy, creativity, and intellectual curiosity.
              </p>
              <p className="text-gray-300">
                Our team is composed of passionate individuals from diverse backgrounds - engineers, psychologists, designers, and researchers - all united by the goal of humanizing technology.
              </p>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Our Impact</h3>
              <p className="text-gray-300 mb-6">
                The work we do directly improves people's lives. From helping users manage stress to providing emotional support, our technology makes a real difference every day.
              </p>
              <p className="text-gray-300">
                As we scale, you'll have the opportunity to shape how millions of people interact with AI and experience emotional connection through technology.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Benefits */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-8">Perks & Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 p-6 rounded-xl border border-gray-700"
                >
                  <div className="flex items-center mb-4">
                    <div className="shbox rounded-full p-2 bg-gradient-to-br from-yellow-400 to-amber-600 mr-4">
                      <Icon className="h-6 w-6 text-gray-900" />
                    </div>
                    <h3 className="text-xl font-semibold text-yellow-400">{benefit.title}</h3>
                  </div>
                  <p className="text-gray-300">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Open Positions */}
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-8">Open Positions</h2>
          
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold text-yellow-400">{position.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="text-sm text-gray-300 bg-gray-700 px-3 py-1 rounded-full">{position.department}</span>
                      <span className="text-sm text-gray-300 bg-gray-700 px-3 py-1 rounded-full">{position.type}</span>
                      <span className="text-sm text-gray-300 bg-gray-700 px-3 py-1 rounded-full">{position.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-300 mr-6 max-w-md">{position.description}</p>
                    <button className="bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-amber-500 hover:to-yellow-500 text-gray-900 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                      Apply Now
                      <ChevronRightIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-800 to-gray-700 p-10 rounded-3xl border border-gray-600 text-center"
        >
          <h3 className="text-3xl font-bold text-yellow-400 mb-6">Don't See Your Dream Role?</h3>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            We're always looking for talented individuals who share our passion for emotional AI.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="inline-block bg-gradient-to-r from-yellow-400 to-amber-600 hover:shadow-2xl hover:shadow-yellow-400/30 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300">
              Contact Us
              <ChevronRightIcon className="h-5 w-5 inline-block ml-2" />
            </button>
            <Link
              to="/about"
              className="inline-block border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              Learn About Us
              <ChevronRightIcon className="h-5 w-5 inline-block ml-2" />
            </Link>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <CpuChipIcon className="h-8 w-8 text-yellow-400" />
              <span className="ml-2 text-xl text-yellow-400">
                EmoAI ChatBot
              </span>
            </div>
            <div className="flex space-x-6">
              <Link to="/features" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Features
              </Link>
              <Link to="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">
                About
              </Link>
              <Link to="/careers" className="text-gray-400 hover:text-yellow-400 transition-colors">
                Careers
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-400">
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
        </div>
      </footer>
    </div>
  );
}