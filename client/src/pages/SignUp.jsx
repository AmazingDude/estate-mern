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
				error.response?.data?.message || error.message || "Something went wrong"
			);
			console.error("Signup error:", error.response?.data || error.message);
		}
	};

	return (
		<div className="p-3 max-w-lg mx-auto">
			<h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="username"
					required
					className="border p-3 rounded-lg bg-white border-gray-300"
					id="username"
					onChange={handleChange}
				/>
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
					{loading ? "Please wait..." : "Sign Up"}
				</button>
			</form>
			<div className="flex gap-2 mt-5">
				<p>Already have an account?</p>
				<Link to="/sign-in">
					<span className="text-blue-500">Sign in</span>
				</Link>
			</div>
		</div>
	);
}
