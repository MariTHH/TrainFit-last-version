import AppContainer from "../components/appContainer/script";
import './style.css';
import React, {useState} from "react";
import sport from "content/sport.jpeg";
import ood from "content/ood.jpeg";
import un from "content/un.jpeg";

// <Content onClick={} onHover={} onSmth={} handleSmth doSmth ... ></Content>
function Content() {
    React.useEffect(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => {
            window.history.go(1);
        };
    }, []);
    const [imageClicked, setImageClicked] = useState({
        first: false,
        second: false,
        ground: false
    });

    const handleMouseClick = (order) => {
        onClickHandler(order);
    }
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
                    <div className="app active" data-page="original-content" tabIndex="0" onClick={() => handleMouseClick("ground")} >
                        <a>Упражнения для каждой группы мышц</a>
                    </div>
                    <div className="app steps " data-page="hiit-content" tabIndex="0" onClick={() => handleMouseClick("first")} >
                        <a>Трекинг шагов</a></div>
                    <div className="app calories " data-page="calories-content" tabIndex="0" onClick={() => handleMouseClick("second")} >
                        <a>Подсчёт калорий</a></div>
                </div>
            </div>

        </AppContainer>
    );
}
export default Content;