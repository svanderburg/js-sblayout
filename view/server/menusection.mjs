import { displayInlineMenuSection } from "./inlinemenusection.mjs";

/**
 * Displays a menu section containing links to sub pages.
 *
 * @param {Object} req An object that contains the HTTP request parameters
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Application} application Encoding of the web application layout and pages
 * @param {MenuSection} section Menu section to display
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {String} baseURL Base URL of the web application
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export async function displayMenuSection(req, res, application, section, route, baseURL, templateHandlers) {
    return displayInlineMenuSection(req, res, route, section.level, baseURL, templateHandlers);
}
