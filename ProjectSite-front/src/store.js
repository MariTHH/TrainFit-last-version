import {makeAutoObservable, action, observable, autorun} from "mobx";

class Store {
    login;
    password;
    sex;
    weight;

    constructor() {
        makeAutoObservable(this, {}, {autoBind: true});
    }

    setLogin(login) {
        this.login = login;
    }

    setPassword(password) {
        this.password = password;
    }

    getLogin() {
        return this.login;
    }

    getPassword() {
        return this.password;
    }

    setWeight(weight) {
        this.weight = weight;
    }

    getWeight() {
        return this.weight;
    }

    setSex(sex) {
        this.sex = sex;
    }

    getSex() {
        return this.sex;
    }
}

const store = new Store();

export default store;
