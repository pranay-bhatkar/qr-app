"use client";
import { useSearchParams } from "next/navigation";

export default function ShowTextPage() {
  const searchParams = useSearchParams();
  const text = searchParams.get("text");

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-6 rounded shadow text-center max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Scanned Text</h1>
        {text ? (
          <p className="text-gray-800 text-lg">{decodeURIComponent(text)}</p>
        ) : (
          <p className="text-gray-400">No text found in the QR.</p>
        )}
      </div>
    </main>
  );
}
