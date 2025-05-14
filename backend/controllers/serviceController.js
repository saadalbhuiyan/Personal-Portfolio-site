// ✅ Phase 5: Service Controller (controllers/serviceController.js)
const Service = require('../models/Service');

exports.getServices = async (req, res) => {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
};

exports.getServiceById = async (req, res) => {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.json(service);
};

exports.createService = async (req, res) => {
    const { title, description } = req.body;
    const image = req.file?.filename;

    if (!title || !description || !image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newService = new Service({ title, description, image });
    await newService.save();
    res.status(201).json(newService);
};

exports.updateService = async (req, res) => {
    const { title, description } = req.body;
    const image = req.file?.filename;

    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    service.title = title || service.title;
    service.description = description || service.description;
    if (image) service.image = image;

    await service.save();
    res.json(service);
};

exports.deleteService = async (req, res) => {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    await service.deleteOne();
    res.json({ message: 'Service deleted successfully' });
};