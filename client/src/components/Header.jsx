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
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3 sm:p-4">
                <Link to="/" className="group flex-shrink-0">
                    <h1 className="font-bold text-sm sm:text-lg md:text-2xl flex items-center gap-1">
                        <span className="text-white group-hover:text-slate-200 transition-colors">
                            Boblox
                        </span>
                        <span className="text-teal-400 group-hover:text-teal-300 transition-colors">
                            Estate
                        </span>
                    </h1>
                </Link>

                <form
                    className="bg-slate-700 border border-slate-600 p-2 sm:p-3 rounded-xl flex items-center gap-1 sm:gap-2 hover:bg-slate-600 transition-colors group flex-shrink min-w-0"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent text-slate-200 placeholder-slate-400 outline-none w-20 sm:w-32 md:w-64 text-xs sm:text-sm min-w-0"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="p-1 hover:bg-slate-500 rounded-lg transition-colors flex-shrink-0">
                        <FaSearch
                            className="text-slate-300 group-hover:text-white transition-colors"
                            size={14}
                        />
                    </button>
                </form>

                <ul className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-shrink-0">
                    <Link to="/" className="group">
                        <li className="hidden md:block text-slate-300 hover:text-white transition-colors cursor-pointer font-medium text-sm">
                            Home
                        </li>
                    </Link>
                    <Link to="/about" className="group">
                        <li className="hidden md:block text-slate-300 hover:text-white transition-colors cursor-pointer font-medium text-sm">
                            About
                        </li>
                    </Link>
                    <Link to="/profile" className="group">
                        {currentUser ? (
                            <div className="flex items-center gap-1 sm:gap-2">
                                <img
                                    src={currentUser.avatar}
                                    alt="profile"
                                    className="rounded-full h-7 w-7 sm:h-8 sm:w-8 object-cover border-2 border-slate-600 group-hover:border-teal-400 transition-colors"
                                />
                                <span className="hidden lg:block text-slate-300 group-hover:text-white transition-colors text-xs sm:text-sm max-w-[80px] truncate">
                                    {currentUser.username}
                                </span>
                            </div>
                        ) : (
                            <li className="bg-teal-500 text-white px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-teal-600 transition-colors cursor-pointer font-medium text-xs sm:text-sm whitespace-nowrap">
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
