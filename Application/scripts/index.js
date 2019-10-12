function getListObject(listID) {
    let taskLists = Array.from(document.querySelector('#task-lists').children);
    let taskListElement;

    taskLists.forEach((taskList) => {
        if (taskList.id = listID) {
            taskListElement = taskList;
        }
    });

    return taskListElement;
}

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
        animation.style.opacity = '0.1';
    }, 1000)
}

function closeHome() {
    let home = document.querySelector('#home');
    let main = document.querySelector('main');

    circleAnimation('white');
    main.style.display = 'flex';
    home.style.display = 'none';
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

    homeButton.addEventListener('click', openHome);

    lists.forEach((list) => {
        list.addEventListener('click', openList)
    })
}

function openHome() {
    let home = document.querySelector('#home');
    let main = document.querySelector('main');
    main.style.display = 'none';
    home.style.display = 'flex';

    home.style.display = 'flex';
    main.style.opacity = '0';
    setTimeout(() => {
        main.style.display = 'none';
        home.style.opacity = '1';
        circleAnimation('black');
    }, 10)
}

window.addEventListener('load', () => {
    initialEventListener();
});