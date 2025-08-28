import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import {
    updateUserStart,
    updateUserFailure,
    updateUserSuccess,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signoutUserStart,
} from "../redux/user/userSlice";

function Profile() {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const [userListings, setUserListings] = useState([]);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [showListingsError, setShowListingsError] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        avatar: "",
        password: "",
    });

    // preload formData with currentUser data
    useEffect(() => {
        if (currentUser) {
            setFormData({
                username: currentUser.username || "",
                email: currentUser.email || "",
                avatar: currentUser.avatar || "",
                password: "",
            });
        }
    }, [currentUser]);

    // watch file input
    useEffect(() => {
        if (file) handleFileUpload(file);
    }, [file]);

    const handleFileUpload = async (file) => {
        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", "avatars_preset"); // Cloudinary unsigned preset
        form.append("folder", "avatars");

        try {
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${
                    import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
                }/image/upload`,
                form,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const percent = Math.round(
                                (progressEvent.loaded * 100) /
                                    progressEvent.total
                            );
                            setFilePerc(percent);
                        }
                    },
                }
            );

            setFormData((prev) => ({ ...prev, avatar: res.data.secure_url }));
            setFileUploadError(false);
        } catch (error) {
            toast.error(error.message);
            setFileUploadError(true);
        }
    };

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `/api/user/update/${currentUser._id}`,
                formData,
                { headers: { "Content-Type": "application/json" } }
            );

            toast.success("Profile updated!");
            dispatch(updateUserSuccess(res.data));
            setUpdateSuccess(true);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            dispatch(updateUserFailure(error.message));
        }
    };

    const handleDeleteUser = async () => {
        if (!currentUser) return;
        try {
            dispatch(deleteUserStart());
            const res = await axios.delete(
                `/api/user/delete/${currentUser._id}`,
                { withCredentials: true }
            );
            // console.log("Delete response:", res.data);
            const data = res.data;
            if (!data.success) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
            window.location.href = "/signin";
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleSignOut = async () => {
        try {
            dispatch(signoutUserStart());
            const res = await axios.get("/api/auth/signout");
            const data = res.data;
            if (!data.success) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));
        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handleShowListings = async () => {
        try {
            setShowListingsError(false);
            const res = await axios.get(
                `/api/user/listings/${currentUser._id}`,
                {
                    withCredentials: true,
                }
            );

            const data = res.data;
            // console.log("Show listings response:", data);

            if (data.success !== true) {
                setShowListingsError(true);
                return;
            }

            setUserListings(data.data);
        } catch (error) {
            console.error("Show listings error:", error);
            setShowListingsError(true);
        }
    };

    const handleListingDelete = async (listingId) => {
        try {
            const res = await axios.delete(`/api/listing/delete/${listingId}`, {
                withCredentials: true,
            });
            const data = res.data;
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setUserListings((prev) =>
                prev.filter((listing) => listing._id !== listingId)
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="file"
                    ref={fileRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                {/* Avatar */}
                <img
                    src={
                        formData.avatar ||
                        currentUser?.avatar ||
                        "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                    }
                    alt="profile"
                    className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
                    onClick={() => fileRef.current.click()}
                />

                {/* Upload Status */}
                <p className="text-sm self-center">
                    {fileUploadError ? (
                        <span className="text-red-700">
                            Error uploading image
                        </span>
                    ) : filePerc > 0 && filePerc < 100 ? (
                        <span className="text-neutral-700">{`Uploading ${filePerc}%`}</span>
                    ) : filePerc === 100 ? (
                        <span className="text-green-700">
                            Successfully Uploaded!
                        </span>
                    ) : (
                        ""
                    )}
                </p>

                {/* Controlled Inputs */}
                <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                    placeholder="Username"
                    defaultValue={currentUser.username}
                />
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                    placeholder="Email"
                    defaultValue={currentUser.email}
                />
                <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                    placeholder="Password"
                />

                <button
                    className="bg-neutral-700 text-white rounded-lg p-3 uppercase hover:opacity-90 disabled:opacity-80"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update"}
                </button>
                <Link
                    to={"/create-listing"}
                    className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
                >
                    Create Listing
                </Link>
            </form>

            <div className="flex justify-between mt-5">
                <span
                    onClick={handleDeleteUser}
                    className="text-red-700 cursor-pointer"
                >
                    Delete Account
                </span>
                <span
                    className="text-neutral-900 cursor-pointer"
                    onClick={handleSignOut}
                >
                    Sign Out
                </span>
            </div>
            <p className="text-red-700 mt-5">{error ? error : ""}</p>
            <p className="text-red-700 mt-5">
                {updateSuccess ? "User is updated successfully!" : ""}
            </p>
            <button
                className="text-teal-700 w-full cursor-pointer"
                onClick={handleShowListings}
            >
                Show Listings
            </button>
            <p className="text-red-700 mt-5">
                {showListingsError ? "Error while showing the listings" : ""}
            </p>
            {userListings && userListings.length > 0 && (
                <div className="flex flex-col gap-4">
                    <h1 className="text-center mt-7 text-2xl font-semibold">
                        Your Listings
                    </h1>
                    {userListings.map((listing) => (
                        <div
                            className="border rounded-lg p-3 flex justify-between items-center gap-4"
                            key={listing._id}
                        >
                            <Link to={`/listing/${listing._id}`}>
                                <img
                                    src={listing.imageUrls[0]}
                                    alt="listing image"
                                    className="w-16 h-16 object-cover rounded-lg"
                                />
                            </Link>
                            <Link
                                to={`/listing/${listing._id}`}
                                className="text-slate-700 font-semibold flex-1 hover:underline truncate"
                            >
                                <p>{listing.name}</p>
                            </Link>
                            <div className="flex flex-col items-center">
                                <Link to={`/update-listing/${listing._id}`}>
                                    <button className="rounded transition cursor-pointer text-green-700 px-3 py-1.5 hover:text-white hover:bg-green-700">
                                        Edit
                                    </button>
                                </Link>
                                <button
                                    className="rounded transition cursor-pointer text-red-700 px-3 py-1.5 hover:text-white hover:bg-red-700"
                                    onClick={() =>
                                        handleListingDelete(listing._id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Profile;
