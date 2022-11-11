/**
 * Displays a site map of all sub pages and transitive sub pages reachable from a given page.
 *
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Page} page Page to display the sub pages from
 * @param {String} baseURL URL of the given page
 */
export function displaySubSiteMap(res, page, baseURL) {
    const iterator = page.subPageIterable();
    let hasSubPages = false;

    for(const [id, subPage] of iterator) {
        if(!hasSubPages) {
            hasSubPages = true;
            res.write("<ul>\n");
        }

        if(subPage.checkVisibleInMenu()) {
            const url = subPage.deriveURL(baseURL, id);
            res.write("<li>\n");
            res.write('<a href="' + url + '">' + subPage.title + '</a>\n');
            displaySubSiteMap(res, subPage, url);
            res.write("</li>\n");
        }
    }

    if(hasSubPages) {
        res.write("</ul>\n");
    }
}
