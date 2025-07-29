"use client";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaCheck, FaCopy } from "react-icons/fa";

export default function ShowQRReader() {
  const params = useSearchParams();
  const router = useRouter();
  const text = params.get("text");

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (text) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <motion.div
        className="bg-white shadow-lg rounded-xl p-6 max-w-xl w-full text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          🎉 Scanned QR Code Result
        </h1>

        <p className="text-gray-600 mb-6">
          Here is the data extracted from your QR Code:
        </p>

        <div className="bg-gray-100 rounded p-4 mb-4 text-blue-600 font-mono break-words text-lg">
          {text ?? "No text found"}
        </div>

        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            disabled={!text}
          >
            {copied ? (
              <>
                <FaCheck className="text-green-300" /> Copied!
              </>
            ) : (
              <>
                <FaCopy /> Copy Text
              </>
            )}
          </button>

          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
          >
            <FaArrowLeft /> Back
          </button>
        </div>
      </motion.div>
    </main>
  );
}
