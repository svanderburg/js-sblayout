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
        return true;
    }

    /**
     * Checks whether the page is currently accessible.
     *
     * @return {boolean} true if the user has access, else false
     */
    checkAccessibility() {
        return true;
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
     * Creates an iterator that can be used to traverse over all sub pages.
     *
     * @return {Object} An iterable object
     */
    subPageIterable()
    {
        return []; // An empty array means there are no sub pages to iterate over
    }

    /**
     * Decides how to compose a URL for the given page from its baseURL and the page identifier.
     *
     * @param {String} baseURL Base URL of the page
     * @param {String} id Identifier of the page
     * @return {String} The URL to this page
     */
    deriveURL(baseURL, id)
    {
        return baseURL + "/" + encodeURIComponent(id);
    }

    /**
     * Checks whether the page is currently active
     *
     * @param route The route from the entry page to the current page
     * @param id Identifier of the page
     * @param level Level in the navigation structure
     * @return true if the page is active, else false
     */
    checkActive(route, id, level)
    {
        throw new Error("Page::checkActive is abstract")
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
