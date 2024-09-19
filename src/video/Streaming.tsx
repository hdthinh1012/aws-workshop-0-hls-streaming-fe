import React, { useEffect } from 'react';
import '../input.css';
import Hls from 'hls.js';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button"
import { Routes, Route, useParams, NavLink, Outlet } from 'react-router-dom';

export const StreamList = () => {
    const [streamList, setStreamList] = React.useState([]);

    useEffect(() => {
        fetch(`${process.env.VITE_SERVER_URL}/api/video/stream/get-all`)
            .then(
                response => response.json()
            ).then(
                data => setStreamList(data['streamList'])
            );
    }, []);

    return <>
        {streamList && <Table>
            <TableCaption>A list of your uploaded.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px] text-center">Video</TableHead>
                    <TableHead className="w-[100px] text-center">Link</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {streamList.map(video => (
                    <TableRow key={video}>
                        <TableCell className="font-medium text-center">{video}</TableCell>
                        <TableCell className="font-medium text-center"><NavLink to={`/stream/${video}`} className={buttonVariants({ variant: "outline" })}>Click here</NavLink></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>}

        <Outlet />
    </>
}

const StreamVideo = () => {
    const myRef: React.RefObject<HTMLVideoElement> = React.useRef<HTMLVideoElement>(null);
    let { video } = useParams();
    let hls = new Hls();
    useEffect(() => {
        try {
            let videoSrc = `${process.env.VITE_SERVER_URL}/static/hls/${video}/master.m3u8`;
            if (Hls.isSupported()) {
                hls.loadSource(videoSrc);
                hls.attachMedia(myRef.current!);
                hls.currentLevel = 0;
                console.log('hls.levels', hls.levels);
            }
        } catch (error) {
            console.log('streamVideo error', error);
        }
    }, [video]);

    console.log('hls.currentLevel.toString()', hls.currentLevel.toString());

    return <>
        <video
            autoPlay
            controls
            ref={myRef}
            style={{ height: '60vh' }}
        ></video>

        <div className='m-auto'>
            <Select defaultValue={hls.currentLevel.toString()} onValueChange={(value) => hls.currentLevel = Number(value)}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Resolution" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="-1">Auto</SelectItem>
                    <SelectItem value="0">360P</SelectItem>
                    <SelectItem value="1">480P</SelectItem>
                    <SelectItem value="2">720P</SelectItem>
                    <SelectItem value="3">1080P</SelectItem>
                </SelectContent>
            </Select>
        </div>

    </>;
}

export default StreamVideo;