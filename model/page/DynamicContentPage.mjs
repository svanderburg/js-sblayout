import { ContentPage } from "./ContentPage.mjs";

/**
 * Defines a page referring to the same sub page that dynamically generates it contents
 * using the sub page URL path component as parameter.
 */
class DynamicContentPage extends ContentPage {
    /**
     * Create a new DynamicContentPage instance.
     *
     * @param {String} title Title of the page that is used as a label in a menu section
     * @param {String} param The name of the query parameter that must be set when retrieving the sub page
     * @param {Contents} contents A content object storing properties of the content sections of a page
     * @param {Page} dynamicSubPage The dynamic sub page that interprets the URL parameter component
     */
    constructor(title, param, contents, dynamicSubPage) {
        super(title, contents);
        this.param = param;
        this.dynamicSubPage = dynamicSubPage;
    }

    /**
     * @see Page#examineRoute
     */
    examineRoute(application, route, params, index = 0) {
        if(route.indexIsAtRequestedPage(index)) {
            super.examineRoute(application, route, params, index);
        } else {
            const currentId = route.getId(index); // Take the first id of the array
            params.query[this.param] = currentId; // Set the query parameter
            route.visitPage(this);
            this.dynamicSubPage.examineRoute(application, route, params, index + 1);
        }
    }
}

export { DynamicContentPage };
