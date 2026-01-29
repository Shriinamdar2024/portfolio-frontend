import axios from 'axios';

const API = axios.create({
    // Replace localhost with your actual Render URL
    baseURL: 'https://shrirupportfolio.onrender.com/api', 
});

// Helper for resume uploads
export const uploadResume = (formData) => API.post('/portfolio/sync', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

// Helper for fetching data
export const getPortfolioData = () => API.get('/portfolio');

// The critical default export
export default API;