import { makeAutoObservable } from "mobx";

class Store {
    login = "";
    password = "";

    constructor() {
        makeAutoObservable(this);
    }

    setLogin(login) {
        this.login = login;
    }

    setPassword(password) {
        this.password = password;
    }
    getLogin(){
        return this.login;
    }
}

const store = new Store();

export default store;