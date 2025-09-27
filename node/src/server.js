require('dotenv').config();

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const { fetchApi } = require('./service/api');

const PORT = process.env.PORT || 3000;

// Create server
const server = http.createServer(async (req, res) => {

    const pathname = url.parse(req.url).pathname;

    // if (pathname === '/') {
    //     res.writeHead(200, { 'Content-Type': 'text/html' });
    //     res.end('<h1>Hello World!</h1><p>This is the home page.</p>');

    // } else if (pathname === '/about') {
    //     res.writeHead(200, { 'Content-Type': 'text/html' });
    //     res.end('<h1>About Page</h1><p>Built with vanilla Node.js</p>');

    // } else {
    //     res.writeHead(404, { 'Content-Type': 'text/html' });
    //     res.end('<h1>404 - Page Not Found</h1>');
    // }

    const serveHtml = (relativePath, statusCode = 200) => {
        // const filePath = path.join(__dirname, 'pages', filename); // for specific folder
        const filePath = path.join(__dirname, relativePath); // for all files in project
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 - Internal Server Error</h1><p>Could not load the requested file.</p>');
                return;
            }
            res.writeHead(statusCode, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    };

    if (pathname === '/') {
        serveHtml('pages/home.html');

    } else if (pathname === '/about') {
        serveHtml('pages/about.html');

    } else if (pathname === '/demo') {
        serveHtml('pages-2/demo.html');

    } else if (pathname === '/data') {
        const data = await fetchApi();
        if (data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <h1>API Data Route</h1>
                <p>Data successfully fetched from external API:</p>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `);
        } else {
            res.writeHead(503, { 'Content-Type': 'text/html' });
            res.end('<h1>503 - Service Unavailable</h1><p>Failed to retrieve data from the external API.</p>');
        }

    } else {
        serveHtml('pages/404.html', 404);
    }
});

server.listen(PORT, () => {
    console.log(`Server running on :- http://localhost:${PORT}`);
});