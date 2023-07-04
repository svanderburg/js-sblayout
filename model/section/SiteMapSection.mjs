import { MenuSection } from "./MenuSection.mjs";

/**
 * Represents a section displaying a site map with menu links for every sub page and transitive sub page to which a specific page refers.
 */
class SiteMapSection extends MenuSection {
    /**
     * Creates a new SiteMapSection instance.
     *
     * @param {numeric} level The level in the page hierarchy from which menu links must be displayed
     */
    constructor(level) {
        super(level);
    }
}

export { SiteMapSection };
