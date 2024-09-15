import React from "react";
import { createBrowserRouter, RouterProvider, NavLink } from "react-router-dom";
import LargeVideoUpload from './video/LargeVideoUpload';
import StreamVideo, { StreamList } from "./video/Streaming";
import ProcessVideo from "./video/ProcessVideo";
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
import { Button } from "@/components/ui/button";
import './input.css';


const router = createBrowserRouter([
    {
        path: '/',
        element: <>
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
        </>
    },
    {
        path: '/upload',
        element: <LargeVideoUpload />
    },
    {
        path: '/stream',
        element: <StreamList />
    },
    {
        path: '/stream/:video',
        element: <StreamVideo />
    },
    {
        path: '/process',
        element: <ProcessVideo />
    },
]);

const RootApp = () => {
    return (<div className="w-full flex flex-col h-screen">
        <header className="w-full bg-white shadow-md py-4">
            <h1 className="text-3xl font-bold text-center text-gray-800">
                AWS Video Player
            </h1>
        </header>
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    </div>
    );
};

export default RootApp;