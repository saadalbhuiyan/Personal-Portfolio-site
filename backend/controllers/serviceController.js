const Service = require('../models/Service');

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve services.' });
    }
};

exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found.' });
        }
        res.json(service);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve service.' });
    }
};

exports.createService = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file?.filename;

        if (!title || !description || !image) {
            return res.status(400).json({ message: 'Title, description, and image are required.' });
        }

        const newService = new Service({ title, description, image });
        await newService.save();

        res.status(201).json(newService);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create service.' });
    }
};

exports.updateService = async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file?.filename;

        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found.' });
        }

        service.title = title || service.title;
        service.description = description || service.description;
        if (image) service.image = image;

        await service.save();

        res.json(service);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update service.' });
    }
};

exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: 'Service not found.' });
        }

        await service.deleteOne();

        res.json({ message: 'Service deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete service.' });
    }
};
