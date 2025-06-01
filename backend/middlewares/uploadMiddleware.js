const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadSingle = (fieldName) => {
    return [
        upload.single(fieldName),

        async (req, res, next) => {
            try {
                if (!req.file) return next();

                const filename = `${Date.now()}-${req.file.originalname}`;
                const outputPath = path.join(__dirname, `../uploads/projects/${filename}`);

                const dir = path.dirname(outputPath);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }

                await sharp(req.file.buffer)
                    .resize({ width: 800 })
                    .jpeg({ quality: 70 })
                    .toFile(outputPath);

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
    single: uploadSingle,
};
