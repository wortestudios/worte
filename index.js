// Creative Commons Zero v1.0 Universal LICENSE
// READ LICENSE AND TERMS OF SERVICES BEFORE USING

const http = require("http");
const fs = require("fs");
const configuration = JSON.parse(fs.readFileSync(("server/private/configuration.json")));
const database = JSON.parse(fs.readFileSync(("server/private/database.json")));

http.createServer((request, response) => {
    fs.readFile(configuration.root + request.url, (error, content) => {
        if (error) {
            response.writeHead(404);
            response.write(JSON.stringify({"requestUrl": request.url, "statusCode": response.statusCode, "statusMessage": response.statusMessage}));
            response.end();
        }
        else {
            response.writeHead(200, {"Content-Type": database[request.url.split("/").pop().split(".").pop()]});
            response.write(content);
            response.end();
        }
    })
}).listen(configuration.port);
