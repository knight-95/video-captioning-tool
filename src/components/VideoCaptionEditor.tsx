"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import GlassMorphism from "./GlassMorphism";
import { addCaption, Caption } from "../utils/captions";
import { handleFileUpload } from "../utils/srtParser";

const VideoCaptionEditor: React.FC = () => {
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [captions, setCaptions] = useState<Caption[]>([]);
    const [newCaption, setNewCaption] = useState<string>("");
    const [timestamp, setTimestamp] = useState<string>("");
    const playerRef = useRef<ReactPlayer | null>(null);
    const [currentTime, setCurrentTime] = useState<number>(0);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

    // Update current playback time every 500ms
    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef.current) {
                setCurrentTime(playerRef.current.getCurrentTime());
            }
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-6xl font-bold pb-5 mb-5 bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">Video Captioning Tool</h1>

            <input
                type="text"
                placeholder="Enter video URL"
                className="w-96 p-2 mb-4 border-2 border-white rounded text-blue"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
            />

            <div className="w-64 p-2 border-2 mb-5 border-white rounded-lg bg-transparent text-gray-400 cursor-pointer focus:ring-2 focus:outline-none focus:ring-blue-300">
                <label
                    htmlFor="fileUpload"
                    className="flex items-center justify-between px-3 py-1 rounded-md cursor-pointer hover:bg-white/10"
                >
                    <span className="truncate">{selectedFileName ? selectedFileName : "Upload .srt file"}</span>
                    <button className="bg-blue-600 px-2 py-1 rounded text-white text-sm">Browse</button>
                </label>
                <input
                    type="file"
                    id="fileUpload"
                    accept=".srt"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, setSelectedFileName, setCaptions)}
                />
            </div>

            {videoUrl && (
                <div className="mb-6">
                    <ReactPlayer ref={playerRef} url={videoUrl} controls width="640px" height="360px" />
                    <div className="text-center mt-2 text-lg font-semibold min-h-[40px] flex justify-center items-center">
                        {captions.find((cap) => Math.abs(cap.time - currentTime) < 1)?.text || ""}
                    </div>
                </div>
            )}

            <div className="flex gap-2 ">
                <input
                    type="text"
                    placeholder="Enter Caption"
                    className="w-80 p-2 border-2 border-white rounded"
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Timestamp (sec)"
                    className="w-40 p-2 border-2 border-white rounded"
                    value={timestamp}
                    onChange={(e) => setTimestamp(Math.max(0, Number(e.target.value)).toString())}
                />
                <button
                    type="button"
                    onClick={() => addCaption(captions, setCaptions, newCaption, timestamp, setNewCaption, setTimestamp)}
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Add
                </button>
            </div>

            <GlassMorphism captions={captions} />
        </div>
    );
};

export default VideoCaptionEditor;
