import {Config} from "./view/Config.js";
import {ActionController} from "./view/Config.js";

window.addEventListener('load', async() => {
    Config.load();
    initialEventListener();
    await ActionController.loadApp();
});

function initialEventListener() {
    const homeButton = document.querySelector('#home-button');
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
    const listCreateConfirmButton = document.querySelector('#create-prompt #list-create-confirm-navigation #nav-button-container #confirm');
    const listCreateCancelButton = document.querySelector('#create-prompt #list-create-confirm-navigation #nav-button-container #cancel');
    const sendEmailButton = document.querySelector("#send-button");
    const deleteAccountButton = document.querySelector("#settings #account-delete-button");

    homeButton.addEventListener('click', ActionController.openHome);
    loginButton.addEventListener('click', ActionController.login);
    logoutButton.addEventListener('click', ActionController.logout);
    settingsButton.addEventListener('click', ActionController.openSettings);
    settingsSubmitButton.addEventListener('click', ActionController.updateUser);
    settingsBackButton.addEventListener('click', ActionController.openHome);
    signUpButton.addEventListener('click', ActionController.openSignUp);
    signUpSubmitButton.addEventListener('click', ActionController.createUser);
    signUpCancelButton.addEventListener('click', ActionController.openLogin)
    taskSearchBar.addEventListener('input', ActionController.searchTask);
    infoButton.addEventListener('click', ActionController.openInfo);
    infoExitButton.addEventListener('click', ActionController.openHome);
    createListButton.addEventListener('click', ActionController.addList);
    listCreateConfirmButton.addEventListener('click', ActionController.confirmList);
    listCreateCancelButton.addEventListener('click', ActionController.cancelList);
    sendEmailButton.addEventListener("click", ActionController.sendEmail);
    deleteAccountButton.addEventListener("click", ActionController.deleteUser);
}