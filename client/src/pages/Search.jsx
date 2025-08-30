import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: "",
        type: "all",
        parking: false,
        furnished: false,
        offer: false,
        sort: "created_at",
        order: "desc",
    });

    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get("searchTerm");
        const typeFromUrl = urlParams.get("type");
        const parkingFromUrl = urlParams.get("parking");
        const furnishedFromUrl = urlParams.get("furnished");
        const offerFromUrl = urlParams.get("offer");
        const sortFromUrl = urlParams.get("sort");
        const orderFromUrl = urlParams.get("order");

        if (
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setSidebardata({
                searchTerm: searchTermFromUrl || "",
                type: typeFromUrl || "all",
                parking: parkingFromUrl === "true" ? true : false,
                furnished: furnishedFromUrl === "true" ? true : false,
                offer: offerFromUrl === "true" ? true : false,
                sort: sortFromUrl || "created_at",
                order: orderFromUrl || "desc",
            });
        }

        const fetchListings = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            if (data.length > 8) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
            setListings(data);
            setLoading(false);
        };

        fetchListings();
    }, [location.search]);

    const handleChange = (e) => {
        if (
            e.target.id === "all" ||
            e.target.id === "rent" ||
            e.target.id === "sale"
        ) {
            setSidebardata({ ...sidebardata, type: e.target.id });
        }

        if (e.target.id === "searchTerm") {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value });
        }

        if (
            e.target.id === "parking" ||
            e.target.id === "furnished" ||
            e.target.id === "offer"
        ) {
            setSidebardata({
                ...sidebardata,
                [e.target.id]:
                    e.target.checked || e.target.checked === "true"
                        ? true
                        : false,
            });
        }

        if (e.target.id === "sort_order") {
            const sort = e.target.value.split("_")[0] || "created_at";

            const order = e.target.value.split("_")[1] || "desc";

            setSidebardata({ ...sidebardata, sort, order });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set("searchTerm", sidebardata.searchTerm);
        urlParams.set("type", sidebardata.type);
        urlParams.set("parking", sidebardata.parking);
        urlParams.set("furnished", sidebardata.furnished);
        urlParams.set("offer", sidebardata.offer);
        urlParams.set("sort", sidebardata.sort);
        urlParams.set("order", sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const onShowMoreClick = async () => {
        const numberOfListings = listings.length;
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set("startIndex", startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.length < 9) {
            setShowMore(false);
        }
        setListings([...listings, ...data]);
    };
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-slate-50">
            {/* Sidebar */}
            <div className="md:w-80 bg-white border-r border-slate-200 p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                        Search Filters
                    </h2>
                    <div className="w-16 h-1 bg-teal-500"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">
                            Search Term
                        </label>
                        <input
                            type="text"
                            id="searchTerm"
                            placeholder="Search properties..."
                            className="w-full border border-slate-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                            value={sidebardata.searchTerm}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-700">
                            Property Type
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="all"
                                    className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                                    onChange={handleChange}
                                    checked={sidebardata.type === "all"}
                                />
                                <span className="text-sm">All</span>
                            </label>
                            <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="rent"
                                    className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                                    onChange={handleChange}
                                    checked={sidebardata.type === "rent"}
                                />
                                <span className="text-sm">Rent</span>
                            </label>
                            <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="sale"
                                    className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                                    onChange={handleChange}
                                    checked={sidebardata.type === "sale"}
                                />
                                <span className="text-sm">Sale</span>
                            </label>
                            <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="offer"
                                    className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                                    onChange={handleChange}
                                    checked={sidebardata.offer}
                                />
                                <span className="text-sm">Offers</span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-slate-700">
                            Amenities
                        </label>
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="parking"
                                    className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                                    onChange={handleChange}
                                    checked={sidebardata.parking}
                                />
                                <span className="text-sm">
                                    Parking Available
                                </span>
                            </label>
                            <label className="flex items-center gap-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="furnished"
                                    className="w-4 h-4 text-teal-600 focus:ring-teal-500"
                                    onChange={handleChange}
                                    checked={sidebardata.furnished}
                                />
                                <span className="text-sm">Furnished</span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">
                            Sort By
                        </label>
                        <select
                            onChange={handleChange}
                            defaultValue={"created_at_desc"}
                            id="sort_order"
                            className="w-full border border-slate-300 rounded-lg p-3 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        >
                            <option value="regularPrice_desc">
                                Price: High to Low
                            </option>
                            <option value="regularPrice_asc">
                                Price: Low to High
                            </option>
                            <option value="createdAt_desc">Latest</option>
                            <option value="createdAt_asc">Oldest</option>
                        </select>
                    </div>

                    <button className="w-full bg-teal-500 text-white p-3 rounded-lg hover:bg-teal-600 transition-colors font-medium">
                        Apply Filters
                    </button>
                </form>
            </div>

            {/* Results */}
            <div className="flex-1 p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-semibold text-slate-800 mb-2">
                        Search Results
                    </h1>
                    <div className="w-16 h-1 bg-teal-500"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
                    {!loading && listings.length === 0 && (
                        <div className="col-span-full text-center py-12">
                            <div className="text-6xl mb-4">🏠</div>
                            <h3 className="text-xl font-semibold text-slate-700 mb-2">
                                No Properties Found
                            </h3>
                            <p className="text-slate-600">
                                Try adjusting your search filters to find more
                                properties.
                            </p>
                        </div>
                    )}

                    {loading && (
                        <div className="col-span-full text-center py-12">
                            <p className="text-slate-600">
                                Loading properties...
                            </p>
                        </div>
                    )}

                    {!loading &&
                        listings &&
                        listings.map((listing) => (
                            <ListingItem key={listing._id} listing={listing} />
                        ))}
                </div>

                {showMore && (
                    <div className="text-center mt-8">
                        <button
                            onClick={onShowMoreClick}
                            className="bg-slate-100 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-200 transition-colors font-medium"
                        >
                            Load More Properties
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
