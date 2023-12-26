import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "mobx-react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";


import 'css/style.css';


import MainPage from "./routes/mainPage/script";
import ProfilePage from "./routes/profilePage/script";
import SchedulePage from "./routes/schedulePage/script";
import store from "./store";
import {createClient} from "@supabase/supabase-js";
import {SessionContextProvider} from "@supabase/auth-helpers-react";

const supabase = createClient(
    "https://fxvqltmjtuocrqtajjqy.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4dnFsdG1qdHVvY3JxdGFqanF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM2MDIzNzAsImV4cCI6MjAxOTE3ODM3MH0.ynaedO7VYFC0CounuWiOFs1hDfE4rHV0wqFi2Dt6WVU"
)

const router = createBrowserRouter(
        [
            {
                path: "/",
                element: <MainPage/>
            },
            {
                path: "/schedule",
                element: <SchedulePage/>
            },
            {
                path: "/profilepage",
                element: <ProfilePage/>
            },
        ],
    )
;


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider {...store}>
        <SessionContextProvider supabaseClient={supabase}>
        <RouterProvider router={router}/>
        </SessionContextProvider>
    </Provider>
);
