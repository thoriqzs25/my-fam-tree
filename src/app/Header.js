import Theme from "./Theme";

const Header = () => {
  return (
    <>
      <div className="hidden sm:block fixed w-full">
        <Desktop />
      </div>
      <div className="block sm:hidden fixed w-full">
        <Mobile />
      </div>
    </>
  );
};

const Desktop = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b-2 drop-shadow-lg bg-[var(--input-bg)]">
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
    <div className="flex-col justify-between items-center p-4 border-b-2 drop-shadow-lg bg-[var(--input-bg)]">
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
