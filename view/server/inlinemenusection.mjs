import { displayMenuItem } from "./menuitem.mjs";
import { includeSection } from "./util.mjs";

/**
 * Displays an inline representation of a menu section.
 *
 * @param {Object} req An object that contains the HTTP request parameters
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {number} level The level in the navigation structure where to display sub page links from
 * @param {String} baseURL Base URL of the web application
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export async function displayInlineMenuSection(req, res, route, level, baseURL, templateHandlers) {
    if(level <= route.ids.length) {
        const basePath = route.composeURLAtLevel(baseURL, level);
        const rootPage = route.pages[level];

        // Display links to the sub pages
        for(const [id, subPage] of rootPage.subPageIterable()) {
            if(subPage.checkVisibleInMenu()) {
                const url = subPage.deriveURL(basePath, id);
                const active = subPage.checkActive(route, id, level);

                if(subPage.menuItem === null) {
                    displayMenuItem(res, active, url, subPage);
                } else {
                    req.sbLayout.active = active;
                    req.sbLayout.url = url;
                    req.sbLayout.subPage = subPage;

                    includeSection(req, res, subPage.menuItem, "menuitems", templateHandlers);
                }
            }
        }
    }
}
