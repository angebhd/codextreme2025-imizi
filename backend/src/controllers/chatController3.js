require("dotenv").config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

async function chatWithGemini(userMessage) {
	const context = "You are an AI chatbot helping customers of an application to assist with parenting practices, facilitate communication within families, and monitor household activities.";

    try {
        const response = await fetch(GEMINI_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    { role: "user", parts: [{ text: context }] },
                    { role: "user", parts: [{ text: userMessage }] }
                ]
            })
        });

        const data = await response.json();

        return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process your request.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "An error occurred while processing your request.";
    }
}


exports.chat = async (req, res) => {

    const userMessage = req.body.message || "";
	const botReply = await chatWithGemini(userMessage);
    res.json({ reply: botReply });
};

