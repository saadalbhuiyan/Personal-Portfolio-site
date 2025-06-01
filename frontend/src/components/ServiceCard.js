import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    const navigate = useNavigate();
    return (
        <div
            className="w-full md:w-1/3 p-4 shadow-md rounded-lg hover:scale-105 transition-transform cursor-pointer"
            onClick={() => navigate(`/services/${service.id}`)}
        >
            <img src={service.image} alt={service.title} className="w-full h-48 object-cover rounded-t-lg" />
            <h3 className="text-xl font-semibold p-2 text-center">{service.title}</h3>
            <p className="text-gray-600 p-2 text-center">{service.description}</p>
        </div>
    );
};

export default ServiceCard;