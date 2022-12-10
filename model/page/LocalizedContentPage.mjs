import { StaticContentPage } from "./StaticContentPage.mjs";
import { isIterable } from "../util.mjs";

function determineFirstEntry(subPages) {
    if(isIterable(subPages)) {
        const iterator = subPages[Symbol.iterator]();
        const result = iterator.next();

        if(result.done) {
            throw new Error("A localized content page requires at least one sub page!");
        } else {
            return {
                firstKey: result.value[0],
                firstPage: result.value[1]
            };
        }
    } else {
        const subPageKeys = Object.keys(subPages).filter(pageKey => pageKey != "404" && pageKey != "403"); // Filter out error pages
        const firstKey = subPageKeys[0];

        if(subPageKeys.length > 0) {
            return {
                firstKey: firstKey,
                firstPage: subPages[firstKey]
            }
        } else {
            throw new Error("A localized content page requires at least one sub page!");
        }
    }
}

function createLocalesArray(languages) {
    if(typeof languages == "string") {
        return languages.split(",");
    } else {
        return languages;
    }
}

function parseLocaleOptions(acceptLanguage) {
    const options = [];
    const locales = createLocalesArray(acceptLanguage);

    locales.forEach(locale => {
        const localeComponents = locale.split(";");
        const identifier = localeComponents[0].toLowerCase();
        let weight;

        if(localeComponents.length > 1) {
            weight = parseFloat(localeComponents[1].substr(2));
        } else {
            weight = 1.0;
        }

        options.push({ weight: weight, identifier: identifier });
    });

    return options;
}

function sortOptions(options) {
    options.sort((option1, option2) => {
        if(option1.weight < option2.weight) {
            return 1;
        } else if(option1.weight > option2.weight) {
            return -1;
        } else {
            return 0;
        }
    });
}

/**
 * Defines a static content page referring to sub pages that each implement the same page,
 * but in a different language. The localized page tries to detect the preferred language
 * from the Accept-Language parameter sent by the user agent and displays the page in that
 * language accordingly.
 *
 * If the preferred languages are not supported, it will fallback to the first sub page.
 */
class LocalizedContentPage extends StaticContentPage {
    /**
     * Creates a new LocalizedContentPage instance.
     *
     * @param {Object} subPages An object/dictionary or iterable object mapping language identifiers (i.e. language-country) to sub pages
     * @param {String|Function} menuItem File or function that renders the menu item. Leaving it null just renders a hyperlink
     */
    constructor(subPages = {}, menuItem = null) {
        const firstEntry = determineFirstEntry(subPages);
        super(firstEntry.firstPage.title, firstEntry.firstPage.contents, subPages, menuItem);
        this.firstKey = firstEntry.firstKey;
    }

    findLocalizedSubPage(options) {
        for(const option of options) {
            // Check if there is a locale option that matches the requested locale
            if(this.subPages.has(option.identifier)) {
                return this.subPages.get(option.identifier);
            } else {
                const identifierComponents = option.identifier.split("-");

                if(identifierComponents.length > 1) {
                    // Try the locale's language without country as a fallback
                    const language = identifierComponents[0];

                    if(this.subPages.has(language)) {
                        return this.subPages.get(language);
                    }
                }
            }
        }

        // If all locales have been tried and still none has been found, return the first sub page (that is considered the default)
        return this.subPages.get(this.firstKey);
    }

    /**
     * @see Page#examineRoute
     */
    examineRoute(application, route, params, index = 0) {
        if(route.indexIsAtRequestedPage(index)) {
            /* Visit itself */
            route.visitPage(this);

            /* Parse the locales to separate identifiers and weights */
            const options = parseLocaleOptions(params["accept-language"]);

            /* Sort on priority */
            sortOptions(options);

            /* Find a suitable localized sub page */
            let subPage = this.findLocalizedSubPage(options);

            /* Examine the localized page */
            return subPage.examineRoute(application, route, params, index);
        } else {
            return super.examineRoute(application, route, params, index);
        }
    }
}

export { LocalizedContentPage };
