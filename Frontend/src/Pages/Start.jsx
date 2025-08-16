import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  ChevronRightIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  UserIcon,
  CreditCardIcon,
  FaceSmileIcon,
  SparklesIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
  HandThumbUpIcon,
  ChartBarIcon,
  LockClosedIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import CountUp from "../Components/CountUp";
import { StarRating } from "../Components/StartRating";
import AxiosInstance from "../Config/Axios";

const features = [
  {
    icon: FaceSmileIcon,
    title: "Emotion Recognition",
    desc: "Real-time sentiment analysis adapts responses to your emotional state",
    extendedDesc:
      "Our advanced NLP models detect subtle emotional cues in your text to provide responses that match your current mood and needs.",
  },
  {
    icon: SparklesIcon,
    title: "Personality Modes",
    desc: "Switch between professional, friendly, or empathetic interaction styles",
    extendedDesc:
      "Choose from 12 distinct personality profiles or create your own custom interaction style for truly personalized conversations.",
  },
  {
    icon: ChatBubbleLeftIcon,
    title: "Context Memory",
    desc: "Remembers conversation history for coherent long-term dialogues",
    extendedDesc:
      "With 8K token memory, EmoAI maintains context across sessions, recalling important details about your life and preferences.",
  },
  {
    icon: LockClosedIcon,
    title: "Secure Auth",
    desc: "Military-grade encryption for all user data and conversations",
    extendedDesc:
      "Enterprise-grade security with AES-256 encryption, OAuth 2.0, and regular third-party audits to ensure your data protection.",
  },
  {
    icon: ShieldCheckIcon,
    title: "Privacy First",
    desc: "End-to-end encryption and strict data protection policies",
    extendedDesc:
      "We never sell your data. All conversations are encrypted in transit and at rest, with optional local-only processing.",
  },
  {
    icon: CreditCardIcon,
    title: "Flexible Credits",
    desc: "Fair usage system with multiple subscription options",
    extendedDesc:
      "Choose from pay-as-you-go credits or unlimited monthly plans. Non-expiring credits and family sharing options available.",
  },
  {
    icon: DevicePhoneMobileIcon,
    title: "Multi-Platform",
    desc: "Access from any device with seamless sync",
    extendedDesc:
      "Native apps for iOS, Android, Web, and desktop with real-time synchronization across all your devices.",
  },
  {
    icon: GlobeAltIcon,
    title: "Multilingual",
    desc: "Supports 50+ languages with cultural awareness",
    extendedDesc:
      "Beyond translation - understands cultural nuances and local idioms for natural conversations in your native language.",
  },
  {
    icon: ArrowPathRoundedSquareIcon,
    title: "Continuous Learning",
    desc: "Improves through interaction while respecting boundaries",
    extendedDesc:
      "Personalized adaptation without overstepping - learns your preferences while maintaining strict ethical guidelines.",
  },
];

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "Entrepreneur",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    rating: 5,
    text: "EmoAI gives me mental clarity during tough days. It's more than just an assistant—it's a companion.",
    company: "TechStart Inc.",
  },
  {
    name: "Neha Verma",
    role: "UX Designer",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4,
    text: "I've never felt this understood by an AI. EmoAI adapts to my mood so naturally.",
    company: "DesignHub",
  },
  {
    name: "Rohit Mehta",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 3,
    text: "From debugging support to emotional check-ins, EmoAI handles it all. Highly recommended!",
    company: "Google",
  },
  {
    name: "Priya Nair",
    role: "Marketing Manager",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4,
    text: "Feels like talking to a warm, empathetic friend who always knows the right thing to say.",
    company: "Meta",
  },
  {
    name: "Karan Patel",
    role: "Freelancer",
    image: "https://randomuser.me/api/portraits/men/31.jpg",
    rating: 2,
    text: "What sets EmoAI apart is how *human* it feels. It's my daily motivator and thought partner.",
    company: "Independent",
  },
  {
    name: "Ananya Rao",
    role: "Psychology Student",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
    rating: 5,
    text: "As someone studying emotions, I'm amazed at how well EmoAI mirrors human empathy.",
    company: "Harvard University",
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "₹99.99",
    period: "/month",
    features: [
      "1000 message credits",
      "Basic personality modes",
      "7-day chat history",
      "Email support",
      "Standard response speed",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹1199.99",
    period: "/month",
    features: [
      "5000 message credits",
      "All personality modes",
      "30-day chat history",
      "Priority support",
      "Faster response speed",
      "Emotion analytics",
    ],
    cta: "Most Popular",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Unlimited messages",
      "Custom personality development",
      "Unlimited chat history",
      "24/7 dedicated support",
      "Highest priority",
      "Advanced analytics",
      "API access",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const stats = [
  {
    value: (
      <div className="flex items-end">
        <CountUp
          from={0}
          to={97}
          separator=","
          direction="up"
          duration={2}
          className="count-up-text"
        />
        <span className="text-yellow-400">%</span>
      </div>
    ),
    label: "User Satisfaction",
  },
  {
    value: (
      <div className="flex items-end">
        <CountUp
          from={0}
          to={12000}
          separator=","
          direction="up"
          duration={0.5}
          className="count-up-text"
        />
        <span className="text-yellow-400">+</span>
      </div>
    ),
    label: "Daily Conversations",
  },
  {
    value: (
      <div className="flex items-end">
        <CountUp
          from={0}
          to={520}
          separator=","
          direction="up"
          duration={2}
          className="count-up-text"
        />
        <span className="text-yellow-400">+</span>
      </div>
    ),
    label: "Supported Languages",
  },
  {
    value: "24/7",
    label: "Availability",
  },
];

export default function Start() {
  const mainControls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [expandedFeature, setExpandedFeature] = useState(null);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  useEffect(() => {
    const handleStartServer = async () => {
      try {
        const res = await AxiosInstance.get("/users/startServer");
        if (res.status === 200) {
          console.log(res.data);
        }
      } catch (error) {
        console.error("Error starting server:", error);
      }
    };
    handleStartServer();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      {/* Header */}
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
                to="/authprompt"
                className="bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-amber-500 hover:to-yellow-500 text-gray-900 md:px-6 md:py-2 px-4 py-1 rounded-full transition-all duration-300 transform hover:scale-105 hidden md:flex items-center gap-2"
              >
                Try Now
                <SparklesIcon className="h-4 w-4 " />
              </Link>
            </motion.div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-800 to-gray-900 py-20 overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent mb-6 leading-tight">
              <TypeAnimation
                sequence={[
                  "🌟 Emo AI Next-Gen",
                  1400,
                  "✨ Your Emotional AI Companion",
                  1200,
                  "🤗 Understands How You Feel",
                  1000,
                  "💬 Safe Space for Honest Conversations",
                  900,
                  "🌱 Let's Grow Together",
                  800,
                  "❤️ AI With a Human Touch",
                  700,
                  "🔮 Ask Me Anything...",
                  600,
                  "🌟 Reconnecting with You...",
                  500,
                ]}
                speed={50}
                repeat={Infinity}
              />
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience AI that goes beyond responses — it understands, adapts,
              and evolves with you through every conversation.
            </p>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700"
                >
                  <div className="flex items-end justify-center">
                    <div className="text-3xl font-bold text-yellow-400">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-gray-300 text-sm text-center mt-2">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/authprompt"
                  className="relative bg-gradient-to-r from-yellow-400 to-amber-600 hover:shadow-2xl hover:shadow-yellow-400/30 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 inline-block group"
                >
                  <span className="relative z-10">Start Emotional Journey</span>
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-amber-600 to-yellow-400" />
                  <SparklesIcon className="h-5 w-5 inline-block ml-2 animate-pulse" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/authprompt"
                  className="relative border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 inline-block"
                >
                  Try Live Demo
                  <ChevronRightIcon className="h-5 w-5 inline-block ml-2" />
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* AI Companion Section - Mobile Vertical & Desktop Grid */}
          <motion.div
            className="mt-12 md:mt-20 relative bg-gray-800 p-6 sm:p-8 md:p-10 rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl max-w-7xl mx-auto border border-yellow-400 md:border-2 overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Background Layers */}
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl overflow-hidden z-0">
              <div className="absolute inset-0 bg-[#192333] opacity-95" />
              <div className="absolute inset-0 bg-[#192333] backdrop-blur-[1px]" />
              <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 space-y-6 md:space-y-8">
              {/* Header Section */}
              <div className="text-center">
                <div className="inline-flex items-center mb-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30">
                  <SparklesIcon className="h-3 w-3 md:h-4 md:w-4 text-yellow-400 mr-1 md:mr-2" />
                  <span className="text-xs font-semibold text-yellow-400">
                    NEXT-GEN AI
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl text-yellow-400 font-bold mb-2 md:mb-3">
                  Your Perfect AI Companion
                </h3>
                <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto px-2 sm:px-0">
                  Experience AI that thinks, learns, and grows with you —
                  understanding context, adapting dynamically, and evolving
                  through every interaction.
                </p>
              </div>

              {/* Features Grid - Single column on mobile, 2 columns on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {[
                  {
                    icon: HeartIcon,
                    title: "Emotional Support",
                    desc: "Talk, share, and feel cared for with AI that listens deeply and responds with genuine empathy.",
                    gradient: "from-pink-500/10 to-rose-600/10",
                  },
                  {
                    icon: HandThumbUpIcon,
                    title: "Professional Coach",
                    desc: "Get career advice, productivity tips, and professional development guidance tailored to your goals.",
                    gradient: "from-blue-500/10 to-indigo-600/10",
                  },
                  {
                    icon: FaceSmileIcon,
                    title: "Mental Wellness",
                    desc: "Daily check-ins, mindfulness exercises, and cognitive behavioral techniques to support your mental health.",
                    gradient: "from-green-500/10 to-emerald-600/10",
                  },
                  {
                    icon: SparklesIcon,
                    title: "Creative Partner",
                    desc: "Brainstorm ideas, overcome writer's block, and explore creative possibilities with an inspiring collaborator.",
                    gradient: "from-purple-500/10 to-violet-600/10",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="relative group overflow-hidden rounded-xl md:rounded-2xl border border-gray-700 hover:border-yellow-400/50 transition-all"
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-30 group-hover:opacity-50 transition-opacity`}
                    />
                    <div className="relative p-4 sm:p-5 flex items-start rounded-2xl space-x-3 sm:space-x-4 bg-gray-900/30 backdrop-blur-sm">
                      <div className="p-2 sm:p-3 rounded-lg md:rounded-xl bg-gray-800/50 border border-gray-700 group-hover:bg-yellow-400/10 group-hover:border-yellow-400/30 transition-all">
                        <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <h4 className="text-lg sm:text-xl text-yellow-400 font-semibold mb-1 sm:mb-2">
                          {item.title}
                        </h4>
                        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* CTA Footer */}
              <div className="pt-4 md:pt-6 text-center">
                <Link
                  to="/authprompt"
                  className="px-6 py-2 sm:px-8 sm:py-3 rounded-full bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-300 transition-colors shadow-md md:shadow-lg hover:shadow-yellow-400/20 text-sm sm:text-base"
                >
                  Start Your AI Journey
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800" ref={ref}>
        <div className="container mx-auto px-6">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate={mainControls}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Core Features
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              EmoAI combines cutting-edge technology with deep emotional
              intelligence to deliver truly human-like interactions.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: (i) => ({
                    opacity: 1,
                    y: 0,
                    transition: { delay: i * 0.2 },
                  }),
                }}
                initial="hidden"
                animate={mainControls}
                custom={index}
                className="bg-gray-700/50 p-6 rounded-xl backdrop-blur-sm border border-gray-600 hover:border-yellow-400 transition-all group cursor-pointer"
                onClick={() =>
                  setExpandedFeature(expandedFeature === index ? null : index)
                }
              >
                <div className="mb-4 relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  <feature.icon className="h-12 w-12 text-yellow-400 relative" />
                </div>
                <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-3">{feature.desc}</p>
                {expandedFeature === index && (
                  <motion.p
                    className="text-gray-400 text-sm"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {feature.extendedDesc}
                  </motion.p>
                )}
                <div className="text-yellow-400 text-sm mt-2">
                  {expandedFeature === index ? "Show less" : "Learn more..."}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-12 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-3 sm:mb-4">
              Powered by Advanced AI
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
              Our proprietary technology stack combines the latest breakthroughs
              in AI research.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                name: "LLM Architecture",
                icon: "🧠",
                description:
                  "Custom 70B parameter model fine-tuned for emotional intelligence",
              },
              {
                name: "NLP Engine",
                icon: "💬",
                description:
                  "State-of-the-art natural language processing with sentiment analysis",
              },
              {
                name: "Memory System",
                icon: "🔍",
                description:
                  "Hierarchical memory with both short and long-term recall",
              },
              {
                name: "Ethical AI",
                icon: "⚖️",
                description:
                  "Constitutional AI principles for safety and alignment",
              },
              {
                name: "Multimodal",
                icon: "🎭",
                description:
                  "Text, voice, and eventually visual interaction modes",
              },
              {
                name: "Personalization",
                icon: "🎯",
                description:
                  "Continuous learning about your unique personality",
              },
              {
                name: "Security",
                icon: "🔒",
                description: "End-to-end encrypted conversations",
              },
              {
                name: "APIs",
                icon: "🔌",
                description: "Developer-friendly integration options",
              },
            ].map((tech, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-700 text-center"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
                  {tech.icon}
                </div>
                <h4 className="text-base sm:text-lg font-semibold text-yellow-400 mb-1 sm:mb-2">
                  {tech.name}
                </h4>
                <p className="text-gray-300 text-xs sm:text-sm">
                  {tech.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-yellow-400 mb-4">
              Simple, Transparent Pricing
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose the plan that fits your needs. Cancel anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className={`relative p-8 rounded-2xl ${
                  plan.popular
                    ? "border-2 border-yellow-400 bg-gray-700"
                    : "border border-gray-600 bg-gray-700/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-yellow-400 text-gray-900 px-4 py-1 rounded-bl-lg rounded-tr-lg font-bold text-sm">
                    MOST POPULAR
                  </div>
                )}
                <h4 className="text-2xl font-bold text-yellow-400 mb-2">
                  {plan.name}
                </h4>
                <div className="flex items-end mb-6">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-yellow-400 mr-2" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/pricing"
                  className={`w-full py-3 flex items-center justify-center rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-yellow-400 to-amber-600 text-gray-900 hover:shadow-lg hover:shadow-yellow-400/30"
                      : "bg-gray-600 text-white hover:bg-gray-500"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12 text-gray-400">
            <p>
              Need something custom?{" "}
              <Link to="/contact" className="text-yellow-400 hover:underline">
                Contact our sales team
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-yellow-400 mb-4">
              Trusted by Thousands
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our users say about
              their experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="relative bg-gray-800 p-6 rounded-xl border border-gray-700"
              >
                <div className="absolute top-4 right-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
                  />
                  <div className="ml-4">
                    <div className="font-bold text-yellow-400">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {testimonial.role} • {testimonial.company}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h3 className="text-4xl font-bold text-yellow-400 mb-6">
              Ready to Experience Emotional AI?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users who've transformed their digital
              interactions with EmoAI.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/authprompt"
                  className="relative bg-gradient-to-r from-yellow-400 to-amber-600 hover:shadow-2xl hover:shadow-yellow-400/30 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 inline-block group"
                >
                  <span className="relative z-10">Get Started - It's Free</span>
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-amber-600 to-yellow-400" />
                  <SparklesIcon className="h-5 w-5 inline-block ml-2 animate-pulse" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/authprompt"
                  className="relative border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 inline-block"
                >
                  Try Interactive Demo
                  <ChevronRightIcon className="h-5 w-5 inline-block ml-2" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-yellow-400 mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about EmoAI. Can't find an answer?
              Contact our support team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: "How does EmoAI handle privacy and data security?",
                answer:
                  "We take privacy extremely seriously. All conversations are encrypted end-to-end, and we never sell or share your data. You can request full deletion of your data at any time.",
              },
              {
                question: "What makes EmoAI different from other chatbots?",
                answer:
                  "Unlike standard chatbots, EmoAI focuses on emotional intelligence - understanding context, mood, and personality to provide genuinely empathetic responses.",
              },
              {
                question: "Can I use EmoAI for professional purposes?",
                answer:
                  "Absolutely! Many users leverage EmoAI for business coaching, customer service training, and professional development through our specialized professional modes.",
              },
              {
                question: "Is there a mobile app available?",
                answer:
                  "Yes, EmoAI is available on both iOS and Android with full feature parity. You can also access via web browser on any device.",
              },
              {
                question: "How does the free trial work?",
                answer:
                  "The free trial gives you full access to all features for 14 days with a limited message count. No credit card required to start.",
              },
              {
                question: "Can I customize the AI's personality?",
                answer:
                  "Yes! You can adjust personality traits, communication style, and even create multiple distinct profiles for different needs.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-700/50 p-6 rounded-xl border border-gray-600"
              >
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">
                  {faq.question}
                </h4>
                <p className="text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
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

// You'll need to add these icon components or import them
function CheckIcon(props) {
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
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

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
