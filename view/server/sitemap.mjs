import { displaySubSiteMap } from "./subsitemap.mjs";

/**
 * Displays a site map with all visitable links of the application.
 *
 * @param {Object} req An object that contains the HTTP request parameters
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Application} application Encoding of the web application layout and pages
 */
export function displaySiteMap(req, res, application) {
    const entryPage = application.entryPage;
    const url = req.sbLayout.baseURL;
    res.write('<a href="' + (url == "" ? "/" : url) + '">' + entryPage.title  + '</a>');
    displaySubSiteMap(res, entryPage, url);
}
