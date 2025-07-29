"use client";
import { useState, useRef } from "react";
import QRCode from "react-qr-code";

export default function QrGenerator() {
  const [text, setText] = useState("");
  const qrRef = useRef<HTMLDivElement>(null);

  // Replace with your actual deployed domain later
  const qrValue = text
    ? `http://localhost:3000/show?text=${encodeURIComponent(text)}`
    : "";

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
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow text-center">
      <div>
        <h1 className="text-2xl font-bold mb-4">QR Code Generator</h1>

        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to encode"
          className="w-full p-2 border rounded mb-4"
        />

        {qrValue && (
          <div ref={qrRef} className="inline-block p-4 bg-gray-100 rounded">
            <QRCode value={qrValue} size={200} />
          </div>
        )}
      </div>

      <button
        onClick={handleDownload}
        disabled={!text}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Download QR
      </button>
    </div>
  );
}
