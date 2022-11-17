/**
 * Displays a menu section containing links to sub pages.
 *
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Application} application Encoding of the web application layout and pages
 * @param {MenuSection} section Menu section to display
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {String} baseURL Base URL of the web application
 */
export async function displayMenuSection(res, application, section, route, baseURL) {
    if(section.level <= route.ids.length) {

        const basePath = route.composeURLAtLevel(baseURL, section.level);
        const rootPage = route.pages[section.level];

        // Display links to the sub pages
        for(const [id, subPage] of rootPage.subPageIterable()) {
            if(subPage.checkVisibleInMenu()) {
                const url = subPage.deriveURL(basePath, id);

                res.write("<a");
                    if(route.hasVisitedPageOnLevel(id, section.level)) {
                    res.write(' class="active"');
                }

                res.write(' href="' + url + '">' + subPage.title + '</a>\n');
            }
        }
    }
}
