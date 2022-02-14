/**
 * An exception that gets thrown if the path to page does not exists.
 */
class PageNotFoundException extends Error {
    /**
     * Creates a new PageNotFoundException instance
     */
    constructor() {
        super("Page not found!");
    }
}

export { PageNotFoundException };
