import { createStandardMenuItem } from "./standardmenuitem.mjs";
import { createCustomMenuItem } from "./custommenuitem.mjs";

export function createMenuItem(div, active, url, subPage, basePath, params, templateHandlers) {
    if(subPage.menuItem === null) {
        const link = createStandardMenuItem(active, url, subPage);
        div.appendChild(link);
    } else {
        createCustomMenuItem(div, active, url, subPage, basePath, params, templateHandlers);
    }
}
