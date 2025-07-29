import QrGenerator from "@/components/QrGenerator";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-100 p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">QR Code Generator</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Enter text and generate a QR code instantly!
        </p>
      </div>

      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 transition-all duration-300 border border-gray-100">
        <QrGenerator />
      </div>

      <footer className="mt-10 text-sm text-gray-500">
        Made with ❤️ by <a href="https://yourportfolio.com" className="text-blue-500 hover:underline">Your Name</a>
      </footer>
    </main>
  );
}
