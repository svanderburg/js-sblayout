import { PageForbiddenException } from "../../model/PageForbiddenException.mjs";
import { PageNotFoundException } from "../../model/PageNotFoundException.mjs";

/**
 * Determines the route from the entry page to the requested page.
 *
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Application} application Encoding of the web application layout and pages
 * @param {String} path Path part of the URL that brings a user to a page managed by the layout manager
 * @param {Object} params An object with arbitrary parameters
 * @return {Route} A route that records all visited pages
 */
export function determineRoute(res, application, path, params) {
    let route;
    let status = 200;

    const appPath = path.substring(params.baseURL.length); // Subtract the baseURL from the path to look up

    try {
        route = application.determineRoute(appPath, params);
    } catch(ex) {
        if(ex instanceof PageForbiddenException) {
            status = 403;
            route = application.determine403Route(params);
        } else if(ex instanceof PageNotFoundException) {
            status = 404;
            route = application.determine404Route(params);
        } else {
            status = 500;
            throw ex;
        }
    }

    res.writeHead(status, {
        "Content-Type": "text/html"
    });

    return route;
}
