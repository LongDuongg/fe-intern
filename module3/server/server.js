const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log({
    method: req.method,
    url: req.url,
  });

  const parsedUrl = url.parse(req.url, true);
  console.dir(`parsedUrl : ${JSON.stringify(parsedUrl)}`);

  const pathname = parsedUrl.pathname;

  // 1.
  if (req.method === "GET" && pathname === "/") {
    const filePath = path.join(__dirname, "index.html");
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end("Error loading index.html");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        res.end();
      }
    });

    // 2.
  } else if (req.method === "POST" && pathname === "/echo") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      let payload = JSON.parse(body);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(
        JSON.stringify({
          queryParams: parsedUrl.query,
          payload: payload,
        })
      );
      res.end();
    });

    // 3.
  } else if (req.method === "GET" && pathname === "/image") {
    const imgPath = path.join(__dirname, "image.png");
    fs.readFile(imgPath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Image not found" }));
      } else {
        res.writeHead(200, { "Content-Type": "image/png" });
        res.write(data);
        res.end();
      }
    });

    // 4.
  } else if (req.method === "GET" && pathname.startsWith("/users/")) {
    const userId = pathname.split("/")[2];

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found");
        }
        return response.json();
      })
      .then((data) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(data));
        res.end();
      })
      .catch((error) => {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Failed to fetch user" }));
      });

    // 5.
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
