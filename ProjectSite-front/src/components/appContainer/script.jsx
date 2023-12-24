function AppContainer(props) {
    // const  {children}  = this.props.children;
    return (
        <div className="container">
            {props.children}
        </div >
    );
}

export default AppContainer;
