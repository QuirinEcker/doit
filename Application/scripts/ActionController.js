import {Animations} from "./Animations.js";
import {Config} from "./Config.js";

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
    Config.uiMenuController.switchUiTo(Config.uiMenuController.get(uiName), animation);
}

export {ActionController}