import React from 'react';

const Card = ({ image, title, onClick }) => {
    return (
        <div
            className="w-full md:w-1/3 p-4 shadow-md rounded-lg hover:scale-105 transition-transform cursor-pointer"
            onClick={onClick}
        >
            <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
            <h3 className="text-xl font-semibold p-2 text-center">{title}</h3>
        </div>
    );
};

export default Card;