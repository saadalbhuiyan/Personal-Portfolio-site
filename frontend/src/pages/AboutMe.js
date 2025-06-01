import React from 'react';

const AboutMe = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-6">About Me</h1>
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
                <div className="flex-1">
                    <img
                        src="/assets/placeholder.jpg"
                        alt="Profile"
                        className="w-full h-64 object-cover rounded-lg"
                    />
                </div>
                <div className="flex-1">
                    <h2 className="text-2xl font-semibold mb-2">My Background</h2>
                    <p className="text-gray-700">
                        I’m a passionate developer with expertise in web development, creating responsive and
                        user-friendly applications using modern technologies like React and Node.js.
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mt-6">
                <div className="p-4 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-semibold mb-2">Education</h2>
                    <p className="text-gray-700">B.Sc. in Computer Science, Example University, 2018-2022</p>
                </div>
                <div className="p-4 bg-white shadow-md rounded-lg">
                    <h2 className="text-2xl font-semibold mb-2">Experience</h2>
                    <p className="text-gray-700">Web Developer at Tech Corp, 2022-Present</p>
                </div>
            </div>
        </div>
    );
};

export default AboutMe;