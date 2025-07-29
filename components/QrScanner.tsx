"use client";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

export default function QrScanner() {
  const [scannedText, setScannedText] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false // <- third argument
    );

    scanner.render(
      (decodedText, decodedResult) => {
        console.log("Decoded:", decodedText);
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

  return (
    <div className="p-4 max-w-xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">QR Code Scanner</h1>
      <div id="reader" className="mb-4" />
      {scannedText && (
        <div className="p-4 bg-green-100 rounded">
          <strong>Scanned Text:</strong> {scannedText}
        </div>
      )}
    </div>
  );
}
