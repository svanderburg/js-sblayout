import { displayInlineMenuSection } from "./inlinemenusection.mjs";

/**
 * Displays an embedded representation of a menu section.
 *
 * @param {Object} req An object that contains the HTTP request parameters
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {number} level The level in the navigation structure where to display sub page links from
 * @param {String} baseURL Base URL of the web application
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export async function displayEmbeddedMenuSection(req, res, route, level, baseURL, templateHandlers) {
    res.write('<div class="menusection">');
    displayInlineMenuSection(req, res, route, level, baseURL, templateHandlers);
    res.write('</div>\n');
}
