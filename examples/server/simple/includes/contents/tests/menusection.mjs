import { displayEmbeddedMenuSection } from "../../../../../../view/server/embeddedmenusection.mjs";

function displayCommonMenuSection(req, res) {
    displayEmbeddedMenuSection(req, res, req.sbLayout.route, 2, req.sbLayout.baseURL, req.sbLayout.templateHandlers);
}

export function displayMenuSectionContents(req, res) {
    displayCommonMenuSection(req, res);
    res.write("<p>\n");
    res.write("This page contains an embedded menu section displaying sub pages on the second level allowing you to navigate to sub pages stored under this sub page.\n");
    res.write("</p>\n");
}

export function displayMenuSectionSubpage1(req, res) {
    displayCommonMenuSection(req, res);
    res.write("<p>Sub page 1</p>\n");
}

export function displayMenuSectionSubpage2(req, res) {
    displayCommonMenuSection(req, res);
    res.write("<p>Sub page 2</p>\n");
}

export function displayMenuSectionSubpage3(req, res) {
    displayCommonMenuSection(req, res);
    res.write("<p>Sub page 3</p>\n");
}
