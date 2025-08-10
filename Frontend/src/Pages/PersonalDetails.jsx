import React, { useState } from "react";
import {
  UserIcon,
  CameraIcon,
  HeartIcon,
  UsersIcon,
  SparklesIcon,
  InformationCircleIcon,
  CakeIcon,
  MapIcon,
  BriefcaseIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AxiosInstance from "../Config/Axios";
import { toast, Bounce } from "react-toastify";

const PersonalDetails = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [aiCompanionType, setAiCompanionType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCompanionSelect = (option) => {
    setAiCompanionType(option);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!aiCompanionType) {
      toast.error("Please select an AI companion type", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("age", age);
      formData.append("gender", gender);
      formData.append("aiCompanionType", aiCompanionType);

      const response = await AxiosInstance.post("/users/CreateUserInfo", {
        age,
        gender,
        AICompanion: aiCompanionType,
      });

      if (response.status === 200) {
        toast.success("Profile updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const companionOptions = [
    { value: "girlfriend", label: "AI Girlfriend", icon: HeartIcon },
    { value: "boyfriend", label: "AI Boyfriend", icon: HeartIcon },
    { value: "friend", label: "AI Friend", icon: UsersIcon },
    { value: "mentor", label: "AI Mentor", icon: AcademicCapIcon },
    { value: "therapist", label: "AI Therapist", icon: SparklesIcon },
    { value: "counselor", label: "AI Counselor", icon: InformationCircleIcon },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-yellow-400/10 filter blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/3 right-1/3 w-72 h-72 rounded-full bg-amber-600/10 filter blur-3xl"
        ></motion.div>
      </div>

      <div className="w-full max-w-4xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gray-950/70 p-8 rounded-2xl shadow-2xl w-full backdrop-blur-lg border border-gray-700/50"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Complete Your Profile
            </h2>
            <p className="text-gray-200">
              Help us personalize your AI companion experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Age Input */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Age
                </label>
                <div className="relative">
                  <CakeIcon className="h-5 w-5 text-yellow-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="number"
                    name="age"
                    id="age"
                    min="1"
                    max="120"
                    value={age}
                    required
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter age (1-120)"
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/60 text-gray-100 rounded-lg border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all appearance-none"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                </div>
                {age && (
                  <p className="mt-1 text-xs text-gray-400">
                    Born approximately in {new Date().getFullYear() - age}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Gender
                </label>
                <div className="relative">
                  <UserIcon className="h-5 w-5 text-yellow-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    name="gender"
                    id="gender"
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800/60 text-gray-100 rounded-lg border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 outline-none transition-all appearance-none"
                  >
                    <option disabled hidden value="">
                      Select your gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            {/* AI Companion Selection */}
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-3">
                Select your AI companion type
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {companionOptions.map((option) => (
                  <motion.div
                    key={option.value}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <button
                      type="button"
                      onClick={() => handleCompanionSelect(option.value)}
                      className={`w-full flex items-center justify-center p-3 rounded-lg border transition-all ${
                        aiCompanionType === option.value
                          ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                          : "bg-gray-800/60 border-gray-700 text-gray-300 hover:border-yellow-500/50"
                      }`}
                    >
                      <option.icon className="h-5 w-5 mr-2" />
                      {option.label}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="pt-4"
            >
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent text-lg font-medium rounded-lg text-gray-900 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200 shadow-lg hover:shadow-yellow-500/20 ${
                  isLoading ? "opacity-80 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving Profile...
                  </>
                ) : (
                  "Complete Profile"
                )}
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalDetails;
