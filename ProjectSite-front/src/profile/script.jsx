import AppContainer from "../components/appContainer/script";
import img from "../profile/img.png";

import 'profile/style.css'

function Profile() {
    return (
        <AppContainer>
            <div className="header1">
                <div>
                    Train Fit
                </div>
            </div>
            <div className="user-info">
                <div className="user-info-name" id="name"></div>
                <div className="user-info-avatar" id="avatar"><img className="user-info-avatar" src={img}/></div>
                <div className="list">
                    <div className="profile" >
                        <a>Профиль</a>
                    </div>
                    <div className="shedule" >
                        <a>Расписание</a></div>
                </div>
            </div>
            <div className="graph">

            </div>
            <div className="shed">

            </div>

        </AppContainer>
    );
}
export default Profile;