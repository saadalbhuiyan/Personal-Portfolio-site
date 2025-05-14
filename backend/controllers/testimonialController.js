// ✅ Phase 6: Testimonial Controller (controllers/testimonialController.js)
const Testimonial = require('../models/Testimonial');

exports.getTestimonials = async (req, res) => {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
};

exports.getTestimonialById = async (req, res) => {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });
    res.json(testimonial);
};

exports.createTestimonial = async (req, res) => {
    const { name, comment } = req.body;
    const image = req.file?.filename;

    if (!name || !comment || !image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newTestimonial = new Testimonial({ name, comment, image });
    await newTestimonial.save();
    res.status(201).json(newTestimonial);
};

exports.updateTestimonial = async (req, res) => {
    const { name, comment } = req.body;
    const image = req.file?.filename;

    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

    testimonial.name = name || testimonial.name;
    testimonial.comment = comment || testimonial.comment;
    if (image) testimonial.image = image;

    await testimonial.save();
    res.json(testimonial);
};

exports.deleteTestimonial = async (req, res) => {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ message: 'Testimonial not found' });

    await testimonial.deleteOne();
    res.json({ message: 'Testimonial deleted successfully' });
};