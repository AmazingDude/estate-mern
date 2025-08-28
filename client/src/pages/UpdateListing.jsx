import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UpdateListing() {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: "",
        description: "",
        address: "",
        type: "rent",
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });
    const navigate = useNavigate();
    const params = useParams();

    // Upload images
    const handleImageSubmit = async () => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploading(true);
            setImageUploadError(null);

            try {
                const promises = [];
                for (let i = 0; i < files.length; i++) {
                    promises.push(storeImage(files[i]));
                }

                const urls = await Promise.all(promises);

                setFormData((prev) => ({
                    ...prev,
                    imageUrls: [...prev.imageUrls, ...urls],
                }));

                setUploading(false);
            } catch (err) {
                console.error(err);
                toast.error("Image upload failed");
                setImageUploadError(
                    "Image upload failed (check file size & type)"
                );
                setUploading(false);
            }
        } else {
            setImageUploadError(
                "You can only upload up to 6 images per listing"
            );
        }
    };

    // Cloudinary upload function
    const storeImage = async (file) => {
        const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "listings_preset");

        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${
                import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            }/image/upload`,
            formData
        );

        return res.data.secure_url; // Cloudinary returns the hosted image URL
    };

    const handleChange = (e) => {
        if (e.target.id === "sale" || e.target.id === "rent") {
            setFormData({
                ...formData,
                type: e.target.id,
            });
        }

        if (
            e.target.id === "parking" ||
            e.target.id === "furnished" ||
            e.target.id === "offer"
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            });
        }

        if (
            e.target.type === "number" ||
            e.target.type === "text" ||
            e.target.type === "textarea"
        ) {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            });
        }
    };

    const handleRemovalImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((url, i) => i !== index),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1)
                return setError("You must upload at least one image");
            if (+formData.regularPrice < +formData.discountPrice)
                return setError(
                    "Discount price must be lower than regular price"
                );
            setLoading(true);
            setError(false);

            const response = await axios.post(
                `/api/listing/update/${params.listingId}`,
                {
                    ...formData,
                    userRef: currentUser._id,
                },
                {
                    withCredentials: true,
                }
            );

            const data = response.data;
            setLoading(false);
            if (data.success !== true) {
                setError(data.message);
            }
            navigate(`/listing/${data._id}`);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchListing = async () => {
            const listingId = params.listingId;
            const res = await axios.get(`/api/listing/get/${listingId}`);
            const data = res.data;
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setFormData(data);
        };

        fetchListing();
    }, []);

    return (
        <main className="p-3 max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">
                Update listing
            </h1>
            <form
                className="flex flex-col sm:flex-row gap-4"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col gap-4 flex-1">
                    <input
                        type="text"
                        placeholder="Name"
                        className="border p-3 rounded-lg bg-white"
                        id="name"
                        maxLength="62"
                        minLength="10"
                        required
                        onChange={handleChange}
                        value={formData.name}
                    />
                    <textarea
                        type="text"
                        placeholder="Description"
                        className="border p-3 rounded-lg bg-white"
                        id="description"
                        required
                        onChange={handleChange}
                        value={formData.description}
                    />
                    <input
                        type="text"
                        placeholder="Address"
                        className="border p-3 rounded-lg bg-white"
                        id="address"
                        required
                        onChange={handleChange}
                        value={formData.address}
                    />
                    <div className="flex gap-6 flex-wrap">
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="sale"
                                className="w-5"
                                onChange={handleChange}
                                checked={formData.type === "sale"}
                            />
                            <span>Sell</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="rent"
                                className="w-5"
                                onChange={handleChange}
                                checked={formData.type === "rent"}
                            />
                            <span>Rent</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="parking"
                                className="w-5"
                                onChange={handleChange}
                                checked={formData.parking}
                            />
                            <span>Parking Spot</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="furnished"
                                className="w-5"
                                onChange={handleChange}
                                checked={formData.furnished}
                            />
                            <span>Furnished</span>
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="checkbox"
                                id="offer"
                                className="w-5"
                                onChange={handleChange}
                                checked={formData.offer}
                            />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                id="bedrooms"
                                min="1"
                                max="10"
                                required
                                className="p-3 border-gray-400 border bg-white rounded-lg"
                                onChange={handleChange}
                                value={formData.bedrooms}
                            />
                            <p>Beds</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                id="bathrooms"
                                min="1"
                                max="10"
                                required
                                className="p-3 border-gray-400 border bg-white rounded-lg"
                                onChange={handleChange}
                                value={formData.bathrooms}
                            />

                            <p>Baths</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="number"
                                id="regularPrice"
                                min="50"
                                max="1000000"
                                required
                                className="p-3 border-gray-400 border bg-white rounded-lg"
                                onChange={handleChange}
                                value={formData.regularPrice}
                            />
                            <div className="flex flex-col items-center">
                                <p>Regular Price</p>
                                <span className="text-xs">($ / month)</span>
                            </div>
                        </div>
                        {formData.offer && (
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    id="discountPrice"
                                    min="0"
                                    max="10000000"
                                    required
                                    className="p-3 border-gray-400 border bg-white rounded-lg"
                                    onChange={handleChange}
                                    value={formData.discountPrice}
                                />
                                <div className="flex flex-col items-center">
                                    <p>Discounted Price</p>
                                    <span className="text-xs">($ / month)</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <p className="font-semibold ">
                        Images:{" "}
                        <span className="font-normal text-gray-600 ml-2">
                            The first image will be the cover (max: 6)
                        </span>
                    </p>
                    <div className="flex gap-4">
                        <input
                            onChange={(e) => setFiles(e.target.files)}
                            type="file"
                            id="images"
                            accept="image/*"
                            multiple
                            className="p-3 border-gray-300 rounded w-full border cursor-pointer"
                        />
                        <button
                            className="p-3 text-green-700 border border-green-700 rounded hover:bg-green-700 hover:text-white transition disabled:opacity-80 cursor-pointer"
                            onClick={handleImageSubmit}
                            disabled={uploading}
                            type="button"
                        >
                            {uploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                    <p className="text-red-700 text-sm">
                        {imageUploadError && imageUploadError}
                    </p>
                    {formData.imageUrls.length > 0 &&
                        formData.imageUrls.map((url, index) => (
                            <div
                                key={url}
                                className="flex justify-between p-3 border items-center"
                            >
                                <img
                                    src={url}
                                    alt="listing-image"
                                    className="w-20 h-20 object-contain rounded-lg"
                                />
                                <button
                                    className="p-3 text-red-700 rounded-lg hover:bg-red-700 hover:text-white transition cursor-pointer"
                                    type="button"
                                    onClick={() => handleRemovalImage(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    <button
                        className="p-3 bg-slate-800 rounded-lg text-white uppercase hover:opacity-90 disabled:opacity-80 cursor-pointer"
                        disabled={loading || uploading}
                    >
                        {loading ? "Updating..." : "Updating Listing"}
                    </button>
                    {error && <p className="text-red-700 text-sm">{error}</p>}
                </div>
            </form>
        </main>
    );
}
