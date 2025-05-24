import { motion } from "framer-motion";
import {
  FaceSmileIcon,
  SparklesIcon,
  ChatBubbleLeftIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ArrowPathRoundedSquareIcon,
  CpuChipIcon,
  ChartBarIcon,
  UserGroupIcon,
  CodeBracketIcon
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const featureCategories = [
  {
    title: "Core Technology",
    icon: CpuChipIcon,
    features: [
      {
        icon: FaceSmileIcon,
        title: "Emotion Recognition",
        desc: "Real-time sentiment analysis adapts responses to your emotional state",
        extendedDesc: "Our advanced NLP models detect subtle emotional cues in your text to provide responses that match your current mood and needs. The system analyzes word choice, punctuation, and conversation patterns to understand your emotional state."
      },
      {
        icon: SparklesIcon,
        title: "Personality Modes",
        desc: "12 distinct interaction styles to match your needs",
        extendedDesc: "Choose from professional, friendly, empathetic, or specialized modes like therapist, coach, or creative partner. Create custom personalities with adjustable traits like warmth, humor, and directness."
      },
      {
        icon: ChartBarIcon,
        title: "Performance Analytics",
        desc: "Track your emotional patterns and growth over time",
        extendedDesc: "Get monthly reports on your emotional trends, conversation topics, and personal growth. Identify patterns and receive personalized recommendations for improvement."
      }
    ]
  },
  {
    title: "Security & Privacy",
    icon: ShieldCheckIcon,
    features: [
      {
        icon: LockClosedIcon,
        title: "End-to-End Encryption",
        desc: "Military-grade protection for all conversations",
        extendedDesc: "All data is encrypted with AES-256 both in transit and at rest. Even our team cannot access your private conversations."
      },
      {
        icon: UserGroupIcon,
        title: "Family Plans",
        desc: "Secure shared access for your household",
        extendedDesc: "Create sub-accounts for family members with appropriate privacy controls and content filters for younger users."
      }
    ]
  },
  {
    title: "Accessibility",
    icon: DevicePhoneMobileIcon,
    features: [
      {
        icon: GlobeAltIcon,
        title: "Multilingual Support",
        desc: "50+ languages with cultural awareness",
        extendedDesc: "Beyond translation - understands cultural nuances and local idioms for natural conversations in your native language."
      },
      {
        icon: CodeBracketIcon,
        title: "Developer API",
        desc: "Build your own integrations",
        extendedDesc: "Comprehensive REST API with webhooks and SDKs for popular platforms. Create custom applications powered by EmoAI."
      },
      {
        icon: ArrowPathRoundedSquareIcon,
        title: "Continuous Learning",
        desc: "Improves through interaction",
        extendedDesc: "Personalized adaptation without overstepping - learns your preferences while maintaining strict ethical guidelines."
      }
    ]
  }
];

export default function Features() {
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
              <Link to="/features" className="text-yellow-400 font-medium">
                Features
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">
                About
              </Link>
              <Link
                to="/authprompt"
                className="bg-gradient-to-r hidden from-yellow-400 to-amber-600 hover:from-amber-500 hover:to-yellow-500 text-gray-900 px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 md:flex items-center gap-2"
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
            Powerful Features Designed for Connection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            EmoAI combines cutting-edge artificial intelligence with deep emotional intelligence to deliver truly human-like interactions.
          </motion.p>
        </section>

        {/* Feature Categories */}
        {featureCategories.map((category, catIndex) => (
          <motion.section 
            key={catIndex}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="flex items-center mb-8">
              <category.icon className="h-10 w-10 text-yellow-400 mr-4" />
              <h2 className="text-3xl font-bold text-yellow-400">{category.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.features.map((feature, featIndex) => (
                <motion.div
                  key={featIndex}
                  whileHover={{ y: -10 }}
                  className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-yellow-400 transition-all"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 rounded-lg bg-gray-700/50 border border-gray-600 mr-4">
                      <feature.icon className="h-6 w-6 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-yellow-400">{feature.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-4">{feature.desc}</p>
                  <p className="text-gray-400 text-sm">{feature.extendedDesc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-800 to-gray-700 p-10 rounded-3xl border border-gray-600 text-center mt-12"
        >
          <h3 className="text-3xl font-bold text-yellow-400 mb-6">Ready to Experience Emotional AI?</h3>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Join thousands of users who've transformed their digital interactions with EmoAI.
          </p>
          <Link
            to="/register"
            className="inline-block bg-gradient-to-r from-yellow-400 to-amber-600 hover:shadow-2xl hover:shadow-yellow-400/30 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300"
          >
            Start Your Free Trial
            <SparklesIcon className="h-5 w-5 inline-block ml-2" />
          </Link>
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
              <Link to="/pricing" className="text-gray-400 hover:text-yellow-400 transition-colors">
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