const Project = require('../models/Project');

// @desc Get all projects
exports.getProjects = async (req, res) => {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
};

// @desc Get single project by ID
exports.getProjectById = async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
};

// @desc Create new project
exports.createProject = async (req, res) => {
    const { title, description } = req.body;
    const image = req.file?.filename;

    if (!title || !description || !image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newProject = new Project({ title, description, image });
    await newProject.save();
    res.status(201).json(newProject);
};

// @desc Update project
exports.updateProject = async (req, res) => {
    const { title, description } = req.body;
    const image = req.file?.filename;

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.title = title || project.title;
    project.description = description || project.description;
    if (image) project.image = image;

    await project.save();
    res.json(project);
};

// @desc Delete project
exports.deleteProject = async (req, res) => {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await project.deleteOne();
    res.json({ message: 'Project deleted successfully' });
};
