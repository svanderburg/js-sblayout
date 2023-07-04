import { displaySiteMap } from "../../../../../../view/client/sitemap.mjs";

export function displaySiteMapMenuContents(div, params) {
    displaySiteMap(div, params.baseURL, params.route, true, 0, params);
}
