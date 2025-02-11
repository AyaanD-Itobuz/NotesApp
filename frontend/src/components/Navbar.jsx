import react from "react";
import notes from "../assets/notes.png";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";

export const Navbar = () => {

    const { isLogin, setIsLogin} = useContext(UserContext);
    console.log("Loggin: ",isLogin)

    function logout() {
        setIsLogin(false);
        localStorage.clear("accessToken")
        localStorage.clear("userName")
    }

    return (
        <>
            <nav className="dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="#" className="flex items-center space-x-3">
                        <img src={notes} className="h-10" alt="Notes Logo" />
                        <span className="self-center text-2xl font-bold  dark:text-white">
                            Notes..
                        </span>
                    </a>

                    <div className="hidden w-full md:block md:w-auto">
                        <ul className="flex flex-col font-large p-4 md:p-0 mt-4 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:dark:bg-gray-900 ">
                            {isLogin ? (
                                <>
                                    <li className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900  group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white ">
                                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                            Hello, {localStorage.getItem("userName")}
                                        </span>
                                    </li>
                                    <li>
                                        <button>
                                            <Link to="/" onClick={logout} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 cursor-pointer">
                                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">Logout</span>     
                                            </Link>
                                        </button>
                                    </li>
                                </>
                                
                            ) : (
                                <>
                                    <li>
                                        <Link to="Login" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 cursor-pointer">
                                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                        Login
                                        </span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="SignUp" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 cursor-pointer">
                                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                        SignUp
                                        </span>
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};


