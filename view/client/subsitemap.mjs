import { createMenuItem } from "./menuitem.mjs";
import { createStandardMenuItem } from "./standardmenuitem.mjs";

/**
 * Displays a site map consisting of all sub pages and transitive sub pages of a given page.
 *
 * @param {HTMLDivElement} div HTML Div element to update
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {Page} page Page to display the sub pages from
 * @param {boolean} displayMenuItems Indicates whether to display each page link as a menu item or an ordinary link
 * @param {String} baseURL URL of the given page
 * @param {number} level The level in the navigation structure where to display sub page links from
 * @param {Object} params An object with arbitrary parameters
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export function displaySubSiteMap(div, route, page, displayMenuItems, baseURL, level, params, templateHandlers) {
    const iterator = page.subPageIterable();
    let hasSubPages = false;
    let unorderedList;

    for(const [id, subPage] of iterator) {
        if(!hasSubPages) {
            hasSubPages = true;
            unorderedList = document.createElement("ul");
            div.appendChild(unorderedList);
        }

        if(subPage.checkVisibleInMenu()) {
            const url = subPage.deriveURL(baseURL, id, "&amp;");
            const listItem = document.createElement("li");

            if(displayMenuItems) {
                const active = subPage.checkActive(route, id, level);
                createMenuItem(listItem, active, url, subPage, baseURL, params, templateHandlers);
            } else {
                const link = createStandardMenuItem(false, url, subPage);
                listItem.appendChild(link);
            }

            displaySubSiteMap(listItem, route, subPage, displayMenuItems, url, level + 1, params, templateHandlers)
            unorderedList.appendChild(listItem);
        }
    }
}
