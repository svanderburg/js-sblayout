import { StaticContentPage } from "./StaticContentPage.mjs";

/**
 * Defines a static content page which link is not visible in any menu section.
 */
class HiddenStaticContentPage extends StaticContentPage {
    /**
     * @see StaticContentPage#constructor
     */
    constructor(title, contents, subPages = {}, menuItem = null) {
        super(title, contents, subPages, menuItem);
    }

    /**
     * @see Page#checkVisibility
     */
    checkVisibility() {
        return false;
    }
}

export { HiddenStaticContentPage };
