import {
  Cog6ToothIcon,
  LockClosedIcon,
  UserIcon,
  PaintBrushIcon,
  TrashIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import axios from "../Config/Axios";



const Settings = () => {
  const Navigate = useNavigate();

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
    <div className="bg-gray-900 min-h-screen p-6 md:p-8">
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
        <h1 className="text-3xl font-bold text-yellow-400 mb-8 flex items-center gap-2">
          <Cog6ToothIcon className="h-8 w-8" />
          Settings
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Profile Settings */}
          <div className="bg-gray-800 p-6 rounded-xl border border-yellow-400/20">
            <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center gap-2">
              <UserIcon className="h-5 w-5" />
              Profile Settings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">Name</label>
                <input
                  type="text"
                  className="w-full bg-gray-700 text-yellow-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full bg-gray-700 text-yellow-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg transition duration-200">
                Update Profile
              </button>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-800 p-6 rounded-xl border border-yellow-400/20">
            <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center gap-2">
              <LockClosedIcon className="h-5 w-5" />
              Security
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-full bg-gray-700 text-yellow-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full bg-gray-700 text-yellow-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-lg transition duration-200">
                Change Password
              </button>
            </div>
          </div>

          {/* Theme Preferences */}
          <div className="bg-gray-800 p-6 rounded-xl border border-yellow-400/20">
            <h2 className="text-xl font-semibold text-yellow-400 mb-4 flex items-center gap-2">
              <PaintBrushIcon className="h-5 w-5" />
              Theme
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-300">Dark Mode</span>
                <button className="w-12 h-6 bg-yellow-500 rounded-full p-1">
                  <div className="bg-white w-4 h-4 rounded-full transform translate-x-6 transition duration-300" />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <span className="text-gray-300">Magic Cursor Effects</span>
                <button className="w-12 h-6 bg-gray-600 rounded-full p-1">
                  <div className="bg-white w-4 h-4 rounded-full transform transition duration-300" />
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-gray-800 p-6 rounded-xl border border-red-400/20">
            <h2 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
              <TrashIcon className="h-5 w-5" />
              Danger Zone
            </h2>
            <div onClick={handleLogout} className="space-y-4">
              <button className="w-full bg-red-500/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2">
                <TrashIcon className="h-5 w-5" />
                Delete Account
              </button>
              <button onClick={handleLogout} className="w-full bg-yellow-500/20 hover:bg-yellow-600/30 text-yellow-400 px-4 py-2 rounded-lg transition duration-200 flex items-center justify-center gap-2">
                <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                Logout All Devices
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;