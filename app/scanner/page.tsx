import QrScanner from "@/components/QrScanner";
import Link from "next/link";

export default function ScannerPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <QrScanner />
      <Link href="/" className="text-blue-600 mt-6 underline">
        ← Back to Generator
      </Link>
    </main>
  );
}
