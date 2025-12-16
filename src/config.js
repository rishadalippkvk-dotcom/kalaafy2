// Centralized API Configuration
// Automatically switches between Localhost and Production based on environment

const isProduction = import.meta.env.PROD;

export const API_BASE_URL = isProduction
    ? 'https://api-kalaafi-backend.onrender.com'
    : 'http://localhost:5000';

console.log(`Current Environment: ${isProduction ? 'Production' : 'Development'}`);
console.log(`API Base URL: ${API_BASE_URL}`);
