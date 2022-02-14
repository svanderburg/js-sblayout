import { Application } from "../../../model/Application.mjs";

import { StaticSection } from "../../../model/section/StaticSection.mjs";
import { MenuSection } from "../../../model/section/MenuSection.mjs";
import { ContentsSection } from "../../../model/section/ContentsSection.mjs";

import { StaticContentPage } from "../../../model/page/StaticContentPage.mjs";
import { HiddenStaticContentPage } from "../../../model/page/HiddenStaticContentPage.mjs";
import { PageAlias } from "../../../model/page/PageAlias.mjs";

import { Contents } from "../../../model/page/content/Contents.mjs";

export const application = new Application(
    /* Title */
    "My application",

    /* Styles */
    [ "default.css" ],

    /* Sections */
    {
        header: new StaticSection("header.html"),
        menu: new MenuSection(0),
        submenu: new MenuSection(1),
        contents: new ContentsSection(true)
    },

    /* Pages */
    new StaticContentPage("Home", new Contents("home.ejs"), {
        "404": new HiddenStaticContentPage("Page not found", new Contents("error/404.html")),

        home: new PageAlias("Home", "")
    }),

    /* Favorite icon */
    "favicon.ico"
);
