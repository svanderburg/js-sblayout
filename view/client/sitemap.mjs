import { displaySubSiteMap } from "./subsitemap.mjs";

/**
 * Displays a site map with all visitable links of the application.
 *
 * @param {Application} application Encoding of the web application layout and pages
 * @return {String} HTML representation of the sub site map
 */
export function displaySiteMap(baseURL, application) {
    let innerHTML = "";
    const entryPage = application.entryPage;
    let url = baseURL;
    innerHTML = '<a href="' + (url == "" ? "/" : url) + '">' + entryPage.title  + '</a>';

    url += '#';
    innerHTML += displaySubSiteMap(entryPage, url);

    return innerHTML;
}
