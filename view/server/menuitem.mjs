import { displayStandardMenuItem } from "./standardmenuitem.mjs";
import { displayCustomMenuItem } from "./custommenuitem.mjs";

/**
 * Displays a menu item.
 *
 * @param {Object} req An object that contains the HTTP request parameters
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {boolean} active Indicates whether the link is active
 * @param {String} url URL of the sub page
 * @param {Page} subPage Page where the menu item links to
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export function displayMenuItem(req, res, active, url, subPage, templateHandlers) {
    if(subPage.menuItem === null) {
        displayStandardMenuItem(res, active, url, subPage);
    } else {
        displayCustomMenuItem(req, res, active, url, subPage, templateHandlers);
    }
}
