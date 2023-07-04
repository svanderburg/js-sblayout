import { Application } from "../../../model/Application.mjs";

import { StaticSection } from "../../../model/section/StaticSection.mjs";
import { SiteMapSection } from "../../../model/section/SiteMapSection.mjs";
import { ContentsSection } from "../../../model/section/ContentsSection.mjs";

import { StaticContentPage } from "../../../model/page/StaticContentPage.mjs";
import { HiddenStaticContentPage } from "../../../model/page/HiddenStaticContentPage.mjs";

import { Contents } from "../../../model/page/content/Contents.mjs";

/* Create an application model */

export const application = new Application(
    /* Title */
    "Site map menu website",

    /* Styles */
    [ "default.css" ],

    /* Sections */
    {
        header: new StaticSection("header.html"),
        menu: new SiteMapSection(0),
        contents: new ContentsSection(true)
    },

    /* Pages */
    new StaticContentPage("Home", new Contents("home.html"), {
        "403": new HiddenStaticContentPage("Forbidden", new Contents("error/403.html")),
        "404": new HiddenStaticContentPage("Page not found", new Contents("error/404.html")),

        page1: new StaticContentPage("Page 1", new Contents("page1.html"), {
            page11: new StaticContentPage("Subpage 1.1", new Contents("page1/subpage11.html")),
            page12: new StaticContentPage("Subpage 1.2", new Contents("page1/subpage12.html"))
        }),

        page2: new StaticContentPage("Page 2", new Contents("page2.html"), {
            page21: new StaticContentPage("Subpage 2.1", new Contents("page2/subpage21.html")),
            page22: new StaticContentPage("Subpage 2.2", new Contents("page2/subpage22.html"))
        }),

        page3: new StaticContentPage("Page 3", new Contents("page3.html"))
    }),

    /* Favorite icon */
    "favicon.ico",

    /* JavaScript includes */
    [ "mobilenavmenu.js" ]
);
