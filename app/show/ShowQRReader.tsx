import { Suspense } from "react";
import ShowQRReader from "./ShowQRReader";

export default function ShowPage() {
  return (
    <main className="p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <ShowQRReader />
      </Suspense>
    </main>
  );
}
