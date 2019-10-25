class EncryptedPassword {

    constructor(password) {
        this.password = this.encrypt(password);
    }

    encrypt(password) {
        return password;
    }
}