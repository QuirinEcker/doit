import {Animations} from "./Animations.js";
import {uiMenuController} from "./Config.js";

class ActionController {
    openHome() {
        openMenu('home', Animations.circleAnimation);
    }

    openList() {
        openMenu('main', Animations.circleAnimation);
    }

    openLogin() {
        openMenu('login', Animations.circleAnimation);
    }

    openSettings() {
        openMenu('settings', Animations.circleAnimation);
    }
}

function openMenu(uiName, animation) {
    uiMenuController.switchUiTo(uiMenuController.get(uiName), animation);
}

export {ActionController}