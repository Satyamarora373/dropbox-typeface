import React, { useState, useEffect } from 'react';
import { getFiles } from './components/api';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';

const App = () => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    const { data } = await getFiles();
    setFiles(data);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Dropbox Clone</h1>
      <FileUpload onUpload={fetchFiles} />
      <FileList files={files} />
    </div>
  );
};

export default App;
