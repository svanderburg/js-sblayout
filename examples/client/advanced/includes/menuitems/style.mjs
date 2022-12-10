export function displayStyleMenuItem(div, params) {
    let innerHTML;

    if(params.active) {
        innerHTML = '<a class="alternative_link active" href="' + params.url + '"><em>' + params.subPage.title + '</em></a>\n';
    } else {
        innerHTML = '<a class="alternative_link" href="' + params.url + '">' + params.subPage.title + '</a>\n';
    }

    div.innerHTML += innerHTML;
}
