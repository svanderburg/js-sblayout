export function displayFirstName(req, res) {
    res.write("<p>Hi " + req.sbLayout.query.firstname + "!</p>");
}

export function displayLastNameSuggestion(req, res) {
    res.write("<p>Hey " + req.sbLayout.query.firstname + ", you can also pass your last name as parameter!</p>\n");
}

export function displayFirstNameAndLastName(req, res) {
    res.write("<p>Hi " + req.sbLayout.query.firstname + " " + req.sbLayout.query.lastname + "!</p>");
}
