import { PageException } from "./PageException.mjs";

/**
 * An exception that gets thrown if invalid parameters were provided.
 */
class BadRequestException extends PageException {
    /**
     * Creates a new BadRequestException instance
     *
     * @param {String} displayMessage Error message to be displayed (optional)
     */
    constructor(displayMessage = null) {
        super(400, "Bad Request", displayMessage);
    }
}

export { BadRequestException };
