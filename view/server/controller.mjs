import { includeSection } from "./util.mjs";

/**
 * Displays the controller page that handles GET and POST parameters
 *
 * @param {Object} req An object that contains the HTTP request parameters
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {ContentPage} currentPage Page to be currently displayed
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export async function displayController(req, res, currentPage, templateHandlers) {
    includeSection(req, res, currentPage.contents.controller, "controller", templateHandlers);
}
