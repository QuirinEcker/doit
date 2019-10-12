import {UiMenuArray} from './UiMenuArray.js'
import {UiMenu} from "./UiMenu.js";
let uiMenus = new UiMenuArray();

window.addEventListener('load', () => {
    initialUiMenus();
    initialEventListener();
});

function circleAnimation(color) {
    let animation = document.querySelector('#home-open-animation');
    animation.style.zIndex = '10'
    animation.style.transitionDuration = '0s'
    animation.style.transform = 'scale(1)';
    animation.style.backgroundColor = color;
    animation.style.opacity = '0.1';
    setTimeout(() => {
        animation.style.transitionDuration = '1s';
        animation.style.transform = 'scale(100)';
        animation.style.transitionDuration = '0.5s';
        animation.style.opacity = '0';
    }, 20)

    setTimeout(() => {
        animation.style.transitionDuration = '0s'
        animation.style.transform = 'scale(1)';
        animation.style.backgroundColor = color;
    }, 1000)
}

function closeHome() {
    let home = document.querySelector('#home');
    let main = document.querySelector('main');

    uiMenus.switchUiTo(uiMenus.get('main'))
}

function loadTasks(listID) {

}

function openList() {
    closeHome();
    loadTasks(this.id);
}

function initialEventListener() {
    let homeButton = document.querySelector('footer');
    let lists = Array.from(document.querySelectorAll('.list'));
    let loginButton = document.querySelector('#login-button');
    let logoutButton = document.querySelector('#home-navigation-entry-logout');

    homeButton.addEventListener('click', openHome);

    lists.forEach((list) => {
        list.addEventListener('click', openList)
    })

    loginButton.addEventListener('click', () => {
        uiMenus.switchUiTo(uiMenus.get('home'));
    })

    logoutButton.addEventListener('click', () => {
        uiMenus.switchUiTo(uiMenus.get('login'));
    })
}

function openHome() {
    uiMenus.switchUiTo(uiMenus.get('home'))
}

function initialUiMenus() {
    uiMenus.push(new UiMenu('main', document.querySelector('main')));
    uiMenus.push(new UiMenu('home', document.querySelector('#home')));
    uiMenus.push(new UiMenu('login', document.querySelector('#login')));

    uiMenus.initiateCurrentMenu('login');
}

export {circleAnimation}