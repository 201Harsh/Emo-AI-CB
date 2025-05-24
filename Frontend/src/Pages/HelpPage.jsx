import { Link } from "react-router-dom";
import { 
  ChevronRightIcon,
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  SparklesIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/outline";

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click the 'Get Started' button on the homepage and follow the simple registration process."
    },
    {
      question: "What if I forgot my password?",
      answer: "On the login page, click 'Forgot Password' and follow the instructions to reset it."
    },
    {
      question: "Is my personal information secure?",
      answer: "Absolutely. We use industry-standard encryption and never share your data with third parties."
    },
    {
      question: "How can I customize my profile?",
      answer: "After logging in, go to 'Account Settings' where you can update your profile picture and information."
    }
  ];

  const contactMethods = [
    {
      icon: <EnvelopeIcon className="h-6 w-6 text-yellow-400" />,
      title: "Email Support",
      description: "We typically respond within 24 hours",
      link: "mailto:support@example.com"
    },
    {
      icon: <ChatBubbleBottomCenterTextIcon className="h-6 w-6 text-yellow-400" />,
      title: "Live Chat",
      description: "Available 9AM-5PM EST",
      link: "/live-chat"
    },
    {
      icon: <PhoneIcon className="h-6 w-6 text-yellow-400" />,
      title: "Phone Support",
      description: "Call us at (555) 123-4567",
      link: "tel:5551234567"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-yellow-400 filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-amber-600 filter blur-3xl"></div>
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Back button */}
        <Link 
          to="/authprompt" 
          className="flex items-center text-yellow-400 hover:text-yellow-300 mb-8 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back 
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 mb-6 shadow-lg">
            <QuestionMarkCircleIcon className="h-8 w-8 text-gray-900" />
          </div>
          <h1 className="text-4xl font-bold text-gray-100 mb-4">How can we help?</h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions or contact our support team directly.
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-16">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search help articles..."
              className="w-full py-4 px-6 bg-gray-800 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            <button className="absolute right-2 top-2 bottom-2 px-4 bg-gradient-to-r from-yellow-400 to-amber-600 text-gray-900 font-medium rounded-lg flex items-center">
              Search
              <ChevronRightIcon className="h-5 w-5 ml-1" />
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-100 mb-8 flex items-center">
            <SparklesIcon className="h-6 w-6 text-yellow-400 mr-3" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-yellow-400/30 transition-all">
                <h3 className="text-lg font-semibold text-gray-100 mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-100 mb-8 flex items-center">
            <ShieldCheckIcon className="h-6 w-6 text-yellow-400 mr-3" />
            Contact Support
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <Link 
                key={index} 
                to={method.link}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-yellow-400/50 transition-all hover:shadow-lg hover:shadow-yellow-400/10"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-100">{method.title}</h3>
                </div>
                <p className="text-gray-400">{method.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            Can't find what you're looking for? <Link to="/contact" className="text-yellow-400 hover:text-yellow-300">Submit a request</Link>
          </p>
          <div className="flex justify-center space-x-6 mt-6">
            <Link to="/terms" className="text-xs text-gray-500 hover:text-gray-400">Terms of Service</Link>
            <Link to="/privacy" className="text-xs text-gray-500 hover:text-gray-400">Privacy Policy</Link>
            <Link to="/cookies" className="text-xs text-gray-500 hover:text-gray-400">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}