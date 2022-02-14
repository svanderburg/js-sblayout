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
     */
    constructor(title, url) {
        super(title);
        this.url = url;
    }

    /**
     * @see Page#checkVisibility
     */
    checkVisibility() {
        return true;
    }

    /**
     * @see Page#checkAccessibility
     */
    checkAccessibility() {
        return true;
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
