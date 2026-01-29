import axios from 'axios';

const API = axios.create({
    // Replace localhost with your actual Render URL
    baseURL: 'https://shrirupportfolio.onrender.com/api', 
});

export const uploadResume = (formData) => API.post('/portfolio/sync', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const getPortfolioData = () => API.get('/portfolio');

export default API;