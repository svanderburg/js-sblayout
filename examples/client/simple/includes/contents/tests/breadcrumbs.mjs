import { displayBreadcrumbs } from "../../../../../../view/client/breadcrumbs.mjs";

export function displayBreadcrumbsContents(div, params) {
    let innerHTML = "<p>From level 0 with root page:</p>\n";
    innerHTML += displayBreadcrumbs(params.baseURL, params.route, 0, true);

    innerHTML += "<p>From level 0 without root page:</p>\n";
    innerHTML += displayBreadcrumbs(params.baseURL, params.route, 0);

    innerHTML += "<p>From level 1:</p>\n";
    innerHTML += displayBreadcrumbs(params.baseURL, params.route, 1);

    div.innerHTML += innerHTML;
}
