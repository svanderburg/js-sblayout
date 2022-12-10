export function displayIconMenuItem(div, params) {
    let innerHTML = "<span>\n";

    if(params.active) {
        innerHTML += '<a class="active" href="' + params.url + '">\n';
        innerHTML += '<img src="' + params.baseURL + "/image/menu/go-home.png" + '" alt="Home icon">\n';
        innerHTML += '<strong>' + params.subPage.title + '</strong>\n';
        innerHTML += '</a>\n';
    } else {
        innerHTML += '<a href="' + params.url + '">\n';
        innerHTML += '<img src="' + params.baseURL + "/image/menu/go-home.png" + '" alt="Home icon">\n';
        innerHTML += params.subPage.title + '\n';
        innerHTML += '</a>\n';
    }

    innerHTML += "</span>\n";

    div.innerHTML += innerHTML;
}
