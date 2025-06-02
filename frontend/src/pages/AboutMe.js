import React from 'react';

const AboutMe = () => {
    return (
        <div
            className="p-4 md:p-6 max-w-[1200px] mx-auto"
            role="main"
            aria-label="About Me section"
        >
            {/* Page Title */}
            <h1
                className="text-h1-mobile md:text-h1-desktop font-bold tracking-heading text-[var(--text-primary)] text-center mb-6"
            >
                About Me
            </h1>

            {/* Profile and background section: stacked on small screens, side-by-side on md+ */}
            <div className="flex flex-col md:flex-row gap-6 mb-6">
                {/* Profile Image */}
                <div className="flex-1">
                    <img
                        src="/assets/placeholder.jpg"
                        alt="Profile"
                        className="w-[150px] h-[150px] rounded-full mx-auto object-cover"
                        loading="lazy"
                    />
                </div>

                {/* Background description */}
                <div className="flex-1">
                    <h2
                        className="text-h2-mobile md:text-h2-desktop font-bold tracking-heading text-[var(--text-primary)] mb-2"
                    >
                        My Background
                    </h2>
                    <p
                        className="text-body-mobile md:text-body-desktop text-[var(--text-primary)] leading-relaxed"
                    >
                        I’m a passionate developer with expertise in web development, creating responsive and
                        user-friendly applications using modern technologies like React and Node.js.
                    </p>
                </div>
            </div>

            {/* Education and Experience cards in grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Education Card */}
                <section
                    className="bg-[var(--card-bg)] shadow-card rounded-lg p-5"
                    aria-labelledby="education-title"
                >
                    <h2
                        id="education-title"
                        className="text-h2-mobile md:text-h2-desktop font-bold tracking-heading text-[var(--text-primary)] mb-2"
                    >
                        Education
                    </h2>
                    <p className="text-body-mobile md:text-body-desktop text-[var(--text-primary)] leading-relaxed">
                        B.Sc. in Computer Science, Example University, 2018-2022
                    </p>
                </section>

                {/* Experience Card */}
                <section
                    className="bg-[var(--card-bg)] shadow-card rounded-lg p-5"
                    aria-labelledby="experience-title"
                >
                    <h2
                        id="experience-title"
                        className="text-h2-mobile md:text-h2-desktop font-bold tracking-heading text-[var(--text-primary)] mb-2"
                    >
                        Experience
                    </h2>
                    <p className="text-body-mobile md:text-body-desktop text-[var(--text-primary)] leading-relaxed">
                        Web Developer at Tech Corp, 2022-Present
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutMe;
