import { Section } from "./Section.mjs";

/**
 * Represents a section having dynamic content determined by the selected menu link.
 */
class ContentsSection extends Section {
    /**
     * Creates a new contents section instance.
     *
     * @param {boolean} displayTitle Indicates whether this is the main contents and the title should be displayed
     */
    constructor(displayTitle) {
        super();
        this.displayTitle = displayTitle ? true : false;
    }
}

export { ContentsSection };
