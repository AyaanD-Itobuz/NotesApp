import react from "react";
import notes from "../assets/notes.png";
import { Link } from "react-router-dom";

export const Navbar = () => {
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
                            <li>
                                <Link to="Login" className="block py-2 px-3 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 cursor-pointer">Login</Link>
                            </li>
                            <li>
                                <Link to="SignUp" className="block py-2 px-3  md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 cursor-pointer">SignUp</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
};
