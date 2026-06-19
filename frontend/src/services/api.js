import axios from 'axios';

const API = axios.create({
  baseURL: 'https://devanand170904-smartroadai-potholedetection.hf.space'
});

export const predictImage = (formData) =>
  API.post('/predict', formData);