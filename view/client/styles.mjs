function removePageSpecificStylesheets(application) {
    const links = document.head.getElementsByTagName("link");
    const styleLinks = [];

    // Filter out stylesheet links
    for(let i = 0; i < links.length; i++) {
        const link = links.item(i);
        if(link.rel == "stylesheet") {
            styleLinks.push(link);
        }
    }

    // Remove obsolete stylesheets
    for(let i = application.styles.length; i < styleLinks.length; i++) {
        const obsoleteLink = styleLinks[i];
        document.head.removeChild(obsoleteLink);
    }
}

function createStyleLinkElement(stylesheet) {
    const linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.type = "text/css";
    linkElement.href = "styles/" + stylesheet;
    return linkElement;
}

function appendPageSpecificStylesheets(currentPage) {
    if(Array.isArray(currentPage.contents.styles)) {
        currentPage.contents.styles.forEach(stylesheet => {
            const linkElement = createStyleLinkElement(stylesheet);
            document.head.appendChild(linkElement);
        });
    }
}

/**
 * Updates the style elements with all page specific styles.
 *
 * @param {Application} application Encoding of the web application layout and pages
 * @param {ContentPage} page The currently requested page
 */
export function updateStyleSection(application, currentPage) {
    removePageSpecificStylesheets(application);
    appendPageSpecificStylesheets(currentPage);
}

/**
 * Generates style elements for all styles that are application wide
 *
 * @param {Application} application Encoding of the web application layout and pages
 * @param {ContentPage} page The currently requested page
 */
export function generateStaticStyleSection(application, currentPage) {
    application.styles.forEach(stylesheet => {
        const linkElement = createStyleLinkElement(stylesheet);
        document.head.appendChild(linkElement);
    });
}
