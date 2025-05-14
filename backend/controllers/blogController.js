// ✅ Phase 4: Blog Controller (controllers/blogController.js)
const Blog = require('../models/Blog');

// @desc Get all blogs
exports.getBlogs = async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
};

// @desc Get single blog by ID
exports.getBlogById = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
};

// @desc Create new blog
exports.createBlog = async (req, res) => {
    const { title, content } = req.body;
    const image = req.file?.filename;

    if (!title || !content || !image) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newBlog = new Blog({ title, content, image });
    await newBlog.save();
    res.status(201).json(newBlog);
};

// @desc Update blog
exports.updateBlog = async (req, res) => {
    const { title, content } = req.body;
    const image = req.file?.filename;

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    if (image) blog.image = image;

    await blog.save();
    res.json(blog);
};

// @desc Delete blog
exports.deleteBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    await blog.deleteOne();
    res.json({ message: 'Blog deleted successfully' });
};