import React, { useEffect } from 'react';
import { handleVideoUpload, uploadFileSetup, uploadFileInChunks } from '../../vanilla_html/upload.js';
import './upload.css';

const LargeVideoUpload = () => {
    const formRef = React.useRef();
    const progressContainerRef = React.useRef();
    const progressBarRef = React.useRef();
    const statusElementRef = React.useRef();
    const status2ndElementRef = React.useRef();

    const handleVideoUpload = async (e) => {
        e.preventDefault();
        const form = formRef.current;
        const progressContainer = progressContainerRef.current;
        const statusElement = statusElementRef.current;

        console.log('form', form);
        console.log('progress', progressContainer);
        console.log('statusElement', statusElement);

        const formData = new FormData(form);
        const file = formData.get('video');

        if (!file) {
            alert('Please select a video file');
            return;
        }

        if (file.size > 3 * 1024 * 1024 * 1024) { // 2GiB in bytes
            alert('The file size exceeds 3GiB. Please upload a smaller file.');
            return;
        }

        progressContainer.style.display = 'block';
        statusElement.textContent = 'Uploading...';

        try {
            const { success, chunkSum, chunkSize, error } = await uploadFileSetup(file);
            console.log('success, chunkSum, chunkSize, error', success, chunkSum, chunkSize, error);
            if (success) {
                alert(`Prepare to upload chunkSize, chunkSum: ${chunkSize}, ${chunkSum}`);
                if (await uploadFileInChunks(file, chunkSize, chunkSum)) {
                    statusElement.textContent = 'Upload successful!';
                } else {
                    statusElement.textContent = 'Upload failed!';
                }
            } else {
                throw `Setup failed": ${error}`;
            }
        } catch (error) {
            console.error('Error:', error);
            statusElement.textContent = 'Upload failed. Please try again.';
        }
    };

    const uploadFileSetup = async (file) => {
        try {
            const formData = new FormData();
            formData.append('baseFileName', file.name);
            formData.append('fileSize', file.size);

            const response = await fetch('http://localhost:10000/api/video/upload/set-up', {
                method: 'POST',
                body: formData,
            });
            const { success, chunkSum, chunkSize, error } = await response.json();

            return { success, chunkSum, chunkSize, error };
        } catch (error) {
            alert(`uploadFileSetup: ${error}`);
        }
    }

    const uploadFileInChunks = async (file, chunkSize, chunkSum) => {
        const statusElement = statusElementRef.current;
        const status2ndElement = status2ndElementRef.current;
        const progressBar = progressBarRef.current;
        try {
            let partIdx = 0;
            for (let start = 0; start < file.size; start += chunkSize) {
                let retries = 0;
                console.log(`start: ${start}, file.size: ${file.size}`);
                while (true) {
                    const chunk = file.slice(start, start + chunkSize);
                    const formData = new FormData();
                    formData.append('video', chunk, `${file.name}.part_${partIdx}`);
                    formData.append('chunk', Math.floor(start / chunkSize));
                    formData.append('totalChunks', chunkSum);
                    formData.append('originalname', `${file.name}.part_${partIdx}`);

                    const response = await fetch('http://localhost:10000/api/video/upload', {
                        method: 'POST',
                        body: formData,
                    });

                    if (response.ok) { // Status 200 - 299
                        const progress = ((start + chunk.size) / file.size) * 100;
                        progressBar.style.width = `${progress}%`;
                        statusElement.textContent = `Uploading... ${Math.round(progress)}%`;
                        partIdx += 1;
                        break; // Break upload retry loop
                    } else if (retries < 5) {
                        retries += 1;
                        status2ndElement.textContent = `Uploading part ${partIdx} failed. Retry ${retries} times`;
                        continue
                    }

                    /**
                     * Retries multiple time failed. Cancelling and stop altogether
                     */
                    statusElement.textContent = `Uploading part ${partIdx} failed after retry ${retries} times. Cancelling upload...`;
                    status2ndElement.textContent = `Uploading part ${partIdx} failed`;
                    while (true) {
                        const cancelFormData = new FormData();
                        cancelFormData.append('baseFileName', file.name);
                        const cancelResponse = await fetch('http://localhost:10000/api/video/upload/cancel', {
                            method: 'DELETE',
                            body: cancelFormData
                        });
                        if (cancelResponse.ok) {
                            statusElement.textContent = `Upload cancelled!`;
                            break; // Break cancel retry loop
                        }
                    }
                    return false;
                }
            }
            return true;
        }
        catch (error) {
            alert(`uploadFileInChunks error: ${error}`);
        }
    }


    return <form ref={formRef} id="upload-form" onSubmit={handleVideoUpload}>
        <input type="file" name="video" accept="video/*" required />
        <button type="submit">Upload Video</button>
        <div ref={progressContainerRef} id="progress-container">
            <div ref={progressBarRef} id="progress-bar">
                <div id="progress"></div>
            </div>
            <div ref={statusElementRef} id="status"></div>
            <div ref={status2ndElementRef} id="status-2nd"></div>
        </div>
    </form>;
}



export default LargeVideoUpload;