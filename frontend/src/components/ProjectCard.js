import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();

    return (
        <div
            className="bg-[var(--bg-light)] p-6 rounded-lg shadow-[0_4px_14px_rgba(18,78,102,0.15)] hover:shadow-[0_6px_20px_rgba(18,78,102,0.2)] hover:scale-105 transition-transform duration-220 cursor-pointer w-full"
            onClick={() => navigate(`/projects/${project._id}`)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && navigate(`/projects/${project._id}`)}
            aria-label={`View project titled ${project.title}`}
        >
            <img
                src={project.image.startsWith('http') ? project.image : `${process.env.REACT_APP_API_URL}/uploads/projects/${project.image}`}
                alt={project.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
                loading="lazy"
            />
            <h3 className="text-center text-[var(--text-primary)] font-bold text-xl">{project.title}</h3>
        </div>
    );
};

export default ProjectCard;
