"use client";
import { useSearchParams } from "next/navigation";

export default function ShowQRReader() {
  const params = useSearchParams();
  const data = params.get("data");

  return <div>Scanned QR data: {data}</div>;
}
