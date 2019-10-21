import {UiMenuController} from './UiMenuController.js'
import {UiMenu} from "./UiMenu.js"
let uiMenus = new UiMenuController();
let listMaxWidth;

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
    let settingsButton = document.querySelector('#home-navigation-entry-settings');
    let settingsSubmitButton = document.querySelector('#settings-submit-button');
    let settingsBackButton = document.querySelector('#settings-back-button');

    homeButton.addEventListener('click', openHome);

    lists.forEach((list) => {
        let position = {x: 0, y: 0};
        interact(list.children[0]).draggable({
            listeners: {
                start (event) {
                    console.log(event.type, event.target);

                    Array.from(event.target.parentElement.children).forEach((child, index) => {
                        child.style.transitionDuration = `0s`;
                    })
                },
                move (event) {
                    position.x = event.dx;

                    if (event.target.clientWidth >= event.target.parentElement.clientWidth / 100 * 80) {
                        event.target.parentElement.children[1].style.width = `${event.target.parentElement.children[1].clientWidth - position.x}px`;
                        event.target.style.width = `${event.target.clientWidth + position.x}px`;
                    } else if (position.x > 0) {
                        event.target.parentElement.children[1].style.width = `${event.target.parentElement.children[1].clientWidth - position.x}px`;
                        event.target.style.width = `${event.target.clientWidth + position.x}px`;
                    }
                },
                end(event) {
                    Array.from(event.target.parentElement.children).forEach((child, index) => {
                        child.style.transitionDuration = `0.5s`;
                    })

                    if (event.target.clientWidth > event.target.parentElement.clientWidth / 100 * 90) {
                        event.target.style.width = `100%`;
                        event.target.parentElement.children[1].style.width = `0`;
                    } else {
                        event.target.style.width = `78%`;
                        event.target.parentElement.children[1].style.width = `20%`;
                    }
                }
            }
        });

        list.children[0].addEventListener('click', openList)
    })

    loginButton.addEventListener('click', () => {
        uiMenus.switchUiTo(uiMenus.get('home'));
    })

    logoutButton.addEventListener('click', () => {
        uiMenus.switchUiTo(uiMenus.get('login'));
    })

    settingsButton.addEventListener('click', () => {
        uiMenus.switchUiTo(uiMenus.get('settings'));
    })

    settingsSubmitButton.addEventListener('click', () => {
        uiMenus.switchUiTo(uiMenus.get('home'));
    })

    settingsBackButton.addEventListener('click', () => {
        uiMenus.switchUiTo(uiMenus.get('home'));
    })

}

function openHome() {
    uiMenus.switchUiTo(uiMenus.get('home'))
}

function initialUiMenus() {
    uiMenus.push(new UiMenu('main', document.querySelector('main')));
    uiMenus.push(new UiMenu('home', document.querySelector('#home')));
    uiMenus.push(new UiMenu('login', document.querySelector('#login')));
    uiMenus.push(new UiMenu('settings', document.querySelector('#settings')));

    uiMenus.initiateCurrentMenu('login');
}

export {circleAnimation}