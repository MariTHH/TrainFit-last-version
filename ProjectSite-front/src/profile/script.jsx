import React, {useState} from 'react';
import AppContainer from "../components/appContainer/script";
import img from "../profile/img.png";
import MainPage from "routes/mainPage/script";
import {useNavigate} from "react-router-dom";

import 'profile/style.css';

function Profile() {
    const navigate = useNavigate();

    const goBack = () => {
        window.history.back();
    }
    // React.useEffect(() => {
    //     window.history.pushState(null, null, window.location.href);
    //     window.onpopstate = () => {
    //         window.history.go(1);
    //     };
    // }, []);

    function viewDiv(){
        document.getElementById("profileBox").style.display = "block";
    }
    function view(){
        document.getElementById("profileBox").style.display = "none";
    }
    const handleMouseClick = () => {
        viewDiv()
    }
    const haa = () => {
        view()
    }
    return (
        <AppContainer>
            <div className="header1">
                <div>
                    Train Fit
                </div>
            </div>
            <div className="user-info">
                <div className="user-info-name" id="name"></div>
                <div className="user-info-avatar" id="avatar">
                    <img className="user-info-avatar" src={img} alt="avatar"/>
                </div>
                <div className="list">
                    <div className="profile" onClick={() => handleMouseClick()}>
                        <a>Профиль</a>
                    </div>
                    <div className="shedule" onClick={() => haa()}>
                        <a>Расписание</a>
                    </div>
                </div>
            </div>
            <div className="graph"></div>
            <div className="shed"></div>
            <div className="back-button" onClick={() => navigate(-1)}>
                <a>Back</a>
            </div>

            <div className="profileBox" id={"profileBox"}>
                <input className="username" type="text" placeholder="username"/>
                <input className="weight" type="text" placeholder="weight"/>
                <div className="sex" id="r_select">
                    <label>
                        <input className="sex-radio" type="radio" name="sex_value" value="women"></input>
                        <span>  Female </span>
                    </label>
                    <label>
                        <input className="sex-radio" type="radio" name="sex_value" value="man"></input>
                        <span>  Male </span>
                    </label>
                </div>
                <div className="save">
                    <a>Save</a>
                </div>

            </div>
        </AppContainer>
    );
}

export default Profile;
