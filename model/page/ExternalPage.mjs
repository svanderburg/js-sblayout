import { Page } from "./Page.mjs";
import { PageForbiddenException } from "../PageForbiddenException.mjs";

/**
 * A page that refers to an external URL instead of a sub page belonging to the same application.
 */
class ExternalPage extends Page {
    /**
     * Creates a new ExternalPage instance.
     *
     * @param {String} title Title of the page that is used as a label in a menu section
     * @param {String} url External URL to which the page redirects
     * @param {String|Function} menuItem File or function that renders the menu item. Leaving it null just renders a hyperlink
     */
    constructor(title, url, menuItem = null) {
        super(title, menuItem);
        this.url = url;
    }

    /**
     * @see Page#deriveURL
     */
    deriveURL(baseURL, id)
    {
        return this.url;
    }

    /**
     * @see Page#checkActive
     */
    checkActive(route, id, level) {
        return false; // An external page can never be active since it always redirects the user to an external site
    }

    /**
     * @see Page#examineRoute
     */
    examineRoute(application, route, params, index = 0) {
        if(route.indexIsAtRequestedPage(index)) {
            if(this.checkAccessibility()) {
                route.visitPage(this);
            } else {
                throw new PageForbiddenException();
            }
        }
    }
}

export { ExternalPage };
