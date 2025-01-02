import { useState } from 'react';
import SocketApp from './components/SocketApp';
import './App.css';
import SheetForm from './components/SheetForm';
import { v4 as uuidv4 } from 'uuid';

// Define defaultConfig outside the App component for export
export const defaultConfig = {
  userId: uuidv4(),
  settings: [
    {
      bgColor: '#00b3ff',
      textColor: '#ffffff',
      brightness: 'brightness(1)',
      category: 'general',
      data: {},
    },
    {
      bgColor: '#0be6a0',
      textColor: '#ffffff',
      brightness: 'brightness(1)',
      category: 'general',
      data: {},
    },
    {
      bgColor: '#ffc400',
      textColor: '#ffffff',
      brightness: 'brightness(1)',
      category: 'general',
      data: {},
    },
    {
      bgColor: '#ff0037',
      textColor: '#ffffff',
      brightness: 'brightness(1)',
      category: 'general',
      data: {},
    },
    {
      bgColor: '#720ed0',
      textColor: '#ffffff',
      brightness: 'brightness(1)',
      category: 'general',
      data: {},
    },
    {
      bgColor: '#111212',
      textColor: '#ffffff',
      brightness: 'brightness(1)',
      category: 'general',
      data: {},
    },
  ],
};

export type Config = {
  userId: string;
  settings: Settings[];
};

export type Settings = {
  bgColor: string;
  textColor: string;
  brightness: string;
  category: string;
  data: any;
};

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [localStorageChange, setLocalStorageChange] = useState<boolean>(false);

  const [config, setConfig] = useState<Config>(() => {
    const savedColors = localStorage.getItem('config');
    if (savedColors) {
      return JSON.parse(savedColors);
    } else {
      localStorage.setItem('config', JSON.stringify(defaultConfig));
      return defaultConfig;
    }
  });

  return (
    <div className="flex h-screen">
      <SocketApp
        config={config}
        setConfig={setConfig}
        isOpen={isOpen}
        localStorageChange={localStorageChange}
      />

      <SheetForm
        config={config}
        setConfig={setConfig}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setLocalStorageChange={setLocalStorageChange}
      />
    </div>
  );
}

export default App;
