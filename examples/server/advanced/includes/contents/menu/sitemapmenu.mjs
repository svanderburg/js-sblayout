import { displaySiteMap } from "../../../../../../view/server/sitemap.mjs";

export function displaySiteMapMenuContents(req, res) {
    displaySiteMap(req, res, req.sbLayout.route, true);
}
