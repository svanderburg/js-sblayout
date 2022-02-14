import * as fs from "fs";

function streamFile(res, filePath) {
    return new Promise((resolve, reject) => {
        const rs = fs.createReadStream(filePath);

        rs.on("data", (chunk) => {
            res.write(chunk);
        });
        rs.on("error", (err) => {
            reject(err);
        });
        rs.on("close", () => {
            resolve();
        });
    });
}

/**
 * Includes the content of a section that can either be a file with static HTML
 * contents or a function that renders the file by using a custom method, such
 * as a templating engine.
 *
 * @param {Object} req An object that contains the HTTP request parameters
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {String} section File to be displayed
 * @param {String} basePath Base directory where the section file is stored
 * @param {Object} templateHandlers An object mapping file extensions to functions that renders the file
 * @return {String} String representation of the content to be displayed
 */
export async function includeSection(req, res, section, basePath, templateHandlers) {
    if(typeof section == "function") {
        return section(req, res);
    } else if(typeof section == "string") {
        const sectionFile = basePath + "/" + section;

        // Check if there is a template handler that can process the file
        const extensions = Object.keys(templateHandlers);

        for(let i = 0; i < extensions.length; i++) {
            const extension = extensions[i];

            if(section.endsWith("." + extension)) {
                const templateHandlerFun = templateHandlers[extension];
                return templateHandlerFun(req, res, sectionFile);
            }
        }

        // If no template handler was specified, stream a static file
        return streamFile(res, sectionFile);
    }
}
