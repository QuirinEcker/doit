function initialEventListener() {
    let homeButton = document.querySelector('footer');

    homeButton.addEventListener('click', () => {
        console.log('aspdfpa')
        let animation = document.querySelector('#home-open-animation');

        animation.style.transform = 'scale(300)';
        setTimeout(() => {

        }, 1000)
    })
}

window.addEventListener('load', () => {
    initialEventListener()
});