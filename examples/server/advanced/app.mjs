import { application } from "./appmodel.mjs";
import { displayRequestedPage } from "../../../view/server/index.mjs";
import { createTestServer } from "../../../testhttpserver.mjs";

/* Create test server that displays the layout */

const server = createTestServer(function(req, res, url) {
    displayRequestedPage(req, res, application, url.pathname);
});
server.listen(process.env.PORT || 8080);
