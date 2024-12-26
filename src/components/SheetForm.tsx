import { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

import { ChevronLeft } from 'lucide-react';

import { ChevronRight } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
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

  const divRef = useRef(null);
  const polygonRef = useRef(null);

  const handleMouseEnter = () => {
    if (divRef.current) {
      divRef.current.classList.add('!bg-red-500');
    }
    if (polygonRef.current) {
      polygonRef.current.classList.add('!fill-red-500');
    }
  };

  // Handler for mouse leave event
  const handleMouseLeave = () => {
    if (divRef.current) {
      divRef.current.classList.remove('!bg-red-500');
    }
    if (polygonRef.current) {
      polygonRef.current.classList.remove('!fill-red-500');
    }
  };

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
      <div
        // className={`${
        //   !isOpen ? 'w-1.5 hover:shadow-lg !bg-white/20 rounded' : ''
        // } `}
        className="test-div w-1.5"
        ref={divRef}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        // onClick={() => setIsOpen(true)}
      ></div>
      <SheetTrigger className=" absolute right-0  top-1/2 -translate-y-1/2 !w-fit !h-fit flex">
        {!isOpen && (
          <svg width="110" height="80" viewBox="0 0 45 40" className="-mr-1">
            <polygon
              points="45,0 38,20 45,40"
              onClick={() => setIsOpen(true)}
              className="fill-white cursor-pointer border"
              ref={polygonRef}
              // onMouseEnter={handleMouseEnter}
              // onMouseLeave={handleMouseLeave}
            />
          </svg>
        )}
      </SheetTrigger>

      {isOpen && (
        <button onClick={() => setIsOpen(false)} className="flex flex-col z-50">
          <ChevronRight className="p-0 m-0 w-fit flex" />
        </button>
      )}

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
