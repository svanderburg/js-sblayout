import { displayMenuItem } from "./menuitem.mjs";
import { displayStandardMenuItem } from "./standardmenuitem.mjs";

/**
 * Displays a site map consisting of all sub pages and transitive sub pages of a given page.
 *
 * @param {Object} req An object that contains the HTTP request parameters
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {Page} page Page to display the sub pages from
 * @param {boolean} displayMenuItems Indicates whether to display each page link as a menu item or an ordinary link
 * @param {String} baseURL URL of the given page
 * @param {number} level The level in the navigation structure where to display sub page links from
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export function displaySubSiteMap(req, res, route, page, displayMenuItems, baseURL, level, templateHandlers) {
    const iterator = page.subPageIterable();
    let hasSubPages = false;

    for(const [id, subPage] of iterator) {
        if(!hasSubPages) {
            hasSubPages = true;
            res.write("<ul>\n");
        }

        if(subPage.checkVisibleInMenu()) {
            const url = subPage.deriveURL(baseURL, id, "&amp;");
            res.write("<li>\n");

            if(displayMenuItems) {
                const active = subPage.checkActive(route, id, level);
                displayMenuItem(req, res, active, url, subPage, templateHandlers);
            } else {
                displayStandardMenuItem(res, false, url, subPage);
            }

            displaySubSiteMap(req, res, route, subPage, displayMenuItems, url, level + 1, templateHandlers);
            res.write("</li>\n");
        }
    }

    if(hasSubPages) {
        res.write("</ul>\n");
    }
}
