/**
 * An exception that gets thrown when something went wrong in a page lookup.
 */
class PageException extends Error {
    /**
     * Creates a new PageForbiddenException instance
     */
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

export { PageException };
