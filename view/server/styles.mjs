/**
 * Determines the actual CSS path. If the path is absolute, it is taken as is.
 * If it is relative it's expanded to a path that included from the styles/ folder.
 *
 * @param {String} style Path to a CSS file
 * @param {String} baseURL Base URL of the web application
 * @return {String} An expanded relative path or the the absolute path
 */
function determineStylePath(style, baseURL) {
    if(style.substr(0, 1) == '/') {
        return style;
    } else {
        return baseURL + "/styles/" + style;
    }
}

/**
 * Displays a section that includes CSS files both on application and page level.
 *
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Application} application Encoding of the web application layout and pages
 * @param {ContentPage} currentPage Page to be currently displayed
 * @param {String} baseURL Base URL of the web application
 */
export function generateStyleSection(res, application, currentPage, baseURL) {
    /* Include the defined CSS stylesheets in the application layout */

    if(Array.isArray(application.styles)) {
        application.styles.forEach(style => {
            const stylePath = determineStylePath(style, baseURL);
            res.write('\t\t<link rel="stylesheet" type="text/css" href="' + stylePath + '">\n');
        });
    }

    /* Include the defined styles in the contents */

    if(Array.isArray(currentPage.contents.styles)) {
        currentPage.contents.styles.forEach(style => {
            const stylePath = determineStylePath(style, baseURL);
            res.write('\t\t<link rel="stylesheet" type="text/css" href="' + stylePath + '">\n');
        });
    }
}
