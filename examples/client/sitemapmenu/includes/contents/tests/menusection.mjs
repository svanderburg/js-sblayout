import { displayEmbeddedMenuSection } from "../../../../../../view/client/embeddedmenusection.mjs";

function displayCommonMenuSection(div, params) {
    displayEmbeddedMenuSection(div, params.route, 2, params.baseURL, params, params.templateHandlers);
}

function createParagraphWithText(text) {
    const paragraph = document.createElement("p");
    const textNode = document.createTextNode(text);
    paragraph.appendChild(textNode);
    return paragraph;
}

export function displayMenuSectionContents(div, params) {
    displayCommonMenuSection(div, params);
    const paragraph = createParagraphWithText("This page contains an embedded menu section displaying sub pages on the second level allowing you to navigate to sub pages stored under this sub page.");
    div.appendChild(paragraph);
}

export function displayMenuSectionSubpage1(div, params) {
    displayCommonMenuSection(div, params);
    const paragraph = createParagraphWithText("Sub page 1");
    div.appendChild(paragraph);
}

export function displayMenuSectionSubpage2(div, params) {
    displayCommonMenuSection(div, params);
    const paragraph = createParagraphWithText("Sub page 2");
    div.appendChild(paragraph);
}

export function displayMenuSectionSubpage3(div, params) {
    displayCommonMenuSection(div, params);
    const paragraph = createParagraphWithText("Sub page 3");
    div.appendChild(paragraph);
}
