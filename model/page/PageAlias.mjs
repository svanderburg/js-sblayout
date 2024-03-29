import { Page } from "./Page.mjs";
import { PageNotFoundException } from "../PageNotFoundException.mjs";
import { isIterable } from "../util.mjs";

/**
 * Defines a page alias that is an alias of an existing page that
 * can be reached from the entry page.
 */
class PageAlias extends Page {
    /**
     * Creates a new PageAlias instance.
     *
     * @param {String} title Title of the page that is used as a label in a menu section
     * @param {String} path Path to the actual page relative from the entry page
     * @param {Object} subPages An object/dictionary or iterable object mapping ids to sub pages
     * @param {String|Function} menuItem File or function that renders the menu item. Leaving it null just renders a hyperlink
     */
    constructor(title, path, subPages = {}, menuItem = null) {
        super(title, menuItem);

        if(path == "") {
            this.ids = [];
        } else {
            this.ids = path.split('/');
        }

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
     * @see Page#checkActive
     */
    checkActive(route, id, level) {
        if(route.ids.length === this.ids.length) {
            for(let i = 0; i < this.ids.length; i++) {
                if(this.ids[i] != route.ids[i]) {
                    return false;
                }
            }

            return true;
        } else {
            return false;
        }
    }

    /**
     * @see Page#examineRoute
     */
    examineRoute(application, route, params, index = 0) {
        if(route.indexIsAtRequestedPage(index)) {
            route.reset(this.ids);
            application.examineRoute(route, params);
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

export { PageAlias };
