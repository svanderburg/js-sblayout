/**
 * Displays breadcrumbs that lead the user from an earlier page to the current page.
 *
 * @param {String} baseURL URL of the currently opened page
 * @param {Route} route Route from the entry page to current page to be displayed
 * @param {numeric} startIndex The index of the first level that needs to be displayed
 * @param {boolean} displayRoot Indicates whether to include the root page
 * @return {String} HTML representation of the bread crumbs
 */
export function displayBreadcrumbs(baseURL, route, startIndex = 0, displayRoot = false) {
    let innerHTML = "<p>\n";
    let first = true;
    let url = baseURL;

    if(displayRoot) {
        const currentPage = route.pages[0];
        innerHTML += '<a href="' + (url == "" ? "/" : url) + '">' + currentPage.title + '</a>\n';
        first = false;
    }

    url += "#";

    for(let i = 0; i < route.ids.length; i++) {
        const currentId = route.ids[i];
        const currentPage = route.pages[i + 1];

        url = currentPage.deriveURL(url, currentId);

        if(i >= startIndex) {
            if(first)
                first = false;
            else
                innerHTML += " &raquo; ";

            innerHTML += '<a href="' + url + '">' + currentPage.title + '</a>\n';
        }
    }

    innerHTML += "</p>\n";
    return innerHTML;
}
