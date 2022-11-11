js-sblayout
===========
This package contains a JavaScript library to make my life a bit easier while
developing web applications. I have observed that for many web applications that
I have developed in the past, all pages all more or less look and behave in
a quite similar way.

As a consequence, I have found myself writing lots of boiler plate code that
had to be repeated for each additional page I implement. Furthermore, it also
turned maintenance of pages into quite a tedious problem.

The libraries in this package allow someone to define a web application as a set
of pages that refer to other sub pages. Developers only have to capture the
common aspects, such as the sections and style of the entire web application,
once and only need to provide the individual characteristics of every additional
sub page.

The libraries automatically compose the corresponding pages, and ensures a number
of non-functional quality attributes, such as a mechanism allowing end users to
always know where they are in the navigation structure of the application.

Moreover, it also automatically hides sub pages in the menu sections that are
not accessible.

Because the libraries are implemented in JavaScript, it can be used both on the
server-side with [Node.js](https://nodejs.org) (using its internal web server or
a framework such as [express](https://expressjs.com)) or on the client-side in
a modern web browser (such as Firefox or Chrome) in which the DOM is updated
dynamically to render a requested page.

Disclaimer
==========
This package is the result of a personal programming exercise -- it has never
been used in production. Use it at your own risk.

Prerequisites
=============
This package has no hard dependencies on any external JavaScript packages, but
it can optionally integrate with a number of third-party libraries.

For server-side usage Node.js 14.x or higher should work.

For client-side usage, you need a modern browser (such as Firefox or Chrome)
capable of supporting ECMAScript modules.

Installation
============
This package can be conveniently installed as a Node.js dependency with NPM:

```bash
$ npm install git+https://github.com/svanderburg/js-sblayout
```

Usage
=====
The libraries can be used in a straight forward way. To get a web application
working we have to remember three things.

First, we must create an object instance of the `Application` class that serves
as the _model_ of the application -- it captures common properties such as the
sections, style settings, and all the sub pages of the application.

A page in the application model can be displayed by invoking a _view_ function.
This package provides two implementations of the `displayRequestedPage`
function. One variant works on the server side with Node.js' web server
implementation (`view/server/index.mjs`) and the other can be used on the client
side in a web browser (`view/client/index.mjs`).

Finally, we always use one single address (invoking the view page) that handles
all requests to every sub page. The path components that are appended to its URL
serve as selectors for the sub pages of the application.

For example, for a server-side application we can use:

* `http://localhost` refers to the entry page of the web application
* `http://localhost/a` refers to a sub page reachable from the entry page
* `http://localhost/a/b` refers to a sub page reachable from the previous sub page

In a client-side/browser version of an application, we can use:

* `http://localhost/index.html` refers to the entry page of the web application
* `http://localhost/index.html#/a` refers to a sub page reachable from the entry page
* `http://localhost/index.html#/a/b` refers to a sub page reachable from the previous sub page

Implementing a very trivial web application
-------------------------------------------
To create a very trivial web application displaying one page, we must first
create an application model:

```javascript
import { Application } from "js-sblayout/model/Application.mjs";

import { StaticSection } from "js-sblayout/model/section/StaticSection.mjs";
import { ContentsSection } from "js-sblayout/model/section/ContentsSection.mjs";

import { StaticContentPage } from "../../../model/page/StaticContentPage.mjs";

/* Create an application model */

export const application = new Application(
    /* Title */
    "My application",

    /* Styles */
    [ "default.css" ],

    /* Sections */
    {
        header: new StaticSection("header.html"),
        contents: new ContentsSection(true),
        footer: new StaticSection("footer.html")
    },

    /* Pages */
    new StaticContentPage("Home", new Contents("fruit.html"))
);
```

In the above file (`appmodel.mjs`), we compose an application model in which
every sub page consists of three sections. The `header` and `footer` always
display the same code fragment. The `contents` section is filled with variable
text that makes every page unique.

Every sub page has `Trivial web application` in the title and use the style
settings from the `default.css` stylesheet.

We can use the above model in combination with an embedded HTTP server to
generate pages server-side:

```javascript
import { application } from "./appmodel.mjs";
import { displayRequestedPage } from "../../../view/server/index.mjs";
import { createTestServer } from "../../../testhttpserver.mjs";

/* Create test server that displays the layout */

const server = createTestServer(function(req, res, url) {
    displayRequestedPage(req, res, application, url.pathname);
});
server.listen(process.env.PORT || 8080);
```

In the above file, we include the application model shown in the previous code
fragment (`appmodel.mjs`), we construct a test HTTP server, in which all dynamic
page requests are forwarded to a callback function that invokes
`displayRequestedPage`.

The `displayRequestedPage` uses the path in the URL to determine which as a
selector for which sub page should be returned.

We can run the web application using the test HTTP server as follows:

```bash
$ node app.mjs
```

We can open the entry page in the browser, by opening the following URL:

    http://localhost:8080

In addition to rendering sub pages server-side, it is also possible to do it
in client-side (in the browser), by dynamically updating the DOM:

```html
<!DOCTYPE html>

<html>
    <head>
        <title>My page</title>
        <script type="module">
import { application } from "./appmodel.mjs";
import { initRequestedPage, updateRequestedPage } from "js-sblayout/view/client/index.mjs";

document.body.onload = function() {
    initRequestedPage(application);
};

document.body.onpopstate = function() {
    updateRequestedPage(application);
};
        </script>
    </head>

    <body>
    </body>
</html>
```

The above HTML file (`index.html`), is an HTML file with a minimal amount of
static content:
* It only defines a bare minimum of static HTML elements to make the document
  valid HTML5.
* It includes the `appmodel.mjs` model shown earlier.
* The `document.body.onload` callback renders the requested page for the first
  time.
* The `document.body.onpopstate` callback updates the dynamic parts of the page
  when the user has clicked on a link (that updates the hash part of an URL).

By opening the above page in a web browser (served from an HTTP server that can
serve static content), we should see the entry page that is dynamically rendered
by updating the DOM:

    http://localhost:8080/index.html

Implementing a web application with sub pages
---------------------------------------------
We can adapt the page parameter (in the application model shown earlier) to refer
to a collection of sub pages by adding an additional parameter to the
constructor. Each element in the object represents a sub page displaying a
specific kind of fruit:

```javascript
/* Pages */
new StaticContentPage("Fruit", new Contents("fruit.html"), {
    apples: new StaticContentPage("Apples", new Contents("fruit/apples.html")),
    pears: new StaticContentPage("Pears", new Contents("fruit/pears.html")),
    oranges: new StaticContentPage("Oranges", new Contents("fruit/oranges.html"))
})
```

By adding a menu section, we can automatically show a menu section on every page
that displays links to their sub pages and marks the link that is currently
selected as such. We can change the sections parameter to include a menu
section:

```javascript
import { MenuSection } from "js-sblayout/model/section/MenuSection.mjs";

/* Sections */
{
    header: new StaticSection("header.html"),
    menu: new MenuSection(0),
    contents: new ContentsSection(true),
    footer: new StaticSection("footer.html")
}
```

We must also add a couple of additional files that display the contents of each
sub page:

    contents/
      fruit/
        apples.html
        pears.html
        oranges.html

After making these modifications, each page shows a menu section that displays
the fruit kinds. Clicking on a link will redirect us to the page displaying it.

Moreover, the path name in the URL also allows us to navigate to every fruit
flavour. For example, the following URL redirects us to the oranges sub page:
* `http://localhost/oranges` (server version)
* `http://localhost/index.html#/oranges` (browser version)

Implementing more complex navigation structures
-----------------------------------------------
It is also possible to have multiple levels of sub pages. For example, we can
also add sub pages to sub pages and an additional menu section (`submenu`)
displaying the available sub sub pages per sub page:

```javascript
/* Sections */
{
    header: new StaticSection("header.html"),
    menu: new MenuSection(0),
    submenu: new MenuSection(1),
    contents: new ContentsSection(true),
    footer: new StaticSection("footer.html")
},

/* Pages */
new StaticContentPage("Fruit", new Contents("fruit.html"), {
    apples: new StaticContentPage("Apples", new Contents("fruit/apples.html"), {
        red: new StaticContentPage("Red", new Contents("fruit/apples/red.html")),
        green: new StaticContentPage("Green", new Contents("fruit/apples/green.html"))
    }),
    pears: new StaticContentPage("Pears", new Contents("fruit/pears.html"), {
        yellow: new StaticContentPage("Yellow", new Contents("fruit/pears/yellow.html")),
        green: new StaticContentPage("Green", new Contents("fruit/pears/green.html"))
    }),
    oranges: new StaticContentPage("Oranges", new Contents("fruit/oranges.html"), {
        orange: new StaticContentPage("Orange", new Contents("fruit/oranges/orange.html")),
        yellow: new StaticContentPage("Yellow", new Contents("fruit/oranges/yellow.html"))
    })
})
```

Similar to the previous example, a `submenu` section displays the sub pages of a
particular fruit kind.

We can also use the URL to get to a specific sub sub page. For example, the
following URL shows the red apple sub sub page:
* `http://localhost/apples/red` (server version)
* `http://localhost/index.html#/apples/red` (browser version)

You can nest sub pages as deep as you want, but for the sake of usability this is
not recommended in most cases.

Creating compound sections
--------------------------
As explained in the first example, sections normally translate to `div`
elements inside the `body` element. For the implementation of more advanced
layouts, it may also be desired to nest `div`s.

It is also possible to nest sections inside `CompoundSection` objects to
generate nested `div`s:

```php
import { CompoundSection } from "js-sblayout/model/section/CompoundSection.mjs";

/* Sections */
{
    header: new StaticSection("header.html"),
    menu: new MenuSection(0),
    container: new CompoundSection({
        submenu: new MenuSection(1),
        contents: new ContentsSection(true)
    }),
    footer: new StaticSection("footer.html")
},
```

In the above example, we have added a compound section named: `container`.
Inside the `container` we have embedded the `submenu` and `contents` sections.

The above organization can be useful to, for example, vertically position the
`header`, `menu`, `container` and `footer` sections and horizontally align the
`submenu` and `contents` sections. The CSS properties of the `container` section
can be used to change the positioning.

Error pages
-----------
It may also happen that some error occurs while trying to display a page. For
example, trying to access a sub page that does not exists (e.g.
`http://localhost/oranges/purple`) should display a 404 error page.
Moreover, pages that are inaccessible should display a 403 error page.

These error pages can be defined by adding them as a sub page to the entry page
with keys `403` and `404`:

```javascript
/* Pages */
new StaticContentPage("Fruit", new Contents("fruit.html"), {
    403: new HiddenStaticContentPage("Forbidden", new Contents("error/403.html")),
    404: new HiddenStaticContentPage("Page not found", new Contents("error/404.html"))
    ...
})
```

Security handling
-----------------
If it is desired to secure a page from unauthorized access, you can implement
your own class that inherits from `Page` which overrides the
`checkAccessibility()` method. This function should return `true` if and only if
an end user is authorized to view it.

For example, the following class implements a page displaying content that denies
access to everyone:

```javascript
import { ContentPage } from "js-sblayout/model/page/ContentPage.mjs";

class InaccessibleContentPage extends ContentPage {
    checkAccessibility() {
        return false;
    }
}
```

You can do in the body of `checkAccessibility()` whatever you want. For example,
you can also change it to take some cookie values containing a username and
password that gets verified against something that is stored in a database.

By adding an object that is in instance of our custom class to a subpage of the
entry page, we can secure it.

Implementing more complex dynamic layouts
-----------------------------------------
We can also support more complex dynamic layouts. In our previous example with
fruit kinds, we only defined one content section in which details about the fruit
kind is displayed.

We can also change the application model to have two dynamic content sections
(or even more). By replacing the first parameter of the `Contents` section from 
string to an object, we can specify the contents of each content section of page.
(if only a string is given, the `contents` section is modified).

The following model makes the header as well as the contents sections dynamic for
each sub page:

```javascript
/* Sections */
{
    header: new ContentsSection(false),
    menu: new MenuSection(0),
    contents: new ContentsSection(true),
    footer: new StaticSection("footer.html")
},

/* Pages */
new StaticContentPage("Fruit", new Contents({
    header: "fruit.html",
    contents: "fruit.html"
}), {
    apples: new StaticContentPage("Apples", new Contents({
        header: "fruit/apples.html",
        contents: "fruit/apples.html"
    })),
    pears: new StaticContentPage("Pears", new Contents({
        header: "fruit/pears.html",
        contents: "fruit/pears.html"
    })),
    oranges: new StaticContentPage("Oranges", new Contents({
        header: "fruit/oranges.html",
        contents: "fruit/oranges.html"
    }))
})
```

The above model also requires a few additional files that should reside in the
`header` subdirectory:

    header/
      fruit.html
      fruit/
        apples.html
        pears.html
        oranges.html

The above files should display the header for each fruit kind.

Generating dynamic content
--------------------------
So far, all the sections shown in the previous examples are rendered from
*static* HTML code snippets. Sometimes it may also be desired to construct the
content of a section *dynamically*, for example, to respond to parameters
provided by a user.

Instead of providing a string parameter with a path to a static HTML snippet, it
is also possible to provide a function as a parameter that can be used to
generate content dynamically.

For example, the following page defines a `contents` section with a function
parameter (instead of a string referring to a static HTML snippet):

```javascript
new StaticContentPage("Hello 10 times", displayHello10Times)
```

The second parameter refers to a function named: `displayHello10Times` that
dynamically generates the page's content. The purpose of this function is to
generate a page that displays: `Hello!` 10 times.

When developing a server application, we could implement this generator function
as follows:

```javascript
function displayHello10Times(req, res) {
    for(let i = 0; i < 10; i++) {
        res.write("<p>Hello!</p>\n");
    }
}
```

The above function uses a loop to display the string 10 times. Server-side
dynamic functions have the following properties:
* It is allowed to make the generator function synchronous as well as asynchronous
  (using the `async` keyword or by returning a `Promise`) so that it can work
  with asynchronous APIs.
* The `req` parameter refers to the Node.js internal HTTP server's
  `http.IncomingMessage` object and can be used to retrieve HTTP headers and
  other request parameters.
* The `req.sbLayout` parameter provides parameters that are related to the
  layout framework.
* The `res` parameter refers to the Node.js internal HTTP server's
  `http.ServerResponse` object and can be used to generate a response message.

When developing an application that dynamically updates the browser DOM, this
function should have a different signature:

```javascript
function displayHello10Times(div, params) {
    let response = "";

    for(let i = 0; i < 10; i++) {
        response += "<p>Hello!</p>\n";
    }

    div.innerHTML = response;
}
```

In the browser, a dynamic function accepts two parameters:
* `div` refers to an `HTMLDivElement` in the DOM that contains the content of
  the section
* `params` provides properties that the layout manager framework supports
  (identical to `req.sbLayout` in the server-side example).

The framework propagates the following parameters (through `req.sbLayout` or
`params`):
* `query` contains all dynamic parameters
* `accept-language` contains the localization settings
* `baseURL` refers to the base URL of the web application

Handling GET or POST parameters
-------------------------------
Sometimes it may also be required to process GET or POST parameters, if a sub
page (for example) contains a form.

The contents object can also take a controller parameter that invokes a function
before any HTML output is rendered:

```javascript
/* Pages */

new StaticContentPage("Fruit", new Contents("fruit.html"), {
    ...
    question: new StaticContentPage("Question", new Contents("question.html", analyzeAnswer)),
    ...
})
```

The above code fragment adds a sub page that displays a form asking the user a
question what his/her favorite fruit kind is. After a user submits his answer
through the form the same page is displayed. Instead of showing the form the
answer is displayed.

To process the answer, we need to implement a function: `analyzeAnswer` that
can take the provided answer from the `req.body` parameter. The function
signature of the controller is identical to a function that generates a dynamic
page.

Using path components as parameters
-----------------------------------
Instead of using the path components in a URL to address sub pages, we may also
want to use path components as parameters instead. To use path components as
parameters, we can use objects that are instances of `DynamicContentPage`:

```javascript
import { DynamicContentPage } from "js-sblayout/model/page/DynamicContentPage.mjs";
```

The following code fragments adds a sub page having a sub page that interprets
a path component:

```javascript
/* Pages */

new StaticContentPage("Fruit", new Contents("fruit.html"), {
    ...
    fruitname: new DynamicContentPage("Display fruit name", "fruitname", new Contents(displayFruitName))
    ...
})
```

The first parameter of the constructor contains the title, the second the name of
the variable that will be set when the sub page is processed, and the third
parameter refers to a function: `displayFruitName` that should do something with
it.

We can implement the `displayFruitName` function (to simply display the
parameter server-side) as follows:

```javascript
function displayFruitName(req, res) {
    res.write(req.sbLayout.query.fruitname);
}
```

In the browser/client-side version, we can implement this function as follows:

```javascript
function displayFruitName(div, params) {
    div.innerHTML = params.query.fruitname;
}
```

If we address the page with: `http://localhost/fruitname/apples` (server-side version)
or `http://localhost/index.html#/fruitname/apples` (browser version) we should see:

    apples

and if we address the page with: `http://localhost/fruitname/bananas` or
`http://localhost/index.html#/fruitname/bananas`, we should see:

    bananas

The `DynamicContentPage` constructor also has an optional fourth parameter to
define additional sub pages or to interpret multiple parameters.

Implementing an internationalised web application
-------------------------------------------------
Another use case is implementing internationalised web applications. By creating
a page that is an instance of a `LocalizedContentPage` we can easily support
the same page in multiple languages:

```javascript
import { LocalizedContentPage } from "js-sblayout/model/page/LocalizedContentPage.mjs";

/* Pages */
new LocalizedContentPage({
    nl: new StaticContentPage("Nederlands", new Contents("nl.html")),
    en-us: new StaticContentPage("American", new Contents("en-us.html")),
    en-gb: new StaticContentPage("British", new Contents("en-gb.html")),
    fr: new StaticContentPage("Français", new Contents("fr.html")),
    de: new StaticContentPage("Deutsch", new Contents("de.html"))
})
```

The above code fragment defines a page with translations into Dutch, American,
British, French and German.

Any user can retrieve a particular translation of a page (such as German) by
using the following URL (server-side):

    http://localhost/de

or in the browser version:

    http://localhost/index.html#/de

If the root of this URL is used:

    http://localhost

Then the preferred language will be derived from the `Accept-Language` parameter
in the HTTP header that is sent by the user agent.

If a particular variant of language is not supported (e.g. the Belgian variant of
Dutch: `nl-be`) then the detection algorithm will automatically do a fallback to
the generic variant: `nl`.

If none of the preferred languages is supported, the first option in the object
will be taken (which is `nl` in our example).

Strict section and page key ordering
------------------------------------
In all the examples shown previously, we have used an `Object` to define
sections and sub pages. In JavaScript, the order of keys in an object is
somewhat deterministic but not entirely -- for example, numeric keys will
typically appear before keys that are arbitrary strings, regardless of the
insertion order.

As a consequence, the order of the pages and sections may not be the same as the
order in which the keys are declared.

When the object key ordering is a problem, it is also possible to use iterable
objects, such as a nested array, to ensure strict key ordering:

```javascript
import { Application } from "js-sblayout/model/Application.mjs";

import { StaticSection } from "js-sblayout/model/section/StaticSection.mjs";
import { MenuSection } from "js-sblayout/model/section/MenuSection.mjs";
import { ContentsSection } from "js-sblayout/model/section/ContentsSection.mjs";

import { StaticContentPage } from "../../../model/page/StaticContentPage.mjs";

/* Create an application model */

export const application = new Application(
    /* Title */
    "My application",

    /* Styles */
    [ "default.css" ],

    /* Sections */
    [
        [ "header", new StaticSection("header.html") ],
        [ "menu", new MenuSection(0) ],
        [ "contents", new ContentsSection(true) ],
        [ 1, new StaticSection("footer.html") ]
    ],

    /* Pages */
    new StaticContentPage("Home", new Contents("fruit.html", [
        [ "apples", new StaticContentPage("Apples", new Contents("fruit/apples.html")) ],
        [ "pears", new StaticContentPage("Pears", new Contents("fruit/pears.html")) ],
        [ "oranges", new StaticContentPage("Oranges", new Contents("fruit/oranges.html")) ],
        [ 0, new StaticContentPage("Lemon", new Contents("fruit/lemon.html")) ]
    ]))
);
```

In the above example, we have defined a section with numeric key: `1` and a sub
page with key: `0`. Because we have defined a nested array (instead of an
object), these section and page will come last (if we would have used an object,
then they will appear first, which is undesired).

Internally, the `Application` and `Page` objects use a `Map` to ensure strict
ordering.

Using a templating engine for generating dynamic content
--------------------------------------------------------
In the previous examples, we have used static HTML snippets and functions to
generate content. Providing functions that generate dynamic content
(by embedding HTML code in strings) may not always be the most intuitive way
to generate dynamic content.

It is also possible to configure *template handlers*: the framework can invoke
a template handler function for files with a certain extension.

In the following server-side example, we define a template handler for files
with an `.ejs` extension to use the [EJS](https://ejs.co) templating engine:

```javascript
import { application } from "./appmodel.mjs";
import { displayRequestedPage } from "../../../view/server/index.mjs";
import { createTestServer } from "../../../testhttpserver.mjs";

import * as ejs from "ejs";

/* Create test server that displays the layout */

function renderEJSTemplate(req, res, sectionFile) {
    return new Promise((resolve, reject) => {
        ejs.renderFile(sectionFile, { req: req, res: res }, {}, function(err, str) {
            if(err) {
                reject(err);
            } else {
                res.write(str);
                resolve();
            }
        });
    });
}

const server = createTestServer(function(req, res, url) {
    displayRequestedPage(req, res, application, url.pathname, {
        ejs: renderEJSTemplate
    });
});
server.listen(process.env.PORT || 8080);
```

In the above code fragment, the `renderEJSTemplate` function is used to open an
`.ejs` template file and uses `ejs.renderFile` function to render the template.
The resulting string is propagated as a response to the user.

To use the template handlers, we invoke the `displayRequestedPage` with an
additional parameter that maps the `ejs` file extension to the template handler
function.

In a client-side/browser application, we can define a template handler as
follows:

```html
<!DOCTYPE html>

<html>
    <head>
        <title>My page</title>
        <script type="text/javascript" src="ejs.js"></script>
        <script type="module">
import { application } from "./appmodel.mjs";
import { initRequestedPage, updateRequestedPage } from "../../../view/client/index.mjs";

const templateHandlers = {
  ejs: function(div, response) {
      return ejs.render(response, {});
  }
}

document.body.onload = function() {
    initRequestedPage(application, templateHandlers);
};

document.body.onpopstate = function() {
    updateRequestedPage(application, templateHandlers);
};
        </script>
    </head>

    <body>
    </body>
</html>
```

In the above code fragment, we define a `templateHandlers` object that gets
propagated to the view function that initially renders the page
(`initRequestedPage`) and dynamically updates the page (`updateRequestedPage`).

In the following application model, we have defined an entry page that uses an
`ejs` template file rather than a static HTML file:

```javascript
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
```

In a server-side application, we can use `home.ejs` to display request variables:

```ejs
<p>This is the home page!</p>

<h2>Request parameters</h2>

<table>
    <tr>
        <th>HTTP version</th>
        <td><%= req.httpVersion %></td>
    </tr>
    <tr>
        <th>Method</th>
        <td><%= req.method %></td>
    </tr>
    <tr>
        <th>URL</th>
        <td><%= req.url %></td>
    </tr>
</table>
```

In a client-side application, we can use `home.ejs` to display browser variables:

```ejs
<p>This is the home page!</p>

<h2>Some parameters</h2>

<table>
    <tr>
        <th>Location URL</th>
        <td><%= window.location.href %></td>
    </tr>
    <tr>
        <th>Browser name</th>
        <td><%= navigator.appName %></td>
    </tr>
</table>
```

Integrating with express
------------------------
To use the framework on the server-side, it is possible to use a simple HTTP
server abstraction included with this package.

Unfortunately this abstraction has only been developed for testing purposes and
is very limited in features -- it only serves static files based on extensions,
and only implements a simple method for parsing form data in a POST message.

It is also possible to use [express](http://expressjs.com) that is regarded as
the de-facto standard for handling HTTP operations in web applications in
Node.js.

The following code fragment shows how we can integrate the layout manager into
express:

```javascript
import { application } from "./appmodel.mjs";
import { displayRequestedPage } from "../../../view/server/index.mjs";
import express from "express";

/* Create test server that displays the layout */

const app = express();
const port = process.env.PORT || 8080;

// Configure static file directories
app.use("/styles", express.static("styles"));
app.use("/image", express.static("image"));

// Make it possible to parse form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Map all URLs to the SB layout manager
app.get('*', (req, res) => {
    displayRequestedPage(req, res, application, req.url);
});

app.post('*', (req, res) => {
    displayRequestedPage(req, res, application, req.url);
});

// Configure listening port
app.listen(port, () => {
    console.log("Application listening on port " + port);
});
```

In the above function, we use a wildcard route for `GET` and `POST` requests
and we invoke the `displayRequestedPage` view function from the framework to
display the requested page.

More use cases
--------------
There are also facilities to include application wide and per-page stylesheets
and script includes. We can also make pages invisible from menu sections by
instantiating pages that are prefixed with `Hidden*`.

It is also possible to automatically generate a site map (`displaySiteMap`) and
bread crumbs for the currently visited page (`displayBreadcrumbs`).

Consult the API documentation for more information.

Examples
========
This package includes three example web applications that can be found in the
`examples/` folder:

* The `server/` folder contains example applications that render pages
  server-side.
* The `client/` folder contains example applications that dynamically update
  the DOM on the client side.

Each folder contains the following example applications:
* `simple/` demonstrates simple sub pages, inaccessible sub pages, dynamic sub
  pages and a page handling POST requests.
* `advanced/` demonstrates more advanced sub pages with multiple content
  sections. It also demonstrates style and script variability.
* `i18n/` demonstrates an internationalised web page displaying the same page
  in multiple languages.
* `strictorder/`. Application with similar features as the `simple` application
  but uses nested arrays to ensure strict ordering of the page keys.
* `ejs/` uses the EJS templating engine to display common HTTP server/browser
  variables.

License
=======
The contents of this package is available under the [Apache Software License](http://www.apache.org/licenses/LICENSE-2.0.html)
version 2.0
