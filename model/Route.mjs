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
     * Composes the URL for the current page or any of its parent pages at a certain level.
     *
     * @param {String} baseURL Base URL to prepend to the resulting URL
     * @param {numeric} level Page level
     * @return {String} The URL of the current page or any of its parent pages
     */
    composeURLAtLevel(baseURL, level, argSeparator = "&amp;") {
        let url = baseURL;

        for(let i = 0; i < level; i++) {
            const currentId = this.ids[i];
            const currentPage = this.pages[i + 1];

            url = currentPage.deriveURL(url, currentId, argSeparator);
        }

        return url;
    }

    /**
     * Composes the URL to the parent page of the currently opened URL.
     *
     * @param {String} baseURL Base URL to prepend to the resulting URL
     * @return {String} The URL to the parent page
     */
    composeParentPageURL(baseURL, argSeparator = "&amp;") {
        return this.composeURLAtLevel(baseURL, this.ids.length - 1, argSeparator);
    }
}

export { Route };
