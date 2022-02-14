/**
 * Determines the actual script path. If the path is absolute, it is taken as is.
 * If it is relative it's expanded to a path that included from the scripts/ folder.
 *
 * @param {String} script Path to a script file
 * @param {String} baseURL Base URL of the web application
 * @return {String} An expanded relative path or the the absolute path
 */
function determineScriptPath(script, baseURL) {
    if(script.substr(0, 1) == '/') {
        return script;
    } else {
        return baseURL + "/scripts/" + script;
    }
}

/**
 * Displays a section that includes JavaScript files both on application and page level
 *
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Application} application Encoding of the web application layout and pages
 * @param {ContentPage} currentPage Page to be currently displayed
 * @param {String} baseURL Base URL of the web application
 */
export function generateScriptSection(res, application, currentPage, baseURL) {
    if(Array.isArray(application.scripts)) {
        application.scripts.forEach(script => {
            const scriptPath = determineScriptPath(script, baseURL);
            res.write('\t\t<script type="text/javascript" src="' + scriptPath + '"></script>\n');
        });
    }

    if(Array.isArray(currentPage.contents.scripts)) {
        currentPage.contents.scripts.forEach(script => {
            const scriptPath = determineScriptPath(script, baseURL);
            res.write('\t\t<script type="text/javascript" src="' + scriptPath + '"></script>\n');
        });
    }
}
