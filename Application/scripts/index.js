import {Animations} from "./Animations.js";
import {Config} from "./Config.js";

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

    homeButton.addEventListener('click', () => {
        Config.uiMenuController.switchUiTo(Config.uiMenuController.get('home'), Animations.circleAnimation);
    });

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

        list.children[0].addEventListener('click', () => {
             Config.uiMenuController.switchUiTo(Config.uiMenuController.get('main'), Animations.circleAnimation)
        })
    })

    loginButton.addEventListener('click', () => Config.actionController.openHome());

    logoutButton.addEventListener('click', () => {
        Config.uiMenuController.switchUiTo(Config.uiMenuController.get('login'), Animations.circleAnimation);
    })

    settingsButton.addEventListener('click', () => {
        Config.uiMenuController.switchUiTo(Config.uiMenuController.get('settings'), Animations.circleAnimation);
    })

    settingsSubmitButton.addEventListener('click', () => {
    })

    settingsBackButton.addEventListener('click', () => {
        Config.uiMenuController.switchUiTo(Config.uiMenuController.get('home'), Animations.circleAnimation);
    })
}