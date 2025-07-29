"use client";
import { useState, useRef } from "react";
import QRCode from "react-qr-code";

export default function QrGenerator() {
  const [text, setText] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  const qrValue = text
    ? `https://qr-app-1.vercel.app/show?text=${encodeURIComponent(text)}`
    : "default value";

  const handleDownload = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = "qr-code.png";
      downloadLink.click();
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-xl text-center space-y-6 border border-gray-200">
      <h1 className="text-3xl font-bold text-blue-700">QR Code Generator</h1>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text or link here..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {qrValue && (
        <div
          ref={qrRef}
          className="inline-block p-4 bg-gray-100 rounded-lg shadow-md transition-transform hover:scale-105"
        >
          <QRCode value={qrValue} size={200} />
        </div>
      )}

      <button
        onClick={handleDownload}
        disabled={!text}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Download QR Code
      </button>
    </div>
  );
}
