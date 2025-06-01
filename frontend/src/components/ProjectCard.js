import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();
    return (
        <div
            className="w-full md:w-1/3 p-4 shadow-md rounded-lg hover:scale-105 transition-transform cursor-pointer"
            onClick={() => navigate(`/projects/${project.id}`)}
        >
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-t-lg" />
            <h3 className="text-xl font-semibold p-2 text-center">{project.title}</h3>
        </div>
    );
};

export default ProjectCard;