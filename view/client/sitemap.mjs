import { createMenuItem } from "./menuitem.mjs";
import { createStandardMenuItem } from "./standardmenuitem.mjs";
import { displaySubSiteMap } from "./subsitemap.mjs";

/**
 * Displays a site map with all visitable links of the application.
 *
 * @param {HTMLDivElement} div HTML Div element to update
 * @param {String} baseURL Base URL of the web application
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {boolean} displayMenuItems Indicates whether to display each page link as a menu item or an ordinary link
 * @param {number} level The level in the navigation structure where to display sub page links from
 * @param {Object} params An object with arbitrary parameters
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export function displaySiteMap(div, baseURL, route, displayMenuItems = false, level = 0, params = {}, templateHandlers = {}) {
    const rootPage = route.pages[level];
    const url = baseURL + '#';

    if(displayMenuItems) {
        createMenuItem(div, true, url, rootPage, baseURL, params, templateHandlers);
    } else {
        const link = createStandardMenuItem(false, url, rootPage);
        div.appendChild(link);
    }

    displaySubSiteMap(div, route, rootPage, displayMenuItems, url, level, params, templateHandlers);
}
