"use client";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { motion } from "framer-motion";

export default function QrScanner() {
  const [scannedText, setScannedText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      (decodedText) => {
        setScannedText(decodedText);
      },
      (error) => {
        console.warn("QR Code scan error:", error);
      }
    );

    return () => {
      scanner.clear().catch((error) => {
        console.error("Failed to clear scanner", error);
      });
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(scannedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl"
      >
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          QR Code Scanner
        </h1>
        <div id="reader" className="mb-4 rounded overflow-hidden" />

        {scannedText && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-green-100 text-green-800 font-medium p-4 rounded-lg flex justify-between items-center"
          >
            <span className="break-all">{scannedText}</span>
            <button
              onClick={handleCopy}
              className="ml-4 text-blue-600 hover:text-blue-800 transition"
              title="Copy to clipboard"
            >
              <FaRegCopy className="text-xl" />
            </button>
          </motion.div>
        )}

        {copied && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-green-600 text-center mt-2"
          >
            Text copied to clipboard!
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
