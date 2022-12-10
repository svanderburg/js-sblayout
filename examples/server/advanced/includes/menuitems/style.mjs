export function displayStyleMenuItem(req, res) {
    if(req.sbLayout.active) {
        res.write('<a class="alternative_link active" href="' + req.sbLayout.url + '"><em>' + req.sbLayout.subPage.title + '</em></a>\n');
    } else {
        res.write('<a class="alternative_link" href="' + req.sbLayout.url + '">' + req.sbLayout.subPage.title + '</a>\n');
    }
}
