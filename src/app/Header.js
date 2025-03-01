import { useState } from "react";
import Theme from "./Theme";

const Header = ({ isCircle, setCircle }) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <div
        className={`fixed w-full top-0 z-50 transition-transform duration-300 ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <div className="hidden sm:block">
          <Desktop />
        </div>
        <div className="block sm:hidden">
          <Mobile />
        </div>
      </div>

      <div className="fixed bottom-6 right-6 flex flex-col justify-end gap-1 z-50">
        <button
          onClick={() => setIsVisible(!isVisible)}
          className={`p-2 shadow-lg transition-all duration-300 rounded-full ${
            isVisible
              ? "bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-[var(--button-hover)]"
              : "bg-gray-600 text-white opacity-70 hover:opacity-100"
          }`}
        >
          {isVisible ? "▲ Hide" : "▼ Show"}
        </button>

        <button
          onClick={() => setCircle(!isCircle)}
          className={`p-2 shadow-lg transition-all duration-300 rounded-full ${
            isCircle
              ? "bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-[var(--button-hover)]"
              : "bg-gray-600 text-white opacity-70 hover:opacity-100"
          }`}
        >
          {!isCircle ? "⬛ Square" : "⚫ Circle"}
        </button>
      </div>
    </>
  );
};

const Desktop = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b-2 drop-shadow-lg bg-[var(--input-bg)] transition-all duration-300">
      <div className="flex-col flex-1 items-start justify-start">
        <Version />
        <Theme />
      </div>
      <div className="flex-col items-center flex-1 justify-center text-center text-3xl font-bold">
        Koesnandar Family Tree
      </div>
      <div className="flex-col items-start flex-1 justify-start"></div>
    </div>
  );
};

const Mobile = () => {
  return (
    <div className="flex-col justify-between items-center p-4 border-b-2 drop-shadow-lg bg-[var(--input-bg)] transition-all duration-300">
      <div className="flex flex-1 items-start justify-between">
        <Version />
        <Theme />
      </div>
      <div className="flex-col items-center flex-1 justify-center text-center text-3xl font-bold">
        Koesnandar Family Tree
      </div>
      <div className="flex-col items-start flex-1 justify-start"></div>
    </div>
  );
};

const Version = () => {
  return (
    <div>
      <p className="font-bold">v0.0.4</p>
      <p className="text-xs mb-2">Last updated: 01 Mar 14.12</p>
    </div>
  );
};

export default Header;
