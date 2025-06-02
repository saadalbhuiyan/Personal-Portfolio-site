import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="p-6 max-w-[1200px] mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-center text-[var(--text-primary)] mb-8">
                Admin Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { to: "/admin/projects", label: "Manage Projects" },
                    { to: "/admin/blogs", label: "Manage Blogs" },
                    { to: "/admin/services", label: "Manage Services" },
                    { to: "/admin/testimonials", label: "Manage Testimonials" },
                    { to: "/admin/contacts", label: "Manage Contacts" },
                    { to: "/admin/password", label: "Update Password" },
                ].map(({ to, label }) => (
                    <Link
                        key={to}
                        to={to}
                        className="bg-[var(--bg-light)] shadow-md rounded-lg p-6 hover:scale-105 hover:shadow-lg transition-transform duration-200 ease-in-out flex items-center justify-center"
                        aria-label={label}
                    >
                        <h2 className="text-xl md:text-2xl font-semibold text-[var(--text-primary)] text-center">
                            {label}
                        </h2>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
