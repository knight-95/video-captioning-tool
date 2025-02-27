export interface Caption {
    time: number;
    text: string;
}

// Function to add a new caption
export const addCaption = (
    captions: Caption[],
    setCaptions: React.Dispatch<React.SetStateAction<Caption[]>>,
    newCaption: string,
    timestamp: string,
    setNewCaption: React.Dispatch<React.SetStateAction<string>>,
    setTimestamp: React.Dispatch<React.SetStateAction<string>>
) => {
    if (newCaption.trim() && timestamp.trim()) {
        setCaptions([...captions, { time: parseFloat(timestamp), text: newCaption }]);
        setNewCaption("");
        setTimestamp("");
    }
};
