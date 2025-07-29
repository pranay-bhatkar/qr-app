"use client";
import { useSearchParams } from "next/navigation";

export default function ShowQRReader() {
  const params = useSearchParams();
  const text = params.get("text"); // ← use "text", not "data"

  return (
    <div className="text-center mt-10 text-xl font-semibold">
      Scanned QR Code Data: <span className="text-blue-600">{text ?? "No text found"}</span>
    </div>
  );
}
