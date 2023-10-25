import React from 'react';
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
    React.useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.go(1);
        };
    }, []);

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
                    <div className="profile">
                        <a>Профиль</a>
                    </div>
                    <div className="shedule">
                        <a>Расписание</a>
                    </div>
                </div>
            </div>
            <div className="graph"></div>
            <div className="shed"></div>
            <div id="back-button">
                <button className='pointer' id='prevResult' onClick={() => navigate("/")} type="reset">
                    Back
                </button>
            </div>
        </AppContainer>
    );
}

export default Profile;
