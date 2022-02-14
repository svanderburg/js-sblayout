import { ExternalPage } from "../../model/page/ExternalPage.mjs";
import { PageAlias } from "../../model/page/PageAlias.mjs";
import { StaticContentPage } from "../../model/page/StaticContentPage.mjs";

function hasSubPages(page) {
    return ((page instanceof StaticContentPage || page instanceof PageAlias) && page.subPages !== undefined);
}

/**
 * Displays a menu section containing links to sub pages.
 *
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Application} application Encoding of the web application layout and pages
 * @param {MenuSection} section Menu section to display
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {String} baseURL Base URL of the web application
 */
export async function displayMenuSection(res, application, section, route, baseURL) {
    if(section.level <= route.ids.length) {

        const subPath = route.composeBaseURL(baseURL, section.level);
        const rootPage = route.pages[section.level];

        // Display links to the sub pages
        if(hasSubPages(rootPage)) {
            for(const [id, subPage] of rootPage.subPages) {
                if(subPage.checkVisibleInMenu()) {
                    if(subPage instanceof ExternalPage) {
                        res.write('<a href="' + subPage.url + '">' + subPage.title + '</a>\n');
                    } else {
                        res.write("<a");

                        if(route.hasVisitedPageOnLevel(id, section.level)) {
                            res.write(' class="active"');
                        }

                        res.write(' href="' + subPath + id + '">' + subPage.title + '</a>\n');
                    }
                }
            }
        }
    }
}
