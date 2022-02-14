function removePageSpecificScripts(application) {
    const scripts = document.head.getElementsByTagName("script");

    for(let i = application.scripts.length; i < scripts.length; i++) {
        const obsoleteScript = scripts.item(i);
        document.head.removeChild(obsoleteScript);
    }
}

function createScriptElement(script) {
    const scriptElement = document.createElement("script");
    scriptElement.type = "text/javascript";
    scriptElement.src = "scripts/" + script;
    return scriptElement;
}

function appendPageSpecificScripts(currentPage) {
    if(Array.isArray(currentPage.contents.scripts)) {
        currentPage.contents.scripts.forEach(script => {
            const scriptElement = createScriptElement(script);
            document.head.appendChild(scriptElement);
        });
    }
}

/**
 * Updates the script elements with all page specific scripts.
 *
 * @param {Application} application Encoding of the web application layout and pages
 * @param {ContentPage} page The currently requested page
 */
export function updateScriptSection(application, currentPage) {
    removePageSpecificScripts(application);
    appendPageSpecificScripts(currentPage);
}

/**
 * Generates script elements for all scripts that are application wide
 *
 * @param {Application} application Encoding of the web application layout and pages
 * @param {ContentPage} page The currently requested page
 */
export function generateStaticScriptSection(application, currentPage) {
    application.scripts.forEach(script => {
        const scriptElement = createScriptElement(script);
        document.head.appendChild(scriptElement);
    });
}
