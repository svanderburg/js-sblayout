import { PageException } from "./PageException.mjs";

/**
 * An exception that gets thrown if access to a page is restricted.
 */
class PageForbiddenException extends PageException {
    /**
     * Creates a new PageForbiddenException instance
     */
    constructor() {
        super(403, "Forbidden");
    }
}

export { PageForbiddenException };
