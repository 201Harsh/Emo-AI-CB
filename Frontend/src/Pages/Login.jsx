import React, { useContext, useState } from "react";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  SparklesIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const usersData = { email, password };

  };

  const ServiceNotAvailable = () => {
    toast.error("Service not available", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-yellow-400/10 filter blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/3 right-1/3 w-72 h-72 rounded-full bg-amber-600/10 filter blur-3xl"
        ></motion.div>
      </div>

      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-8 z-10">
        {/* Left side - Welcome content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:block w-full max-w-md text-center md:text-left"
        >
          <div className="bg-gray-950/70 backdrop-blur-lg p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 mb-6 shadow-lg mx-auto md:mx-0">
              <SparklesIcon className="h-7 w-7 text-gray-900" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome Back!
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              We're so excited to see you again! Log in to access your personalized dashboard and continue your journey with us.
            </p>
            
            <div className="space-y-4">
              {[
                "Secure login with industry-standard encryption",
                "Access all your saved data and preferences",
                "Continue where you left off with your projects",
                "24/7 customer support available"
              ].map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center">
                      <svg
                        className="h-3 w-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="ml-3 text-base text-gray-300">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right side - Login form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gray-950/70 p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-lg border border-gray-700/50"
        >
          {/* Glow effect */}
          <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-yellow-400 shadow-glow"></div>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="md:hidden inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 mb-4 shadow-lg">
              <SparklesIcon className="h-7 w-7 text-gray-900" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Login</h2>
            <p className="text-gray-300">Access your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative group">
                <EnvelopeIcon className="h-5 w-5 text-yellow-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-yellow-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  required
                  autoFocus
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800/60 text-gray-100 rounded-lg border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all placeholder:text-gray-400"
                  placeholder="Enter your email"
                />
              </div>
            </motion.div>

            {/* Password Input */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative group">
                <LockClosedIcon className="h-5 w-5 text-yellow-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-yellow-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-gray-800/60 text-gray-100 rounded-lg border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all placeholder:text-gray-400"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 cursor-pointer top-1/2 -translate-y-1/2 text-gray-200 hover:text-yellow-500 transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Forgot password link */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-yellow-400 hover:text-yellow-500 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="pt-2"
            >
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex cursor-pointer justify-center items-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-gray-900 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200 shadow-lg hover:shadow-yellow-500/20 ${
                  isLoading ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <ArrowPathIcon className="animate-spin h-5 w-5 mr-2" />
                    Logging In...
                  </>
                ) : (
                  <>
                    <ShieldCheckIcon className="h-5 w-5 mr-2" />
                    Login
                  </>
                )}
              </button>
            </motion.div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-300">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-yellow-400 hover:text-yellow-500 transition-colors"
            >
              Register now
            </Link>
          </div>

          {/* Social login options */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-950 text-gray-400">
                  Or sign in with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ),
                  label: "GitHub"
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  ),
                  label: "Twitter"
                }
              ].map((social, index) => (
                <motion.button
                  key={index}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={ServiceNotAvailable}
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-lg shadow-sm text-sm font-medium text-gray-300 bg-gray-800 hover:bg-gray-700/50 focus:outline-none transition-all"
                >
                  {social.icon}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;