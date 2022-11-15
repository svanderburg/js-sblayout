import { PageException } from "./PageException.mjs";

/**
 * An exception that gets thrown if the path to page does not exists.
 */
class PageNotFoundException extends PageException {
    /**
     * Creates a new PageNotFoundException instance
     *
     * @param {String} displayMessage Error message to be displayed (optional)
     */
    constructor(displayMessage = null) {
        super(404, "Not Found", displayMessage);
    }
}

export { PageNotFoundException };
