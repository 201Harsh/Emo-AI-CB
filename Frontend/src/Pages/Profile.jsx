import {
  UserIcon,
  EnvelopeIcon,
  CalendarIcon,
  ChartBarIcon,
  IdentificationIcon,
  PencilSquareIcon,
  ArrowLeftOnRectangleIcon,
  BackwardIcon,
} from "@heroicons/react/24/outline";
import axios from "../Config/Axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { userDataContext } from "../Context/UserContext";

const Profile = () => {
  // Dummy data - Replace with real data from backend
  const userData = {
    name: "John AIUser",
    email: "john.aiuser@example.com",
    joinDate: "January 2023",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    totalQueries: 128,
    bio: "AI enthusiast exploring the boundaries of machine intelligence and human creativity.",
    membership: "Premium",
  };

  const [user, setuser] = useState("");

  const {rescount, setrescount} = useContext(userDataContext);

  const Navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/users/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setuser(response.data.user);
      } catch (error) {}
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get("/users/logout", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      localStorage.clear();
      toast.success("🧑 User Logout Successfully", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      setTimeout(() => {
        Navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 md:p-8">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-yellow-400 mb-2">
            User Profile
          </h1>
          <div className="bg-gradient-to-r from-gray-400 to-gray-800 h-[2px] w-32 mx-auto" />
        </div>

        {/* Profile Card */}
        <div className="bg-gray-800 rounded-xl border border-yellow-400/20 p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400 to-gray-800 p-1">
                <img
                  src={userData.avatar}
                  alt="Profile"
                  className="w-full h-full rounded-full object-center object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-yellow-500 p-2 rounded-full hover:bg-yellow-600 transition duration-200">
                <PencilSquareIcon className="h-4 w-4 text-gray-900" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex-1 space-y-2 text-center md:text-left">
              <h2 className="text-2xl font-bold text-yellow-400">
                {user.name}
              </h2>
              <p className="text-gray-300 flex items-center justify-center md:justify-start gap-2">
                <EnvelopeIcon className="h-5 w-5" />
                {user.email}
              </p>
              <p className="text-gray-400 text-sm flex items-center justify-center md:justify-start gap-2">
                <CalendarIcon className="h-4 w-4" />
                Member since {user.createdAt}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Bio Section */}
          <div className="bg-gray-800 p-6 rounded-xl border border-yellow-400/20">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center gap-2">
              <IdentificationIcon className="h-5 w-5" />
              About Me
            </h3>
            <p className="text-gray-300">{userData.bio}</p>
          </div>

          {/* Usage Stats */}
          <div className="bg-gray-800 p-6 rounded-xl border border-yellow-400/20">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5" />
              Usage Statistics
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Credits Remaining</span>
                <span className="text-yellow-400 font-bold">
                  {user.credits}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Queries</span>
                <span className="text-yellow-400 font-bold">
                  {rescount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Active Sessions</span>
                <span className="text-yellow-400 font-bold">1</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/"
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg transition duration-200 flex-1 flex items-center justify-center gap-2"
          >
            <BackwardIcon className="h-5 w-5 text-gray-900" />
            Back to Home
          </Link>
          <button onClick={handleLogout} className="bg-red-500/20 cursor-pointer hover:bg-red-600/30 text-red-400 px-6 py-3 rounded-lg transition duration-200 flex-1 flex items-center justify-center gap-2">
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            Logout All Devices
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;