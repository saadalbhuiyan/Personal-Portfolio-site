import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">Welcome to My Portfolio</h1>
            <p className="text-lg text-gray-700 text-center mb-8">Explore my work, skills, and experiences below!</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link to="/about" className="p-4 bg-white shadow-md rounded-lg hover:scale-105 transition-transform">
                    <h2 className="text-2xl font-semibold text-center">About Me</h2>
                    <p className="text-gray-600 text-center">Learn about my background and skills.</p>
                </Link>
                <Link to="/projects" className="p-4 bg-white shadow-md rounded-lg hover:scale-105 transition-transform">
                    <h2 className="text-2xl font-semibold text-center">Projects</h2>
                    <p className="text-gray-600 text-center">Check out my recent projects.</p>
                </Link>
                <Link to="/blogs" className="p-4 bg-white shadow-md rounded-lg hover:scale-105 transition-transform">
                    <h2 className="text-2xl font-semibold text-center">Blogs</h2>
                    <p className="text-gray-600 text-center">Read my latest blog posts.</p>
                </Link>
                <Link to="/services" className="p-4 bg-white shadow-md rounded-lg hover:scale-105 transition-transform">
                    <h2 className="text-2xl font-semibold text-center">Services</h2>
                    <p className="text-gray-600 text-center">Explore services I offer.</p>
                </Link>
                <Link to="/testimonials" className="p-4 bg-white shadow-md rounded-lg hover:scale-105 transition-transform">
                    <h2 className="text-2xl font-semibold text-center">Testimonials</h2>
                    <p className="text-gray-600 text-center">See what others say about me.</p>
                </Link>
                <Link to="/contact" className="p-4 bg-white shadow-md rounded-lg hover:scale-105 transition-transform">
                    <h2 className="text-2xl font-semibold text-center">Contact</h2>
                    <p className="text-gray-600 text-center">Get in touch with me.</p>
                </Link>
            </div>
        </div>
    );
};

export default Home;