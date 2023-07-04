import { displaySiteMap } from "./sitemap.mjs";

/**
 * Displays a sitemap section containing links to sub pages and transitive sub pages
 *
 * @param {HTMLDivElement} div HTML Div element to update
 * @param {SiteMapSection} section Site map section to display
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {String} baseURL Base URL of the web application
 * @param {Object} params An object with arbitrary parameters
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export function displaySiteMapSection(div, section, route, baseURL, params, templateHandlers) {
    if(section.level <= route.ids.length) {
        const basePath = route.composeURLAtLevel(baseURL, section.level);
        div.innerHTML = ""; // Clear the content before rendering it. Otherwise it appears multiple times
        displaySiteMap(div, baseURL, route, true, section.level, params, templateHandlers);
    }
}
