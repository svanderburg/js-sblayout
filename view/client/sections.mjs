import { CompoundSection } from "../../model/section/CompoundSection.mjs";
import { createSectionDiv, updateSection } from "./section.mjs";

/**
 * Generates divs for all section objects and adds them to the DOM.
 *
 * @param {HTMLElement} div Div element to update
 * @param {Application} application Encoding of the web application layout and pages
 * @param {CompoundSection} compoundSection Compound section in which the sections are embedded or null if they are on root level
 */
function generateSections(element, application, compoundSection = null) {
    let sections;

    if(compoundSection === null) {
        sections = application.sections;
    } else {
        sections = compoundSection.sections;
    }

    for(const [id, section] of sections) {
        const div = createSectionDiv(id);

        if(section instanceof CompoundSection) {
            generateSections(div, application, section);
        }

        element.appendChild(div);
    }
}

/**
 * Updates the content of all sections in the DOM.
 *
 * @param {Application} application Encoding of the web application layout and pages
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {ContentPage} currentPage Page to be currently displayed
 * @param {Object} params An object with arbitrary parameters
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 * @param {CompoundSection} compoundSection Compound section in which the sections are embedded or null if they are on root level
 */
function updateSections(application, route, currentPage, params, templateHandlers, compoundSection = null) {
    let sections;

    if(compoundSection === null) {
        sections = application.sections;
    } else {
        sections = compoundSection.sections;
    }

    for(const [id, section] of sections) {
        const div = document.getElementById(id);
        updateSection(div, application, section, id, route, currentPage, params, templateHandlers);
    }
}

export { updateSections, generateSections };
