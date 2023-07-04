import { displaySiteMap } from "./sitemap.mjs";

/**
 * Displays a sitemap section containing links to sub pages and transitive sub pages
 *
 * @param {Object} req An object that contains the HTTP request parameters
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {SiteMapSection} section Site map section to display
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {String} baseURL Base URL of the web application
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export async function displaySiteMapSection(req, res, section, route, baseURL, templateHandlers) {
    if(section.level <= route.ids.length) {
        const basePath = route.composeURLAtLevel(baseURL, section.level);
        displaySiteMap(req, res, route, true, templateHandlers, basePath, section.level);
    }
}
