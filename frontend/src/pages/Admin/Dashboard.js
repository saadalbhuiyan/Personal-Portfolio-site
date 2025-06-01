import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                <Link to="/admin/projects" className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-50">
                    <h2 className="text-2xl font-semibold text-center">Manage Projects</h2>
                </Link>
                <Link to="/admin/blogs" className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-50">
                    <h2 className="text-2xl font-semibold text-center">Manage Blogs</h2>
                </Link>
                <Link to="/admin/services" className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-50">
                    <h2 className="text-2xl font-semibold text-center">Manage Services</h2>
                </Link>
                <Link to="/admin/testimonials" className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-50">
                    <h2 className="text-2xl font-semibold text-center">Manage Testimonials</h2>
                </Link>
                <Link to="/admin/contacts" className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-50">
                    <h2 className="text-2xl font-semibold text-center">Manage Contacts</h2>
                </Link>
                <Link to="/admin/password" className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-50">
                    <h2 className="text-2xl font-semibold text-center">Update Password</h2>
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;