import { createMenuItem } from "./menuitem.mjs";
import { createCustomMenuItem } from "./custommenuitem.mjs";

/**
 * Displays an inline representation of a menu section.
 *
 * @param {HTMLDivElement} div HTML Div element to update
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {number} level The level in the navigation structure where to display sub page links from
 * @param {String} baseURL Base URL of the web application
 * @param {Object} params An object with arbitrary parameters
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export function displayInlineMenuSection(div, route, level, baseURL, params, templateHandlers) {
    if(level <= route.ids.length) {
        const basePath = route.composeURLAtLevel(baseURL + "#", level);
        const rootPage = route.pages[level];

        // Display links to the sub pages
        for(const [id, subPage] of rootPage.subPageIterable()) {
            if(subPage.checkVisibleInMenu()) {
                const url = subPage.deriveURL(basePath, id);
                const active = subPage.checkActive(route, id, level);

                if(subPage.menuItem === null) {
                    const link = createMenuItem(active, url, subPage);
                    div.appendChild(link);
                } else {
                    createCustomMenuItem(div, active, url, subPage, basePath, params, templateHandlers);
                }

                const textNode = document.createTextNode(" ");
                div.appendChild(textNode);
            }
        }
    }
}
