const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const PORT = 3000;

const sendResponse = (
  res,
  data,
  header = { "Content-Type": "application/json" },
  statusCode = 200
) => {
  res.writeHead(statusCode, header);
  res.write(data);
  res.end();
};

const server = http.createServer((req, res) => {
  // console.log({
  //   method: req.method,
  //   url: req.url,
  // });

  const parsedUrl = url.parse(req.url, true);
  // console.dir(`parsedUrl : ${JSON.stringify(parsedUrl)}`);

  const pathname = parsedUrl.pathname;

  // 1.
  if (req.method === "GET" && pathname === "/") {
    const filePath = path.join(__dirname, "index.html");
    fs.readFile(filePath, (err, data) => {
      console.log(`data type: ${typeof data}`);
      if (err) {
        res.writeHead(500);
        res.end("Error loading index.html");
      } else {
        sendResponse(res, data, { "Content-Type": "text/html" });
      }
    });

    // 2.
  } else if (req.method === "POST" && pathname === "/echo") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      let payload = JSON.parse(body);
      sendResponse(
        res,
        JSON.stringify({
          queryParams: parsedUrl.query,
          payload: payload,
        })
      );
    });

    // 3.
  } else if (req.method === "GET" && pathname === "/image") {
    const imgPath = path.join(__dirname, "image.png");
    fs.readFile(imgPath, (err, data) => {
      console.log(`data type: ${typeof data}`);
      if (err) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Image not found" }));
      } else {
        sendResponse(res, data, { "Content-Type": "image/png" });
      }
    });

    // 4
  } else if (req.method === "GET" && pathname.startsWith("/users/")) {
    const userId = pathname.split("/")[2];

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Object.keys(data).length === 0) {
          throw new Error("User not found");
        } else {
          sendResponse(res, JSON.stringify(data));
        }
      })
      .catch((error) => {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: error.message }));
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
