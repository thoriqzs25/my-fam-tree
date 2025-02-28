import React, { useEffect, useState } from "react";

const Auth = ({ onAuthSuccess, data }) => {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [error, setError] = useState("");
  const [ip, setIp] = useState("Unknown IP")
  const [concurrentAttempt, setAttempt] = useState(1)

  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
    .then((res) => res.json())
    .then((data) => setIp(data.ip))
    .catch(() => setIp("Failed to get IP"));
  }, [])

  const logAttempt = async (username, attempt) => {
    // fetch(
    //   `https://script.google.com/macros/s/AKfycbxmhkub77vMsOOZHpRSOGB5MEZHIYZAOahJFWyz6x37RWVisX6oTXyg8IJxDKD1qv1-gA/exec?username=${encodeURIComponent(
    //     username
    //   )}&attempt=${attempt}&ip=${encodeURIComponent(ip)}`
    // )
    //   .then((res) => res.text())
    //   .then((data) => console.log("Logging Attempt: ", data))
    //   .catch((err) => console.error("Logging Error: ", err));
  };

  const handleLogin = async () => {
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
      const attemptInfo = `SUCCESS ${concurrentAttempt}`
      setError("");

      onAuthSuccess(user);
      logAttempt(user.data["first name"], attemptInfo);
    } else {
      const inputAttempt = `${name} - ${birthYear}`
      const attemptInfo = `FAILED ${concurrentAttempt}`

      setError("Invalid name or birth year. Please try again.");
      await logAttempt(inputAttempt, attemptInfo);

      setAttempt(concurrentAttempt + 1)
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white">
      <h2 className="mb-2">Autentikasi</h2>
      <p className="mb-4">
        "Masukin nama panggilan dan tahun kelahiran Anda"
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
