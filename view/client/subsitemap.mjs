/**
 * Displays a site map of all sub pages and transitive sub pages reachable from a given page.
 *
 * @param {Page} page Page to display the sub pages from
 * @param {String} baseURL URL of the given page
 * @return {String} HTML representation of the sub site map
 */
export function displaySubSiteMap(page, baseURL) {
    let innerHTML = "";
    const iterator = page.subPageIterable();
    let hasSubPages = false;

    for(const [id, subPage] of iterator) {
        if(!hasSubPages) {
            hasSubPages = true;
            innerHTML += "<ul>\n";
        }

        if(subPage.checkVisibleInMenu()) {
            const url = subPage.deriveURL(baseURL, id);
            innerHTML += "<li>\n";
            innerHTML += '<a href="' + url + '">' + subPage.title + '</a>\n';
            innerHTML += displaySubSiteMap(subPage, url);
            innerHTML += "</li>\n";
        }
    }

    if(hasSubPages) {
        innerHTML += "</ul>\n";
    }

    return innerHTML;
}
