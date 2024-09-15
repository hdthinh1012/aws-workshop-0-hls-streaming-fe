import React from "react";
import {
    createBrowserRouter, RouterProvider, NavLink, createRoutesFromElements,
    Outlet,
    Route
} from "react-router-dom";
import LargeVideoUpload from './video/LargeVideoUpload';
import StreamVideo, { StreamList } from "./video/Streaming";
import UploadInfoVideo from "./video/UploadInfoVideo";
import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar";
import './input.css';

const nestedRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path="/"
            element={<>
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger><NavLink to={'/upload'}>Upload Video</NavLink></MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger><NavLink to={'/stream'}>Stream Video</NavLink></MenubarTrigger>
                    </MenubarMenu>
                    <MenubarMenu>
                        <MenubarTrigger><NavLink to={'/process'}>Process Video</NavLink></MenubarTrigger>
                    </MenubarMenu>
                </Menubar>
                <Outlet />
            </>}
        >
            <Route
                path="upload"
                element={<LargeVideoUpload />}
            ></Route>
            <Route
                path="stream"
                element={<StreamList />}
            >
                <Route
                    path=":video"
                    element={<StreamVideo />}
                ></Route>
            </Route>
            <Route
                path="process"
                element={<UploadInfoVideo />}
            ></Route>
        </Route>
    )
);

const RootApp = () => {
    return (<div className="w-full flex flex-col h-screen">
        <header className="w-full bg-white shadow-md py-4">
            <h1 className="text-3xl font-bold text-center text-gray-800">
                AWS Video Player
            </h1>
        </header>
        <React.StrictMode>
            <RouterProvider router={nestedRouter} />
        </React.StrictMode>
    </div>
    );
};

export default RootApp;