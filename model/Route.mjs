/**
 * Records the route from the entry page to the page that is currently requested.
 */
class Route {
    /**
     * Creates a new route instance
     *
     * @param {Array.<String>} ids Path components in the URL that correspond to the IDs of the sub pages
     */
    constructor(ids) {
        this.reset(ids);
    }

    /**
     * Clears the route so that it can be re-investigated with the given path components
     *
     * @param {Array.<String>} ids Path components in the URL that correspond to the IDs of the sub pages
     */
    reset(ids) {
        this.ids = ids;
        this.pages = [];
    }

    /**
     * Visits the provided page by adding a record
     *
     * @param {Page} page Page to visit
     */
    visitPage(page) {
        this.pages.push(page);
    }

    /**
     * Checks whether the given index is the currently requested page.
     *
     * @param {numeric} index Index of a page
     * @return {boolean} true if the corresponding page is currently requested, else false
     */
    indexIsAtRequestedPage(index) {
        return this.ids.length == index;
    }

    /**
     * Returns the ID of a sub page.
     *
     * @param {numeric} index Index of a visited page
     * @return {String} The ID of the visited page
     */
    getId(index) {
        return this.ids[index];
    }

    /**
     * Determines what the currently requested page is.
     *
     * @return {Page} Currently requested page
     */
    determineCurrentPage() {
        return this.pages[this.pages.length - 1];
    }

    /**
     * Checks whether a page with provided ID was visited on the specified level of a menu section.
     *
     * @param {String} id ID of a page
     * @param {numeric} level Level of a menu section 
     * @return {boolean} true if the page was visited, else false
     */
    hasVisitedPageOnLevel(id, level) {
        return this.ids.length > level && this.ids[level] == id;
    }

    /**
     * Composes a base URL for a menu section on a certain level.
     *
     * @param {numeric} level Menu section level
     * @return {String} The base URL for all links in the menu section
     */
    composeBaseURL(baseURL, level) {
        let basePath = baseURL + "/";

        for(let i = 0; i < level; i++) {
            basePath += this.ids[i] + "/";
        }

        return basePath;
    }
}

export { Route };
