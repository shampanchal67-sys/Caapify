import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

// 3D Background Element
function FloatingShape() {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#06b6d4" wireframe />
      </mesh>
    </Float>
  );
}

// Toast Notification Component
function Toast({ message, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-50"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <span className="font-medium">{message}</span>
    </motion.div>
  );
}

// Copy Button Component
function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium transition-all flex items-center gap-2 border border-white/10"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {label}
        </>
      )}
    </motion.button>
  );
}

export default function Home() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const onDrop = (files) => {
    const file = files[0];
    if (!file) return;

    console.log("📸 Selected file:", file);
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(""); // Clear previous results
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
    maxFiles: 1
  });

  const generate = async () => {
    if (!image) {
      alert("Upload image first");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      console.log("🚀 Sending request to:", `${API_URL}/generate`);

      const formData = new FormData();
      formData.append("image", image);

      const res = await fetch(`${API_URL}/generate`, {
        method: "POST",
        body: formData
      });

      console.log("📡 Status:", res.status);

      const data = await res.json();
      console.log("📦 Response:", data);

      if (!res.ok) {
        throw new Error(data.error || "API failed");
      }

      setResult(data.result || "");
    } catch (err) {
      console.error("❌ Error:", err);
      setResult("Error generating content");
    }

    setLoading(false);
  };

  const reset = () => {
    setImage(null);
    setPreview(null);
    setResult("");
    setLoading(false);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(result);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  // Parse results
  let captions = [];
  let songs = [];
  let hashtags = "";

  if (result && result.includes("Songs:") && result.includes("Hashtags:")) {
    captions = result
      .split("Songs:")[0]
      .replace("Captions:", "")
      .trim()
      .split("\n")
      .filter(c => c.trim());

    songs = result
      .split("Songs:")[1]
      .split("Hashtags:")[0]
      .trim()
      .split("\n")
      .filter(s => s.trim());

    hashtags = result.split("Hashtags:")[1].trim();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white overflow-x-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <FloatingShape />
        </Canvas>
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-transparent pointer-events-none z-0" />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Ad Space - Top Banner */}
        <div className="w-full h-24 bg-white/5 backdrop-blur-sm border-b border-white/10 flex items-center justify-center mb-8">
          <span className="text-white/40 text-sm">Ad Space - 728x90</span>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center px-4 py-12 max-w-6xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight"
            style={{ fontFamily: "'Space Grotesk', 'Outfit', sans-serif" }}
          >
            Capify
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-white/80 mb-4 font-light"
          >
            Turn your photos into viral content 🔥
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/50 max-w-2xl mx-auto text-lg"
          >
            AI-powered captions, song recommendations, and trending hashtags in seconds
          </motion.p>
        </motion.div>

        {/* Upload Section */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            {!preview ? (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                {...getRootProps()}
                className={`
                  relative overflow-hidden rounded-3xl p-1 cursor-pointer
                  transition-all duration-300
                  ${isDragActive ? 'scale-105' : 'hover:scale-[1.02]'}
                `}
              >
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-75 animate-pulse" />
                
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-3xl p-16 border border-white/10">
                  <input {...getInputProps()} />
                  
                  <div className="flex flex-col items-center gap-6">
                    {/* Upload Icon */}
                    <motion.div
                      animate={{ y: isDragActive ? -10 : 0 }}
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center"
                    >
                      <svg className="w-12 h-12 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </motion.div>

                    <div className="text-center">
                      <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        {isDragActive ? "Drop it here!" : "Upload Your Image"}
                      </h3>
                      <p className="text-white/60">
                        Drag & drop or click to browse
                      </p>
                      <p className="text-white/40 text-sm mt-2">
                        Supports: JPG, PNG, GIF, WebP
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative rounded-3xl p-1 bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-pink-500/50"
              >
                <div className="bg-slate-900/90 backdrop-blur-xl rounded-3xl p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="relative group flex-shrink-0">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-64 h-64 object-cover rounded-2xl shadow-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <p className="text-white text-sm font-medium">{image?.name}</p>
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col gap-4">
                      <h3 className="text-2xl font-bold">Ready to Generate!</h3>
                      <p className="text-white/60">
                        Your image is uploaded and ready for AI magic ✨
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={generate}
                          disabled={loading}
                          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-bold text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <span className="flex items-center gap-3">
                              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              AI is creating magic...
                            </span>
                          ) : (
                            "✨ Generate Content"
                          )}
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={reset}
                          className="px-6 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl font-medium transition-all border border-white/10"
                        >
                          🔄 Upload New
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-center"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                <span className="text-white/80 font-medium ml-2">Processing your image...</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {result && !loading && captions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="max-w-6xl mx-auto px-4 py-12"
            >
              {/* Results Header */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Your Viral Content 🎯
                </h2>
                <CopyButton text={result} label="Copy All" />
              </div>

              <div className="grid gap-6">
                {/* Captions Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="relative rounded-2xl p-1 bg-gradient-to-r from-cyan-500/30 to-purple-500/30"
                >
                  <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="text-3xl">💬</span>
                      Captions
                    </h3>
                    <div className="space-y-3">
                      {captions.map((caption, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-start gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
                        >
                          <span className="text-cyan-400 font-bold text-sm mt-1">{i + 1}</span>
                          <p className="flex-1 text-white/90 leading-relaxed">{caption}</p>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <CopyButton text={caption} label="Copy" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Ad Space - Between Results */}
                <div className="w-full h-32 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center">
                  <span className="text-white/40 text-sm">Ad Space - 728x90</span>
                </div>

                {/* Songs Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="relative rounded-2xl p-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30"
                >
                  <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="text-3xl">🎵</span>
                      Song Recommendations
                    </h3>
                    <div className="space-y-3">
                      {songs.map((song, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-start gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all group"
                        >
                          <span className="text-purple-400 font-bold text-sm mt-1">{i + 1}</span>
                          <p className="flex-1 text-white/90 leading-relaxed">{song}</p>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <CopyButton text={song} label="Copy" />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Hashtags Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative rounded-2xl p-1 bg-gradient-to-r from-pink-500/30 to-cyan-500/30"
                >
                  <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="text-3xl">#️⃣</span>
                      Hashtags
                    </h3>
                    <div className="flex items-start gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all group">
                      <p className="flex-1 text-white/90 text-lg leading-relaxed">{hashtags}</p>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <CopyButton text={hashtags} label="Copy" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Generate Again Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={reset}
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl font-medium transition-all border border-white/10 inline-flex items-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload Another Image
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ad Space - Bottom */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="w-full h-32 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-center">
            <span className="text-white/40 text-sm">Ad Space - 728x90</span>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center py-12 px-4 text-white/40 border-t border-white/10 mt-16">
          <p className="text-sm">
            Made with AI ✨ | Capify © 2024
          </p>
        </footer>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && <Toast message="Copied all content!" onClose={() => setShowToast(false)} />}
      </AnimatePresence>

      {/* Custom Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Tailwind classes - Add this to your globals.css or tailwind config */
      `}</style>
    </div>
  );
}
