"use client";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { motion } from "framer-motion";

export default function QrScanner() {
  const [scannedText, setScannedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [scannerReady, setScannerReady] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const qrRegionId = "reader";

  const startScanner = async () => {
    try {
      const html5QrCode = new Html5Qrcode(qrRegionId);
      scannerRef.current = html5QrCode;

      await html5QrCode.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          setScannedText(decodedText);
          html5QrCode.stop().then(() => {
            html5QrCode.clear();
          });
        },
        (error) => {
          // Optional: console.warn("Scan error", error);
        }
      );

      setScannerReady(true);
    } catch (err) {
      console.error("QR scanner error", err);
    }
  };

  useEffect(() => {
    startScanner();

    return () => {
      scannerRef.current?.stop().then(() => {
        scannerRef.current?.clear();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(scannedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleScanAgain = async () => {
    setScannedText("");
    setCopied(false);
    setScannerReady(false);
    setTimeout(() => {
      startScanner();
    }, 100); // Slight delay to ensure clear
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

        <div
          id={qrRegionId}
          className={`mb-4 rounded overflow-hidden w-full h-[300px] ${
            scannedText ? "opacity-20 pointer-events-none" : ""
          }`}
        />

        {scannedText && (
          <>
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

            <button
              onClick={handleScanAgain}
              className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
            >
              Scan Another
            </button>
          </>
        )}
      </motion.div>
    </div>
  );
}
