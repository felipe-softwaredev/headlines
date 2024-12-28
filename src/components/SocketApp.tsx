import { useEffect, useState } from 'react';
import Headline from './Headline';
import { io, Socket } from 'socket.io-client';

interface NewsArticle {
  id: number;
  data: string;
}

const socket: Socket = io(import.meta.env.VITE_APP_URL as string);

const SocketApp = ({ colors }: any) => {
  const [socketData, setSocketData] = useState<NewsArticle[] | null>(null);

  useEffect(() => {
    const handleNews = (data: string[]) => {
      const newsArr = data.map((value, index) => ({
        id: index,
        data: value,
      }));
      setSocketData(newsArr);
    };

    console.log('hello');

    socket.on('news', handleNews);

    console.log(socketData);

    // Clean up the event listener on unmount
    return () => {
      socket.off('news', handleNews);
    };
  }, []);

  const arr = new Array(6);
  arr.fill(0); // Fills the array with 0s
  console.log(arr);

  return (
    <div className="grid grid-rows-6 h-screen w-full">
      {socketData &&
        socketData.map((article, index) => (
          <Headline
            data={article.data}
            id={article.id}
            key={article.id}
            color={colors[index]}
          />
        ))}

      {!socketData &&
        arr.map((item, index) => (
          <Headline
            unavailable={true}
            id={index}
            key={index}
            color={colors[index]}
          />
        ))}
    </div>
  );
};

export default SocketApp;
