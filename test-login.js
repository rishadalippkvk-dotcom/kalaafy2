const axios = require('axios'); // Wait, axios might not be installed. Use http or check package.json.
// Checking package.json...
// "dependencies": { "cors": "^2.8.5", "express": "^4.19.2", "multer": "^1.4.5-lts.1" }
// Front end has react.
// Checking root package.json...
// It has "dev": "vite", "dependencies": { "react": "...", "react-dom": "..." }

// I'll use standard 'http' module to be safe without installing anything.

const http = require('http');

const data = JSON.stringify({
    username: 'admin',
    password: 'password123'
});

const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
