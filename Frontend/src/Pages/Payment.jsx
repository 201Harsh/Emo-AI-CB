import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CurrencyDollarIcon, CheckIcon, XMarkIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const Payment = () => {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = {
    starter: {
      name: "Starter",
      credits: 300,
      price: 450,
      features: [
        "Basic AI access",
        "Email support",
        "Standard response speed"
      ]
    },
    pro: {
      name: "Pro",
      credits: 1000,
      price: 1250,
      features: [
        "Priority access",
        "24/7 support",
        "Faster responses",
        "Early feature access"
      ]
    },
    enterprise: {
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
  };

  useEffect(() => {
    if (plans[planId]) {
      setSelectedPlan(plans[planId]);
    } else {
      navigate("/pricing");
    }
  }, [planId, navigate]);

  const handleCardInput = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardDetails(prev => ({
      ...prev,
      number: formattedValue
    }));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setError("");
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Randomly determine success/failure for demo
      const isSuccess = Math.random() > 0.2;
      
      if (isSuccess) {
        setPaymentSuccess(true);
      } else {
        throw new Error("Payment failed. Please check your details and try again.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGoBack = () => {
    navigate("/home");
  };

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <ArrowPathIcon className="h-12 w-12 text-yellow-400 mx-auto animate-spin" />
          <p className="mt-4 text-gray-300">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-yellow-400 mb-2"
          >
            Complete Your Purchase
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300"
          >
            Secure payment for your {selectedPlan.name} plan
          </motion.p>
        </div>

        {/* Payment Container */}
        <div className="bg-gradient-to-br from-yellow-900/20 to-gray-900/50 rounded-2xl border border-yellow-400/20 backdrop-blur-lg overflow-hidden">
          {/* Plan Summary */}
          <div className="p-6 border-b border-yellow-400/20">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">{selectedPlan.name} Plan</h3>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-300">{selectedPlan.credits} Credits</p>
                <div className="flex items-center text-yellow-400 mt-1">
                  <CurrencyDollarIcon className="h-5 w-5 mr-1" />
                  <span className="text-lg font-semibold">₹ {selectedPlan.price}</span>
                </div>
              </div>
              <button 
                onClick={handleGoBack}
                className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
              >
                Change Plan
              </button>
            </div>
          </div>

          {/* Payment Form */}
          {!paymentSuccess ? (
            <div className="p-6">
              {/* Payment Method Selector */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">Payment Method</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`py-2 px-4 rounded-lg border ${paymentMethod === "card" ? "bg-yellow-500/10 border-yellow-400 text-yellow-400" : "border-gray-600 text-gray-300"}`}
                  >
                    Credit/Debit Card
                  </button>
                  <button
                    onClick={() => setPaymentMethod("upi")}
                    className={`py-2 px-4 rounded-lg border ${paymentMethod === "upi" ? "bg-yellow-500/10 border-yellow-400 text-yellow-400" : "border-gray-600 text-gray-300"}`}
                  >
                    UPI
                  </button>
                </div>
              </div>

              {/* Payment Form */}
              <form onSubmit={handlePaymentSubmit}>
                {paymentMethod === "card" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-1">Card Number</label>
                      <input
                        type="text"
                        name="number"
                        value={cardDetails.number}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-1">Expiry Date</label>
                        <input
                          type="text"
                          name="expiry"
                          value={cardDetails.expiry}
                          onChange={handleCardInput}
                          placeholder="MM/YY"
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-1">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={cardDetails.cvv}
                          onChange={handleCardInput}
                          placeholder="123"
                          maxLength="4"
                          className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        name="name"
                        value={cardDetails.name}
                        onChange={handleCardInput}
                        placeholder="Name on card"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50"
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 mb-1">UPI ID</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-gray-200 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/50"
                        required
                      />
                    </div>
                    <p className="text-gray-400 text-sm">
                      You'll be redirected to your UPI app to complete the payment
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
                    {error}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-6 cursor-pointer bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 
                            py-3 px-6 rounded-lg font-bold hover:from-yellow-600 hover:to-yellow-700 
                            transition-all shadow-lg hover:shadow-yellow-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <ArrowPathIcon className="h-5 w-5 mr-2 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    `Pay ₹ ${selectedPlan.price}`
                  )}
                </motion.button>
              </form>

              <div className="mt-6 flex items-center text-gray-400 text-sm">
                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Payments are secure and encrypted</span>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-900/50 border border-green-400 mb-4">
                <CheckIcon className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">Payment Successful!</h3>
              <p className="text-gray-300 mb-6">
                Your {selectedPlan.name} plan with {selectedPlan.credits} credits has been activated.
              </p>
              <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                <p className="text-gray-300">Transaction ID: <span className="text-yellow-400">PAY-{Math.random().toString(36).substring(2, 10).toUpperCase()}</span></p>
                <p className="text-gray-300 mt-1">Amount: <span className="text-yellow-400">₹ {selectedPlan.price}</span></p>
              </div>
              <button
                onClick={handleGoBack}
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-900 bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;