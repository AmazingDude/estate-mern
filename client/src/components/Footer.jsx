import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-700">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white">
                            <span className="text-white">Boblox</span>
                            <span className="text-teal-400">Estate</span>
                        </h3>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Your trusted partner in finding the perfect place to
                            call home. We make real estate simple and accessible
                            for everyone.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-white">
                            Quick Links
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-teal-400 transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className="hover:text-teal-400 transition-colors"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/search"
                                    className="hover:text-teal-400 transition-colors"
                                >
                                    Properties
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/profile"
                                    className="hover:text-teal-400 transition-colors"
                                >
                                    Profile
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Property Types */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-white">
                            Property Types
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    to="/search?type=sale"
                                    className="hover:text-teal-400 transition-colors"
                                >
                                    For Sale
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/search?type=rent"
                                    className="hover:text-teal-400 transition-colors"
                                >
                                    For Rent
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/search?offer=true"
                                    className="hover:text-teal-400 transition-colors"
                                >
                                    Special Offers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-white">Contact</h4>
                        <div className="space-y-2 text-sm">
                            <p>📧 info@bobloxestate.com</p>
                            <p>📞 (555) 123-4567</p>
                            <p>📍 123 Real Estate St, City, State 12345</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
                    <p>&copy; 2025 Boblox Estate. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
