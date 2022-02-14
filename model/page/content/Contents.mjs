/**
 * Represents the contents that ends up in the dynamic content sections of a page.
 *
 * The content is in most cases a single division containing HTML code, but it can also
 * be multiple divisions each having their own HTML fragments.
 */
class Contents {
    /**
     * Creates a new contents instance.
     *
     * @param {String|Object} An object mapping division ids onto files representing HTML content or a string, which represents the contents of the contents division.
     * @param {String} controller A string containing the path to the controller page that handles GET or POST parameters
     * @param {Array.<String>} styles An array containing stylesheet files to include when requesting this page 
     * @param {Array.<String>} scripts An array containing script files to include when requesting this page
     */
    constructor(sections, controller = null, styles = [], scripts = []) {
        if(typeof sections == "object") {
            this.sections = sections;
        } else {
            this.sections = { contents: sections };
        }

        this.controller = controller;
        this.styles = styles;
        this.scripts = scripts;
    }
}

export { Contents };
