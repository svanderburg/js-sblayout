import { includeSection } from "./util.mjs";

/**
 * Creates a menu item in a custom way
 *
 * @param {HTMLDivElement} div HTML Div element to update
 * @param {boolean} active Indicates whether the link is active
 * @param {String} url URL of the sub page
 * @param {Page} subPage Page where the menu item links to
 * @param {String} basePath Base directory where the section file is stored
 * @param {Object} params An object with arbitrary parameters
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 * @return {HTMLAnchorElement} Hyperlink that refers to the sub page
 */
export function createCustomMenuItem(div, active, url, subPage, basePath, params, templateHandlers) {
    params.active = active;
    params.url = url;
    params.subPage = subPage;
    includeSection(subPage.menuItem, basePath, div, params, div.innerHTML, templateHandlers);
}
