import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { X } from 'lucide-react';

import ColorForm from './ColorForm';
import { useState, useEffect } from 'react';

const defaultColors = [
  { bgColor: '#00b3ff', textColor: '#ffffff', brightness: 'brightness(1)' },
  { bgColor: '#0be6a0', textColor: '#ffffff', brightness: 'brightness(1)' },
  { bgColor: '#ffc400', textColor: '#ffffff', brightness: 'brightness(1)' },
  { bgColor: '#ff0037', textColor: '#ffffff', brightness: 'brightness(1)' },
  { bgColor: '#720ed0', textColor: '#ffffff', brightness: 'brightness(1)' },
  { bgColor: '#111212', textColor: '#ffffff', brightness: 'brightness(1)' },
];

export default function DrawerForm({ colors, setColors }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      // When drawer is opened, change brightness of each color
      const updatedColors = colors.map((color: any) => ({
        ...color,
        brightness: 'brightness(0.2)', // Update brightness to 0.8
      }));
      setColors(updatedColors);
    } else {
      // Optionally, you can revert brightness or perform any other action when closed
      const resetColors = colors.map((color: any) => ({
        ...color,
        brightness: 'brightness(1)', // Reset brightness to 1 when closed
      }));
      setColors(resetColors);
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger>
        <button onClick={() => setIsOpen(true)}>Open</button>
      </DrawerTrigger>

      <DrawerContent className="h-auto">
        <DrawerClose
          className="my-2 absolute right-0 mx-2 text-sm text-slate-400/70"
          onClick={() => setIsOpen(false)}
        >
          <button>
            <X size={15} />
          </button>
        </DrawerClose>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-2">
          <ColorForm colors={colors} setColors={setColors} />
        </div>
        <DrawerFooter>
          <button onClick={() => setIsOpen(false)}>Submit</button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
