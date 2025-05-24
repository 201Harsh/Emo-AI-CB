import { useState } from "react";
import { CurrencyDollarIcon, CheckIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();
  const creditTiers = [
    {
      id: "starter",
      name: "Starter",
      credits: 300,
      price: 450,
      features: [
        "Basic AI access",
        "Email support",
        "Standard response speed"
      ]
    },
    {
      id: "pro",
      name: "Pro",
      credits: 1000,
      price: 1250,
      features: [
        "Priority access",
        "24/7 support",
        "Faster responses",
        "Early feature access"
      ],
      popular: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      credits: 8000,
      price: 4250,
      features: [
        "Unlimited access",
        "VIP support",
        "Instant responses",
        "Custom models",
        "Dedicated account manager"
      ]
    }
  ];

  const handleSelectPlan = (planId) => {
    navigate(`/payment/${planId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-yellow-400 mb-4"
          >
            Flexible Credit Plans
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Choose the perfect credit package for your AI needs. All plans include our 
            <span className="text-yellow-400"> premium features</span> and 
            <span className="text-yellow-400"> secure access</span>.
          </motion.p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {creditTiers.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-gradient-to-br from-yellow-900/20 to-gray-900/50 p-8 rounded-2xl 
                        border border-yellow-400/20 backdrop-blur-lg hover:border-yellow-400/40 
                        transition-all duration-300 ${tier.popular ? "ring-2 ring-yellow-500" : ""}`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 px-4 py-1 rounded-bl-xl rounded-tr-xl text-sm font-bold">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-yellow-400">{tier.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-yellow-400">
                    ₹ {tier.price}
                  </span>
                  <span className="ml-2 text-gray-300">/ package</span>
                </div>
                <div className="mt-2 flex items-center text-yellow-400">
                  <CurrencyDollarIcon className="h-6 w-6 mr-2" />
                  <span className="text-xl">{tier.credits} Credits</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-300">
                    <CheckIcon className="h-5 w-5 text-yellow-400 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8"
              >
                <button 
                  onClick={() => handleSelectPlan(tier.id)}
                  className="w-full cursor-pointer bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 
                            py-3 px-6 rounded-lg font-bold hover:from-yellow-600 hover:to-yellow-700 
                            transition-all shadow-lg hover:shadow-yellow-500/20"
                >
                  Get {tier.name}
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 max-w-4xl mx-auto bg-gray-800/50 p-8 rounded-2xl border border-yellow-400/20"
        >
          <h3 className="text-2xl font-bold text-yellow-400 mb-6">Credit FAQs</h3>
          <div className="space-y-6">
            <div>
              <h4 className="text-yellow-400 font-semibold">How do credits work?</h4>
              <p className="text-gray-300 mt-2">
                Each credit allows one AI interaction. Complex queries may use multiple credits.
              </p>
            </div>
            <div>
              <h4 className="text-yellow-400 font-semibold">Can I upgrade later?</h4>
              <p className="text-gray-300 mt-2">
                Yes! You can upgrade your plan at any time. Unused credits carry over.
              </p>
            </div>
            <div>
              <h4 className="text-yellow-400 font-semibold">Need more credits?</h4>
              <p className="text-gray-300 mt-2">
                Contact our sales team for custom enterprise solutions and bulk pricing.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Closing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center bg-yellow-400/10 px-6 py-3 rounded-full">
            <SparklesIcon className="h-6 w-6 text-yellow-400 mr-2" />
            <span className="text-yellow-400">
              All plans include our premium AI model access
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;