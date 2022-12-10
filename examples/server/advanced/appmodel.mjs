import { Application } from "../../../model/Application.mjs";

import { StaticSection } from "../../../model/section/StaticSection.mjs";
import { MenuSection } from "../../../model/section/MenuSection.mjs";
import { ContentsSection } from "../../../model/section/ContentsSection.mjs";
import { CompoundSection } from "../../../model/section/CompoundSection.mjs";

import { StaticContentPage } from "../../../model/page/StaticContentPage.mjs";
import { HiddenStaticContentPage } from "../../../model/page/HiddenStaticContentPage.mjs";
import { PageAlias } from "../../../model/page/PageAlias.mjs";

import { Contents } from "../../../model/page/content/Contents.mjs";

import { displayIconMenuItem } from "./includes/menuitems/icon.mjs";
import { displayStyleMenuItem } from "./includes/menuitems/style.mjs";

export const application = new Application(
    /* Title */
    "Advanced test website",

    /* CSS stylesheets */
    [ "default.css" ],

    /* Sections */
    {
        header: new ContentsSection(false),
        menu: new MenuSection(0),
        container: new CompoundSection({
            submenu: new MenuSection(1),
            contents: new ContentsSection(true)
        }),
        footer: new StaticSection("footer.html")
    },

    /* Pages */
    new StaticContentPage("Home", new Contents({
        contents: "home.html",
        header: "home.html"
    }), {
        "403": new HiddenStaticContentPage("Forbidden", new Contents({
            contents: "error/403.html",
            header: "home.html"
        })),
        "404": new HiddenStaticContentPage("Page not found", new Contents({
            contents: "error/404.html",
            header: "home.html"
        })),

        home: new PageAlias("Home", ""),

        styles: new StaticContentPage("Styles", new Contents({
            contents: "styles.html",
            header: "home.html"
        }), {
            red: new StaticContentPage("Red", new Contents({
                contents: "styles/red.html",
                header: "home.html"
            }, null, [ "styles/red.css"])),
            blue: new StaticContentPage("Blue", new Contents({
                contents: "styles/blue.html",
                header: "home.html"
            }, null, [ "styles/blue.css" ])),
            green: new StaticContentPage("Green", new Contents({
                contents: "styles/green.html",
                header: "home.html"
            }, null, [ "styles/green.css" ]))
        }),

        scripts: new StaticContentPage("Scripts", new Contents({
            contents: "scripts.html",
            header: "home.html"
        }), {
            one: new StaticContentPage("One", new Contents({
                contents: "scripts/one.html",
                header: "home.html"
            }, null, null, [ "scripts/one.js" ])),
            two: new StaticContentPage("Two", new Contents({
                contents: "scripts/two.html",
                header: "home.html"
            }, null, null, [ "scripts/two.js" ]))
        }),

        header: new StaticContentPage("Header", new Contents({
            contents: "header.html",
            header: "home.html"
        }), {
            first: new StaticContentPage("First", new Contents({
                contents: "header/first.html",
                header: "header/first.html"
            })),
            second: new StaticContentPage("Second", new Contents({
                contents: "header/second.html",
                header: "header/second.html"
            }))
        }),

        menu: new StaticContentPage("Menu", new Contents({
            contents: "menu.html",
            header: "home.html",
        }), {
            icon: new StaticContentPage("Icon", new Contents({
                contents: "menu/icon.html",
                header: "home.html"
            }), {}, displayIconMenuItem),
            style: new StaticContentPage("Style", new Contents({
                contents: "menu/style.html",
                header: "home.html"
            }), {}, displayStyleMenuItem)
        })
    }),

    /* Favorite icon */
    "favicon.ico",

    /* Scripts */
    [ "hello.js" ]
);
