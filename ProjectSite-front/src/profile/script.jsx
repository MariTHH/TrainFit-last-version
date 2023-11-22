import React, {useState} from 'react';
import AppContainer from "../components/appContainer/script";
import img from "../profile/img.png";
import {useNavigate} from "react-router-dom";

import 'profile/style.css';
import store from "../store";

 function Profile() {
    const navigate = useNavigate();
    const [weight, setWeight] = useState("");
    const [sex, setSex] = useState("");

    const goBack = () => {
        window.history.back();
    }
    React.useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.go(1);
        };
    }, []);

    function viewDiv(id){
        view();
        document.getElementById(id).style.display = "block";
    }
    function view(){
        document.getElementById("profileBox").style.display = "none";
        document.getElementById("sheduleBox").style.display = "none";
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
        formData.append('weight', weight);
        formData.append('sex', sex);

        fetch("/api/params", {
            method: "POST",
            body: formData
        }).then(response => {
            console.log(weight,sex)
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
                <div className="user-info-name" id="name"></div>
                <div className="user-info-avatar" id="avatar">
                    <img className="user-info-avatar" src={img} alt="avatar"/>
                </div>
                <div className="list">
                    <div className="profile" onClick={() => handleMouseClick('profileBox')}>
                        <a>Профиль</a>
                    </div>
                    <div className="shedule" onClick={() => handleMouseClick('sheduleBox')}>
                        <a>Расписание</a>
                    </div>
                    <div className="progress" onClick={() => dropThis()}>
                        <a>Прогресс</a>
                    </div>
                </div>
            </div>
            <div className="graph"></div>
            <div className="shed"></div>
            <div className="back-button" onClick={() => navigate('/')}>
                <a>Back</a>
            </div>

            <div className="profileBox" id={"profileBox"}>
                <input className="username" type="text" placeholder="username"/>
                <input className="weight" type="text" placeholder="weight" value={weight}
                       onChange={e => setWeight(e.target.value)}/>
                <div className="sex" id="r_select">
                    <label>
                        <input className="sex-radio" type="radio" name="sex_value" value="women" onChange={e => setSex(e.target.value)} checked={sex === ('women')}></input>
                        <span> Female </span>
                    </label>
                    <label>
                        <input className="sex-radio" type="radio" name="sex_value" value="man" onChange={e => setSex(e.target.value)} checked={sex === ('man')}></input>
                        <span> Male </span>
                    </label>
                </div>
                <div className="save" onClick={sendParams}>
                    <a>Save</a>
                </div>

            </div>
            <div className="sheduleBox" id={"sheduleBox"}>

            </div>
        </AppContainer>
    );
}

export default Profile;
