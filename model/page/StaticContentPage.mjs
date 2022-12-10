import { ContentPage } from "./ContentPage.mjs";
import { PageNotFoundException } from "../PageNotFoundException.mjs";
import { isIterable } from "../util.mjs";

/**
 * Defines a page referring to a collection of sub pages whose links can be picked
 * from a menu section.
 */
class StaticContentPage extends ContentPage {
    /**
     * Creates a new ContentPage instance.
     *
     * @param {String} title Title of the page that is used as a label in a menu section
     * @param {Contents} contents A content object storing properties of the content sections of a page
     * @param {Object} subPages An object/dictionary or iterable object mapping ids to sub pages
     * @param {String|Function} menuItem File or function that renders the menu item. Leaving it null just renders a hyperlink
     */
    constructor(title, contents, subPages = {}, menuItem = null) {
        super(title, contents, menuItem);

        if(isIterable(subPages)) {
            this.subPages = new Map(subPages);
        } else {
            this.subPages = new Map(Object.entries(subPages));
        }
    }

    /**
     * @see Page#subPageIterable
     */
    subPageIterable()
    {
        return this.subPages;
    }

    /**
     * @see Page#examineRoute
     */
    examineRoute(application, route, params, index = 0) {
        if(route.indexIsAtRequestedPage(index)) {
            super.examineRoute(application, route, params, index);
        } else {
            const currentId = route.getId(index); // Take the first id of the array
            const currentSubPage = this.subPages.get(currentId);

            if(currentSubPage === undefined) {
                throw new PageNotFoundException(); // If the key does not exists, the sub page does not either
            } else {
                route.visitPage(this);
                currentSubPage.examineRoute(application, route, params, index + 1);
            }
        }
    }
}

export { StaticContentPage };
