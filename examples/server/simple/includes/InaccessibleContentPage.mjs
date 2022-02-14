import { ContentPage } from "../../../../model/page/ContentPage.mjs";

class InaccessibleContentPage extends ContentPage {
    checkAccessibility() {
        return false;
    }
}

export { InaccessibleContentPage };
