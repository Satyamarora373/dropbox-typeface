import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const uploadFile = (formData) => axios.post(`${API_URL}/upload`, formData);
export const getFiles = () => axios.get(`${API_URL}/files`);
export const downloadFile = (id) => window.open(`${API_URL}/download/${id}`, '_blank');
