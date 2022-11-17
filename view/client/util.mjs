function processTemplate(element, section, response, templateHandlers) {
    // Check if there is a template handler that can process the file
    const extensions = Object.keys(templateHandlers);

    for(let i = 0; i < extensions.length; i++) {
        const extension = extensions[i];

        if(section.endsWith("." + extension)) {
            const templateHandlerFun = templateHandlers[extension];
            return templateHandlerFun(element, response);
        }
    }

    // If there is no template handler, just take the unprocessed string
    return response;
}

/**
 * Includes the content of a section that can either be a file with static HTML
 * contents or a function that renders the file by using a custom method, such
 * as a templating engine.
 *
 * @param {String} section File to be displayed
 * @param {String} basePath Base directory where the section file is stored
 * @param {HTMLElement} element HTML element in which the content needs to be updated
 * @param {Object} params An object with arbitrary parameters
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 */
export function includeSection(section, basePath, element, params, initialContents = "", templateHandlers = {}) {
    if(typeof section == "function") {
        element.innerHTML = initialContents;
        section(element, params);
    } else {
        const url = basePath + "/" + section;

        const xhr = new XMLHttpRequest();
        xhr.addEventListener("load", function() {
            element.innerHTML = initialContents + processTemplate(element, section, this.response, templateHandlers);
        });
        xhr.addEventListener("progress", function() {
            element.innerHTML = initialContents + "<p>Loading...</p>";
        });
        xhr.addEventListener("error", function() {
            element.innerHTML = initialContents + "<p>Cannot load HTML!</p>";
        });
        xhr.open("GET", url);
        xhr.send();
    }
}
