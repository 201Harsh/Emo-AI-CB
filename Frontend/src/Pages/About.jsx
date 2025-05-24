import { motion } from "framer-motion";
import {
  CpuChipIcon,
  UserGroupIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  GlobeAltIcon,
  SparklesIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Harsh",
    role: "Founder & CEO",
    image: "https://avatars.githubusercontent.com/u/160850571?v=4",
    bio: "AI enthusiast with 8 years of experience in emotional computing and natural language processing.",
  },
  {
    name: "Harsh",
    role: "Lead Psychologist",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    bio: "Clinical psychologist specializing in human-AI interaction and emotional intelligence modeling.",
  },
  {
    name: "Harsh",
    role: "CTO",
    image: "https://randomuser.me/api/portraits/men/27.jpg",
    bio: "Former Google engineer with expertise in large language models and machine learning infrastructure.",
  },
  {
    name: "Harsh",
    role: "UX Designer",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    bio: "Human-centered design specialist focused on creating intuitive emotional interfaces.",
  },
];

const milestones = [
  {
    year: "2021",
    title: "Concept Born",
    description:
      "Initial research into emotional AI began with academic partnerships.",
  },
  {
    year: "2022",
    title: "Beta Launch",
    description: "First prototype tested with 1,000 early adopters.",
  },
  {
    year: "2023",
    title: "Public Release",
    description: "Version 1.0 launched to overwhelming positive reception.",
  },
  {
    year: "2024",
    title: "Global Expansion",
    description: "Added multilingual support and launched in 12 new markets.",
  },
];

export default function About() {
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
              <Link
                to="/"
                className="ml-3 text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent"
              >
                EmoAI ChatBot
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <Link
                to="/features"
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                Features
              </Link>
              <Link to="/about" className="text-yellow-400 font-medium">
                About
              </Link>
              <Link
                to="/register"
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
            Humanizing Technology
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            We're on a mission to create AI that doesn't just respond, but truly
            understands and connects with people on an emotional level.
          </motion.p>
        </section>

        {/* Our Story */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="flex items-center mb-8">
            <LightBulbIcon className="h-10 w-10 text-yellow-400 mr-4" />
            <h2 className="text-3xl font-bold text-yellow-400">Our Story</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-300 mb-4">
                Founded in 2021, EmoAI began as a research project at the
                intersection of artificial intelligence and emotional
                psychology. Our team recognized that while AI was becoming
                increasingly capable, it lacked the emotional intelligence that
                makes human interactions meaningful.
              </p>
              <p className="text-gray-300 mb-4">
                We set out to change that by developing the world's first truly
                emotionally intelligent AI system - one that could understand
                context, recognize emotional states, and respond with genuine
                empathy.
              </p>
              <p className="text-gray-300">
                Today, EmoAI serves millions of users worldwide, helping them
                with everything from mental wellness to professional
                development, all through the power of emotionally aware
                conversation.
              </p>
            </div>
            <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-300 mb-6">
                To create AI companions that enhance human well-being through
                emotionally intelligent interactions.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <UserGroupIcon className="h-6 w-6 text-yellow-400 mt-1" />
                  <div>
                    <h4 className="text-lg text-yellow-400">Human-Centered</h4>
                    <p className="text-gray-300">
                      We prioritize real human needs over technological炫耀
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <ShieldCheckIcon className="h-6 w-6 text-yellow-400 mt-1" />
                  <div>
                    <h4 className="text-lg text-yellow-400">Ethical AI</h4>
                    <p className="text-gray-300">
                      Responsible development with strict ethical guidelines
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <GlobeAltIcon className="h-6 w-6 text-yellow-400 mt-1" />
                  <div>
                    <h4 className="text-lg text-yellow-400">Global Impact</h4>
                    <p className="text-gray-300">
                      Designed to serve diverse cultures and communities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Timeline */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-8">
            Our Journey
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 h-full w-0.5 bg-gradient-to-b from-yellow-400 to-amber-600 md:left-1/2 md:-ml-0.5"></div>

            {/* Milestones */}
            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative mb-12 ${
                  index % 2 === 0 ? "md:text-left" : "md:text-right"
                }`}
              >
                <div
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`flex-1 ${
                      index % 2 === 0
                        ? "md:pr-8 md:text-right"
                        : "md:pl-8 md:text-left"
                    } order-1 md:order-none`}
                  >
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                      <h3 className="text-xl font-semibold text-yellow-400">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-300">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-gray-900 font-bold text-xl mb-4 md:mb-0">
                    {milestone.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-8">
            Meet the Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-yellow-400 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-yellow-400">
                  {member.name}
                </h3>
                <p className="text-gray-400 mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
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
          <h3 className="text-3xl font-bold text-yellow-400 mb-6">
            Join Our Mission
          </h3>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Be part of the future of emotionally intelligent technology.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="inline-block bg-gradient-to-r from-yellow-400 to-amber-600 hover:shadow-2xl hover:shadow-yellow-400/30 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              Start Free Trial
              <SparklesIcon className="h-5 w-5 inline-block ml-2" />
            </Link>
            <Link
              to="/careers"
              className="inline-block border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
            >
              Careers
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
              <Link
                to="/features"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                Features
              </Link>
              <Link
                to="/about"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                About
              </Link>
              <Link
                to="/pricing"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                Pricing
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
