import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("/api/auth/signup", formData);
            const data = response.data;

            if (data.success) {
                toast.success("Signup successful 🎉");
                setLoading(false);
                navigate("/sign-in");
            } else {
                toast.error(data.message || "Signup failed");
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            toast.error(
                error.response?.data?.message ||
                    error.message ||
                    "Something went wrong"
            );
            console.error(
                "Signup error:",
                error.response?.data || error.message
            );
        }
    };

    return (
        <div className="px-4 py-3 max-w-lg mx-auto min-h-screen flex flex-col justify-center">
            <div className="w-full">
                <div className="text-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-slate-700 mb-3">
                        Sign Up
                    </h1>
                    <div className="w-16 h-1 bg-teal-500 mx-auto"></div>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        required
                        className="border p-3 rounded-lg bg-white border-gray-300 w-full text-sm sm:text-base"
                        id="username"
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        className="border p-3 rounded-lg bg-white border-gray-300 w-full text-sm sm:text-base"
                        id="email"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        className="border p-3 rounded-lg bg-white border-gray-300 w-full text-sm sm:text-base"
                        id="password"
                        onChange={handleChange}
                    />
                    <button
                        className="bg-gray-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 transition w-full text-sm sm:text-base font-medium"
                        disabled={loading}
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>
                <div className="flex flex-wrap gap-1 mt-5 justify-center text-sm sm:text-base">
                    <p>Already have an account?</p>
                    <Link to="/sign-in">
                        <span className="text-teal-500 hover:text-teal-600 hover:underline transition-colors">
                            Sign In
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
