import {Config} from "./Config.js";
import {ActionController} from "./Config.js";
import {NavigationSwipeController} from './NavigationSwipeController.js'
import {dataBase} from "./Config.js";

window.addEventListener('load', () => {
    Config.load();
    initialEventListener();
    ActionController.loadUserIfLoggedIn();
});

function initialEventListener() {
    const homeButton = document.querySelector('#home-button');
    const createTaskButton = document.querySelector('#home-button');
    const loginButton = document.querySelector('#login-button');
    const logoutButton = document.querySelector('#home-navigation-entry-logout');
    const settingsButton = document.querySelector('#home-navigation-entry-settings');
    const settingsSubmitButton = document.querySelector('#settings-submit-button');
    const settingsBackButton = document.querySelector('#settings-back-button');
    const signUpButton = document.querySelector('#signup-button');
    const signUpSubmitButton = document.querySelector('#signup-submit-button');
    const signUpCancelButton = document.querySelector('#signup-back-button');
    const taskSearchBar = document.querySelector('#search-bar input');
    const infoButton = document.querySelector('#home-navigation-entry-info');
    const infoExitButton = document.querySelector('#info-exit-button');
    const createListButton = document.querySelector('#add-list');

    homeButton.addEventListener('click', ActionController.openHome);
    loginButton.addEventListener('click', ActionController.login);
    logoutButton.addEventListener('click', ActionController.logout);
    settingsButton.addEventListener('click', ActionController.openSettings);
    settingsSubmitButton.addEventListener('click', ActionController.openHome);
    settingsBackButton.addEventListener('click', ActionController.openHome);
    signUpButton.addEventListener('click', ActionController.openSignUp);
    signUpCancelButton.addEventListener('click', ActionController.openLogin);
    signUpSubmitButton.addEventListener('click', ActionController.openLogin);
    taskSearchBar.addEventListener('input', ActionController.searchTask);
    infoButton.addEventListener('click', ActionController.openInfo);
    infoExitButton.addEventListener('click', ActionController.openHome);
    createListButton.addEventListener('click', ActionController.addList)
}