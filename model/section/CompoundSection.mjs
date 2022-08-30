import { Section } from "./Section.mjs";
import { isIterable } from "../util.mjs";

/**
 * Represents a section that encapsulates other sections. This can be useful for layout purposes.
 */
class CompoundSection extends Section {
    /**
     * Creates a new CompoundSection instance.
     *
     * @param {Object} sections An object/dictionary or iterable object mapping ids to sections
     */
    constructor(sections = {}) {
        super();

        if(isIterable(sections)) {
            this.sections = new Map(sections);
        } else {
            this.sections = new Map(Object.entries(sections));
        }
    }
}

export { CompoundSection };
