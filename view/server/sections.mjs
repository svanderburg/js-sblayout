import { displaySection } from "./section.mjs";

/**
 * Displays a collection of sections.
 *
 * @param {Object} req An object that contains the HTTP request parameters
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Application} application Encoding of the web application layout and pages
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {ContentPage} currentPage Page to be currently displayed
 * @param {String} baseURL Base URL of the web application
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 * @param {CompoundSection} compoundSection Compound section in which the sections are embedded or null if they are on root level
 */
export async function displaySections(req, res, application, route, currentPage, baseURL, templateHandlers, compoundSection = null) {
    let sections;

    if(compoundSection === null) {
        sections = application.sections;
    } else {
        sections = compoundSection.sections;
    }

    for(const [id, section] of sections) {
        await displaySection(req, res, application, id, section, route, currentPage, baseURL, templateHandlers);
    }
}
