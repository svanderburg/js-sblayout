import { Application } from "../../../model/Application.mjs";

import { StaticSection } from "../../../model/section/StaticSection.mjs";
import { MenuSection } from "../../../model/section/MenuSection.mjs";
import { ContentsSection } from "../../../model/section/ContentsSection.mjs";
import { CompoundSection } from "../../../model/section/CompoundSection.mjs";

import { StaticContentPage } from "../../../model/page/StaticContentPage.mjs";
import { HiddenStaticContentPage } from "../../../model/page/HiddenStaticContentPage.mjs";
import { PageAlias } from "../../../model/page/PageAlias.mjs";
import { ExternalPage } from "../../../model/page/ExternalPage.mjs";
import { DynamicContentPage } from "../../../model/page/DynamicContentPage.mjs";
import { InaccessibleContentPage } from "./includes/InaccessibleContentPage.mjs";

import { Contents } from "../../../model/page/content/Contents.mjs";

import { displayFirstName, displayLastNameSuggestion, displayFirstNameAndLastName } from "./includes/contents/names.mjs";
import { displayFormController, displayFormContents } from "./includes/contents/tests/form.mjs";
import { displayBreadcrumbsContents } from "./includes/contents/tests/breadcrumbs.mjs";
import { displaySiteMapContents } from "./includes/contents/tests/sitemap.mjs";

/* Create an application model */

export const application = new Application(
    /* Title */
    "My application",

    /* Styles */
    [ "default.css" ],

    /* Sections */
    {
        header: new StaticSection("header.html"),
        menu: new MenuSection(0),
        container: new CompoundSection({
            submenu: new MenuSection(1),
            contents: new ContentsSection(true)
        })
    },

    /* Pages */
    new StaticContentPage("Home", new Contents("home.html"), {
        "403": new HiddenStaticContentPage("Forbidden", new Contents("error/403.html")),
        "404": new HiddenStaticContentPage("Page not found", new Contents("error/404.html")),

        home: new PageAlias("Home", ""),

        aliaspage1: new PageAlias("Alias page 1", "page1"),

        inaccessible: new InaccessibleContentPage("Inaccessible", new Contents("page1.html")),

        page1: new StaticContentPage("Page 1", new Contents("page1.html"), {
            page11: new StaticContentPage("Subpage 1.1", new Contents("page1/subpage11.html")),
            page12: new StaticContentPage("Subpage 1.2", new Contents("page1/subpage12.html")),
            page13: new StaticContentPage("Subpage 1.3", new Contents("page1/subpage13.html"))
        }),

        page2: new StaticContentPage("Page 2", new Contents("page2.html"), {
            page21: new StaticContentPage("Subpage 2.1", new Contents("page2/subpage21.html")),
            page22: new StaticContentPage("Subpage 2.2", new Contents("page2/subpage22.html")),
            page23: new StaticContentPage("Subpage 2.3", new Contents("page2/subpage23.html"))
        }),

        firstname: new DynamicContentPage("First name", "firstname", new Contents("firstname.html"), new StaticContentPage("First name", new Contents(displayFirstName), {
            lastname: new DynamicContentPage("Last name", "lastname", new Contents(displayLastNameSuggestion), new StaticContentPage("Last name", new Contents(displayFirstNameAndLastName)))
        })),

        external: new ExternalPage("External", "http://www.google.com"),

        tests: new StaticContentPage("Tests", new Contents("tests.html"), {
            form: new StaticContentPage("Form", new Contents(displayFormContents, displayFormController)),
            breadcrumbs: new StaticContentPage("Bread crumbs", new Contents(displayBreadcrumbsContents)),
            sitemap: new StaticContentPage("Site map", new Contents(displaySiteMapContents))
        })
    }),

    /* Favorite icon */
    "favicon.ico"
);
