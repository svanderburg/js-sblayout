export function displayBadRequest(req, res) {
    if(req.sbLayout.error) {
        res.write("<p>" + req.sbLayout.error + "</p>\n");
    } else {
        res.write("<p>The request could not be processed due to an invalid parameter!</p>\n");
    }
}
