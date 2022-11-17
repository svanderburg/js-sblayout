export function displayParentContents(req, res) {
    const parentURL = req.sbLayout.route.composeParentPageURL(req.sbLayout.baseURL);
    res.write('<p><a href="' + parentURL + '">Go to the parent URL</a></p>\n');
}
