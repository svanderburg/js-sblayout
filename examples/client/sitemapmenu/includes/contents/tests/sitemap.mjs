import { displaySiteMap } from "../../../../../../view/client/sitemap.mjs";

export function displaySiteMapContents(div, params) {
    displaySiteMap(div, params.baseURL, params.route);
}
