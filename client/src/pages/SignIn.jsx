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
				error.response?.data?.message || error.message || "Something went wrong"
			);
			console.error("Signup error:", error.response?.data || error.message);
		}
	};

	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<input
					type="email"
					placeholder="email"
					required
					className="border p-3 rounded-lg bg-white border-gray-300"
					id="email"
					onChange={handleChange}
				/>
				<input
					type="password"
					placeholder="password"
					required
					className="border p-3 rounded-lg bg-white border-gray-300"
					id="password"
					onChange={handleChange}
				/>
				<button
					className="bg-gray-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80 transition"
					disabled={loading}
				>
					{loading ? "Please wait..." : "Sign In"}
				</button>
			</form>
			<div className="flex gap-2 mt-5">
				<p>Don't have an account?</p>
				<Link to="/sign-in">
					<span className="text-blue-500">Sign up</span>
				</Link>
			</div>
		</div>
	);
}
