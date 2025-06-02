import React, { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import { getServices } from '../utils/api';

const Services = () => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch services when component mounts
        const fetchServices = async () => {
            try {
                const response = await getServices();
                setServices(response.data);
                setError(null);
            } catch {
                setError('Failed to load services');
            }
        };
        fetchServices();
    }, []);

    return (
        <main
            className="p-4 md:p-6 max-w-[1200px] mx-auto"
            role="main"
            aria-label="Services list"
        >
            {/* Page heading */}
            <h1
                className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-center text-[var(--text-primary)] mb-6"
            >
                My Services
            </h1>

            {/* Error message */}
            {error && (
                <p
                    className="text-[var(--error)] text-body-mobile md:text-body-desktop text-center mb-6"
                    role="alert"
                    aria-live="assertive"
                >
                    {error}
                </p>
            )}

            {/* Services grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <ServiceCard key={service._id} service={service} />
                ))}
            </div>
        </main>
    );
};

export default Services;
