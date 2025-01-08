import { useState } from 'react';
import SocketApp from './components/SocketApp';
import './App.css';
import SheetForm from './components/SheetForm';
import { v4 as uuidv4 } from 'uuid';

import { INewsApiArticle } from 'ts-newsapi';

export const defaultConfig = {
  userId: uuidv4(),
  settings: [
    {
      bgColor: '#00b3ff',
      textColor: '#ffffff',
      brightness: 'brightness(1)',
      category: 'general',
      data: null,
    },
    {
      bgColor: '#0be6a0',
      textColor: '#ffffff',
      brightness: 'brightness(1)',
      category: 'general',
      data: null,
    },
    {
      bgColor: '#ffc400',
      textColor: '#ffffff',
      brightness: 'brightness(1)',
      category: 'general',
      data: null,
    },
    {
      bgColor: '#ff0037',
      textColor: '#ffffff',
      brightness: 'brightness(1)',
      category: 'general',
      data: null,
    },
    {
      bgColor: '#720ed0',
      textColor: '#ffffff',
      brightness: 'brightness(1)',
      category: 'general',
      data: null,
    },
    {
      bgColor: '#111212',
      textColor: '#ffffff',
      brightness: 'brightness(1)',
      category: 'general',
      data: null,
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
  data: null | INewsApiArticle;
};

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const [config, setConfig] = useState<Config>(() => {
    const savedConfig = localStorage.getItem('config');
    if (savedConfig) {
      return JSON.parse(savedConfig);
    } else {
      localStorage.setItem('config', JSON.stringify(defaultConfig));
      return defaultConfig;
    }
  });

  return (
    <div className="flex h-svh max-h-svh">
      <SocketApp config={config} setConfig={setConfig} isOpen={isOpen} />

      <SheetForm
        config={config}
        setConfig={setConfig}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </div>
  );
}

export default App;
