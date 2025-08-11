import express from 'express';
import dotenv from 'dotenv';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

dotenv.config();
const app = express();
const upload = multer({ dest: 'uploads/' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


app.post('/upload-products', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'products'
    });
    // Delete temp file after upload
    fs.unlinkSync(req.file.path);

    res.json({ public_id: result.public_id, url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/upload-chats', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'chats'
    });
    // Delete temp file after upload
    fs.unlinkSync(req.file.path);

    res.json({ public_id: result.public_id, url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/upload-comments', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'comments'
    });
    // Delete temp file after upload
    fs.unlinkSync(req.file.path);

    res.json({ public_id: result.public_id, url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/upload-community', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'community'
    });
    // Delete temp file after upload
    fs.unlinkSync(req.file.path);

    res.json({ public_id: result.public_id, url: result.secure_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/read/:id', async (req, res) => {
  try {
    const url = cloudinary.url(req.params.id, { resource_type: 'auto' });
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
