Tag.idNumber = 0;

class Tag {

    constructor(name) {
        this._id = `tg${Tag.idNumber}`;
        this._name = name;
        Tag.idNumber++;
    }

    get name() {
        return this._name;
    }
}