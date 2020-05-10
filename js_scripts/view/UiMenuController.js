class UiMenuController {

    constructor() {
        this.uiMenus = [];
    }

    get(name) {
        return this.uiMenus.filter((uiMenu) => {
            return uiMenu.name === name;
        })[0];
    }

    push(uiMenu) {
        this.uiMenus.push(uiMenu);
    }

    initiateCurrentMenu(uiMenu) {
        this.currentMenu = uiMenu;
        this.currentMenu.htmlElement.style.opacity = 1;
        this.currentMenu.htmlElement.style.display = 'flex'
    }

    switchUiTo(uiMenu, animation) {
        if (this.currentMenu !== undefined) {
            uiMenu.htmlElement.style.display = 'flex';
            setTimeout(() => {
                this.currentMenu.htmlElement.style.display = 'none';
                uiMenu.htmlElement.style.opacity = '1';
                animation();
                this.currentMenu.htmlElement.style.opacity = '0';
                this.currentMenu = uiMenu;
            }, 10)
        } else {
            this.initiateCurrentMenu(uiMenu)
        }
    }
}

export {UiMenuController};