import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import { getProjects } from '../utils/api';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch projects when component mounts
        const fetchProjects = async () => {
            try {
                const response = await getProjects();
                setProjects(response.data);
                setError(null);
            } catch {
                setError('Failed to load projects');
            }
        };
        fetchProjects();
    }, []);

    return (
        <main
            className="p-4 md:p-6 max-w-[1200px] mx-auto"
            role="main"
            aria-label="Projects list"
        >
            {/* Page title */}
            <h1 className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-center text-[var(--text-primary)] mb-6">
                My Projects
            </h1>

            {/* Error message */}
            {error && (
                <p
                    className="text-[var(--error)] text-body-mobile md:text-body-desktop text-center mb-6"
                    role="alert"
                    aria-live="assertive"
                >
                    {error}
                </p>
            )}

            {/* Projects grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>
        </main>
    );
};

export default Projects;
