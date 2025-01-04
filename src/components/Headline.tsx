import { format } from 'date-fns';

import { type Settings } from '@/App';

type HeadlineProps = {
  id: number;
  settings: Settings;
  isOpen: boolean;
};

const Headline = ({ id, settings, isOpen }: HeadlineProps) => {
  const parseDateHandler = (date: string) => {
    const formattedDate = format(
      new Date(date),
      "MMM do, yyyy 'at' HH:mm 'EST'"
    );
    return formattedDate;
  };

  return (
    <>
      <div
        className={`grid grid-rows-4  overflow-x-hidden`}
        style={{
          backgroundColor: settings.bgColor,
          color: settings.textColor,
          filter: settings.brightness,
        }}
      >
        <div className="flex  items-baseline gap-1">
          <span className="text-nowrap pl-1">
            {!settings.data ? '[UNAVAILABLE]' : settings.data.source.name}
          </span>
          <span
            className="text-sm text-nowrap "
            style={{ color: settings.textColor, opacity: 0.8 }}
          >
            {!settings.data
              ? '[UNAVAILABLE]'
              : parseDateHandler(settings.data.publishedAt)}
          </span>
          {isOpen && (
            <div className="absolute w-full   text-lg bg-black/60 border-dashed border-b border-yellow-500 border-">
              <span className="text-white">
                CATEGORY:
                {settings.category === ''
                  ? ' ALL'
                  : ` ${settings.category.toUpperCase()}`}
              </span>
            </div>
          )}
        </div>

        <span id={`title-container${id}`} className="text-nowrap text-lg">
          {!settings.data ? '[UNAVAILABLE]' : settings.data.title}
        </span>

        <span className="truncate text-sm text-nowrap pl-1">
          {!settings.data ? '[UNAVAILABLE]' : settings.data.description}
        </span>
        <div className="pl-1  text-sm underline">
          <a
            href={!settings.data ? '[UNAVAILABLE]' : settings.data.url}
            target="_blank"
          >
            Read here
          </a>{' '}
        </div>
      </div>
    </>
  );
};

export default Headline;
