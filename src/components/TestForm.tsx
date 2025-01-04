'use client';

import { useState } from 'react';

export default function TestForm({ colors, setColors }: any) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [allBright, setAllBright] = useState(false);

  type Colors = {
    bgColor: string;
    textColor: string;
    brightness: string;
  }[];

  const handleFocus = (index: number) => {
    setActiveIndex(index);
    console.log('is focused on' + index);
    // setColors((prevColors: Colors) => {
    //   const updatedColors = [...prevColors];
    //   updatedColors[index] = {
    //     ...updatedColors[index],
    //     brightness: 'brightness(1)',
    //   };
    //   return updatedColors;
    // });
  };

  const handleBlur = (index: number) => {
    setActiveIndex(null);
    console.log('lost focus on ' + index);
    // if (hoveredIndex !== index) {
    //   setColors((prevColors: Colors) => {
    //     const updatedColors = [...prevColors];
    //     updatedColors[index] = {
    //       ...updatedColors[index],
    //       brightness: allBright ? 'brightness(1)' : 'brightness(0.2)',
    //     };
    //     return updatedColors;
    //   });
    // }
  };

  return (
    <div>
      <form>
        {colors.map(
          (
            color: { bgColor: string; textColor: string; brightness: string },
            index: number
          ) => {
            return (
              <div
                key={index}
                className="flex items-center space-x-4 my-2 border border-black rounded shadow hover:scale-105"
              >
                <label>Select the background color</label>
                <input
                  type="color"
                  id={`bgColor-${index}`}
                  name={`bgColor-${index}`}
                  value={color.bgColor}
                  onFocus={() => handleFocus(index)}
                  onBlur={() => handleBlur(index)}
                  className="cursor-pointer hover:scale-110"
                />

                <label>Select the text color</label>
                <input
                  type="color"
                  id={`textColor-${index}`}
                  name={`textColor-${index}`}
                  value={color.textColor}
                  onFocus={() => handleFocus(index)}
                  onBlur={() => handleBlur(index)}
                  className="cursor-pointer hover:scale-110"
                />

                <div
                  style={{
                    backgroundColor: color.bgColor,
                    color: color.textColor,
                  }}
                  className="p-4"
                >
                  Hello
                </div>
              </div>
            );
          }
        )}
      </form>
    </div>
  );
}
