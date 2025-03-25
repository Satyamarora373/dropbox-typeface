const express = require('express');
const multer = require('multer');
const cors = require('cors');
const db = require('./db');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Upload folder
const uploadFolder = './uploads';
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

const upload = multer({ dest: 'uploads/' });

// Upload API
app.post('/upload', upload.single('file'), async (req, res) => {
  const { originalname, mimetype, size, path: filePath } = req.file;

  try {
    const [result] = await db.query(
      'INSERT INTO files (name, path, size, type) VALUES (?, ?, ?, ?)',
      [originalname, filePath, size, mimetype]
    );
    res.status(201).send({ message: 'File uploaded', fileId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to upload file');
  }
});

// List files API
app.get('/files', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM files');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to fetch files');
  }
});

// Download API
app.get('/download/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [[file]] = await db.query('SELECT * FROM files WHERE id = ?', [id]);
    if (!file) return res.status(404).send('File not found');

    res.download(file.path, file.name);
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to download file');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
