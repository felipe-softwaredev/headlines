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

export default function SheetForm({ colors, setColors }: any) {
  const [isOpen, setIsOpen] = useState(false);

  const divRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const drawTriangle = (opacity: number = 0.4) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`; // Set the fill color with opacity
        ctx.beginPath();
        ctx.moveTo(18, 0); // Top-right point
        ctx.lineTo(0, 30); // Middle-left point
        ctx.lineTo(18, 60); // Bottom-right point
        ctx.closePath();
        ctx.fill(); // Fill the triangle
      }
    }
  };

  useEffect(() => {
    drawTriangle();
    if (!isOpen && divRef.current) {
      divRef.current.classList.remove('bg-opacity-100'); // Remove low opacity class
      divRef.current.classList.add('bg-opacity-40'); // Add full opacity class
    }
  }, [isOpen]); // Trigger re-drawing when the `isOpen` state changes

  useEffect(() => {
    isHovered ? drawTriangle(1) : drawTriangle(0.4);
  }, [isHovered]); // Trigger re-drawing when the `isOpen` state changes

  const handleMouseEnter = () => {
    drawTriangle(1); // Change opacity to 1 for the triangle
    setIsHovered(true);
    if (divRef.current) {
      // divRef.current.style.backgroundColor = 'red'; // Reset div opacity to 0.4
      // console.log('hovered');
      // divRef.current.style.opacity = '0.8';
      // divRef.current.style.opacity = '1'; // Set div opacity to 1
      divRef.current.classList.remove('bg-opacity-40'); // Remove low opacity class
      divRef.current.classList.add('bg-opacity-100'); // Add full opacity class
    }
  };

  const handleMouseLeave = () => {
    drawTriangle(0.4); // Reset opacity to 0.4 for the triangle
    setIsHovered(false);
    if (divRef.current) {
      // divRef.current.style.opacity = '0.4';

      // divRef.current.style.backgroundColor = 'white'; // Reset div opacity to 0.4
      divRef.current.classList.remove('bg-opacity-100'); // Remove low opacity class
      divRef.current.classList.add('bg-opacity-40'); // Add full opacity class
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    setIsHovered(false);
    const updatedColors = colors.map((color: any) => ({
      ...color,
      brightness: open ? 'brightness(0.2)' : 'brightness(1)', // Adjust brightness based on open state
    }));
    setColors(updatedColors);
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
                    // onClick={() => setIsOpen(true)}
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
                      scale: [1, 1.3, 1], // Scales down, then up, and back to normal
                    }}
                    // initial={{
                    //   top: '50%', // Ensures top remains consistent
                    //   translateY: '-50%', // Keeps translate-y intact
                    // }}
                    transition={{
                      duration: 1, // Total time for the animation
                      repeat: Infinity, // Repeats the animation infinitely
                      ease: 'linear', // Smooth easing for the animation
                    }}
                    // onClick={() => setIsOpen(true)}
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

        <SheetContent side="right" className="h-auto  ">
          <div className="absolute left-0 top-1/2 -translate-y-1/2    w-2 h-fit    z-50 flex justify-center items-center ">
            <SheetClose>
              <div className="bg-white py-3 px-2 rounded-full mr-2">
                <div className="w-2 bg-gray-300/80 h-20 rounded-md"></div>
              </div>
            </SheetClose>
          </div>
          <div>
            <div>
              <SheetHeader>
                <div className="flex justify-between">
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                </div>
                <SheetDescription>
                  This action cannot be undone.
                </SheetDescription>
              </SheetHeader>
            </div>
            <div className="flex flex-col gap-2">
              <ColorForm
                colors={colors}
                setColors={setColors}
                isOpen={isOpen}
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
