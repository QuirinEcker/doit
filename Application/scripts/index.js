import {Config} from "./Config.js";
import {ActionController} from "./Config.js";
import {NavigationSwipeController} from './NavigationSwipeController.js'
import {dataBase} from "./Config.js";

window.addEventListener('load', () => {
    Config.load();
    initialEventListener();
});

function initialEventListener() {
    const homeButton = document.querySelector('footer');
    const lists = Array.from(document.querySelectorAll('.list'));
    const loginButton = document.querySelector('#login-button');
    const logoutButton = document.querySelector('#home-navigation-entry-logout');
    const settingsButton = document.querySelector('#home-navigation-entry-settings');
    const settingsSubmitButton = document.querySelector('#settings-submit-button');
    const settingsBackButton = document.querySelector('#settings-back-button');
    const signUpButton = document.querySelector('#signup-button');
    const signUpSubmitButton = document.querySelector('#signup-submit-button');
    const signUpCancelButton = document.querySelector('#signup-back-button');
    const taskSearchBar = document.querySelector('#search-bar input');

    homeButton.addEventListener('click', ActionController.openHome);
    loginButton.addEventListener('click', ActionController.login);
    logoutButton.addEventListener('click', ActionController.openLogin);
    settingsButton.addEventListener('click', ActionController.openSettings);
    settingsSubmitButton.addEventListener('click', ActionController.openHome);
    settingsBackButton.addEventListener('click', ActionController.openHome);
    signUpButton.addEventListener('click', ActionController.openSignUp);
    signUpCancelButton.addEventListener('click', ActionController.openLogin);
    signUpSubmitButton.addEventListener('click', ActionController.openLogin);
    taskSearchBar.addEventListener('input', ActionController.searchTask);

    lists.forEach((list) => {
        let listShape = list.children[0];
        NavigationSwipeController.addSwipe(list.children[0]);
        listShape.addEventListener('click', ActionController.openList);
    })
}