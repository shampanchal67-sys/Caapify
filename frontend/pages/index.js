import { useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

// 3D Object
function FloatingShape() {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#00adb5" wireframe />
      </mesh>
    </Float>
  );
}

export default function Home() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ fallback if env fails
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://caapify-backend.onrender.com";

  const onDrop = (files) => {
    const file = files[0];
    if (!file) return;

    console.log("📸 Selected file:", file);

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop
  });

  const generate = async () => {
    if (!image) {
      alert("Upload image first");
      return;
    }

    console.log("🚀 Sending request to backend...");

    setLoading(true);
    setResult("");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(`${API_URL}/generate`, {
        method: "POST",
        body: formData
      });

      console.log("📡 Response status:", res.status);

      const data = await res.json();
      console.log("📦 Response data:", data);

      if (!res.ok) {
        throw new Error(data.error || "API failed");
      }

      setResult(data.result || "");
    } catch (err) {
      console.error("❌ Frontend Error:", err);
      setResult("Error generating content");
    }

    setLoading(false);
  };

  // SAFE PARSE
  let captions = [];
  let songs = [];
  let hashtags = "";

  if (result && result.includes("Songs:") && result.includes("Hashtags:")) {
    captions = result
      .split("Songs:")[0]
      .replace("Captions:", "")
      .trim()
      .split("\n");

    songs = result
      .split("Songs:")[1]
      .split("Hashtags:")[0]
      .trim()
      .split("\n");

    hashtags = result.split("Hashtags:")[1].trim();
  }

  const copy = (t) => navigator.clipboard.writeText(t);

  return (
    <div style={styles.container}>
      <Canvas style={styles.canvas}>
        <ambientLight />
        <FloatingShape />
      </Canvas>

      <div style={styles.overlay}></div>

      <h1 style={styles.title}>🔥 Capify</h1>
      <p>AI captions + songs + hashtags</p>

      <div {...getRootProps()} style={styles.dropzone}>
        <input {...getInputProps()} />
        <p>Drag & Drop Image</p>
        {preview && <img src={preview} style={styles.preview} />}
      </div>

      <motion.button onClick={generate} style={styles.button}>
        {loading ? "Generating..." : "Generate"}
      </motion.button>

      {result && (
        <div style={styles.results}>
          <Section title="Captions" items={captions} copy={copy} />
          <Section title="Songs" items={songs} copy={copy} />

          <div style={styles.card}>
            <h3>Hashtags</h3>
            <p>{hashtags}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, items, copy }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      {items.map((item, i) => (
        <div key={i}>
          {item}
          <button onClick={() => copy(item)}>Copy</button>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: { color: "white", textAlign: "center", padding: 20 },
  canvas: { position: "fixed", width: "100%", height: "100%", zIndex: -2 },
  overlay: {
    position: "fixed",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
    zIndex: -1
  },
  dropzone: {
    border: "2px dashed white",
    padding: 20,
    margin: 20,
    cursor: "pointer"
  },
  preview: { width: 200, marginTop: 10 },
  button: {
    padding: 10,
    background: "#00adb5",
    border: "none",
    color: "white",
    cursor: "pointer"
  },
  results: { marginTop: 20 },
  card: {
    background: "rgba(255,255,255,0.1)",
    margin: 10,
    padding: 10
  }
};