import { includeSection } from "./util.mjs";

/**
 * Displays a menu item in a custom way
 *
 * @param {Object} req An object that contains the HTTP request parameters
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {boolean} active Indicates whether the link is active
 * @param {String} url URL of the sub page
 * @param {Page} subPage Page where the menu item links to
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export function displayCustomMenuItem(req, res, active, url, subPage, templateHandlers) {
    req.sbLayout.active = active;
    req.sbLayout.url = url;
    req.sbLayout.subPage = subPage;

    includeSection(req, res, subPage.menuItem, "menuitems", templateHandlers);
}
