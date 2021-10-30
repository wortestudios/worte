// OWNED BY WORTE, PUBLIC CODE WHICH CAN BE MODIFIED, PLEASE CREDIT ME IF YOU USE!!!

const http = require("http");
const fs = require("fs");
const configuration = JSON.parse(fs.readFileSync(("server/private/configuration.json")));
const database = JSON.parse(fs.readFileSync(("server/private/database.json")));

http.createServer((request, response) => {
    fs.readFile("server/" + configuration.root + request.url, (error, content) => {
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