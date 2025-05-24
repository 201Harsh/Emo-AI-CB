import { Link } from "react-router-dom";
import { 
  UserIcon, 
  ArrowRightIcon, 
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

export default function AuthPrompt() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 py-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-yellow-400 filter blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-amber-600 filter blur-3xl"></div>
      </div>
      
      <div className="relative max-w-md w-full bg-gray-900/80 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden border border-gray-700/50 transform transition-all hover:scale-[1.01] duration-300">
        {/* Glow effect */}
        <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-yellow-400 shadow-glow"></div>
        
        <div className="p-8 text-center">
          {/* Animated icon container */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 mb-6 shadow-lg hover:animate-pulse">
            <UserIcon className="h-9 w-9 text-gray-900" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-3">
            Welcome to EmoAI
          </h2>
          
          <p className="text-gray-300 mb-8 max-w-md mx-auto">
            Join our community of creators and explorers. Personalize your experience and unlock all features.
          </p>
          
          <div className="space-y-4 mb-8">
            <Link
              to="/register"
              className="group relative w-full flex justify-center items-center py-3.5 px-6 border border-transparent text-lg font-semibold rounded-xl text-gray-900 bg-gradient-to-r from-yellow-400 to-amber-600 hover:from-amber-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200 shadow-lg hover:shadow-yellow-500/20"
            >
              <span className="absolute left-6 inset-y-0 flex items-center">
                <SparklesIcon className="h-5 w-5 text-gray-900" />
              </span>
              Get Started
              <span className="absolute right-6 inset-y-0 flex items-center">
                <ArrowRightIcon className="h-5 w-5 text-gray-950" />
              </span>
            </Link>
            
            <Link
              to="/"
              className="group relative w-full flex justify-center items-center py-3.5 px-6 border-2 border-gray-300 text-lg font-semibold rounded-xl text-gray-200 hover:bg-gray-700/50 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
            >
              <span className="absolute left-6 inset-y-0 flex items-center">
                <ArrowLeftIcon className="h-5 w-5 text-gray-300 group-hover:text-yellow-400" />
              </span>
              Back to Home
            </Link>
          </div>
          
          {/* Trust indicators */}
          <div className="flex items-center justify-center space-x-6 mb-6">
            <div className="flex items-center space-x-2">
              <ShieldCheckIcon className="h-4 w-4 text-green-400" />
              <span className="text-xs text-gray-300">Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/>
              </svg>
              <span className="text-xs text-gray-300">Privacy</span>
            </div>
          </div>
          
          {/* Help section */}
          <div className="mt-6 text-center">
            <Link 
              to="/help" 
              className="inline-flex items-center text-sm text-gray-300 hover:text-yellow-400 transition-colors"
            >
              <QuestionMarkCircleIcon className="h-4 w-4 mr-1.5" />
              Need help getting started?
            </Link>
          </div>
        </div>
        
        {/* Footer */}
        <div className="bg-gray-950/30 px-6 py-4 text-center border-t border-gray-700/50">
          <p className="text-xs text-gray-300">
            By continuing, you agree to our <Link to="/terms" className="hover:text-yellow-400 transition-colors">Terms</Link> and <Link to="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link>.
          </p>
        </div>
      </div>
      
      {/* Version tag */}
      <div className="absolute bottom-10 md:bottom-4 right-4 text-xs text-gray-200">
        v4.2.2
      </div>
    </div>
  );
}