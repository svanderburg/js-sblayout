import { determineRoute } from "./page.mjs";
import { displayController } from "./controller.mjs";
import { displaySections } from "./sections.mjs";
import { generateScriptSection } from "./scripts.mjs";
import { generateStyleSection } from "./styles.mjs";

/**
 * Displays a doctype
 *
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {String} doctype Doctype of the HTML document
 */
export function displayDoctype(res, doctype) {
    switch(doctype) {
        case "html4":
            res.write('<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">\n');
            break;
        case "html4transitional":
            res.write('<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">\n');
            break;
        case "html5":
            res.write('<!DOCTYPE html>\n');
            break;
    }
}

/**
 * Determines the favorite icon path
 *
 * @param {String} baseURL Base URL of the web application
 * @param {String} icon Absolute or relative path to an icon
 * @return {String} Path to the favorite icon
 */
export function determineFavIconPath(baseURL, icon) {
    if(icon.startsWith('/')) {
        return icon;
    } else {
        return baseURL + "/" + icon;
    }
}

/**
 * Creates and extended req object with sbLayout properties
 *
 * @param {Object} req An object that contains the HTTP request parameters (provided by the http.Server or another framework built around it)
 * @param {Application} application Encoding of the web application layout and pages
 * @param {String} baseURL Base URL of the web application
 * @return {Object} An extended request object with sbLayout properties
 */
export function createExtendedRequestObject(req, application, baseURL) {
    const extendedReq = Object.create(req);
    extendedReq.sbLayout = {
        query: {},
        "accept-language": req.headers["accept-language"],
        application: application,
        baseURL: baseURL
    };
    return extendedReq;
}

/**
 * Displays a simple HTML page containing the sections defined in the application layout
 *
 * @param {Object} req An object that contains the HTTP request parameters
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Application} application Encoding of the web application layout and pages
 * @param {String} path Path part of the URL that brings a user to a page managed by the layout manager
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 * @param {String} baseURL Base URL of the web application
 * @param {String} doctype Doctype of the HTML document
 */
export async function displayRequestedPage(req, res, application, path, templateHandlers = {}, baseURL = "", doctype = "html4") {
    /* Extend request parameters with sbLayout properties */
    const extendedReq = createExtendedRequestObject(req, application, baseURL);

    /* Determine page route */
    const route = determineRoute(res, application, path, extendedReq.sbLayout);
    const currentPage = route.determineCurrentPage();
    extendedReq.sbLayout.route = route;
    extendedReq.sbLayout.currentPage = currentPage;

    /* Display the controller page */
    await displayController(extendedReq, res, currentPage, templateHandlers);

    /* Display the doctype */
    displayDoctype(res, doctype);

    res.write("<html>\n");
    res.write("\t<head>\n");
    res.write("\t\t<title>" + currentPage.title + " - " + application.title + "</title>\n");
    res.write('\t\t<meta http-equiv="Content-Type" content="text/html; charset=' + application.charset + '">\n');
    res.write('\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n');

    if(application.icon) {
        res.write('\t\t<link rel="shortcut icon" href="' + determineFavIconPath(baseURL, application.icon) + '">\n');
    }

    generateScriptSection(res, application, currentPage, baseURL);
    generateStyleSection(res, application, currentPage, baseURL);
    res.write("\t</head>\n");

    res.write("\t<body>\n");
    await displaySections(extendedReq, res, application, route, currentPage, baseURL, templateHandlers);
    res.write("\t</body>\n");
    res.write("</html>\n");

    res.end();
}
