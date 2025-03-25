import React, { useState } from 'react';
import { uploadFile } from './api';

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      await uploadFile(formData);
      onUpload();
      setFile(null);
      setError('');
    } catch (error) {
      setError('Failed to upload file');
    }
  };

  return (
    <div>
      <p>We accept files with .txt, .jpg, .jpeg, .png, .json or .pdf extension</p>
      <input
        type="file"
        accept=".txt,.jpg,.jpeg,.png,.json,.pdf"
        onChange={(e) => {
          const selectedFile = e.target.files[0];
          const validFormats = ['.txt', '.jpg', '.jpeg', '.png', '.json','.pdf'];
          const ext = selectedFile.name.split('.').pop().toLowerCase();

          if (!validFormats.includes(`.${ext}`)) {
            setError('Invalid file format');
            setFile(null);
          } else {
            setFile(selectedFile);
            setError('');
          }
        }}
      />
      <button onClick={handleUpload}>Upload</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default FileUpload;
