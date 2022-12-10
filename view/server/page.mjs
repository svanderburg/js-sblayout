import { PageException } from "../../model/PageException.mjs";

function emitHeader(res, charset, ex) {
    let status;

    if(ex === undefined) {
        status = 200;
    } else if(ex instanceof PageException) {
        status = ex.statusCode;
    } else {
        status = 500;
    }

    res.writeHead(status, {
        "Content-Type": "text/html; charset=" + charset
    });
}

/**
 * Determines the route from the entry page to the requested page.
 *
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Application} application Encoding of the web application layout and pages
 * @param {String} path Path part of the URL that brings a user to a page managed by the layout manager
 * @param {Object} params An object with arbitrary parameters
 * @return {Route} A route that records all visited pages
 * @throws {PageException} In case something went wrong looking up the page
 */
export function determineRoute(res, application, path, params) {
    const appPath = path.substring(params.baseURL.length); // Subtract the baseURL from the path to look up
    const route = application.determineRoute(appPath, params);
    emitHeader(res, application.charset);
    return route;
}

/**
 * Redirects the user to the appropriate error page when the page lookup or controller fails.
 *
 * @param {Object} req An object that contains the HTTP request parameters
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Application} application Encoding of the web application layout and pages
 * @param {Exception} ex Exception that is thrown by the lookup method or controller
 * @param {Object} params An object with arbitrary parameters
 * @return {Route} Route to the error page
 * @throws {PageException} In case something went wrong looking up the page
 */
export function redirectToErrorPage(req, res, application, ex, params) {
    if(ex instanceof PageException) {
        req.sbLayout.error = ex.displayMessage;
    }
    const route = application.determineErrorRoute(ex, params);
    emitHeader(res, application.charset, ex);
    return route;
}
