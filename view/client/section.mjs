import { ContentsSection } from "../../model/section/ContentsSection.mjs";
import { MenuSection } from "../../model/section/MenuSection.mjs";
import { StaticSection } from "../../model/section/StaticSection.mjs";
import { CompoundSection } from "../../model/section/CompoundSection.mjs";
import { displayMenuSection } from "./menusection.mjs";
import { includeSection } from "./util.mjs";
import { updateSections } from "./sections.mjs";

/**
 * Creates a HTML Div Element for a given section
 *
 * @param {String} id ID of the section
 * @return {HTMLDivElement} HTML div element for the section
 */
export function createSectionDiv(id) {
    const div = document.createElement("div");
    div.id = id;
    return div;
}

function loadStaticSectionIntoDiv(section, div, params, templateHandlers) {
    includeSection(section.contents, "sections", div, params, "", templateHandlers);
}

function loadContentsSectionIntoDiv(section, id, currentPage, div, params, templateHandlers) {
    const currentSection = currentPage.contents.sections[id];
    let initialContents;

    if(section.displayTitle) {
        initialContents = "<h1>" + currentPage.title + "</h1>\n";
    } else {
        initialContents = "";
    }

    includeSection(currentSection, id, div, params, initialContents, templateHandlers);
}

/**
 * Updates the content of the provided section in the DOM.
 *
 * @param {HTMLDivElement} div Div element to update
 * @param {Application} application Encoding of the web application layout and pages
 * @param {Section} section Section to be displayed
 * @param {String} id Id of the section to be displayed
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {ContentPage} currentPage Page to be currently displayed
 * @param {Object} params An object with arbitrary parameters
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export function updateSection(div, application, section, id, route, currentPage, params, templateHandlers) {
    if(section instanceof StaticSection) {
        loadStaticSectionIntoDiv(section, div, params, templateHandlers);
    } else if(section instanceof MenuSection) {
        displayMenuSection(div, application, section, route, params.baseURL, params, templateHandlers);
    } else if(section instanceof ContentsSection) {
        loadContentsSectionIntoDiv(section, id, currentPage, div, params, templateHandlers);
    } else if(section instanceof CompoundSection) {
        updateSections(application, route, currentPage, params, templateHandlers, section);
    }
}
