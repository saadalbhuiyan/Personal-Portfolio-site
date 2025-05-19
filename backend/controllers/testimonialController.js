const Testimonial = require('../models/Testimonial');

exports.getTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve testimonials.' });
    }
};

exports.getTestimonialById = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found.' });
        }
        res.json(testimonial);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve testimonial.' });
    }
};

exports.createTestimonial = async (req, res) => {
    try {
        const { name, comment } = req.body;
        const image = req.file?.filename;

        if (!name || !comment || !image) {
            return res.status(400).json({ message: 'Name, comment, and image are required.' });
        }

        const newTestimonial = new Testimonial({ name, comment, image });
        await newTestimonial.save();
        res.status(201).json(newTestimonial);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create testimonial.' });
    }
};

exports.updateTestimonial = async (req, res) => {
    try {
        const { name, comment } = req.body;
        const image = req.file?.filename;

        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found.' });
        }

        testimonial.name = name || testimonial.name;
        testimonial.comment = comment || testimonial.comment;
        if (image) testimonial.image = image;

        await testimonial.save();
        res.json(testimonial);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update testimonial.' });
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found.' });
        }

        await testimonial.deleteOne();
        res.json({ message: 'Testimonial deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete testimonial.' });
    }
};
