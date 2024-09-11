import React from "react";
import { createBrowserRouter, RouterProvider, NavLink } from "react-router-dom";
import LargeVideoUpload from './video/LargeVideoUpload';
import StreamVideo from "./video/Streaming";

const router = createBrowserRouter([
    {
        path: '/',
        element: <>
            <NavLink to={'/upload'}>Upload Video</NavLink>
            <NavLink to={'/stream'}>Stream Video</NavLink>
        </>
    },
    {
        path: '/upload',
        element: <LargeVideoUpload />
    },
    {
        path: '/stream',
        element: <StreamVideo />
    },
]);

const RootApp = () => {
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
};

export default RootApp;