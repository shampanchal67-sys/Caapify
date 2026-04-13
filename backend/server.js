import express from "express";
import multer from "multer";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import sharp from "sharp";

dotenv.config();

const app = express();

// ✅ CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));

// ✅ Allow large payload
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

console.log("🚀 Backend Started");

// ✅ Multer (allow large file)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB upload allowed
});

// ✅ Test route
app.get("/", (req, res) => {
  res.send("✅ Capify Backend Running");
});

// ✅ MAIN API
app.post("/generate", upload.single("image"), async (req, res) => {
  try {
    console.log("📩 API HIT");

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    console.log("📸 Original size:", req.file.size);

    // 🔥 COMPRESS IMAGE (key step)
    const compressedBuffer = await sharp(req.file.buffer)
      .resize({ width: 1024 }) // keep quality but reduce size
      .jpeg({ quality: 80 })   // compress
      .toBuffer();

    console.log("📦 Compressed size:", compressedBuffer.length);

    const base64Image = compressedBuffer.toString("base64");

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
                    mime_type: "image/jpeg",
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

    console.log("✅ Gemini success");

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    res.json({ result: text });

  } catch (err) {
    console.error("🔥 Server Crash:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err);

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ error: "Image too large (max 20MB)" });
  }

  res.status(500).json({ error: "Server crashed" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));