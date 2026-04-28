import groq from "../config/groq.js";

// API to generate worker bio using Groq
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

        const result = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 200,
        });

        const bio = result.choices[0].message.content.trim();

        res.json({ success: true, bio });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { generateBio };
