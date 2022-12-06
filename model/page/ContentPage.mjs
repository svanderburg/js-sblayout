import { Page } from "./Page.mjs";
import { PageNotFoundException } from "../PageNotFoundException.mjs";
import { PageForbiddenException } from "../PageForbiddenException.mjs";

/**
 * Defines a page displaying arbitrary contents in one or more content sections.
 */
class ContentPage extends Page {
    /**
     * Creates a new ContentPage instance
     *
     * @param {String} title Title of the page that is used as a label in a menu section
     * @param {Contents} contents A content object storing properties of the content sections of a page
     */
    constructor(title, contents) {
        super(title);
        this.contents = contents;
    }

    /**
     * @see Page#checkActive
     */
    checkActive(route, id, level) {
        return route.hasVisitedPageOnLevel(id, level);
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
        } else {
            throw new PageNotFoundException();
        }
    }
}

export { ContentPage };
