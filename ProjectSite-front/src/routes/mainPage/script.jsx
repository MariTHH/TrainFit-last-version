import {Toaster} from "react-hot-toast";
import Header from "../../header/script";
import AppBody from "../../components/AppBody/script";
import LogIn from "../../login/script";
import Content from "../../content/script";

function MainPage() {


    return (
        <AppBody>
            <Header/>
            <Content/>
            <LogIn/>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
        </AppBody>
    );

}

export default MainPage;