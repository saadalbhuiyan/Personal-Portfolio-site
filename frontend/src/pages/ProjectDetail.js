import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../utils/api';

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError('No project ID provided.');
            return;
        }

        // Fetch project details by ID
        const fetchProject = async () => {
            try {
                const response = await getProjectById(id);
                setProject(response.data);
                setError(null);
            } catch {
                setError('Failed to load project details');
            }
        };

        fetchProject();
    }, [id]);

    // Show loading indicator while fetching
    if (!project && !error) {
        return (
            <div
                className="p-4 md:p-6 text-center text-[var(--text-primary)] text-body-mobile md:text-body-desktop"
                role="status"
                aria-live="polite"
            >
                Loading...
            </div>
        );
    }

    return (
        <main
            className="p-4 md:p-6 max-w-[1200px] mx-auto"
            role="main"
            aria-label="Project Detail"
        >
            {/* Page title */}
            <h1 className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-center text-[var(--text-primary)] mb-6">
                Project Details
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

            {/* Project content */}
            {project && (
                <article className="bg-[var(--bg-light)] shadow-[0_4px_14px_rgba(18,78,102,0.15)] rounded-lg p-5">
                    <img
                        src={
                            project.image.startsWith('http')
                                ? project.image
                                : `${process.env.REACT_APP_API_URL}/uploads/projects/${project.image}`
                        }
                        alt={project.title}
                        className="w-full h-64 object-cover rounded-lg mb-4"
                        loading="lazy"
                    />
                    <h2 className="text-h2-mobile md:text-h2-desktop font-bold tracking-heading text-[var(--text-primary)] mb-2">
                        {project.title}
                    </h2>
                    <p className="text-body-mobile md:text-body-desktop text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
                        {project.description}
                    </p>
                </article>
            )}
        </main>
    );
};

export default ProjectDetail;
