import { displayMenuItem } from "./menuitem.mjs";
import { displayStandardMenuItem } from "./standardmenuitem.mjs";
import { displaySubSiteMap } from "./subsitemap.mjs";

/**
 * Displays a site map with all visitable links of the application.
 *
 * @param {Object} req An object that contains the HTTP request parameters
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {boolean} displayMenuItems Indicates whether to display each page link as a menu item or an ordinary link
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 * @param {String} baseURL Base URL of the web application
 * @param {number} level The level in the navigation structure where to display sub page links from
 */
export function displaySiteMap(req, res, route, displayMenuItems = false, templateHandlers = {}, baseURL = null, level = 0) {

    if(baseURL === null)
        baseURL = req.sbLayout.baseURL;

    const rootPage = route.pages[level];

    if(displayMenuItems) {
        displayMenuItem(req, res, true, baseURL, rootPage, templateHandlers);
    } else {
        displayStandardMenuItem(res, false, baseURL, rootPage);
    }

    displaySubSiteMap(req, res, route, rootPage, displayMenuItems, baseURL, level, templateHandlers);
}
