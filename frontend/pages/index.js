import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import Link from "next/link";
import { products } from "./_app";

// Affiliate Products Component
function AffiliateProducts({ title = "Recommended Products", count = 3, placement = "top" }) {
  // Shuffle and get random products
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  const displayProducts = shuffled.slice(0, count);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-8">
      <div className="relative rounded-2xl p-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20">
        <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            ✨ {title}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {displayProducts.map((product, index) => (
              <motion.a
                key={index}
                href={product.link}
                target="_blank"
                rel="noopener noreferrer nofollow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative bg-white/5 rounded-xl p-4 border border-white/10 hover:border-cyan-500/50 transition-all"
              >
                <div className="aspect-square relative mb-3 overflow-hidden rounded-lg bg-white/10">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform"
                  />
                </div>
                
                <h4 className="font-bold text-white mb-1 text-sm">{product.name}</h4>
                {product.description && (
                  <p className="text-white/60 text-xs mb-3 line-clamp-2">{product.description}</p>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-cyan-400 font-medium">{product.category}</span>
                  <span className="text-xs text-white/80 group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                    View
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>

                {/* Badge */}
                <div className="absolute top-2 right-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  Amazon
                </div>
              </motion.a>
            ))}
          </div>

          <p className="text-center text-white/40 text-xs mt-4">
            💡 Recommended tools for content creators
          </p>
        </div>
      </div>
    </div>
  );
}

// Navbar Component
function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
              C
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Caapify
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              About
            </Link>
            <Link 
              href="/privacy" 
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Privacy
            </Link>
            <Link 
              href="/contact" 
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

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
        {/* Navbar */}
        <Navbar />

        {/* Affiliate Products - Top Section */}
        <AffiliateProducts title="Content Creator Essentials" count={3} placement="top" />

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
            Caapify
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

        {/* How It Works Section - Important for AdSense */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-3xl mx-auto px-4 py-8 mb-8"
        >
          <div className="relative rounded-2xl p-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20">
            <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
              <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                How It Works
              </h2>
              <p className="text-white/80 text-center text-lg leading-relaxed mb-6">
                Upload your photo and our AI will generate engaging captions, 
                trending song recommendations, and viral hashtags instantly to 
                boost your social media reach and engagement.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 flex items-center justify-center">
                    <span className="text-3xl">📸</span>
                  </div>
                  <h3 className="font-bold mb-2">1. Upload Image</h3>
                  <p className="text-white/60 text-sm">Drag & drop or select your photo</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center">
                    <span className="text-3xl">✨</span>
                  </div>
                  <h3 className="font-bold mb-2">2. AI Processing</h3>
                  <p className="text-white/60 text-sm">Our AI analyzes and generates content</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pink-500/20 to-pink-500/10 flex items-center justify-center">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <h3 className="font-bold mb-2">3. Get Results</h3>
                  <p className="text-white/60 text-sm">Copy and share on social media</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

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

                {/* Affiliate Products - Middle Section */}
                <div className="my-8">
                  <AffiliateProducts title="Upgrade Your Setup" count={3} placement="middle" />
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

        {/* Affiliate Products - Bottom Section */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <AffiliateProducts title="Popular Among Creators" count={6} placement="bottom" />
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-16 bg-black/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* About */}
              <div>
                <h4 className="font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Caapify
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  AI-powered tool for generating viral social media content from your images.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-bold mb-4 text-white">Quick Links</h4>
                <div className="flex flex-col gap-2">
                  <Link href="/" className="text-white/60 hover:text-white text-sm transition-colors">
                    Home
                  </Link>
                  <Link href="/about" className="text-white/60 hover:text-white text-sm transition-colors">
                    About Us
                  </Link>
                  <Link href="/contact" className="text-white/60 hover:text-white text-sm transition-colors">
                    Contact
                  </Link>
                </div>
              </div>

              {/* Legal */}
              <div>
                <h4 className="font-bold mb-4 text-white">Legal</h4>
                <div className="flex flex-col gap-2">
                  <Link href="/privacy" className="text-white/60 hover:text-white text-sm transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="text-white/60 hover:text-white text-sm transition-colors">
                    Terms of Service
                  </Link>
                </div>
              </div>

              {/* Social */}
              <div>
                <h4 className="font-bold mb-4 text-white">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-center pt-8 border-t border-white/10">
              <p className="text-white/40 text-sm">
                © 2026 Caapify. All rights reserved. | Made with AI ✨
              </p>
            </div>
          </div>
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
