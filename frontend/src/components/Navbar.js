import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4 flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold">Portfolio</div>
            <div className="flex flex-col md:flex-row gap-4 mt-2 md:mt-0">
                <Link to="/" className="hover:text-gray-300">Home</Link>
                <Link to="/about" className="hover:text-gray-300">About Me</Link>
                <Link to="/projects" className="hover:text-gray-300">Projects</Link>
                <Link to="/blogs" className="hover:text-gray-300">Blogs</Link>
                <Link to="/services" className="hover:text-gray-300">Services</Link>
                <Link to="/testimonials" className="hover:text-gray-300">Testimonials</Link>
                <Link to="/contact" className="hover:text-gray-300">Contact</Link>
                <Link to="/admin" className="hover:text-gray-300">Admin</Link>
            </div>
        </nav>
    );
};

export default Navbar;
