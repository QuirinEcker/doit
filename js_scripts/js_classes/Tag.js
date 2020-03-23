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

    get id() {
        return this._id;
    }

    get parentTaskListID() {
        return this._parentTaskListID;
    }

    get parentTaskID() {
        return this._parentTaskID;
    }
}

export {Tag}