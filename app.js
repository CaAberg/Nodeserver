const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Home page route
  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Welcome to the Home Page</h1><div>Go to /about</div>');
    res.end();
  }

  // Route to render HTML
  else if (pathname === '/about') {
    fs.readFile(path.join(__dirname, 'about.html'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }

  // Route to display content from external file (txt)
  else if (pathname === '/info') {
    fs.readFile(path.join(__dirname, 'info.txt'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`<h2>Information</h2><p>${data}</p>`);
      res.end();
    });
  }

  // Route to display content from external HTML file
  else if (pathname === '/contact') {
    fs.readFile(path.join(__dirname, 'contact.html'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }

  // Route to read queries passed in the URL
  else if (pathname === '/query') {
    const queryName = parsedUrl.query.name;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h2>Hello, ${queryName || 'Anon! You can change the greeting here by adding "?name=" after query'}! </h2>`);
    res.end();
  }

  // Handle routes not found
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
