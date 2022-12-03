import { displayInlineMenuSection } from "./inlinemenusection.mjs";

/**
 * Displays a menu section containing links to sub pages.
 *
 * @param {HTMLDivElement} div HTML Div element to update
 * @param {Application} application Encoding of the web application layout and pages
 * @param {MenuSection} section Menu section to display
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {String} baseURL Base URL of the web application
 */
export function displayMenuSection(div, application, section, route, baseURL) {
    div.innerHTML = "";
    displayInlineMenuSection(div, route, section.level, baseURL);
}
