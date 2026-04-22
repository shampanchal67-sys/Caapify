import Link from "next/link";
import { motion } from "framer-motion";

export default function Privacy() {
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
              <Link href="/about" className="text-white/80 hover:text-white transition-colors font-medium">
                About
              </Link>
              <Link href="/privacy" className="text-white transition-colors font-medium">
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
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-white/60 mb-8">Last updated: January 2026</p>

            <div className="space-y-6 text-white/80 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold mb-3 text-white">1. Introduction</h2>
                <p>
                  Welcome to Caapify. We respect your privacy and are committed to protecting your 
                  personal data. This privacy policy will inform you about how we handle your data 
                  when you use our service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3 text-white">2. Information We Collect</h2>
                <p className="mb-3">When you use Caapify, we may collect the following information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Images:</strong> Photos you upload for processing</li>
                  <li><strong>Usage Data:</strong> Information about how you interact with our service</li>
                  <li><strong>Device Information:</strong> Browser type, IP address, and device identifiers</li>
                  <li><strong>Cookies:</strong> Small files stored on your device for functionality and analytics</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3 text-white">3. How We Use Your Information</h2>
                <p className="mb-3">We use the collected information for:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Processing your images to generate captions, songs, and hashtags</li>
                  <li>Improving our AI algorithms and service quality</li>
                  <li>Analyzing usage patterns to enhance user experience</li>
                  <li>Communicating with you about service updates</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3 text-white">4. Image Storage and Processing</h2>
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 mb-4">
                  <p className="font-semibold text-cyan-400">🔒 Important Privacy Notice:</p>
                  <p className="mt-2">
                    Your uploaded images are processed temporarily and are NOT stored permanently 
                    on our servers. Images are deleted immediately after processing is complete.
                  </p>
                </div>
                <p>
                  We take image privacy seriously. Your photos are processed in real-time and 
                  removed from our systems within minutes of upload. We do not build a database 
                  of user images.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3 text-white">5. Third-Party Services</h2>
                <p className="mb-3">We use the following third-party services:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Google AdSense:</strong> We use Google AdSense to display advertisements. 
                    Google may use cookies to serve personalized ads based on your browsing history. 
                    You can opt out of personalized advertising by visiting 
                    <a href="https://www.google.com/settings/ads" className="text-cyan-400 hover:text-cyan-300 ml-1" target="_blank" rel="noopener noreferrer">
                      Google Ad Settings
                    </a>.
                  </li>
                  <li>
                    <strong>Analytics:</strong> We may use analytics services to understand how users 
                    interact with our website.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3 text-white">6. Cookies</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our service. 
                  Cookies are files with a small amount of data which may include an anonymous unique 
                  identifier. You can instruct your browser to refuse all cookies or to indicate when 
                  a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3 text-white">7. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your 
                  personal data against unauthorized or unlawful processing, accidental loss, 
                  destruction, or damage. However, no method of transmission over the internet 
                  is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3 text-white">8. Your Rights</h2>
                <p className="mb-3">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your personal data</li>
                  <li>Request correction of your personal data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing your personal data</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3 text-white">9. Children's Privacy</h2>
                <p>
                  Our service is not intended for children under 13 years of age. We do not 
                  knowingly collect personal information from children under 13. If you are a 
                  parent or guardian and believe your child has provided us with personal data, 
                  please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3 text-white">10. Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any 
                  changes by posting the new Privacy Policy on this page and updating the "Last 
                  updated" date at the top of this policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3 text-white">11. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10">
                  <p>Email: shampanchal66@gmail.com</p>
                  <p className="mt-2">
                    Or visit our{" "}
                    <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 underline">
                      Contact Page
                    </Link>
                  </p>
                </div>
              </section>

              <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl border border-purple-500/20">
                <p className="text-sm text-white/70 text-center">
                  By using Caapify, you agree to the collection and use of information in accordance 
                  with this Privacy Policy.
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
