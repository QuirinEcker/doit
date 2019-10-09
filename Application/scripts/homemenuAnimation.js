function initialEventListener() {
    let homeButton = document.querySelector('footer');

    homeButton.addEventListener('click', () => {
        let animation = document.querySelector('#home-open-animation');
        let home = document.querySelector('#home');
        let animationContainer = document.querySelector('#home-open-animation-container');
        let main = document.querySelector('main');

        animation.style.transform = 'scale(300)';
        animationContainer.style.overflow = 'hidden';
        main.style.display = 'none';
        home.style.transitionDelay = '1s';
        home.style.display = 'block';
        home.style.opacity = '1';
    });
}

window.addEventListener('load', () => {
    initialEventListener()
});