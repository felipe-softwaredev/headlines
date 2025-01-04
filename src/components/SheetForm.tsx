import { useState, useEffect, useRef } from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
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

import { type Config } from '@/App';

export type SheetFormProps = {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SheetForm({
  config,
  setConfig,
  isOpen,
  setIsOpen,
}: SheetFormProps) {
  const divRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const drawTriangle = (opacity: number = 0.4) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.moveTo(18, 0);
        ctx.lineTo(0, 30);
        ctx.lineTo(18, 60);
        ctx.closePath();
        ctx.fill();
      }
    }
  };

  useEffect(() => {
    drawTriangle();
    if (!isOpen && divRef.current) {
      divRef.current.classList.remove('bg-opacity-100');
      divRef.current.classList.add('bg-opacity-40');
    }
  }, [isOpen]);

  useEffect(() => {
    isHovered ? drawTriangle(1) : drawTriangle(0.4);
  }, [isHovered]);

  const handleMouseEnter = () => {
    drawTriangle(1);
    setIsHovered(true);
    if (divRef.current) {
      divRef.current.classList.remove('bg-opacity-40');
      divRef.current.classList.add('bg-opacity-100');
    }
  };

  const handleMouseLeave = () => {
    drawTriangle(0.4);
    setIsHovered(false);
    if (divRef.current) {
      divRef.current.classList.remove('bg-opacity-100');
      divRef.current.classList.add('bg-opacity-40');
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    setIsHovered(false);
    setConfig((prevConfig: Config) => ({
      ...prevConfig,
      settings: prevConfig.settings.map((color) => ({
        ...color,
        brightness: open ? 'brightness(0.2)' : 'brightness(1)',
      })),
    }));
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetTrigger
          className="absolute right-0 top-1/2 -translate-y-1/2 !w-fit !h-fit flex z-50 pr-3 group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {!isOpen && (
            <div className="relative ">
              {!isHovered && (
                <>
                  {' '}
                  <canvas
                    ref={canvasRef}
                    width="22"
                    height="60"
                    className="cursor-pointer  -mr-1  "
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 text-slate-500/50 ">
                    <ChevronLeft />
                  </div>
                </>
              )}

              {isHovered && (
                <>
                  <motion.canvas
                    ref={canvasRef}
                    width="22"
                    height="60"
                    className="cursor-pointer  -mr-1"
                    animate={{
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 text-slate-500/50 "
                    animate={{
                      x: [0, -4, 0],
                      color: ['#3b82f6'],
                    }}
                    initial={{
                      top: '50%',
                      translateY: '-50%',
                      color: '#64748b',
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <ChevronLeft strokeWidth={4} />
                  </motion.div>
                </>
              )}
            </div>
          )}
        </SheetTrigger>

        <SheetContent side="right" className="h-auto ">
          <div className="absolute left-0 top-1/2 -translate-y-1/2    w-2 h-fit    z-50 flex justify-center items-center ">
            <SheetClose>
              <div className="bg-white py-3 px-2 rounded-full mr-2">
                <div className="w-2 bg-gray-300/80 h-20 rounded-md"></div>
              </div>
            </SheetClose>
          </div>
          <div>
            <div className="hidden">
              <SheetHeader>
                <div className="flex justify-between">
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                </div>
                <SheetDescription>
                  This action cannot be undone.
                </SheetDescription>
              </SheetHeader>
            </div>
            <div className=" ">
              <ColorForm
                config={config}
                setConfig={setConfig}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      {!isOpen && (
        <div
          className="test-div w-3 bg-white bg-opacity-40 z-10 fixed right-0 h-screen  "
          ref={divRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        ></div>
      )}
    </>
  );
}
