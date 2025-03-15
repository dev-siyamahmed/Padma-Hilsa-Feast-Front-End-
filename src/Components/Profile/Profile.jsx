import React from "react";
import useCurrentUser from "../../Hooks/useCurrentUser";
import useAuth from "../../Hooks/useAuth";
import { FaUserCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import moment from "moment";

const Profile = () => {
    const { currentUser } = useCurrentUser();
    const { user, logOut } = useAuth();

    const defaultAvatar = "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png";

    return (
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-10">
            {/* Profile Header */}
            <div className="flex flex-col items-center">
                <img
                    src={user?.photoURL || defaultAvatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
                />
                <h2 className="text-2xl font-semibold text-gray-800 mt-4"> {currentUser?.data?.name || "User Name"} </h2>
                <p className="text-gray-500">{currentUser?.data?.email || "No Email"}</p>
                <span className="text-sm bg-green-500 text-gray-100 px-3 py-1 rounded-md mt-2">
                    Active User
                </span>
            </div>

            {/* Profile Details Section */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Profile Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div className="flex items-center space-x-3">
                        <FaUserCircle className="text-blue-500 text-lg" />
                        <div>
                            <p className="text-gray-600">Full Name</p>
                            <p className="font-medium text-gray-800">{currentUser?.data?.name || "N/A"}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <FaEnvelope className="text-red-500 text-lg" />
                        <div>
                            <p className="text-gray-600">Email</p>
                            <p className="font-medium text-gray-800">{currentUser?.data?.email || "N/A"}</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <FaPhone className="text-green-500 text-lg" />
                        <div>
                            <p className="text-gray-600">Phone</p>
                            <p className="font-medium text-gray-800">+1 234 567 890</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <FaMapMarkerAlt className="text-purple-500 text-lg" />
                        <div>
                            <p className="text-gray-600">Address</p>
                            <p className="font-medium text-gray-800">Mirpur -01 , Dhaka</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 col-span-1 md:col-span-2">
                        <FaCalendarAlt className="text-orange-500 text-lg" />
                        <div>
                            <p className="text-gray-600">Account Created</p>
                            <p className="font-medium text-gray-800">
                                {moment(currentUser?.data?.createdAt).format("MMMM Do YYYY, h:mm A") || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Actions */}
            <div className="mt-6 flex justify-center">
                <button
                    onClick={logOut}
                    className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-600 transition transform hover:scale-105"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
