import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();

// ✅ CORS (allow your frontend)
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));

// ✅ Increase payload limit (IMPORTANT for images)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

console.log("🚀 Backend Started");

// ✅ Multer (with file size limit)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Capify Backend Running");
});

// ✅ Main API
app.post("/generate", upload.single("image"), async (req, res) => {
  try {
    console.log("📩 Request received");

    if (!req.file) {
      console.log("❌ No file received");
      return res.status(400).json({ error: "No image uploaded" });
    }

    console.log("📸 File:", req.file.originalname);

    const base64Image = req.file.buffer.toString("base64");

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Analyze this image and generate:

1. 5 short catchy captions (with emojis)
2. 5 trending songs:
   - 3 Hindi songs 🇮🇳
   - 2 English songs 🌍
3. 10 hashtags

Format STRICTLY like this:

Captions:
- ...
- ...

Songs:
- ...
- ...

Hashtags:
#...`
                },
                {
                  inline_data: {
                    mime_type: req.file.mimetype,
                    data: base64Image
                  }
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ Gemini Error:", data);
      return res.status(500).json({
        error: data.error?.message || "Gemini failed"
      });
    }

    console.log("✅ Gemini response received");

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    res.json({ result: text });

  } catch (err) {
    console.error("❌ Server Error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));