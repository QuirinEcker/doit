class Tag {

    constructor(id, name) {
        this._id = id;
        this._name = name;
        Tag.idNumber++;
    }

    get name() {
        return this._name;
    }
}

export {Tag}