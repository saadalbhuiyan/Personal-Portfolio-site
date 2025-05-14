const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Use memory storage so we can process with sharp
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Single file upload + compression middleware
const uploadSingle = (fieldName) => {
    return [
        upload.single(fieldName),
        async (req, res, next) => {
            try {
                if (!req.file) return next();

                // Create filename and output path
                const filename = `${Date.now()}-${req.file.originalname}`;
                const outputPath = path.join(__dirname, `../uploads/projects/${filename}`);

                // Ensure uploads/projects folder exists
                const dir = path.dirname(outputPath);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }

                // Resize and compress image using sharp
                await sharp(req.file.buffer)
                    .resize({ width: 800 })
                    .jpeg({ quality: 70 }) // or use .webp({ quality: 70 })
                    .toFile(outputPath);

                // Save filename for later use (e.g., to store in DB)
                req.file.filename = filename;

                next();
            } catch (error) {
                console.error('Image processing failed:', error);
                res.status(500).json({ message: 'Image upload failed' });
            }
        }
    ];
};

module.exports = {
    single: uploadSingle
};
