import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getServiceById } from '../utils/api';

const ServiceDetail = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await getServiceById(id);
                setService(response.data);
            } catch (err) {
                setError('Failed to load service details');
            }
        };
        fetchService();
    }, [id]);

    if (!service && !error) return <div className="p-6 text-center">Loading...</div>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">Service Details</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {service && (
                <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
                    <img src={service.image} alt={service.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">{service.title}</h2>
                    <p className="text-gray-700">{service.description}</p>
                </div>
            )}
        </div>
    );
};

export default ServiceDetail;