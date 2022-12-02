import { displayInlineMenuSection } from "./inlinemenusection.mjs";

/**
 * Displays an embedded representation of a menu section.
 *
 * @param {HTMLDivElement} div HTML Div element to update
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {number} level The level in the navigation structure where to display sub page links from
 * @param {String} baseURL Base URL of the web application
 */
export function displayEmbeddedMenuSection(div, route, level, baseURL) {
    const paragraph = document.createElement("p");
    paragraph.className = "menusection";

    displayInlineMenuSection(paragraph, route, level, baseURL);
    div.appendChild(paragraph);
}
