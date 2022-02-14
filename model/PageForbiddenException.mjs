/**
 * An exception that gets thrown if access to a page is restricted.
 */
class PageForbiddenException extends Error {
    /**
     * Creates a new PageForbiddenException instance
     */
    constructor() {
        super("Access denied to this page!");
    }
}

export { PageForbiddenException };
