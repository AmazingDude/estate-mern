import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
    signInStart,
    signInSuccess,
    signInFailure,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(signInStart());
        try {
            const response = await axios.post("/api/auth/signin", formData);
            const data = response.data;
            console.log(data);
            if (data.success) {
                toast.success("Logged in successfully! 🎉");
                dispatch(signInSuccess(data.user));
                navigate("/");
            } else {
                toast.error(data.message || "Signup failed");
                dispatch(signInFailure(data.message));
            }
        } catch (error) {
            dispatch(signInFailure(error.message));
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
                        Sign In
                    </h1>
                    <div className="w-16 h-1 bg-teal-500 mx-auto"></div>
                </div>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                        {loading ? "Signing In..." : "Sign In"}
                    </button>
                    <OAuth />
                </form>
                <div className="flex flex-wrap gap-1 mt-5 justify-center text-sm sm:text-base">
                    <p>Don't have an account?</p>
                    <Link to="/sign-up">
                        <span className="text-teal-500 hover:text-teal-600 hover:underline transition-colors">
                            Sign Up
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
