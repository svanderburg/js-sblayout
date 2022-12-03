import { displayInlineMenuSection } from "./inlinemenusection.mjs";

/**
 * Displays a menu section containing links to sub pages.
 *
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Application} application Encoding of the web application layout and pages
 * @param {MenuSection} section Menu section to display
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {String} baseURL Base URL of the web application
 */
export async function displayMenuSection(res, application, section, route, baseURL) {
    return displayInlineMenuSection(res, route, section.level, baseURL);
}
