import React, {useState} from 'react';
import AppContainer from "../components/appContainer/script";
import img from "../profile/img.png";
import {useNavigate} from "react-router-dom";

import 'profile/style.css';
import store from "../store";
import localStorage from "mobx-localstorage";
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import {CircularProgress, Typography} from '@mui/material'
import {
    EventItemButton,
    ScaleCellEventWrapper,
    ScaleCellTimeWrapper,
    ScaleCellWrapper,
    ScaleWrapper
} from "../schedule/containers/StyledComponents";
import moment from "moment";
import {ButtonWrapper} from "../schedule/App/script";
import {DayShowComponent} from "../schedule/DayShowComponent";
import {ITEMS_PER_DAY} from "../schedule/helpers/constants";
import {isDayContainCurrentTimestamp} from "../schedule/helpers";

function Profile() {
    const navigate = useNavigate();
    let [username, setUsername] = useState(localStorage.getItem("login"));
    const [weight, setWeight] = useState(localStorage.getItem("weight"));

    const [events, setEvents] = useState([]);
    const [sex, setSex] = useState(localStorage.getItem("sex"));
    store.setLogin(localStorage.getItem("login"));
    store.setWeight(localStorage.getItem("weight"));
    store.setSex(localStorage.getItem("sex"));
    const goBack = () => {
        window.history.back();
    }
    const cells = [...new Array(ITEMS_PER_DAY)].map((_, i) => {
        const temp = [];
        events.forEach(event => {
            if (+moment.unix(+event.date).format('H') === i) {
                temp.push(event);
            }
        })
        return temp;
    })
    React.useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.go(1);
        };
    }, []);

    function viewDiv(id, id2) {
        view();
        document.getElementById(id).style.display = "block";
        if (id2 !== null) {
            document.getElementById(id2).style.display = "block";
        }
    }

    const url = 'http://localhost:3001';
    React.useEffect(() => {
            handleButtonClick();
            var Item = localStorage.getItem("sex");
            if (Item !== undefined && document.getElementById(Item) !== null) {
                document.getElementById(Item).checked = true;
            }
        }
    )


    function view() {
        document.getElementById("profileBox").style.display = "none";
        document.getElementById("graph").style.display = "none";
        document.getElementById("shed").style.display = "none";
    }

    const handleMouseClick = (id, id2) => {
        viewDiv(id, id2)
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

    const supabase = useSupabaseClient(); // talk to supabase!

    async function googleFitSignIn() {
        const {error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                scopes: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/fitness.activity.read',
            }
        });
        if (error) {
            alert("Error logging in to Google Fit provider with Supabase");
            console.log(error);
        }
    }

    const session = useSession();
    async function getStepCountFromGoogleFit() {
        try {
            const now = new Date();
            const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
            const startOfDayUnix = startOfDay.getTime();
            const endOfDayUnix = endOfDay.getTime();



            const requestBody = {
                "aggregateBy": [{
                    "dataTypeName": "com.google.step_count.delta",
                    "dataSourceId": "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps"
                }],
                "bucketByTime": {"durationMillis": 86400000},
                "startTimeMillis": startOfDayUnix,
                "endTimeMillis": endOfDayUnix
            };

            await fetch("https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate", {
                method: "POST",
                headers: {
                    'Authorization': 'Bearer ' + session.provider_token, // Access token for Google
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            }).then((data) => {
                return data.json();
            }).then((data) => {
                    steps = data.bucket[0].dataset[0].point[0].value[0].intVal;
                    console.log(steps)
                }
            )
            await fetch(`${url}/events?date_gte=${startOfDay.getTime() / 1000}&date_lte=${endOfDay.getTime() / 1000}&login=${currLogin}`)
                .then(res => res.json())
                .then(res => {
                    setEvents(res)
                })
            return steps

        } catch (error) {
            console.error('Error fetching step count from Google Fit:', error);
        }
    }
    const currLogin = localStorage.getItem('login');
    const [stepCount, setStepCount] = useState(null);
    let steps;
    const progress = (stepCount / 10000) * 100;
    const handleButtonClick = async () => {
        try {
            const steps = await getStepCountFromGoogleFit(session);
            setStepCount(steps);
        } catch (error) {
            console.error(error);
        }
    };

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
                    <div className="profile" onClick={() => {
                        handleMouseClick('profileBox', null);
                    }}>
                        <a>Profile</a>
                    </div>
                    <div className="schedule" onClick={() => navigate('/schedule')}>
                        <a>Schedule</a>
                    </div>
                    <div className="progress" onClick={() => {
                        handleMouseClick('shed', 'graph');
                    }}>
                        <a>Progress</a>
                    </div>
                </div>
            </div>
            <div className="graph" id="graph">
                <span style={{
                    position: 'relative',
                    marginLeft: '39%',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 800,
                    fontSize: 20,
                    color: "cornflowerblue"
                }}>Daily steps</span>
                <div className={"circle"}>
                    <div className={"circleWrap"}>
                        <CircularProgress
                            style={
                                {
                                    boxShadow: '-10px -10px 15px powderblue, 10px 10px 15px powderblue',
                                    borderRadius: '50%',
                                    border: '0.1px solid white',
                                    outline: 'none',
                                    display: 'flex',
                                    cursor: 'pointer'
                                }
                            }
                            variant="determinate"
                            value={progress}
                            size={170}
                            thickness={3}>
                        </CircularProgress>
                        <Typography
                            variant="h6"
                            component="div"
                            style={{
                                position: 'absolute',
                                fontSize: 30,
                                fontFamily: 'Montserrat, sans-serif',
                                color: "mediumblue",
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            {stepCount}
                        </Typography>
                    </div>
                </div>
            </div>
            <div className="shed" id="shed">
                <span style={{
                    marginLeft: '35%',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 800,
                    fontSize: 20,
                    color: "cornflowerblue",
                }}>Daily schedule</span>

                {/*{events.map(event => (<div className={"exercises"}>*/}
                {/*        {event.title}{" "}*/}
                {/*        {event.exercise}*/}
                {/*    </div>*/}

                {/*))}*/}
                <ScaleWrapper>
                    {
                        cells.map((events, i) => (
                            <ScaleCellWrapper>
                                <ScaleCellTimeWrapper>
                                    {
                                        i ? (
                                            <>
                                                {`${i}`.padStart(2, `0`)}:00
                                            </>
                                        ) : null
                                    }
                                </ScaleCellTimeWrapper>

                                <ScaleCellEventWrapper>
                                    <div className={"trash"}>
                                        {
                                            events.map(event => (

                                                <div className={"exercises"}>
                                                    {event.title} {" "}
                                                    {event.exercise}
                                                </div>

                                            ))
                                        }
                                    </div>
                                </ScaleCellEventWrapper>

                            </ScaleCellWrapper>
                        ))
                    }
                </ScaleWrapper>
            </div>
            <div className="back-button" onClick={() => navigate("/")}>
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
                {session ?
                    <>
                        <div className="signIn">{session.user.email}</div>
                    </>
                    :
                    <>
                        <div className="signIn" onClick={() => googleFitSignIn()}>Sign In With Google</div>
                    </>
                }

            </div>

        </AppContainer>
    );
}

export default Profile;
