/**
 * Displays a menu item in the standard way
 *
 * @param {Object} res An object that allows you to write an HTTP response
 * @param {boolean} active Indicates whether the link is active
 * @param {String} url URL of the sub page
 * @param {Page} subPage Page where the menu item links to
 */
export function displayMenuItem(res, active, url, subPage) {
    if(active) {
        res.write('<a class="active" href="' + url + '"><strong>' + subPage.title + '</strong></a>\n');
    } else {
        res.write('<a href="' + url + '">' + subPage.title + '</a>\n');
    }
}
