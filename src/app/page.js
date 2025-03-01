import fs from "fs";
import path from "path";
import Content from "./Content";

export default function Home() {
  const filePath = path.join(process.cwd(), "data.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex-col justify-center items-center w-full h-[100vh]">
        <Content data={data}/>
      </main>
    </div>
  );
}
