import { displaySiteMap } from "../../../../../../view/server/sitemap.mjs";

export function displaySiteMapContents(req, res) {
    displaySiteMap(req, res, req.sbLayout.application);
}
