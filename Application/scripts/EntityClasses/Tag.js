class Tag {

    constructor(id, name, parentTaskListID, parentTaskID) {
        this._id = id;
        this._name = name;
        this._parentTaskListID = parentTaskListID;
        this._parentTaskID = parentTaskID;
    }

    get name() {
        return this._name;
    }
}

export {Tag}