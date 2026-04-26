import genAI from "../config/gemini.js";

// API to generate worker bio using Gemini
const generateBio = async (req, res) => {
    try {
        const { name, speciality, experience, degree } = req.body;

        if (!name || !speciality) {
            return res.json({ success: false, message: "Name and speciality are required" });
        }

        const prompt = `Write a professional "About" section for a home service worker profile. Keep it 2-3 sentences, friendly and trustworthy tone.

Details:
- Name: ${name}
- Speciality: ${speciality}
- Experience: ${experience || "Not specified"}
- Education/Certification: ${degree || "Not specified"}

Write ONLY the bio text, no quotes or labels.`;

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const bio = result.response.text().trim();

        res.json({ success: true, bio });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { generateBio };
