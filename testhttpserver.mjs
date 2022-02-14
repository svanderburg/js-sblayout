import * as http from 'http';
import * as path from 'path';
import * as fs from 'fs';
import * as qs from 'querystring';

function determineStaticFileMimeType(staticFileExtensions, pathname) {
    const extension = path.parse(pathname).ext;

    if(extension) {
        return staticFileExtensions[extension.substring(1).toLowerCase()];
    } else {
        return null;
    }
}

const staticFileExtensions = {
    "bmp": "image/bmp",
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/vnd.microsoft.icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "mjs": "text/javascript",
    "png": "image/png",
    "txt": "image/text",
    "xml": "application/xml",
    "xsl": "text/xsl"
};

function parsePostData(req, res, next) {
    if(req.method == "POST") {
        let body = "";

        req.on("data", (data) => {
            body += data;
        });

        req.on("error", (err) => {
            console.error("Cannot parse POST data: "+err);
        });

        req.on("end", () => {
            req.body = qs.parse(body);
            next(req, res);
        });
    } else {
        next(req, res);
    }
}

function streamStaticFile(res, url, mimeType) {
    const filePath = path.join(".", url.pathname)

    fs.access(filePath, fs.F_OK, (err) => {
        if(err) {
            res.writeHead(404);
            res.end();
        } else {
            res.writeHead(200, {
                "Content-Type": mimeType
            });

            const rs = fs.createReadStream(filePath);
            rs.on("data", (chunk) => {
                res.write(chunk);
            });
            rs.on("error", (err) => {
                console.error("HTTP server error: "+err);
                res.end();
            });
            rs.on("close", () => {
                res.end();
            });
        }
    });
}

/**
 * Creates an HTTP server for local testing purposes.
 *
 * @param {function(IncomingMessage, ServerResponse, String)} displayView Function that invokes a view function to render dynamic pages
 * @param {Object} options An object with HTTP server options
 * @return {Server} A Node.js http.Server instance
 */
export function createTestServer(displayView, options = {}) {
    const requestListener = function(req, res) {
        if(!options.disableLog) {
            console.log(req.method + " " + req.url);
        }

        // Parse the URL
        const url = new URL(req.url, "http://" + req.headers.host);

        // Determine whether the URL is a static file or view
        const mimeType = determineStaticFileMimeType(staticFileExtensions, url.pathname);

        if(mimeType) {
            streamStaticFile(res, url, mimeType);
        } else {
            parsePostData(req, res, function(req, res) {
                displayView(req, res, url);
            });
        }
    };

    return http.createServer(requestListener);
}
