import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "mobx-react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import 'css/style.css';


import MainPage from "./routes/mainPage/script";
import store from "./store";


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
    <Provider {...store}>
        <RouterProvider router={router}/>
    </Provider>
);