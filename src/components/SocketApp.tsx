import { useEffect } from 'react';
import Headline from './Headline';

import { socket } from '@/Socket';

import { type Config } from '@/App';

let intervalId: any;

type SocketAppProps = {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
  isOpen: boolean;
};

const SocketApp = ({ config, setConfig, isOpen }: SocketAppProps) => {
  useEffect(() => {
    const handleNews = (data: Config) => {
      setConfig(data);

      console.log(config);
    };

    if (!isOpen) {
      socket.emit('assignId', config);
      socket.on('news', handleNews);
      intervalId = setInterval(() => {
        socket.emit('assignId', config);
      }, 5000);
    }

    return () => {
      socket.off('news', handleNews);
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isOpen]);

  const arr = new Array(6);
  arr.fill(0);

  return (
    <div className="grid grid-rows-6 h-screen w-full">
      {config.settings.map((_, index) => (
        <Headline
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
