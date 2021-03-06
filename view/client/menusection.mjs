import { StaticContentPage } from "../../model/page/StaticContentPage.mjs";
import { PageAlias } from "../../model/page/PageAlias.mjs";
import { ExternalPage } from "../../model/page/ExternalPage.mjs";

function hasSubPages(page) {
    return (page instanceof StaticContentPage || page instanceof PageAlias) && page.subPages !== undefined;
}

function createExternalPageLink(page) {
    const link = document.createElement("a");
    link.href = page.url;
    link.text = page.title;
    return link;
}

function createPageLink(id, page, route, section, subPath) {
    const link = document.createElement("a");
    link.href = subPath + id;
    link.text = page.title;

    if(route.hasVisitedPageOnLevel(id, section.level)) {
        link.className = "active";
    }

    return link;
}

/**
 * Displays a menu section containing links to sub pages.
 *
 * @param {HTMLDivElement} div HTML Div element to update
 * @param {Application} application Encoding of the web application layout and pages
 * @param {MenuSection} section Menu section to display
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {String} baseURL Base URL of the web application
 */
export function displayMenuSection(div, application, section, route, baseURL) {
    div.innerHTML = "";

    if(section.level <= route.ids.length) {
        const subPath = route.composeBaseURL(baseURL + "#", section.level);
        const rootPage = route.pages[section.level];

        // Display links to the sub pages
        if(hasSubPages(rootPage)) {
            for(const [id, subPage] of rootPage.subPages) {
                if(subPage.checkVisibleInMenu()) {
                    let link;

                    if(subPage instanceof ExternalPage) {
                        link = createExternalPageLink(subPage);
                    } else {
                        link = createPageLink(id, subPage, route, section, subPath);
                    }
                    div.appendChild(link);

                    const textNode = document.createTextNode(" ");
                    div.appendChild(textNode);
                }
            }
        }
    }
}
