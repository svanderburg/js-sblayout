/**
 * Defines a page that can be reached from a link in a menu section or through
 * the last path components of an URL.
 */
class Page {
    /**
     * Creates a new Page instance.
     *
     * @param {String} title Title of the page that is used as a label in a menu section
     */
    constructor(title) {
        this.title = title;
    }

    /**
     * Checks whether the page link should be displayed in a menu section.
     *
     * @return {boolean} true if the page is visible, else false
     */
    checkVisibility() {
        throw new Error("Page::checkVisibility is abstract");
    }

    /**
     * Checks whether the page is currently accessible.
     *
     * @return {boolean} true if the user has access, else false
     */
    checkAccessibility() {
        throw new Error("Page::checkAccessibility is abstract");
    }

    /**
     * Checks all conditions that must be met so that a page is displayed in a menu.
     *
     * @return {boolean} true if the page should be visible, else false
     */
    checkVisibleInMenu() {
        return this.checkVisibility() && this.checkAccessibility();
    }

    /**
     * Examines a route derived from the path components of the requested URL and records all pages visited.
     *
     * @param {Application} application Application layout where the page belongs to
     * @param {Route} route Route to investigate
     * @param {Object} params Object containing arbitrary parameters
     * @throws {PageNotFoundException} If the sub page cannot be found
     * @throws {PageForbiddenException} If the sub page is not accessible
     */
    examineRoute(application, route, params, index = 0) {
        throw new Error("Page::examineRoute is abstract");
    }
}

export { Page };
