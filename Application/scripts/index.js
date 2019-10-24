import {Config} from "./Config.js";
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

    homeButton.addEventListener('click', Config.actionController.openHome);
    loginButton.addEventListener('click', Config.actionController.openHome);
    logoutButton.addEventListener('click', Config.actionController.openLogin);
    settingsButton.addEventListener('click', Config.actionController.openSettings);
    settingsSubmitButton.addEventListener('click', Config.actionController.openHome);
    settingsBackButton.addEventListener('click', Config.actionController.openHome);

    lists.forEach((list) => {
        let listShape = list.children[0];
        NavigationSwipeController.addSwipe(list.children[0]);
        listShape.addEventListener('click', Config.actionController.openList);
    })
}