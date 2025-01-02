import { format } from 'date-fns';

import { type Settings } from '@/App';

type HeadlineProps = {
  id: number;
  settings: Settings;
  isOpen: boolean;
  unavailable?: boolean;
};

const Headline = ({
  id,
  settings,
  isOpen,
  unavailable = false,
}: HeadlineProps) => {
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
        className={`grid grid-rows-4  overflow-x-hidden`}
        style={{
          backgroundColor: settings.bgColor,
          color: settings.textColor,
          filter: settings.brightness, // Apply brightness filter here
        }}
      >
        <div className="flex  items-baseline gap-1">
          <span className="text-nowrap pl-1">
            {unavailable ? '[UNAVAILABLE]' : settings.data.source.name}
          </span>
          <span
            className="text-sm text-nowrap "
            style={{ color: settings.textColor, opacity: 0.8 }}
          >
            {unavailable
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
          {unavailable ? '[UNAVAILABLE]' : settings.data.title}
        </span>

        <span className="truncate text-sm text-nowrap pl-1">
          {unavailable ? '[UNAVAILABLE]' : settings.data.description}
        </span>
        <div className="self-start  text-sm underline">
          <a href={unavailable ? '[UNAVAILABLE]' : settings.data.url}>
            Read here
          </a>{' '}
        </div>
      </div>
    </>
  );
};

export default Headline;
