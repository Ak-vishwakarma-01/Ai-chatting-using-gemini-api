import axios from "axios";

async function generateAnswers(question) {
    try {
        const response = await axios({
            url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_API}`,
            method: "post",
            data: {
                contents: [
                    { parts: [{ text: question }] }
                ]
            }
        });
        console.log(response.data.candidates[0].content.parts[0].text);  // Adjust this path if necessary
        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Error generating answer:", error);
        return null;
    }
}

export default generateAnswers;
