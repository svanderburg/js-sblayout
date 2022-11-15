function displayFullName(div, form) {
    const firstname = form.elements.namedItem("firstname").value;
    const lastname = form.elements.namedItem("lastname").value;

    if(firstname == "" || lastname == "") {
        div.innerHTML = "<p>This page requires a firstname and lastname parameter!</p>\n";
    } else {
        const fullname = firstname + " " + lastname;

        div.innerHTML = "<p>Hi, I believe your full name is: " + fullname + "</p>\n";
    }
}

function createRowParagraph(text, name) {
    const paragraph = document.createElement("p");

    const label = document.createElement("label");
    label.innerText = text;
    paragraph.appendChild(label);

    const space = document.createTextNode(" ");
    paragraph.appendChild(space);

    const input = document.createElement("input");
    input.type = "text";
    input.name = name;
    paragraph.appendChild(input);

    return paragraph;
}

function createButtonParagraph(div) {
    const paragraph = document.createElement("p");

    const button = document.createElement("button");
    button.type = "submit";
    button.innerText = "Submit";
    button.onclick = function() {
        displayFullName(div, this.form);
    };
    paragraph.appendChild(button);
    return paragraph;
}

export function displayFormContents(div, params) {
    div.innerHTML = "";

    const paragraph = document.createElement("p");
    paragraph.innerText = "Please enter your name:";
    div.appendChild(paragraph);

    const form = document.createElement("form");

    const firstNameRowParagraph = createRowParagraph("First name:", "firstname");
    form.appendChild(firstNameRowParagraph);
    const lastNameRowParagraph = createRowParagraph("Last name:", "lastname");
    form.appendChild(lastNameRowParagraph);
    const buttonParagraph = createButtonParagraph(div);
    form.appendChild(buttonParagraph);

    div.appendChild(form);
}
