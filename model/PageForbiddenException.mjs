import { PageException } from "./PageException.mjs";

/**
 * An exception that gets thrown if access to a page is restricted.
 */
class PageForbiddenException extends PageException {
    /**
     * Creates a new PageForbiddenException instance
     *
     * @param {String} displayMessage Error message to be displayed (optional)
     */
    constructor(displayMessage = null) {
        super(403, "Forbidden", displayMessage);
    }
}

export { PageForbiddenException };
