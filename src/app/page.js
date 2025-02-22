import Image from "next/image";
import FamilyTree from "./FamilyTree";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex items-center w-full h-[100vh]">
        <FamilyTree />
      </main>
    </div>
  );
}
