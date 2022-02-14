import { Section } from "./Section.mjs";

/**
 * Represents a static section that has contents that is the same across all pages.
 */
class StaticSection extends Section {
    /**
     * Creates a new StaticSection instance.
     *
     * @param {String|Function} contents File containing the actual contents of this section or a function that renders it
     */
    constructor(contents) {
        super();
        this.contents = contents;
    }
}

export { StaticSection };
