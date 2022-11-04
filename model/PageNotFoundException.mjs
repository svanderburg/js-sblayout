import { PageException } from "./PageException.mjs";

/**
 * An exception that gets thrown if the path to page does not exists.
 */
class PageNotFoundException extends PageException {
    /**
     * Creates a new PageNotFoundException instance
     */
    constructor() {
        super(404, "Not Found");
    }
}

export { PageNotFoundException };
