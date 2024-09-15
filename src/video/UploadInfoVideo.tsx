import React, { useEffect, useState } from 'react';
import '../input.css';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const UploadInfoVideo = () => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        fetch('http://localhost:10000/api/video/process/get-all')
            .then(
                response => response.json()
            ).then(
                data => setVideos(data['videoInfos'])
            );
    }, []);

    return <>
        {videos && <Table>
            <TableCaption>A list of your uploaded.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Video</TableHead>
                    <TableHead>Resolution</TableHead>
                    <TableHead>Bitrate</TableHead>
                    <TableHead>Codec</TableHead>
                    <TableHead>Content</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {videos.map(video => (
                    <TableRow>
                        <TableCell className="font-medium">{video["name"]}</TableCell>
                        <TableCell>{`${video["info"]["resolution"]["width"]}x${video["info"]["resolution"]["height"]}`}</TableCell>
                        <TableCell>{video["info"]["bitrate"]}</TableCell>
                        <TableCell>{video["info"]["codec"]}</TableCell>
                        <TableCell>
                            <video width="600" controls>
                                <source src={video["info"]["url"]} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>}
    </>
}

export default UploadInfoVideo;