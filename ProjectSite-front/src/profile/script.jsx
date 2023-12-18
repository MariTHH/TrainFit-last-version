import React, {useState} from 'react';
import AppContainer from "../components/appContainer/script";
import img from "../profile/img.png";
import {useNavigate} from "react-router-dom";

import 'profile/style.css';
import store from "../store";
import localStorage from "mobx-localstorage";

function Profile() {
    const navigate = useNavigate();
    let [username, setUsername] = useState(localStorage.getItem("login"));
    const [weight, setWeight] = useState(localStorage.getItem("weight"));
    const [sex, setSex] = useState(localStorage.getItem("sex"));
    store.setLogin(localStorage.getItem("login"));
    store.setWeight(localStorage.getItem("weight"));
    store.setSex(localStorage.getItem("sex"));

    const goBack = () => {
        window.history.back();
    }
    React.useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.go(1);
        };
    }, []);

    function viewDiv(id) {
        view();
        document.getElementById(id).style.display = "block";
    }

    React.useEffect(() => {
            var Item = localStorage.getItem("sex");
            if (Item !== undefined && document.getElementById(Item) !== null) {
                document.getElementById(Item).checked = true;
            }
        }
    )

    function view() {
        document.getElementById("profileBox").style.display = "none";
        document.getElementById("scheduleBox").style.display = "none";
    }

    const handleMouseClick = (id) => {
        viewDiv(id)
    }
    const dropThis = () => {
        view()
    }

    function sendParams() {
        let formData = new FormData();
        formData.append('login', store.getLogin());
        formData.append('username', username);
        formData.append('weight', weight);
        formData.append('sex', sex);

        fetch("/api/params", {
            method: "POST",
            body: formData
        })
            .then(response => {
                store.setWeight(weight);
                store.setSex(sex);
                localStorage.setItem("login", username);
                store.setLogin(username)
                localStorage.setItem("weight", store.getWeight());
                localStorage.setItem("sex", sex);
            })

    }

    return (
        <AppContainer>
            <div className="header1">
                <div>
                    Train Fit
                </div>
            </div>
            <div className="user-info">
                <div className="user-info-avatar" id="avatar">
                    <img className="user-info-avatar" src={img} alt="avatar"/>
                </div>
                <div className="list">
                    <div className="profile" onClick={() => handleMouseClick('profileBox')}>
                        <a>Profile</a>
                    </div>
                    <div className="schedule" onClick={() => navigate('/schedule')}>
                        <a>Schedule</a>
                    </div>
                    <div className="progress" onClick={() => dropThis()}>
                        <a>Progress</a>
                    </div>
                </div>
            </div>
            <div className="graph"></div>
            <div className="shed"></div>
            <div className="back-button" onClick={() => navigate('/')}>
                <a>Back</a>
            </div>
            <div className="user-info-name">{localStorage.getItem('login')}</div>

            <div className="profileBox" id={"profileBox"}>
                <input className="username" id={"username"} type="text" placeholder={"username"} value={username}
                       onChange={e => setUsername(e.target.value)}/>
                <input className="weight" type="text" placeholder="weight" value={weight}
                       onChange={e => setWeight(e.target.value)}/>
                <div className="sex" id="r_select">
                    <label>
                        <input className="sex-radio" id={"women"} type="radio" name="sex_value" value="women"
                               onChange={e => setSex(e.target.value)}></input>
                        <span> Female </span>
                    </label>
                    <label>
                        <input className="sex-radio" id="man" type="radio" name="sex_value" value="man"
                               onChange={e => setSex(e.target.value)}></input>
                        <span> Male </span>
                    </label>
                </div>
                <div className="save" onClick={sendParams}>
                    <a>Save</a>
                </div>

            </div>
            <div className="scheduleBox" id={"scheduleBox"}>

            </div>
        </AppContainer>
    );
}

export default Profile;
