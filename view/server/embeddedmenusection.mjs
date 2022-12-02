import { displayInlineMenuSection } from "./inlinemenusection.mjs";

/**
 * Displays an embedded representation of a menu section.
 *
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {number} level The level in the navigation structure where to display sub page links from
 * @param {String} baseURL Base URL of the web application
 */
export async function displayEmbeddedMenuSection(res, route, level, baseURL) {
    res.write('<div class="menusection">');
    displayInlineMenuSection(res, route, level, baseURL);
    res.write('</div>\n');
}
