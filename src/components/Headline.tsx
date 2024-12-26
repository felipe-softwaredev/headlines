import { format } from 'date-fns';

import { useEffect, useState } from 'react';

const Headline = ({ data, id, color }: any) => {
  const parseDateHandler = (date: Date) => {
    const formattedDate = format(
      new Date(date),
      "MMM do, yyyy 'at' HH:mm 'EST'"
    );
    return formattedDate;
  };

  return (
    <>
      <div
        className={`flex flex-col gap-2 overflow-hidden`}
        style={{
          backgroundColor: color.bgColor,
          color: color.textColor,
          filter: color.brightness, // Apply brightness filter here
        }}
      >
        <div className="flex  items-baseline gap-1">
          <span className="text-nowrap pl-1">{data.source.name}</span>
          <span
            className="text-sm text-nowrap "
            style={{ color: color.textColor, opacity: 0.8 }}
          >
            {parseDateHandler(data.publishedAt)}
          </span>
        </div>
        <div className="flex flex-col">
          <span id={`title-container${id}`} className="text-nowrap text-lg">
            {data.title}
          </span>
          <span className="truncate text-sm text-nowrap pl-1">
            {data.description}
          </span>
        </div>
        <div className="self-end pr-1 text-sm underline">
          <a href={data.url}>Read here</a>{' '}
        </div>
      </div>
    </>
  );
};

export default Headline;
