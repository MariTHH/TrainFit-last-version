import '../appSchedule/style.css';

function AppBody(props) {
    return (
        <div className="content1">
            {props.children}
        </div>
    );
}

export default AppBody;
