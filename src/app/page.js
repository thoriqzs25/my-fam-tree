"use client";

import Image from "next/image";
import FamilyTree from "./FamilyTree";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import data from "../../data.json";
import Auth from "./Auth";
import { useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyAToz2BC4Vqeb229ZDp9Z1U04c1vS1poSk",
  authDomain: "my-fam-tree-e39cb.firebaseapp.com",
  projectId: "my-fam-tree-e39cb",
  storageBucket: "my-fam-tree-e39cb.firebasestorage.app",
  messagingSenderId: "304045015318",
  appId: "1:304045015318:web:b6bc0cfbf0a860b1df1037",
  measurementId: "G-Z819VW6ERJ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export default function Home() {
  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        console.log(user, "user");
        console.log(credential, "credential");
        console.log(token, "token");
      })
      .catch((error) => {
        console.log(error, "error");
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div className="items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex justify-center items-center w-full h-[100vh]">
        {/* <button onClick={signIn} className="p-2 bg-blue-500 text-white rounded">
          Sign in with Google
        </button> */}
        <p className="absolute left-4 top-4">v0.0.1</p>
        <FamilyTree data={data} />
      </main>
    </div>
  );
}
