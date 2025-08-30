import React from "react";

export default function About() {
    return (
        <div className="py-20 px-4 max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16">
                <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-800">
                    About <span className="text-teal-500">Boblox</span> Estate
                </h1>
                <div className="w-24 h-1 bg-teal-500 mx-auto mb-6"></div>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                    Your trusted partner in finding the perfect place to call
                    home
                </p>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
                <div className="lg:col-span-3 space-y-6">
                    <p className="text-lg text-slate-700 leading-relaxed">
                        Boblox Estate is a leading real estate agency that
                        specializes in helping clients buy, sell, and rent
                        properties in the most desirable neighborhoods. Our team
                        of experienced agents is dedicated to providing
                        exceptional service and making the buying and selling
                        process as smooth as possible.
                    </p>
                    <p className="mb-4 text-slate-700">
                        Our mission is to help our clients achieve their real
                        estate goals by providing expert advice, personalized
                        service, and a deep understanding of the local market.
                        Whether you are looking to buy, sell, or rent a
                        property, we are here to help you every step of the way.
                    </p>
                    <p className="mb-4 text-slate-700">
                        Our team of agents has a wealth of experience and
                        knowledge in the real estate industry, and we are
                        committed to providing the highest level of service to
                        our clients. We believe that buying or selling a
                        property should be an exciting and rewarding experience,
                        and we are dedicated to making that a reality for each
                        and every one of our clients.
                    </p>
                </div>
            </div>

            {/* Additional sections with minimal styling */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-700 mb-4">
                        Why Choose Boblox Estate?
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <span className="text-teal-500 font-semibold">
                                •
                            </span>
                            <span className="text-slate-700">
                                Trusted by thousands of satisfied clients
                            </span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-teal-500 font-semibold">
                                •
                            </span>
                            <span className="text-slate-700">
                                Expert knowledge of local markets
                            </span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-teal-500 font-semibold">
                                •
                            </span>
                            <span className="text-slate-700">
                                Personalized service for every client
                            </span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-teal-500 font-semibold">
                                •
                            </span>
                            <span className="text-slate-700">
                                Transparent and honest communication
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-slate-700 mb-4">
                        Our Services
                    </h2>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <span className="text-teal-500 font-semibold">
                                •
                            </span>
                            <span className="text-slate-700">
                                Residential property sales
                            </span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-teal-500 font-semibold">
                                •
                            </span>
                            <span className="text-slate-700">
                                Rental property management
                            </span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-teal-500 font-semibold">
                                •
                            </span>
                            <span className="text-slate-700">
                                Investment property consulting
                            </span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-teal-500 font-semibold">
                                •
                            </span>
                            <span className="text-slate-700">
                                Market analysis and valuation
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 bg-slate-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-slate-700 mb-4">
                    Ready to Get Started?
                </h2>
                <p className="text-slate-700 mb-4">
                    Contact us today to discover how Boblox Estate can help you
                    achieve your real estate goals. Our experienced team is
                    ready to guide you through every step of your property
                    journey.
                </p>
                <p className="text-slate-600 text-sm">
                    Visit our search page to browse available properties or get
                    in touch with our agents for personalized assistance.
                </p>
            </div>
        </div>
    );
}
