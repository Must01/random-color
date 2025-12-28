import { useEffect, useState } from "react";

export default function RandomColour() {
  const [type, setType] = useState<string>("hex");
  const [color, setColor] = useState<string>("#e00");

  function handleCreateRandomRgbColor() {
    let rr = Math.floor(Math.random() * 255);
    let gg = Math.floor(Math.random() * 255);
    let bb = Math.floor(Math.random() * 255);

    setColor(`rgb(${rr},${gg},${bb})`);
  }

  function handleCreateRandomHexColor() {
    let hex: any[] = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];
    let color: string = "#";

    for (let i = 0; i < 6; i++) {
      const random = Math.floor(Math.random() * hex.length);
      color += hex[random];
    }

    setColor(color);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(color);
      alert(`Copied ${color} to clipboard!`);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  }

  useEffect(() => {
    type == "hex" ? handleCreateRandomHexColor() : handleCreateRandomRgbColor();
  }, [type]);

  return (
    <div
      style={{ background: color }}
      className="min-h-screen  p-5 flex items-center flex-col w-full text-white"
    >
      <div className="flex font-semibold uppercase space-x-2 bg-white shadow-md hover:scale-101 duration-300 ease-in-out rounded-md text-black flex p-2">
        <button
          onClick={() => setType("hex")}
          className={`${
            type == "hex" ? "bg-gray-200  text-gray-700" : "bg-white"
          }  hover:shadow-md active:scale-95 border hover:scale-105 cursor-pointer duration-200 easy-in-out rounded-md py-1 px-3 text-gray-800`}
        >
          hex color
        </button>
        <button
          onClick={() => setType("rgb")}
          className={`${
            type == "rgb" ? "bg-gray-200 text-gray-700" : "bg-white"
          } hover:shadow-md active:scale-95  border hover:scale-105 cursor-pointer duration-200 easy-in-out rounded-md py-1 px-3 text-gray-800`}
        >
          rgb color
        </button>
        <button
          onClick={
            type == "hex"
              ? () => handleCreateRandomHexColor()
              : () => handleCreateRandomRgbColor()
          }
          className=" hover:shadow-md active:scale-95 hover:scale-105 cursor-pointer duration-200 easy-in-out border border-black rounded-md py-1 px-3 text-gray-800"
        >
          Generate Random color
        </button>
      </div>
      <div className="flex-1 flex items-center font-bold text-4xl uppercase">
        <h1>{color}</h1>
        <svg
          role="button"
          aria-label="copy-icon"
          onClick={() => handleCopy()}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 cursor-pointer m-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z"
          />
        </svg>
      </div>
      <div>
        Made with 💖 By{" "}
        <a href="https://mustaphabouddahr.netlify.app">Mustapha Bouddahr</a>
      </div>
    </div>
  );
}
