import { Section } from "./Section.mjs";

/**
 * Represents a section displaying menu links for every sub page to which a specific page refers.
 */
class MenuSection extends Section {
    /**
     * Creates a new MenuSection instance.
     *
     * @param {numeric} level The level in the page hierarchy from which menu links must be displayed
     */
    constructor(level) {
        super();
        this.level = level;
    }
}

export { MenuSection };
