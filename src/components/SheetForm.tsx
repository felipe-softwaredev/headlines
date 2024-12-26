import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import ColorForm from './ColorForm';

// const defaultColors = [
//   { bgColor: '#00b3ff', textColor: '#ffffff', brightness: 'brightness(1)' },
//   { bgColor: '#0be6a0', textColor: '#ffffff', brightness: 'brightness(1)' },
//   { bgColor: '#ffc400', textColor: '#ffffff', brightness: 'brightness(1)' },
//   { bgColor: '#ff0037', textColor: '#ffffff', brightness: 'brightness(1)' },
//   { bgColor: '#720ed0', textColor: '#ffffff', brightness: 'brightness(1)' },
//   { bgColor: '#111212', textColor: '#ffffff', brightness: 'brightness(1)' },
// ];

export default function SheetForm({ colors, setColors }: any) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Save colors to localStorage whenever they change
    const br = colors.map((color: any) => color.brightness);
    console.log('on enter:' + br);
    // localStorage.setItem('colors', JSON.stringify(colors));
  }, [colors]);

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      // When sheet is opened, change brightness of each color
      const updatedColors = colors.map((color: any) => ({
        ...color,
        brightness: 'brightness(0.2)', // Update brightness to 0.8
      }));
      setColors(updatedColors);
      console.log(colors);
    } else {
      // Optionally, you can revert brightness or perform any other action when closed
      // console.log('close');
      const resetColors = colors.map((color: any) => ({
        ...color,
        brightness: 'brightness(1)', // Reset brightness to 1 when closed
      }));

      setColors(resetColors);
      console.log(resetColors);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger className="px-2">
        <button onClick={() => setIsOpen(true)} className="flex flex-col z-50">
          <span>O</span>
          <span>P</span>
          <span>E</span>
          <span>N</span>
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="h-auto">
        <SheetHeader>
          <div className="flex justify-between">
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            {/* <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400/70"
            >
              <X size={15} /> */}
            {/* </button> */}
          </div>
          <SheetDescription>This action cannot be undone.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2">
          <ColorForm colors={colors} setColors={setColors} isOpen={isOpen} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
