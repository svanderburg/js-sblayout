import { PageException } from "../../model/PageException.mjs";
import { executeController } from "./controller.mjs";
import { generateStaticScriptSection, updateScriptSection } from "./scripts.mjs";
import { generateStaticStyleSection, updateStyleSection } from "./styles.mjs";
import { generateSections, updateSections } from "./sections.mjs";

function determinePath() {
    if(window.location.hash) {
        return window.location.hash.substr(1);
    } else {
        return "";
    }
}

function createParams(application) {
    return {
        application: application,
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
    updateSections(application, route, currentPage, params, templateHandlers);
}

/**
 * Initially renders all sections in the DOM of the requested page.
 *
 * @param {Application} application Encoding of the web application layout and pages
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export function initRequestedPage(application, templateHandlers = {}) {
    const params = createParams(application);
    const path = determinePath();

    /* Determine page route */
    let route;
    let currentPage;

    try {
        route = application.determineRoute(path, params);
        currentPage = route.determineCurrentPage();
        params.route = route;
        params.currentPage = currentPage;
    } catch(ex) {
        if(ex instanceof PageException) {
            params.error = ex.displayMessage;
        }
        route = application.determineErrorRoute(ex, params);
        currentPage = route.determineCurrentPage();
        params.route = route;
        params.currentPage = currentPage;

        /* Execute the controller function, if provided */
        executeController(currentPage, params);
    }

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
    generateSections(document.body, application);

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
    const params = createParams(application);
    const path = determinePath();

    /* Determine page route */
    let route;
    let currentPage;

    try {
        route = application.determineRoute(path, params);
        currentPage = route.determineCurrentPage();
        params.route = route;
        params.currentPage = currentPage;

        /* Execute the controller function, if provided */
        executeController(currentPage, params);
    } catch(ex) {
        if(ex instanceof PageException) {
            params.error = ex.displayMessage;
        }
        route = application.determineErrorRoute(ex, params);
        currentPage = route.determineCurrentPage();
        params.route = route;
        params.currentPage = currentPage;
    }

    /* Update all dynamic parts */
    updateDynamicParts(application, route, currentPage, params, templateHandlers);
}
