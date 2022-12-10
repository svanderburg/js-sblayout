export function displayIconMenuItem(req, res) {
    res.write("<span>\n");
    if(req.sbLayout.active) {
        res.write('<a class="active" href="' + req.sbLayout.url + '">\n');
        res.write('<img src="' + req.sbLayout.baseURL + '/image/menu/go-home.png" alt="Home icon">\n');
        res.write('<strong>' + req.sbLayout.subPage.title + '</strong>\n');
        res.write('</a>\n');
    } else {
        res.write('<a href="' + req.sbLayout.url + '">\n');
        res.write('<img src="' + req.sbLayout.baseURL + '/image/menu/go-home.png" alt="Home icon">\n');
        res.write(req.sbLayout.subPage.title + '\n');
        res.write('</a>\n');
    }
    res.write("</span>\n");
}
