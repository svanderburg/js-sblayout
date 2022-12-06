function createPageLink(id, page, route, level, basePath) {
    const link = document.createElement("a");
    link.href = page.deriveURL(basePath, id);

    if(page.checkActive(route, id, level)) {
        const strongElement = document.createElement("strong");
        const text = document.createTextNode(page.title);
        strongElement.appendChild(text);
        link.className = "active";
        link.appendChild(strongElement);
    } else {
        link.text = page.title;
    }

    return link;
}

/**
 * Displays an inline representation of a menu section.
 *
 * @param {HTMLDivElement} div HTML Div element to update
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {number} level The level in the navigation structure where to display sub page links from
 * @param {String} baseURL Base URL of the web application
 */
export function displayInlineMenuSection(div, route, level, baseURL) {
    if(level <= route.ids.length) {
        const basePath = route.composeURLAtLevel(baseURL + "#", level);
        const rootPage = route.pages[level];

        // Display links to the sub pages
        for(const [id, subPage] of rootPage.subPageIterable()) {
            if(subPage.checkVisibleInMenu()) {
                const link = createPageLink(id, subPage, route, level, basePath);
                div.appendChild(link);

                const textNode = document.createTextNode(" ");
                div.appendChild(textNode);
            }
        }
    }
}
