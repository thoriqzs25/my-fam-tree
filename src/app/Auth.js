import React, { useState } from "react";
import data from "../../data.json";

const Auth = ({ onAuthSuccess }) => {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    let user = data.find(
      (person) =>
        person.data["first name"].toLowerCase() === name.toLowerCase() &&
        person.data.birthday.toString() === birthYear
    );

    if (!user) {
      user = data.find(
        (person) =>
          person.data["first name"]
            .toLowerCase()
            .includes(name.toLowerCase()) &&
          person.data.birthday.toString() === birthYear
      );
    }

    if (user) {
      setError("");
      onAuthSuccess(user);
    } else {
      setError("Invalid name or birth year. Please try again.");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white">
      <h2 className="mb-2">Autentikasi</h2>
      <p className="mb-4">
        "masukin nama yang didaftarin atau tanya kakak Gita"
      </p>
      <input
        type="text"
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2 p-2 text-black"
        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
      />
      <input
        type="text"
        placeholder="Tahun Lahir"
        value={birthYear}
        onChange={(e) => setBirthYear(e.target.value)}
        className="mb-2 p-2 text-black"
        onKeyDown={(e) => e.key === "Enter" && handleLogin()}
      />
      <button onClick={handleLogin} className="p-2 bg-blue-500 text-white">
        Login
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Auth;
