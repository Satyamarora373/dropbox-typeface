import React from 'react';
import { downloadFile } from './api';

const FileList = ({ files }) => (
  <ul>
    {files.map((file) => (
      <li key={file.id}>
        {file.name} - {Math.round(file.size / 1024)} KB
        <button onClick={() => downloadFile(file.id)}>Download</button>
      </li>
    ))}
  </ul>
);

export default FileList;
