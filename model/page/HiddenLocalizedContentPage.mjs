import { LocalizedContentPage } from "./LocalizedContentPage.mjs";

/**
 * Defines a localized content page which link is not visible in any menu section.
 */
class HiddenLocalizedContentPage extends LocalizedContentPage {
    /**
     * @see LocalizedContentPage#constructor
     */
    constructor(subPages = {}) {
        super(subPages);
    }

    /**
     * @see Page#checkVisibility
     */
    checkVisibility() {
        return false;
    }
}

export { HiddenLocalizedContentPage };
