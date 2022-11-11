import { displaySiteMap } from "../../../../../../view/client/sitemap.mjs";

export function displaySiteMapContents(div, params) {
    div.innerHTML = displaySiteMap(params.baseURL, params.application);
}
