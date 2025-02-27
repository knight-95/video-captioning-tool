"use client";

import React from "react";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaTachometerAlt } from "react-icons/fa";

interface MediaControlsProps {
    playing: boolean;
    setPlaying: (playing: boolean) => void;
    volume: number;
    setVolume: (volume: number) => void;
    playbackRate: number;
    setPlaybackRate: (rate: number) => void;
}

const MediaControls: React.FC<MediaControlsProps> = ({
    playing,
    setPlaying,
    volume,
    setVolume,
    playbackRate,
    setPlaybackRate,
}) => {
    return (
        <div className="mt-3 flex items-center space-x-4">
            {/* Play/Pause Button */}
            <button
                className="bg-white text-black p-3 rounded-full shadow-md hover:bg-gray-300"
                onClick={() => setPlaying(!playing)}
            >
                {playing ? <FaPause size={24} /> : <FaPlay size={24} />}
            </button>

            {/* Volume Control */}
            <div className="flex items-center space-x-2">
                <button onClick={() => setVolume(volume === 0 ? 1 : 0)}>
                    {volume === 0 ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
                </button>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="cursor-pointer w-24 h-2 bg-gray-300 rounded-lg"
                />
            </div>

            {/* Speed Control */}
            <div className="flex items-center space-x-2">
                <FaTachometerAlt size={20} />
                <select
                    value={playbackRate}
                    onChange={(e) => setPlaybackRate(parseFloat(e.target.value))}
                    className="p-2 border rounded-lg bg-white text-black"
                >
                    <option value="0.5">0.5x</option>
                    <option value="0.75">0.75x</option>
                    <option value="1">1x</option>
                    <option value="1.25">1.25x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2x</option>
                </select>
            </div>
        </div>
    );
};

export default MediaControls;
