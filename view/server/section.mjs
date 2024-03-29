import { StaticSection } from "../../model/section/StaticSection.mjs";
import { SiteMapSection } from "../../model/section/SiteMapSection.mjs";
import { MenuSection } from "../../model/section/MenuSection.mjs";
import { ContentsSection } from "../../model/section/ContentsSection.mjs";
import { CompoundSection } from "../../model/section/CompoundSection.mjs";

import { displayMenuSection } from "./menusection.mjs";
import { displaySiteMapSection } from "./sitemapsection.mjs";
import { displaySections } from "./sections.mjs";
import { includeSection } from "./util.mjs";

/**
 * Displays a static section whose content is always the same regardless of
 * the page that is selected.
 *
 * @param {Object} req An object that contains the HTTP request parameters
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {StaticSection} section Static section to display
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
async function displayStaticSection(req, res, section, templateHandlers) {
    return includeSection(req, res, section.contents, "sections", templateHandlers);
}

/**
 * Displays a content section with dynamic content provided by the selected page.
 *
 * @param {Object} req An object that contains the HTTP request parameters
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {String} id Id of the section to be displayed
 * @param {ContentPage} currentPage Page to be currently displayed
 * @param {ContentsSection} section Contents section to display
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
async function displayContentsSection(req, res, id, currentPage, section, templateHandlers) {
    if(section.displayTitle) {
        res.write("<h1>" + currentPage.title + "</h1>\n");
    }

    const currentSection = currentPage.contents.sections[id];
    return includeSection(req, res, currentSection, id, templateHandlers);
}

/**
 * Displays a section.
 *
 * @param {Object} req An object that contains the HTTP request parameters
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Application} application Encoding of the web application layout and pages
 * @param {String} id Id of the section to be displayed
 * @param {Section} section Section to be displayed
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {ContentPage} currentPage Page to be currently displayed
 * @param {String} baseURL Base URL of the web application
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export async function displaySection(req, res, application, id, section, route, currentPage, baseURL, templateHandlers) {
    res.write('<div id="' + id + '">');

    if(section instanceof StaticSection) {
        await displayStaticSection(req, res, section, templateHandlers);
    } else if(section instanceof SiteMapSection) {
        await displaySiteMapSection(req, res, section, route, baseURL, templateHandlers);
    } else if(section instanceof MenuSection) {
        await displayMenuSection(req, res, application, section, route, baseURL, templateHandlers);
    } else if(section instanceof ContentsSection) {
        await displayContentsSection(req, res, id, currentPage, section, templateHandlers);
    } else if(section instanceof CompoundSection) {
        await displaySections(req, res, application, route, currentPage, baseURL, templateHandlers, section);
    }

    res.write("</div>\n");
}
