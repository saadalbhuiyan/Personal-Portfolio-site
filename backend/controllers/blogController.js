const Blog = require('../models/Blog');

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve blogs.' });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve blog.' });
    }
};

exports.createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file?.filename;

        if (!title || !content || !image) {
            return res.status(400).json({ message: 'Title, content, and image are required.' });
        }

        const newBlog = new Blog({ title, content, image });
        await newBlog.save();

        res.status(201).json(newBlog);
    } catch (err) {
        res.status(500).json({ message: 'Failed to create blog.' });
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file?.filename;

        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }

        blog.title = title || blog.title;
        blog.content = content || blog.content;
        if (image) blog.image = image;

        await blog.save();

        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: 'Failed to update blog.' });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }

        await blog.deleteOne();

        res.json({ message: 'Blog deleted successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to delete blog.' });
    }
};
