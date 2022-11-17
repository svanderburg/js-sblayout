export function displayParentContents(div, params) {
    const parentURL = params.route.composeParentPageURL(params.baseURL + '#');
    div.innerHTML = '<p><a href="' + parentURL + '">Go to the parent URL</a></p>';
}
