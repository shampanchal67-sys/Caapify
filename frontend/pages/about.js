import Link from "next/link";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                C
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Caapify
              </span>
            </Link>

            <div className="flex items-center gap-6">
              <Link href="/" className="text-white/80 hover:text-white transition-colors font-medium">
                Home
              </Link>
              <Link href="/about" className="text-white transition-colors font-medium">
                About
              </Link>
              <Link href="/privacy" className="text-white/80 hover:text-white transition-colors font-medium">
                Privacy
              </Link>
              <Link href="/contact" className="text-white/80 hover:text-white transition-colors font-medium">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-2xl p-1 bg-gradient-to-r from-cyan-500/30 to-purple-500/30"
        >
          <div className="bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/10">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              About Caapify
            </h1>

            <div className="space-y-6 text-white/80 text-lg leading-relaxed">
              <p>
                Caapify is an innovative AI-powered tool designed to help content creators, 
                social media managers, and influencers generate engaging content effortlessly. 
                We understand that creating the perfect caption, finding trending songs, and 
                selecting relevant hashtags can be time-consuming and challenging.
              </p>

              <p>
                Our advanced artificial intelligence analyzes your images and generates:
              </p>

              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Creative and engaging captions tailored to your image</li>
                <li>Trending song recommendations that match your content vibe</li>
                <li>Relevant hashtags to maximize your reach and engagement</li>
              </ul>

              <h2 className="text-3xl font-bold mt-8 mb-4 text-white">Our Mission</h2>
              <p>
                Our mission is to empower creators by simplifying the content creation process. 
                We believe that everyone deserves to have their content shine on social media, 
                and we're here to make that happen with the power of AI.
              </p>

              <h2 className="text-3xl font-bold mt-8 mb-4 text-white">Why Choose Caapify?</h2>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="font-bold text-cyan-400 mb-2">⚡ Lightning Fast</h3>
                  <p className="text-sm text-white/70">
                    Get results in seconds, not hours. Our AI processes your images instantly.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="font-bold text-purple-400 mb-2">🎯 Accurate & Relevant</h3>
                  <p className="text-sm text-white/70">
                    AI-generated content that actually makes sense for your images.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="font-bold text-pink-400 mb-2">🔒 Privacy First</h3>
                  <p className="text-sm text-white/70">
                    Your images are processed temporarily and never stored permanently.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="font-bold text-cyan-400 mb-2">📱 Easy to Use</h3>
                  <p className="text-sm text-white/70">
                    Simple drag-and-drop interface. No technical knowledge required.
                  </p>
                </div>
              </div>

              <h2 className="text-3xl font-bold mt-8 mb-4 text-white">How It Works</h2>
              <p>
                Using Caapify is incredibly simple:
              </p>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li>Upload your image by dragging and dropping or clicking to browse</li>
                <li>Our AI analyzes the content, context, and visual elements</li>
                <li>Receive multiple caption options, song suggestions, and trending hashtags</li>
                <li>Copy your favorites and paste them directly into your social media posts</li>
              </ol>

              <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl border border-cyan-500/20">
                <p className="text-center text-white font-medium">
                  Ready to boost your social media game? 
                  <Link href="/" className="text-cyan-400 hover:text-cyan-300 ml-2 underline">
                    Try Caapify Now →
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-white/40 text-sm">
              © 2026 Caapify. All rights reserved. | Made with AI ✨
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
