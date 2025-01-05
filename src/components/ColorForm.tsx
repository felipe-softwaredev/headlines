'use client';

import { useState } from 'react';

import { type Config, type Settings, defaultConfig } from '@/App';

import { type SheetFormProps } from './SheetForm';

export default function ColorForm({
  config,
  setConfig,
  isOpen,
  setIsOpen,
}: SheetFormProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [allBright, setAllBright] = useState(false);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
    colorType: 'bgColor' | 'textColor'
  ) => {
    const newColor = event.target.value;
    setConfig((prevConfig: Config) => ({
      ...prevConfig,
      settings: prevConfig.settings.map((color, i) =>
        i === index
          ? {
              ...color,
              [colorType]: newColor,
            }
          : color
      ),
    }));
  };

  const HandleChangeSelect = (
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCategory = event.target.value;
    setConfig((prevConfig: Config) => ({
      ...prevConfig,
      settings: prevConfig.settings.map((setting, i) =>
        i === index ? { ...setting, ['category']: newCategory } : setting
      ),
    }));
  };

  const handleMouseEnter = (index: number) => {
    if (!allBright) {
      setConfig((prevConfig: Config) => ({
        ...prevConfig,
        settings: prevConfig.settings.map((color, i) =>
          i === index
            ? {
                ...color,
                brightness: 'brightness(1)',
              }
            : color
        ),
      }));
    }
  };

  const handleMouseLeave = (index: number) => {
    if (!allBright && activeIndex !== index) {
      setConfig((prevConfig: Config) => ({
        ...prevConfig,
        settings: prevConfig.settings.map((color, i) =>
          i === index
            ? {
                ...color,
                brightness: 'brightness(0.2)',
              }
            : color
        ),
      }));
    }
  };

  const handleFocus = (index: number) => {
    setActiveIndex(index);
    setConfig((prevConfig: Config) => ({
      ...prevConfig,
      settings: prevConfig.settings.map((color, i) =>
        i === index
          ? {
              ...color,
              brightness: 'brightness(1)',
            }
          : color
      ),
    }));
  };

  const handleBlur = (index: number) => {
    setActiveIndex(null);
    if (!allBright && isOpen) {
      setConfig((prevConfig: Config) => ({
        ...prevConfig,
        settings: prevConfig.settings.map((color, i) =>
          i === index
            ? {
                ...color,
                brightness: 'brightness(0.2)',
              }
            : color
        ),
      }));
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setAllBright(isChecked);
    setConfig((prevConfig: Config) => ({
      ...prevConfig,
      settings: prevConfig.settings.map((color) => ({
        ...color,
        brightness: isChecked ? 'brightness(1)' : 'brightness(0.2)',
      })),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedConfig = {
      ...config,
      settings: config.settings.map((color: Settings) => ({
        ...color,
        brightness: 'brightness(1)',
      })),
    };
    setConfig(updatedConfig);
    localStorage.setItem('config', JSON.stringify(updatedConfig));

    setIsOpen(false);
  };

  const handleReset = async () => {
    setConfig(defaultConfig);
    localStorage.setItem('config', JSON.stringify(defaultConfig));

    setIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-1 flex-wrap text-sm items-center pt-5">
      <form className="flex flex-col gap-1" onSubmit={handleSubmit}>
        {config.settings.map(
          (
            settings: {
              bgColor: string;
              textColor: string;
              brightness: string;
              category: string;
            },
            index: number
          ) => {
            return (
              <div
                key={index}
                className="flex flex-col flex-wrap px-1 py-1 gap-1 items-center border border-black rounded shadow hover:scale-105 "
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex">
                    <label>Background</label>
                    <input
                      type="color"
                      id={`bgColor-${index}`}
                      name={`bgColor-${index}`}
                      value={settings.bgColor}
                      onChange={(event) =>
                        handleChange(index, event, 'bgColor')
                      }
                      onFocus={() => handleFocus(index)}
                      onBlur={() => handleBlur(index)}
                      className="border boder-black"
                      autoFocus={false}
                      tabIndex={-1}
                    />

                    <label>Text</label>
                    <input
                      type="color"
                      id={`textColor-${index}`}
                      name={`textColor-${index}`}
                      value={settings.textColor}
                      onChange={(event) =>
                        handleChange(index, event, 'textColor')
                      }
                      onFocus={() => handleFocus(index)}
                      onBlur={() => handleBlur(index)}
                      className="border boder-black"
                      autoFocus={false}
                      tabIndex={-1}
                    />
                  </div>
                  <div
                    style={{
                      backgroundColor: settings.bgColor,
                      color: settings.textColor,
                    }}
                    className="px-10 w-fit self-center rounded "
                  >
                    T
                  </div>
                </div>
                <div>
                  <label>Category:</label>
                  <select
                    defaultValue={settings.category}
                    onChange={(event) => HandleChangeSelect(index, event)}
                  >
                    <option value="business">Business</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="general">General</option>
                    <option value="health">Health</option>
                    <option value="science">Science</option>
                    <option value="sports">Sports</option>
                    <option value="technology">Technology</option>
                  </select>
                </div>
              </div>
            );
          }
        )}
        <div className="flex gap-1 justify-center ">
          <label htmlFor="brightness-toggle">Set default brightness</label>
          <input
            type="checkbox"
            id="brightness-toggle"
            checked={allBright}
            onChange={handleCheckboxChange}
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer border border-black mt-2 shadow-md rounded focus:shadow-none"
        >
          Save changes on Local Storage
        </button>
        <button
          type="button"
          className="cursor-pointer border border-black mt-2 shadow-md rounded focus:shadow-none"
          onClick={handleReset}
        >
          Reset to default
        </button>
      </form>
    </div>
  );
}
