class NavigationSwipeController {
    static addSwipe(element) {
        let position = {x: 0, y: 0};

        interact(element).draggable({
            listeners: {
                start(event) {
                    Array.from(event.target.parentElement.children).forEach((child) => {
                        child.style.transitionDuration = `0s`;
                    });
                },
                move(event) {
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
                    Array.from(event.target.parentElement.children).forEach((child) => {
                        child.style.transitionDuration = `0.5s`;
                    });

                    if (event.target.clientWidth > event.target.parentElement.clientWidth / 100 * 90) {
                        event.target.style.width = `100%`;
                        event.target.parentElement.children[1].style.width = `0`;
                    } else {
                        event.target.style.width = `68%`;
                        event.target.parentElement.children[1].style.width = `30%`;
                    }
                }
            }
        })
    }
}

export {NavigationSwipeController}