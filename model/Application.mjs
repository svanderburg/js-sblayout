import { isIterable } from "./util.mjs";
import { Route } from "./Route.mjs";

/**
 * Encodes the structure of a web application system which pages have common sections, common style settings and
 * a collection of pages displaying content.
 */
class Application {
    /**
     * Creates a new application instance.
     *
     * @param {String} title Title of the entire application
     * @param {Array.<String>} styles An array of CSS stylesheets used for all pages
     * @param {Object} sections An object/dictionary or iterable object of sections of which the page is composed
     * @param {Page} entryPage The entry page of the application
     * @param {String} icon The favorite icon the page should use
     * @param {Array.<String>} scripts An array of JavaScript files included by all pages
     * @param {String} charset The character encoding standard that the page should use (defaults to UTF-8)
     */
    constructor(title, styles, sections, entryPage, icon, scripts = [], charset = "UTF-8") {
        this.title = title;
        this.styles = styles;

        if(isIterable(sections)) {
            this.sections = new Map(sections);
        } else {
            this.sections = new Map(Object.entries(sections));
        }

        this.entryPage = entryPage;
        this.icon = icon;
        this.scripts = scripts;
        this.charset = charset;
    }

    /**
     * Examines a route derived from the path components of the requested URL and records all pages visited.
     *
     * @param {Route} route Route to investigate
     * @param {Object} params An object containing additional parameters
     * @throws {PageException} In case an error occured, such as the page cannot be found or access is restricted
     */
    examineRoute(route, params) {
        this.entryPage.examineRoute(this, route, params);
    }

    /**
     * Derives the route to the error page.
     *
     * @param {PageException} cause The page exception that triggered the error page
     * @param {Object} params An object containing additional parameters
     * @return {Route} The error page route
     */
    determineErrorRoute(cause, params) {
        const route = new Route([ cause.statusCode.toString() ]);
        this.entryPage.examineRoute(this, route, params);
        return route;
    }

    /**
     * Determines the route from the entry page to the requested page derived from the path components of the requested URL.
     *
     * @param {String} path The URL to determine the route for
     * @param {Object} params An object containing additional parameters
     * @return {Route} A route that records all visited pages
     * @throws {PageException} In case an error occured, such as the page cannot be found or access is restricted
     */
    determineRoute(path, params) {
        let ids;

        if(path == "" || path == "/") {
            ids = [];
        } else {
            ids = path.substr(1).split('/');
        }

        const route = new Route(ids);
        this.examineRoute(route, params);
        return route;
    }
}

export { Application };
