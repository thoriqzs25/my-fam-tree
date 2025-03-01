import FamilyTree from "./FamilyTree";
import fs from "fs";
import path from "path";
import Header from "./Header";

export default function Home() {
  const filePath = path.join(process.cwd(), "data.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex-col justify-center items-center w-full h-[100vh]">
        {/* <button onClick={signIn} className="p-2 bg-blue-500 text-white rounded">
          Sign in with Google
        </button> */}

        
       <Header/>
        <FamilyTree data={data} />
      </main>
    </div>
  );
}
