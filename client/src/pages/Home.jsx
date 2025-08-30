import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

export default function Home() {
    const [offerListings, setOfferListings] = useState([]);
    const [saleListings, setSaleListings] = useState([]);
    const [rentListings, setRentListings] = useState([]);
    SwiperCore.use([Navigation]);
    console.log(offerListings);
    useEffect(() => {
        const fetchOfferListings = async () => {
            try {
                const res = await fetch("/api/listing/get?offer=true&limit=4");
                const data = await res.json();
                setOfferListings(data);
                fetchRentListings();
            } catch (error) {
                console.log(error);
            }
        };
        const fetchRentListings = async () => {
            try {
                const res = await fetch("/api/listing/get?type=rent&limit=4");
                const data = await res.json();
                setRentListings(data);
                fetchSaleListings();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchSaleListings = async () => {
            try {
                const res = await fetch("/api/listing/get?type=sale&limit=4");
                const data = await res.json();
                setSaleListings(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchOfferListings();
    }, []);
    return (
        <div>
            {/* Hero Section */}
            <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
                <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
                    Find your next{" "}
                    <span className="relative inline-block">
                        <span className="text-teal-500 relative z-10">
                            perfect
                        </span>
                        <span className="absolute top-1 left-1 text-white -z-10">
                            perfect
                        </span>
                    </span>
                    <br />
                    place with ease
                </h1>
                <div className="w-24 h-1 bg-teal-500 mb-2"></div>
                <div className="text-gray-600 text-lg sm:text-xl max-w-2xl">
                    Boblox Estate is the best place to find your next perfect
                    place to live. We have a wide range of properties for you to
                    choose from.
                </div>
                <Link
                    to={"/search"}
                    className="inline-flex items-center gap-2 text-sm sm:text-base bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600 transition-colors font-medium w-fit"
                >
                    Let's get started
                    <span>→</span>
                </Link>
            </div>
            {/* swiper */}
            <Swiper navigation>
                {offerListings &&
                    offerListings.length > 0 &&
                    offerListings.map((listing) => (
                        <SwiperSlide>
                            <div
                                style={{
                                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                                    backgroundSize: "cover",
                                }}
                                className="h-[500px]"
                                key={listing._id}
                            ></div>
                        </SwiperSlide>
                    ))}
            </Swiper>
            {/* listing results for offer, sale and rent */}
            <div className="max-w-6xl mx-auto p-3 flex flex-col gap-12 my-16">
                {offerListings && offerListings.length > 0 && (
                    <div className="bg-white rounded-xl p-6 border border-slate-200">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-semibold text-slate-700">
                                    Recent Offers
                                </h2>
                                <div className="w-16 h-1 bg-teal-500 mt-2"></div>
                            </div>
                            <Link
                                className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
                                to={"/search?offer=true"}
                            >
                                View all offers →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
                            {offerListings.map((listing) => (
                                <ListingItem
                                    listing={listing}
                                    key={listing._id}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {rentListings && rentListings.length > 0 && (
                    <div className="bg-white rounded-xl p-6 border border-slate-200">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-semibold text-slate-700">
                                    Places for Rent
                                </h2>
                                <div className="w-16 h-1 bg-teal-500 mt-2"></div>
                            </div>
                            <Link
                                className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
                                to={"/search?type=rent"}
                            >
                                View all rentals →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
                            {rentListings.map((listing) => (
                                <ListingItem
                                    listing={listing}
                                    key={listing._id}
                                />
                            ))}
                        </div>
                    </div>
                )}
                {saleListings && saleListings.length > 0 && (
                    <div className="bg-white rounded-xl p-6 border border-slate-200">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-semibold text-slate-700">
                                    Places for Sale
                                </h2>
                                <div className="w-16 h-1 bg-teal-500 mt-2"></div>
                            </div>
                            <Link
                                className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
                                to={"/search?type=sale"}
                            >
                                View all sales →
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
                            {saleListings.map((listing) => (
                                <ListingItem
                                    listing={listing}
                                    key={listing._id}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
