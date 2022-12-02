/**
 * Displays an inline representation of a menu section.
 *
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {number} level The level in the navigation structure where to display sub page links from
 * @param {String} baseURL Base URL of the web application
 */
export async function displayInlineMenuSection(res, route, level, baseURL) {
    const basePath = route.composeURLAtLevel(baseURL, level);
    const rootPage = route.pages[level];

    // Display links to the sub pages
    for(const [id, subPage] of rootPage.subPageIterable()) {
        if(subPage.checkVisibleInMenu()) {
            const url = subPage.deriveURL(basePath, id);

            res.write("<a");
                if(route.hasVisitedPageOnLevel(id, level)) {
                res.write(' class="active"');
            }

            res.write(' href="' + url + '">' + subPage.title + '</a>\n');
        }
    }
}
