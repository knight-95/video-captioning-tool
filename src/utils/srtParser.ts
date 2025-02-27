import { Caption } from "./captions";

// Function to parse SRT file content into captions
export const parseSRT = (srtText: string): Caption[] => {
    const lines = srtText.split("\n");
    const parsedCaptions: Caption[] = [];
    let time: number | null = null;
    let text = "";

    lines.forEach((line) => {
        if (line.includes("-->")) {
            const timeParts = line.split(" --> ")[0].split(":");
            time =
                parseFloat(timeParts[0]) * 3600 +
                parseFloat(timeParts[1]) * 60 +
                parseFloat(timeParts[2].replace(",", "."));
        } else if (line.trim() === "") {
            if (time !== null && text) {
                parsedCaptions.push({ time, text });
                time = null;
                text = "";
            }
        } else {
            text += (text ? " " : "") + line.trim();
        }
    });

    return parsedCaptions;
};

// Function to handle SRT file upload
export const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setSelectedFileName: React.Dispatch<React.SetStateAction<string | null>>,
    setCaptions: React.Dispatch<React.SetStateAction<Caption[]>>
) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith(".srt")) {
        setSelectedFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            const srtText = e.target?.result as string;
            setCaptions(parseSRT(srtText));
        };
        reader.readAsText(file);
    } else {
        alert("Please upload a valid .srt file");
    }
};
