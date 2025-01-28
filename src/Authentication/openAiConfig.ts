import axios from 'axios';

// Use the correct environment variable with VITE_ prefix
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// console.log("API Key:", API_KEY); 

if (!API_KEY) {
  throw new Error('OpenAI API key is not defined. Check your .env file.');
}

// Create an axios instance for OpenAI API
const openAiConfig = axios.create({
  baseURL: 'https://api.openai.com/v1/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`, // Use API key from .env
  },
});

// Optionally, you can add interceptors for logging requests or responses
openAiConfig.interceptors.request.use(
  (config) => {
    console.log('Sending request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

openAiConfig.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export default openAiConfig;
