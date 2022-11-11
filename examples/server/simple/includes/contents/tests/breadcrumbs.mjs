import { displayBreadcrumbs } from "../../../../../../view/server/breadcrumbs.mjs";

export function displayBreadcrumbsContents(req, res) {
    res.write("<p>From level 0 with root page:</p>\n");
    displayBreadcrumbs(req, res, req.sbLayout.route, 0, true);

    res.write("<p>From level 0 without root page:</p>\n");
    displayBreadcrumbs(req, res, req.sbLayout.route, 0);

    res.write("<p>From level 1:</p>\n");
    displayBreadcrumbs(req, res, req.sbLayout.route, 1);
}
