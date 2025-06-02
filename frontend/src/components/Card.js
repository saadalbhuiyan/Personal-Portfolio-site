import React from 'react';

const Card = ({ image, title, onClick }) => {
    return (
        <div
            className="bg-[var(--bg-light)] p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 cursor-pointer w-full"
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && onClick()}
            aria-label={`View ${title}`}
        >
            <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                loading="lazy"
            />
            <h3 className="text-center text-[var(--text-primary)] font-bold text-xl">{title}</h3>
        </div>
    );
};

export default Card;
