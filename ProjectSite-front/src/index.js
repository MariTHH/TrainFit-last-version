import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import 'css/style.css';


import {Provider} from "react-redux";
import MainPage from "./routes/mainPage/script";
import store from "./store";

function LoginPage() {
    return null;
}

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <MainPage/>
        },
    ],
)
;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);