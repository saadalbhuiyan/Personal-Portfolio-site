const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve projects.' });
    }
};

exports.getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve project.' });
    }
};

exports.createProject = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file?.filename;

        if (!title || !description || !image) {
            return res.status(400).json({ message: 'Title, description, and image are required.' });
        }

        const newProject = new Project({ title, description, image });
        await newProject.save();

        res.status(201).json(newProject);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create project.' });
    }
};

exports.updateProject = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file?.filename;

        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        project.title = title || project.title;
        project.description = description || project.description;
        if (image) project.image = image;

        await project.save();

        res.json(project);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update project.' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }

        await project.deleteOne();

        res.json({ message: 'Project deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete project.' });
    }
};
