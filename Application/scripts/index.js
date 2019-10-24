import {Config} from "./Config.js";
import {actionController} from "./Config.js";
import {NavigationSwipeController} from './NavigationSwipeController.js'

window.addEventListener('load', () => {
    Config.load();
    initialEventListener();
});

function initialEventListener() {
    let homeButton = document.querySelector('footer');
    let lists = Array.from(document.querySelectorAll('.list'));
    let loginButton = document.querySelector('#login-button');
    let logoutButton = document.querySelector('#home-navigation-entry-logout');
    let settingsButton = document.querySelector('#home-navigation-entry-settings');
    let settingsSubmitButton = document.querySelector('#settings-submit-button');
    let settingsBackButton = document.querySelector('#settings-back-button');

    homeButton.addEventListener('click', actionController.openHome);
    loginButton.addEventListener('click', actionController.openHome);
    logoutButton.addEventListener('click', actionController.openLogin);
    settingsButton.addEventListener('click', actionController.openSettings);
    settingsSubmitButton.addEventListener('click', actionController.openHome);
    settingsBackButton.addEventListener('click', actionController.openHome);

    lists.forEach((list) => {
        let listShape = list.children[0];
        NavigationSwipeController.addSwipe(list.children[0]);
        listShape.addEventListener('click', actionController.openList);
    })
}