'use client';

import { useState, useEffect } from 'react';

type Colors = {
  bgColor: string;
  textColor: string;
  brightness: string;
}[];

export default function ColorForm({ colors, setColors, isOpen }: any) {
  // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // const [activeInput, setActiveInput] = useState<boolean>(false);
  const [allBright, setAllBright] = useState(false);

  useEffect(() => {
    console.log('mounted');
  }, []);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
    colorType: 'bgColor' | 'textColor'
  ) => {
    const newColor = event.target.value;
    setColors((prevColors: Colors) => {
      const updatedColors = [...prevColors];
      updatedColors[index] = {
        ...updatedColors[index],
        [colorType]: newColor,
      };
      return updatedColors;
    });
  };

  // const handleMouseEnter = (index: number) => {
  //   if (!allBright) {
  //     setHoveredIndex(index);
  //     // console.log('Hoovered Enter: ' + hoveredIndex);
  //     // console.log('Active Enter: ' + activeIndex);
  //     setColors((prevColors: Colors) => {
  //       const updatedColors = [...prevColors];
  //       updatedColors[index] = {
  //         ...updatedColors[index],
  //         brightness: 'brightness(1)',
  //       };
  //       return updatedColors;
  //     });
  //   }
  // };

  const handleMouseEnter = (index: number) => {
    console.log('Active index is (enter): ' + activeIndex);
    if (!allBright) {
      setColors((prevColors: Colors) => {
        const updatedColors = [...prevColors];
        updatedColors[index] = {
          ...updatedColors[index],
          brightness: 'brightness(1)',
        };
        return updatedColors;
      });
    }
  };

  // const handleMouseLeave = (index: number) => {
  //   if (!allBright && activeIndex !== index) {
  //     console.log('left');
  //     // console.log('Hoovered Leave: ' + hoveredIndex);
  //     // console.log('Active Leave: ' + activeIndex);
  //     setHoveredIndex(null);
  //     setColors((prevColors: Colors) => {
  //       const updatedColors = [...prevColors];
  //       updatedColors[index] = {
  //         ...updatedColors[index],
  //         brightness: 'brightness(0.2)',
  //       };
  //       return updatedColors;
  //     });
  //   }
  // };

  const handleMouseLeave = (index: number) => {
    console.log('Active index is (leave): ' + activeIndex);
    console.log(index);
    if (!allBright && activeIndex !== index) {
      console.log('left');
      // console.log('Hoovered Leave: ' + hoveredIndex);
      // console.log('Active Leave: ' + activeIndex);
      // setHoveredIndex(null);
      setColors((prevColors: Colors) => {
        const updatedColors = [...prevColors];
        updatedColors[index] = {
          ...updatedColors[index],
          brightness: 'brightness(0.2)',
        };
        return updatedColors;
      });
    }
  };

  // const handleFocus = (index: number) => {
  //   setActiveIndex(index);
  //   console.log('is focused on' + index);
  //   setColors((prevColors: Colors) => {
  //     const updatedColors = [...prevColors];
  //     updatedColors[index] = {
  //       ...updatedColors[index],
  //       brightness: 'brightness(1)',
  //     };
  //     return updatedColors;
  //   });
  // };

  const handleFocus = (index: number) => {
    console.log('is focused on' + index);
    setActiveIndex(index);
    setColors((prevColors: Colors) => {
      const updatedColors = [...prevColors];
      updatedColors[index] = {
        ...updatedColors[index],
        brightness: 'brightness(1)',
      };
      return updatedColors;
    });
  };

  // const handleBlur = (index: number) => {
  //   setActiveIndex(null);
  //   console.log('blur');
  //   if (hoveredIndex !== index) {
  //     setColors((prevColors: Colors) => {
  //       const updatedColors = [...prevColors];
  //       updatedColors[index] = {
  //         ...updatedColors[index],
  //         brightness: allBright ? 'brightness(1)' : 'brightness(0.2)',
  //       };
  //       return updatedColors;
  //     });
  //   }
  // };

  const handleBlur = (index: number) => {
    setActiveIndex(null);
    console.log('blur on' + index);
    // if (hoveredIndex !== index) {
    if (!allBright && isOpen) {
      setColors((prevColors: Colors) => {
        const updatedColors = [...prevColors];
        updatedColors[index] = {
          ...updatedColors[index],
          brightness: 'brightness(0.2)',
        };
        return updatedColors;
      });
    }

    // }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setAllBright(isChecked);
    setColors((prevColors: Colors) => {
      return prevColors.map((color) => ({
        ...color,
        brightness: isChecked ? 'brightness(1)' : 'brightness(0.2)',
      }));
    });
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
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <label>Select the background color</label>
                <input
                  type="color"
                  id={`bgColor-${index}`}
                  name={`bgColor-${index}`}
                  value={color.bgColor}
                  onChange={(event) => handleChange(index, event, 'bgColor')}
                  onFocus={() => handleFocus(index)}
                  onBlur={() => handleBlur(index)}
                  className=" hover:scale-110"
                  autoFocus={false}
                  tabIndex={-1}
                />

                <label>Select the text color</label>
                <input
                  type="color"
                  id={`textColor-${index}`}
                  name={`textColor-${index}`}
                  value={color.textColor}
                  onChange={(event) => handleChange(index, event, 'textColor')}
                  onFocus={() => handleFocus(index)}
                  onBlur={() => handleBlur(index)}
                  className=" hover:scale-110"
                  autoFocus={false}
                  tabIndex={-1}
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
      <div className="mt-4">
        <label htmlFor="brightness-toggle">Turn all colors to brightness</label>
        <input
          type="checkbox"
          id="brightness-toggle"
          checked={allBright}
          onChange={handleCheckboxChange}
        />
      </div>
    </div>
  );
}
