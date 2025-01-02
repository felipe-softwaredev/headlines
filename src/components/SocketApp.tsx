import { useEffect, useState } from 'react';
import Headline from './Headline';

import { socket } from '@/Socket';

import { type Config } from '@/App';

interface NewsArticle {
  id: number;
  data: string;
}

type SocketAppProps = {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
  isOpen: boolean;
  localStorageChange: boolean;
};

const SocketApp = ({
  config,
  setConfig,
  isOpen,
  localStorageChange,
}: SocketAppProps) => {
  const [socketData, setSocketData] = useState<boolean>(false);

  useEffect(() => {
    // const handleNews = (data: []) => {
    //   const newsArr = data.map((value, index) => ({
    //     id: index,
    //     data: value,
    //   }));

    //   setSocketData(newsArr);
    // };

    const handleNews = (data: Config) => {
      setConfig(data);
      setSocketData(true);
      console.log(config);
    };

    // socket.on('connect', () => {
    //   console.log('socket connected!');
    //   const id = uuidv4()
    //   socket.emit(id, uuidv4());
    // });

    // // socket.on('news', handleNews);
    // socket.on('news', (msg) => {
    //   console.log(msg);
    // });

    socket.on('connect', () => {
      console.log('Connected to the server!');

      // Emit the generated userId to the server right after connecting

      // Listen for personalized messages sent to this ID (room)
    });

    // socket.on('news', handleNews);

    socket.emit('assignId', config);

    socket.on('news', handleNews);

    let intervalId: any;

    if (!isOpen) {
      // Start the interval only when isOpen is false
      intervalId = setInterval(() => {
        console.log('interval opened');
        socket.emit('assignId', config);
      }, 5000);
    }

    // Clean up the event listener on unmount
    return () => {
      // socket.off('news', handleNews);
      if (intervalId) {
        console.log('interval cleared');
        clearInterval(intervalId);
      }
    };
  }, [localStorageChange, isOpen]);

  const arr = new Array(6);
  arr.fill(0); // Fills the array with 0s

  return (
    <div className="grid grid-rows-6 h-screen w-full">
      {socketData &&
        config.settings.map((_, index) => (
          <Headline
            id={index}
            key={index}
            settings={config.settings[index]}
            isOpen={isOpen}
          />
        ))}

      {!socketData &&
        arr.map((_, index) => (
          <Headline
            unavailable={true}
            id={index}
            key={index}
            settings={config.settings[index]}
            isOpen={isOpen}
          />
        ))}
    </div>
  );
};

export default SocketApp;
