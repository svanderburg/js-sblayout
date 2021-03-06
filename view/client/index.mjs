import { determineRoute } from "../../view/client/page.mjs";
import { executeController } from "../../view/client/controller.mjs";
import { generateStaticScriptSection, updateScriptSection } from "../../view/client/scripts.mjs";
import { generateStaticStyleSection, updateStyleSection } from "../../view/client/styles.mjs";
import { createSectionDiv, updateSection } from "../../view/client/section.mjs";

function determinePath() {
    if(window.location.hash) {
        return window.location.hash.substr(1);
    } else {
        return "";
    }
}

function createParams() {
    return {
        baseURL: window.location.pathname,
        query: {},
        "accept-language": window.navigator.languages
    };
}

function createFavIcon(icon) {
    if(icon) {
        const link = document.createElement("link");
        link.rel = "shortcut icon";
        link.href = icon;
        return link;
    } else {
        return null;
    }
}

function updateDynamicParts(application, route, currentPage, params, templateHandlers) {
    /* Update title */
    document.title = currentPage.title + " - " + application.title;

    /* Update scripts */
    updateScriptSection(application, currentPage);

    /* Update styles */
    updateStyleSection(application, currentPage);

    /* Retrieve the contents for each section div */

    for(const [id, section] of application.sections) {
        const div = document.getElementById(id);
        updateSection(div, application, section, id, route, currentPage, params, templateHandlers);
    }
}

/**
 * Initially renders all sections in the DOM of the requested page.
 *
 * @param {Application} application Encoding of the web application layout and pages
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export function initRequestedPage(application, templateHandlers = {}) {
    const params = createParams();
    const path = determinePath();

    /* Determine page route */
    const route = determineRoute(application, path, params);
    const currentPage = route.determineCurrentPage();

    /* Execute the controller function, if provided */
    executeController(currentPage, params);

    /* Generate favorite icon */
    const favIcon = createFavIcon(application.icon);
    if(favIcon !== null) {
        document.head.appendChild(favIcon);
    }

    /* Configure static scripts */
    generateStaticScriptSection(application, currentPage);

    /* Configure static style sheets */
    generateStaticStyleSection(application, currentPage);

    /* Add divs for each section */
    for(const id of application.sections.keys()) {
        const div = createSectionDiv(id);
        document.body.appendChild(div);
    }

    /* Update all dynamic parts */
    updateDynamicParts(application, route, currentPage, params, templateHandlers);
}

/**
 * Updates all dynamic sections of the application layout in the DOM.
 *
 * @param {Application} application Encoding of the web application layout and pages
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export function updateRequestedPage(application, templateHandlers = {}) {
    const params = createParams();
    const path = determinePath();

    /* Determine page route */
    const route = determineRoute(application, path, params);
    const currentPage = route.determineCurrentPage();

    /* Execute the controller function, if provided */
    executeController(currentPage, params);

    /* Update all dynamic parts */
    updateDynamicParts(application, route, currentPage, params, templateHandlers);
}
