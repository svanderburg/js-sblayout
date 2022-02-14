import { PageForbiddenException } from "../../model/PageForbiddenException.mjs";
import { PageNotFoundException } from "../../model/PageNotFoundException.mjs";

/**
 * Determines the route from the entry page to the requested page.
 *
 * @param {Application} application Encoding of the web application layout and pages
 * @param {String} path Path part of the URL that brings a user to a page managed by the layout manager
 * @param {Object} params An object with arbitrary parameters
 * @return {Route} A route that records all visited pages
 */
export function determineRoute(application, path, params) {
    try {
        return application.determineRoute(path, params);
    } catch(ex) {
        if(ex instanceof PageForbiddenException) {
            return application.determine403Route(params);
        } else if(ex instanceof PageNotFoundException) {
            return application.determine404Route(params);
        } else {
            throw ex;
        }
    }
}
