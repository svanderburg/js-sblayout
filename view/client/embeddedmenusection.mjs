import { displayInlineMenuSection } from "./inlinemenusection.mjs";

/**
 * Displays an embedded representation of a menu section.
 *
 * @param {HTMLDivElement} div HTML Div element to update
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {number} level The level in the navigation structure where to display sub page links from
 * @param {String} baseURL Base URL of the web application
 * @param {Object} params An object with arbitrary parameters
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export function displayEmbeddedMenuSection(div, route, level, baseURL, params, templateHandlers) {
    const paragraph = document.createElement("p");
    paragraph.className = "menusection";

    displayInlineMenuSection(paragraph, route, level, baseURL, params, templateHandlers);
    div.appendChild(paragraph);
}
