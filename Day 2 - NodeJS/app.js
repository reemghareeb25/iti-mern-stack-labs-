const fs = require("fs");
const http = require("http");
const path = require("path");

let productsDB = [];

// Read products.json
fs.readFile('./products.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading products file:', err);
        return;
    }
    productsDB = JSON.parse(data);

    // Create server
    const server = http.createServer((req, res) => {

        // Serve the home.html page
        if (req.url === "/home" || req.url === "/") {
            fs.readFile('./home.html', 'utf8', (err, content) => {
                if (err) {
                    res.write('Error loading home page');
                } else {
                    res.write(content);
                }
                res.end();
            });
        } 

        // Serve all products
        else if (req.url === "/products") {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(productsDB));
            res.end();
        } 

        // Serve a specific product by ID
        else if (req.url.startsWith("/products/")) {
            let index = req.url.split('/')[2];
            if (index > productsDB.length || index <= 0) {
                res.write("Product Not Found");
            } else {
                res.write(JSON.stringify(productsDB[index - 1]));
            }
            res.end();
        } 
        
        else if (req.url.startsWith('/public/')) {
            const filePath = path.join(__dirname, req.url);
            const extname = path.extname(filePath);
            let contentType = 'text/plain';

            // Set content type based on file extension
            switch (extname) {
                case '.css':
                    contentType = 'text/css';
                    break;
                case '.jpg':
                case '.jpeg':
                    contentType = 'image/jpeg';
                    break;
                case '.png':
                    contentType = 'image/png';
                    break;
                case '.js':
                    contentType = 'application/javascript';
                    break;
            }

            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.write("File not found");
                } else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.write(content);
                }
                res.end();
            });
        }

        else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write("404 Not Found");
            res.end();
        }

    });

    console.log(productsDB);

    server.listen(4000, () => {
        console.log("Server is running on port 4000...");
    });
});
