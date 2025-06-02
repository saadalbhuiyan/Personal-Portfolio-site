import React, { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';
import { getServices } from '../utils/api';

const Services = () => {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await getServices();
                setServices(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to load services');
            }
        };
        fetchServices();
    }, []);

    return (
        <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
            <h1 className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-center text-[var(--text-primary)] mb-6">
                My Services
            </h1>
            {error && (
                <p className="text-error text-body-mobile md:text-body-desktop text-center mb-6">
                    {error}
                </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <ServiceCard key={service._id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default Services;
