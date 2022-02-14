import { Application } from "../../../model/Application.mjs";

import { StaticSection } from "../../../model/section/StaticSection.mjs";
import { MenuSection } from "../../../model/section/MenuSection.mjs";
import { ContentsSection } from "../../../model/section/ContentsSection.mjs";

import { LocalizedContentPage } from "../../../model/page/LocalizedContentPage.mjs";
import { HiddenLocalizedContentPage } from "../../../model/page/HiddenLocalizedContentPage.mjs";
import { StaticContentPage } from "../../../model/page/StaticContentPage.mjs";
import { HiddenStaticContentPage } from "../../../model/page/HiddenStaticContentPage.mjs";
import { InaccessibleContentPage } from "./includes/InaccessibleContentPage.mjs";

import { Contents } from "../../../model/page/content/Contents.mjs";

export const application = new Application(
    /* Title */
    "Internationalised test website",

    /* CSS stylesheets */
    [ "default.css" ],

    /* Sections */
    {
        header: new StaticSection("header.html"),
        menu: new MenuSection(0),
        contents: new ContentsSection(true)
    },

    /* Pages */
    new LocalizedContentPage({
        nl: new StaticContentPage("Nederlands", new Contents("nl.html")),
        "en-us": new StaticContentPage("American", new Contents("en-us.html")),
        "en-gb": new StaticContentPage("British", new Contents("en-gb.html")),
        fr: new StaticContentPage("Français", new Contents("fr.html")),
        de: new StaticContentPage("Deutsch", new Contents("de.html")),

        inaccessible: new InaccessibleContentPage("Inaccessible", new Contents("nl.html")),

        "404": new HiddenLocalizedContentPage([
            [ "nl", new HiddenStaticContentPage("Pagina niet gevonden", new Contents("error/404/nl.html")) ],
            [ "en-us", new HiddenStaticContentPage("Page not found", new Contents("error/404/en-us.html")) ],
            [ "en-gb", new HiddenStaticContentPage("Page not found", new Contents("error/404/en-gb.html")) ],
            [ "fr", new HiddenStaticContentPage("Page non trouvée", new Contents("error/404/fr.html")) ],
            [ "de", new HiddenStaticContentPage("Seite nicht gefunden", new Contents("error/404/de.html")) ],
        ]),
        "403": new HiddenLocalizedContentPage([
            [ "nl", new HiddenStaticContentPage("Verboden", new Contents("error/403/nl.html")) ],
            [ "en-us", new HiddenStaticContentPage("Forbidden", new Contents("error/403/en-us.html")) ],
            [ "en-gb", new HiddenStaticContentPage("Forbidden", new Contents("error/403/en-gb.html")) ],
            [ "fr", new HiddenStaticContentPage("Interdit", new Contents("error/403/fr.html")) ],
            [ "de", new HiddenStaticContentPage("Verboten", new Contents("error/403/de.html")) ],
        ])
    }),

    /* Favorite icon */
    "favicon.ico"
);
