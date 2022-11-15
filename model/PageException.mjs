/**
 * An exception that gets thrown when something went wrong in a page lookup.
 */
class PageException extends Error {
    /**
     * Creates a new PageException instance
     *
     * @param {numeric} statusCode HTTP status code
     * @param {String} message Exception error message
     * @param {String} displayMessage Error message to be displayed (optional)
     */
    constructor(statusCode, message, displayMessage = null) {
        super(message);
        this.statusCode = statusCode;
        this.displayMessage = displayMessage;
    }
}

export { PageException };
