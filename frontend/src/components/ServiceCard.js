import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    const navigate = useNavigate();

    return (
        <div
            className="bg-[var(--bg-light)] p-6 rounded-lg shadow-[0_4px_14px_rgba(18,78,102,0.15)] hover:shadow-[0_6px_20px_rgba(18,78,102,0.2)] hover:scale-105 transition-transform duration-220 cursor-pointer w-full"
            onClick={() => navigate(`/services/${service._id}`)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && navigate(`/services/${service._id}`)}
            aria-label={`View service titled ${service.title}`}
        >
            <img
                src={service.image.startsWith('http') ? service.image : `${process.env.REACT_APP_API_URL}/uploads/projects/${service.image}`}
                alt={service.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                loading="lazy"
            />
            <h3 className="text-center text-[var(--text-primary)] font-bold text-xl">{service.title}</h3>
            <p className="text-center text-[var(--text-secondary)] mt-2">{service.description}</p>
        </div>
    );
};

export default ServiceCard;
