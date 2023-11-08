import {useNavigate} from "react-router-dom";
import {useState} from "react";
import toast from "react-hot-toast";
import AppContainer from "../components/appContainer/script";
import './style.css';
import store from "../store";

function LogIn() {
    const navigate = useNavigate();
    // const dispatch = useDispatch();

    const [newLogin, setNewLogin] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const EMPTY_LOGIN_ERROR = "Login can't be empty";
    const EMPTY_PASSWORD_ERROR = "Password can't be empty";
    const CONFLICT_ERROR = "Login has been already taken";
    const UNAUTHORIZED_ERROR = "Wrong login/password";
    const BAD_REQUEST_ERROR = "Invalid log in request";
    const UNKNOWN_ERROR = "Unknown error";

    function popupMessage(message) {
        toast(message, {
            style: {
                borderRadius: '10px',
                color: 'rgb(4, 30, 55)',
                background: 'rgb(255, 255, 255, 80%)'
            }
        })
    }

    function validateData() {
        if (newLogin === "") {
            popupMessage(EMPTY_LOGIN_ERROR);
            return false;
        } else if (newPassword === "") {
            popupMessage(EMPTY_PASSWORD_ERROR);
            return false;
        } else {
            return true;
        }
    }

    function checkResponse(response) {
        if (response.ok) {
            return true;
        } else {
            if (response.statusText === 'Conflict') {
                popupMessage(CONFLICT_ERROR);
            } else if (response.statusText === 'Unauthorized') {
                popupMessage(UNAUTHORIZED_ERROR);
            } else if (response.statusText === 'Bad Request') {
                popupMessage(BAD_REQUEST_ERROR);
            } else {
                popupMessage(UNKNOWN_ERROR);
            }
            return false;
        }
    }

    function logInRequest() {
        if (validateData()) {
            fetch("/api/login", {
                method: 'POST',
                headers: {"Authorization": "Basic " + btoa(newLogin + ":" + newPassword).replaceAll("=", "")}
            }).then(response => {
                if (checkResponse(response)) {
                    store.setLogin(store.login);
                    console.log(store.getLogin())
                    store.setPassword(store.password);
                    navigate("/profilepage");
                }
            })
        }
    }

    function signUpRequest() {
        if (validateData()) {
            let formData = new FormData();
            formData.append('login', newLogin);
            formData.append('password', newPassword);
            fetch("/api/register", {
                method: 'POST',
                body: formData
            }).then(response => {
                if (checkResponse(response)) {
                    store.setLogin(store.login);
                    store.setPassword(store.password);
                    navigate("/profilepage");
                }
            })

        }
    }

    return (
        <AppContainer>
            <div id="login-small-text" className="small-text">
                Enter your login and password
            </div>
            <form id="login-password-form">
                <span className="popup" id="error-popup"></span>
                <div id="input-container">
                    <input className="input-text" type="text" placeholder="Login" id="login" value={newLogin}
                           onChange={e => setNewLogin(e.target.value)}/>
                    <input className="input-text" type="password" placeholder="Password" id="password"
                           value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
                </div>
            </form>
            <div className="button-container">
                <a className="my-button" onClick={logInRequest}><span></span>log in</a>
                <a className="my-button" onClick={signUpRequest}><span></span>register</a>
            </div>
        </AppContainer>
    );
}

export default LogIn;