import {Model} from "./Model.js";

class Tag extends Model{

    constructor(id = 0, name = "") {
        super();
        this.id = id;
        this.name = name;
    }
}

export {Tag}