import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AddPicture from "./components/AddPicture";
import Picture, {loader as pictureLoader} from "./components/Picture";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/add-picture",
        element: <AddPicture/>
    },
    {
        path: "/picture/:pictureId",
        element: <Picture/>,
        loader: pictureLoader
    }
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
