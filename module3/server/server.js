const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const PORT = 3000;

const getFilePath = (fileName) => path.join(__dirname, fileName);

const stringify = (data) => JSON.stringify(data);

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

const sendError = (
  res,
  message,
  statusCode = 404,
  header = { "Content-Type": "text/plain" }
) => {
  res.writeHead(statusCode, header);
  res.end(message);
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
        sendError(res, "Error loading index.html", 500);
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
        stringify({
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
        sendError(res, JSON.stringify({ error: "Image not found" }));
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
          sendResponse(res, stringify(data));
        }
      })
      .catch((error) => {
        sendError(res, stringify({ error: error.message }));
      });

    // 5.
  } else {
    sendError(res, "404 Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
