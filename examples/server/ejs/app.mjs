import { application } from "./appmodel.mjs";
import { displayRequestedPage } from "../../../view/server/index.mjs";
import { createTestServer } from "../../../testhttpserver.mjs";

import * as ejs from "ejs";

/* Create test server that displays the layout */

function renderEJSTemplate(req, res, sectionFile) {
    return new Promise((resolve, reject) => {
        ejs.renderFile(sectionFile, { req: req, res: res }, {}, function(err, str) {
            if(err) {
                reject(err);
            } else {
                res.write(str);
                resolve();
            }
        });
    });
}

const server = createTestServer(function(req, res, url) {
    displayRequestedPage(req, res, application, url.pathname, {
        ejs: renderEJSTemplate
    });
});
server.listen(process.env.PORT || 8080);
