"use client";
import { useSearchParams } from "next/navigation";

export default function ShowQRReader() {
  const params = useSearchParams();
  const data = params.get("data");

  return <div className="text-2xl text-white bg-red-100 ">Scanned QR data: {data}</div>;
}
