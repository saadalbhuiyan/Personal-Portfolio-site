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
            } catch (err) {
                setError('Failed to load services');
            }
        };
        fetchServices();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">My Services</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </div>
    );
};

export default Services;