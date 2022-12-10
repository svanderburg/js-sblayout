/**
 * Creates a menu item in the standard way
 *
 * @param {boolean} active Indicates whether the link is active
 * @param {String} url URL of the sub page
 * @param {Page} subPage Page where the menu item links to
 * @return {HTMLAnchorElement} Hyperlink that refers to the sub page
 */
export function createMenuItem(active, url, subPage) {
    const link = document.createElement("a");
    link.href = url;

    if(active) {
        const strongElement = document.createElement("strong");
        const text = document.createTextNode(subPage.title);
        strongElement.appendChild(text);
        link.className = "active";
        link.appendChild(strongElement);
    } else {
        link.text = subPage.title;
    }

    return link;
}
