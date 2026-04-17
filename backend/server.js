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

// ✅ Body limits
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

console.log("🚀 Backend Started");

// ✅ Multer (max 15MB upload)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }
});

// ✅ Rate limit (simple)
let lastRequestTime = 0;

// ✅ Health route
app.get("/", (req, res) => {
  res.send("✅ Capify Backend Running");
});

// ✅ MAIN API
app.post("/generate", upload.single("image"), async (req, res) => {
  try {
    console.log("📩 API HIT");

    // 🔥 RATE LIMIT
    const now = Date.now();
    if (now - lastRequestTime < 3000) {
      return res.status(429).json({
        error: "Too many requests. Wait 3 seconds."
      });
    }
    lastRequestTime = now;

    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    console.log("📸 Original size:", req.file.size);

    // ✅ SMART IMAGE OPTIMIZATION
    const compressedBuffer = await sharp(req.file.buffer)
      .rotate() // fix orientation
      .resize({
        width: 768, // 🔥 BEST BALANCE
        withoutEnlargement: true
      })
      .jpeg({
        quality: 55, // 🔥 reduce size a lot
        mozjpeg: true
      })
      .toBuffer();

    console.log("📦 Compressed size:", compressedBuffer.length);

    const base64Image = compressedBuffer.toString("base64");

    // ✅ TIMEOUT CONTROL
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        signal: controller.signal,
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

    clearTimeout(timeout);

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
    console.error("🔥 Server Error:", err);

    if (err.name === "AbortError") {
      return res.status(500).json({
        error: "Request timeout (try smaller image)"
      });
    }

    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err);

  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      error: "Image too large (max 15MB)"
    });
  }

  res.status(500).json({ error: "Server crashed" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));