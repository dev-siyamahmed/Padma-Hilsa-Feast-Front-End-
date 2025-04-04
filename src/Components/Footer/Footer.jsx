import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaUtensils } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-white to-gray-50 text-gray-800 mt-16 border-t shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* About Section */}
                    <div className="space-y-5">
                        <div className="flex items-center gap-2">
                            <FaUtensils className="text-blue-600 text-2xl" />
                            <h3 className="text-2xl font-bold text-gray-900">Foodie Haven</h3>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Experience the finest Foodie Haven dishes from the Foodie Haven. We bring authentic Bengali cuisine to your table with passion and excellence.
                        </p>
                        <div className="pt-2">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                Order Now
                            </button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-5">
                        <h3 className="text-xl font-bold text-gray-900 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-600">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><a href="/" className="text-gray-600 hover:text-blue-600 transition-colors text-sm flex items-center gap-2 group">
                                <span className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                Home
                            </a></li>
                            <li><a href="/menu" className="text-gray-600 hover:text-blue-600 transition-colors text-sm flex items-center gap-2 group">
                                <span className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                Menu
                            </a></li>
                            <li><a href="/about" className="text-gray-600 hover:text-blue-600 transition-colors text-sm flex items-center gap-2 group">
                                <span className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                About Us
                            </a></li>
                            <li><a href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors text-sm flex items-center gap-2 group">
                                <span className="w-1 h-1 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                Contact
                            </a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-5">
                        <h3 className="text-xl font-bold text-gray-900 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-600">Contact Us</h3>
                        <ul className="space-y-4 text-gray-600 text-sm">
                            <li className="flex items-center gap-3 group">
                                <div className="bg-blue-50 p-2 rounded-full group-hover:bg-blue-100 transition-colors">
                                    <FaPhone className="text-blue-600" />
                                </div>
                                <span>+880 1234-567890</span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="bg-blue-50 p-2 rounded-full group-hover:bg-blue-100 transition-colors">
                                    <FaEnvelope className="text-blue-600" />
                                </div>
                                <span>info@foodiehaven.com</span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <div className="bg-blue-50 p-2 rounded-full group-hover:bg-blue-100 transition-colors">
                                    <FaMapMarkerAlt className="text-blue-600" />
                                </div>
                                <span>Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="space-y-5">
                        <h3 className="text-xl font-bold text-gray-900 relative pb-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-12 after:h-1 after:bg-blue-600">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="bg-blue-50 p-3 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-100 transition-all">
                                <FaFacebook size={18} />
                            </a>
                            <a href="#" className="bg-blue-50 p-3 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-100 transition-all">
                                <FaTwitter size={18} />
                            </a>
                            <a href="#" className="bg-blue-50 p-3 rounded-full text-gray-600 hover:text-blue-600 hover:bg-blue-100 transition-all">
                                <FaInstagram size={18} />
                            </a>
                        </div>
                        <div className="pt-4">
                            <p className="text-gray-500 text-xs">Subscribe to our newsletter for updates and special offers.</p>
                            <div className="flex mt-2">
                                <input type="email" placeholder="Your email" className="px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full" />
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md text-sm font-medium transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-200 mt-12 pt-8 text-center">
                    <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Foodie Haven. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 