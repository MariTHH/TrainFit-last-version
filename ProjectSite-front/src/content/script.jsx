import AppContainer from "../components/AppContainer/script";
import 'css/style.css';
import {useState} from "react";
import sport from "content/sport.jpeg";
import ood from "content/ood.jpeg";
import un from "content/un.jpeg";

function Content() {
    const [imageClicked, setImageClicked] = useState({
        first: false,
        second: false,
        ground: false
    });
    const onClickHandler = (order) => {
        const resetImages = {
            first: false,
            second: false,
            ground: false
        }
        setImageClicked({
            ...resetImages,
            [order]: true
        });
    };
    return (
        <AppContainer>
            <div className="right-content" id="original-content">
                {imageClicked.ground && <img src={sport} alt="ground" />}
                {imageClicked.first && <img src={un} alt="first" />}
                {imageClicked.second && <img src={ood} alt="second" />}
            </div>
            <div className="content">
                <div className="titlehero">
                    <span>Easy to be fit</span>
                </div>
                <div id="app-list">
                    <div className="app active" data-page="original-content" tabIndex="0" onClick={() => onClickHandler("ground")} >
                        <a>Упражнения для каждой группы мышц</a>
                    </div>
                    <div className="app steps " data-page="hiit-content" tabIndex="0" onClick={() => onClickHandler("first")} >
                        <a>Трекинг шагов</a></div>
                    <div className="app calories " data-page="calories-content" tabIndex="0" onClick={() => onClickHandler("second")} >
                        <a>Подсчёт калорий</a></div>
                </div>
            </div>
        </AppContainer>
    );
}
export default Content;