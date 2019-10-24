class Animations {
    static circleAnimation() {
        let animation = document.querySelector('#home-open-animation');

        animation.style.zIndex = '10'
        animation.style.transitionDuration = '0s'
        animation.style.transform = 'scale(1)';
        animation.style.backgroundColor = 'black';
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
            animation.style.backgroundColor = 'black';
        }, 1000)
    }
}

export {Animations}