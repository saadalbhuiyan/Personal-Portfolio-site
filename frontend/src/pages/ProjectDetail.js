import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../utils/api';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await getProjectById(id);
                setProject(response.data);
            } catch (err) {
                setError('Failed to load project details');
            }
        };
        fetchProject();
    }, [id]);

    if (!project && !error) return <div className="p-6 text-center">Loading...</div>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">Project Details</h1>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {project && (
                <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded-lg">
                    <img src={project.image} alt={project.title} className="w-full h-64 object-cover rounded-lg mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">{project.title}</h2>
                    <p className="text-gray-700">{project.description}</p>
                </div>
            )}
        </div>
    );
};

export default ProjectDetail;