/**
 * Displays breadcrumbs that lead the user from an earlier page to the current page.
 *
 * @param {Object} req An object that contains the HTTP request parameters
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {numeric} startIndex The index of the first level that needs to be displayed
 * @param {boolean} displayRoot Indicates whether to include the root page
 */
export function displayBreadcrumbs(req, res, route, startIndex = 0, displayRoot = false) {
    res.write('<p class="breadcrumbs">\n');

    let first = true;
    let url = req.sbLayout.baseURL;

    const numOfIds = route.ids.length;

    if(displayRoot) {
        const currentPage = route.pages[0];
        res.write('<a href="' + (url == "" ? "/" : url) + '"' + ((numOfIds == 0 ? ' class="active"' : "")) + '>' + currentPage.title + '</a>\n');
        first = false;
    }

    for(let i = 0; i < numOfIds; i++) {
        const currentId = route.ids[i];
        const currentPage = route.pages[i + 1];

        url = currentPage.deriveURL(url, currentId, "&amp;");

        if(i >= startIndex) {
            if(first)
                first = false;
            else
                res.write(" &raquo; ");

            res.write('<a href="' + url + '"' + ((i == numOfIds - 1) ? ' class="active"' : "") + '>' + currentPage.title + '</a>\n');
        }
    }

    res.write("</p>\n");
}
