import { displayInlineMenuSection } from "./inlinemenusection.mjs";

/**
 * Displays a menu section containing links to sub pages.
 *
 * @param {HTMLDivElement} div HTML Div element to update
 * @param {Application} application Encoding of the web application layout and pages
 * @param {MenuSection} section Menu section to display
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {String} baseURL Base URL of the web application
 * @param {Object} params An object with arbitrary parameters
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export function displayMenuSection(div, application, section, route, baseURL, params, templateHandlers) {
    div.innerHTML = ""; // Clear the content before rendering it. Otherwise it appears multiple times
    displayInlineMenuSection(div, route, section.level, baseURL, params, templateHandlers);
}
