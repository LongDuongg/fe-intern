const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");

const PORT = 3000;

const getFilePath = (fileName) => path.join(__dirname, fileName);

const sendRes = ({
  res,
  data,
  statusCode = 200,
  contentType = "application/json",
}) => {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.write(JSON.stringify(data));
  res.end();
};

const sendError = ({ res, message, statusCode = 500 }) => {
  sendRes({ res, data: { error: message }, statusCode });
};

const readFileAndRespond = (res, filePath, contentType) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      sendError({
        res,
        message: `Error loading ${filePath}`,
      });
      return;
    }
    res.writeHead(200, { "Content-Type": contentType });
    res.write(data);
    res.end();
  });
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  const pathname = parsedUrl.pathname;

  // 1.
  if (req.method === "GET" && pathname === "/") {
    readFileAndRespond(res, getFilePath("index.html"), "text/html");
    return;
  }

  // 2.
  if (req.method === "POST" && pathname === "/echo") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      let payload = JSON.parse(body);

      sendRes({
        res,
        data: {
          queryParams: parsedUrl.query,
          payload: payload,
        },
      });
    });
    return;
  }

  // 3.
  if (req.method === "GET" && pathname === "/image") {
    readFileAndRespond(res, getFilePath("image.png"), "image/png");
    return;
  }

  // 4
  if (req.method === "GET" && pathname.startsWith("/users/")) {
    const userId = pathname.split("/")[2];

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (!data.id) {
          sendError({
            res,
            message: "User not found",
            statusCode: 404,
          });
        } else {
          sendRes({ res, data });
        }
      })
      .catch((error) => {
        sendError({
          res,
          message: error.message,
        });
      });
    return;
  }

  // 5.
  sendError({
    res,
    message: "404 Not Found",
    statusCode: 404,
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
