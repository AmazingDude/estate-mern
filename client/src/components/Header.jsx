import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("searchTerm", searchTerm);
        const searchQuery = urlParams.toString();

        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get("searchTerm");
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    return (
        <header className="bg-slate-900 shadow-lg border-b border-slate-700">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
                <Link to="/" className="group">
                    <h1 className="font-bold text-lg sm:text-2xl flex items-center gap-1">
                        <span className="text-white group-hover:text-slate-200 transition-colors">
                            Boblox
                        </span>
                        <span className="text-teal-400 group-hover:text-teal-300 transition-colors">
                            Estate
                        </span>
                    </h1>
                </Link>

                <form
                    className="bg-slate-700 border border-slate-600 p-3 rounded-xl flex items-center gap-2 hover:bg-slate-600 transition-colors group"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        placeholder="Search properties..."
                        className="bg-transparent text-slate-200 placeholder-slate-400 outline-none w-32 sm:w-64 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="p-1 hover:bg-slate-500 rounded-lg transition-colors">
                        <FaSearch
                            className="text-slate-300 group-hover:text-white transition-colors"
                            size={16}
                        />
                    </button>
                </form>

                <ul className="flex items-center gap-6">
                    <Link to="/" className="group">
                        <li className="hidden sm:block text-slate-300 hover:text-white transition-colors cursor-pointer font-medium">
                            Home
                        </li>
                    </Link>
                    <Link to="/about" className="group">
                        <li className="hidden sm:block text-slate-300 hover:text-white transition-colors cursor-pointer font-medium">
                            About
                        </li>
                    </Link>
                    <Link to="/profile" className="group">
                        {currentUser ? (
                            <div className="flex items-center gap-2">
                                <img
                                    src={currentUser.avatar}
                                    alt="profile"
                                    className="rounded-full h-8 w-8 object-cover border-2 border-slate-600 group-hover:border-teal-400 transition-colors"
                                />
                                <span className="hidden lg:block text-slate-300 group-hover:text-white transition-colors text-sm">
                                    {currentUser.username}
                                </span>
                            </div>
                        ) : (
                            <li className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors cursor-pointer font-medium">
                                Sign In
                            </li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    );
}

export default Header;
