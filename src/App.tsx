import SocketApp from './components/SocketApp';
import './App.css';

// import DrawerForm from './components/DrawerForm';

import { useState, useEffect } from 'react';

import SheetForm from './components/SheetForm';

import TestForm from './components/TestForm';

function App() {
  const defaultColors = [
    { bgColor: '#00b3ff', textColor: '#ffffff', brightness: 'brightness(1)' },
    { bgColor: '#0be6a0', textColor: '#ffffff', brightness: 'brightness(1)' },
    { bgColor: '#ffc400', textColor: '#ffffff', brightness: 'brightness(1)' },
    { bgColor: '#ff0037', textColor: '#ffffff', brightness: 'brightness(1)' },
    { bgColor: '#720ed0', textColor: '#ffffff', brightness: 'brightness(1)' },
    { bgColor: '#111212', textColor: '#ffffff', brightness: 'brightness(1)' },
  ];

  // Initialize colors from localStorage or use default values
  // const [colors, setColors] = useState(() => {
  //   const savedColors = localStorage.getItem('colors');
  //   return savedColors ? JSON.parse(savedColors) : defaultColors;
  // });

  const [colors, setColors] = useState(defaultColors);

  // This useEffect will run whenever any color in the array changes

  return (
    <div className=" flex h-screen">
      <SocketApp colors={colors} />
      {/* <DrawerForm colors={colors} setColors={setColors} /> */}
      <SheetForm colors={colors} setColors={setColors} />
      {/* <TestForm colors={colors} /> */}
    </div>
  );
}

export default App;
