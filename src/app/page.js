import FamilyTree from "./FamilyTree";
import fs from "fs";
import path from "path";
import Theme from "./Theme";

export default function Home() {
  const filePath = path.join(process.cwd(), "data.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex-col justify-center items-center w-full h-[100vh]">
        {/* <button onClick={signIn} className="p-2 bg-blue-500 text-white rounded">
          Sign in with Google
        </button> */}

        <div className="flex-col items-start justify-start p-4 border-b-2 drop-shadow-lg bg-[var(--input-bg)]">
          <p className="font-bold">v0.0.3</p>
          <p className="text-xs mb-2">Last updated: 1 Mar 11.33</p>
          <Theme />
        </div>
        <FamilyTree data={data} />
      </main>
    </div>
  );
}
