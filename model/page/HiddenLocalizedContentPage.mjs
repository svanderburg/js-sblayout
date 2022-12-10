import { LocalizedContentPage } from "./LocalizedContentPage.mjs";

/**
 * Defines a localized content page which link is not visible in any menu section.
 */
class HiddenLocalizedContentPage extends LocalizedContentPage {
    /**
     * @see LocalizedContentPage#constructor
     */
    constructor(subPages = {}, menuItem = null) {
        super(subPages, menuItem);
    }

    /**
     * @see Page#checkVisibility
     */
    checkVisibility() {
        return false;
    }
}

export { HiddenLocalizedContentPage };
