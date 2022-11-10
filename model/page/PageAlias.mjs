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
     */
    constructor(title, path, subPages = {}) {
        super(title);

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
