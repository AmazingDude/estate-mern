import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
	return (
		<header className="bg-zinc-800 shadow-md">
			<div className="flex justify-between items-center max-w-6xl mx-auto p-3">
				<Link to="/">
					<h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
						<span className="text-zinc-200">Boblox</span>
						<span className="text-zinc-400">Estate</span>
					</h1>
				</Link>
				<form className="bg-zinc-600 p-3 rounded-lg flex items-center">
					<input
						type="text"
						placeholder="Search"
						className="bg-transparent text-zinc-300 outline-none w-24 sm:w-64"
					/>
					<FaSearch color="white" />
				</form>
				<ul className="flex gap-4">
					<Link to="/">
						<li className="hidden sm:inline text-slate-200 hover:underline cursor-pointer">
							Home
						</li>
					</Link>
					<Link to="/about">
						<li className="hidden sm:inline text-slate-200 hover:underline cursor-pointer">
							About
						</li>
					</Link>
					<Link to="/sign-in">
						<li className="sm:inline text-slate-200 hover:underline cursor-pointer">
							Sign in
						</li>
					</Link>
				</ul>
			</div>
		</header>
	);
}

export default Header;
