import Theme from "./Theme";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b-2 drop-shadow-lg bg-[var(--input-bg)]">
      <div className="flex-col flex-1 items-start justify-start">
        <p className="font-bold">v0.0.3</p>
        <p className="text-xs mb-2">Last updated: 1 Mar 11.33</p>
        <Theme />
      </div>
      <div className="flex-col items-center flex-1 justify-center text-center text-3xl font-bold">Koesnandar Family Tree
      </div>
      <div className="flex-col items-start flex-1 justify-start">
      </div>
    </div>
  );
};

export default Header;
