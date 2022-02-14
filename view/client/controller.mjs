/**
 * Executes a controller routine that can execute arbitrary functions.
 *
 * @param {Page} currentPage The currently requested page
 * @param {Object} params An object with arbitrary parameters passed to the controller function
 */
export async function executeController(currentPage, params) {
    if(typeof currentPage.contents.controller == "function") {
        return currentPage.contents.controller(params);
    }
}
