function createPageLink(id, page, route, section, basePath) {
    const link = document.createElement("a");
    link.href = page.deriveURL(basePath, id);
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
        const basePath = route.composeBaseURL(baseURL + "#", section.level);
        const rootPage = route.pages[section.level];

        // Display links to the sub pages
        for(const [id, subPage] of rootPage.subPageIterable()) {
            if(subPage.checkVisibleInMenu()) {
                const link = createPageLink(id, subPage, route, section, basePath);
                div.appendChild(link);

                const textNode = document.createTextNode(" ");
                div.appendChild(textNode);
            }
        }
    }
}
