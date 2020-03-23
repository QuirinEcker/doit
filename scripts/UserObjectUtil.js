import {getCurrentUser} from "./Config.js";


class UserObjectUtil {

    static getTaskListByID(id) {
        console.log(getCurrentUser().taskLists);
        return getCurrentUser().taskLists.filter(taskList => taskList.id == id)[0];
    }
}

export {UserObjectUtil};