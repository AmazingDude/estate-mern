import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listing }) {
    return (
        <div className="bg-white border border-slate-200 hover:border-teal-300 hover:shadow-xl transition-all duration-300 overflow-hidden rounded-xl w-full max-w-[320px] group">
            <Link to={`/listing/${listing._id}`}>
                <div className="relative overflow-hidden">
                    <img
                        src={
                            listing.imageUrls[0] ||
                            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
                        }
                        alt="listing cover"
                        className="h-[200px] w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {listing.offer && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
                            Special Offer
                        </div>
                    )}
                    <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-md text-xs font-medium capitalize">
                        {listing.type}
                    </div>
                </div>
                <div className="p-4 space-y-3">
                    <h3 className="text-lg font-semibold text-slate-800 line-clamp-1 group-hover:text-teal-600 transition-colors">
                        {listing.name}
                    </h3>

                    <div className="flex items-center gap-2">
                        <MdLocationOn className="h-4 w-4 text-teal-500 flex-shrink-0" />
                        <p className="text-sm text-slate-600 line-clamp-1">
                            {listing.address}
                        </p>
                    </div>

                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {listing.description}
                    </p>

                    <div className="border-t border-slate-100 pt-3">
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-slate-800">
                                $
                                {listing.offer
                                    ? listing.discountPrice.toLocaleString(
                                          "en-US"
                                      )
                                    : listing.regularPrice.toLocaleString(
                                          "en-US"
                                      )}
                                {listing.type === "rent" && (
                                    <span className="text-sm font-normal text-slate-600">
                                        {" "}
                                        /month
                                    </span>
                                )}
                            </p>
                            {listing.offer && (
                                <p className="text-sm text-slate-500 line-through">
                                    $
                                    {listing.regularPrice.toLocaleString(
                                        "en-US"
                                    )}
                                </p>
                            )}
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-slate-600">
                            <div className="flex items-center gap-1 text-xs font-medium">
                                <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                                {listing.bedrooms}{" "}
                                {listing.bedrooms === 1 ? "bed" : "beds"}
                            </div>
                            <div className="flex items-center gap-1 text-xs font-medium">
                                <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                                {listing.bathrooms}{" "}
                                {listing.bathrooms === 1 ? "bath" : "baths"}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}
