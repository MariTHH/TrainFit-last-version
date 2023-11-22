import {makeAutoObservable, computed, observable} from "mobx";
import { createContext, useContext } from "react";

class Store {
    login ;
    password;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
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
     getPassword(){
        return this.password;
    }
}

const store = new Store();



export default store;