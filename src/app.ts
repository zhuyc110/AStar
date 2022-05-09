import * as fs from 'fs/promises';
import * as http from 'http';
import path from 'path';

const host = 'localhost';
const port = 8000;

const requestListener: http.RequestListener = function (req, res) {
  console.log(req);
  fs.readFile(path.resolve(path.dirname('')) + '/index.html')
    .then(contents => {
      res.setHeader('Content-Type', 'text/html');
      res.writeHead(200);
      res.end(contents);
    })
    .catch(err => {
      console.log(err);
      res.writeHead(500);
      res.end(err);
      return;
    });
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
