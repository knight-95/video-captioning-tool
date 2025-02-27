import React from 'react';

const GlassMorphism: React.FC<{ captions?: { time: number; text: string }[] }> = ({ captions = [] }) => {
    return (
        <div className="container bg-cover mt-5 flex justify-center items-center">
            <div className="w-1/2 p-5 rounded-xl bg-transparent bg-opacity-0 backdrop-blur-lg shadow-lg border border-white/30">
                <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent ">Captions</h2>

                {/* Handle Empty Captions Case */}
                {captions.length === 0 ? (
                    <p className="text-lg text-white text-center font-bold">No captions available</p>

                ) : (
                    <div className="overflow-x-auto max-h-80 overflow-y-auto">
                        <table className="min-w-full bg-transparent rounded-lg shadow-md text-white">
                            {/* Gradient Header */}
                            <thead className="sticky top-0 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80">
                                <tr>
                                    <th className="px-4 py-2 text-left">Timestamp (seconds)</th>
                                    <th className="px-4 py-2 text-left">Caption</th>
                                </tr>
                            </thead>
                            <tbody>
                                {captions.map((cap, index) => (
                                    <tr
                                        key={index}
                                        className="border-b border-blue-600 bg-opacity-20 hover:bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white transition"
                                    >
                                        <td className="px-4 py-2 text-center text-md font-semibold">{cap.time} sec</td>
                                        <td className="px-4 py-2 text-md font-semibold">{cap.text}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GlassMorphism;
