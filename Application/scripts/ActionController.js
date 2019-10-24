import {Animations} from "./Animations.js";
import {Config} from "./Config.js";

class ActionController {
    openHome() {
        Config.uiMenuController.switchUiTo(Config.uiMenuController.get('home'), Animations.circleAnimation);
    }
}

export {ActionController}