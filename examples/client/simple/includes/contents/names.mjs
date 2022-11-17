export function displayFirstName(div, params) {
    div.innerHTML += "<p>Hi " + params.query.firstname + "!</p>";
}

export function displayLastNameSuggestion(div, params) {
    div.innerHTML += "<p>Hey " + params.query.firstname + ", you can also pass your last name as parameter!</p>";
}

export function displayFirstNameAndLastName(div, params) {
    div.innerHTML += "<p>Hi " + params.query.firstname + " " + params.query.lastname + "!</p>";
}
