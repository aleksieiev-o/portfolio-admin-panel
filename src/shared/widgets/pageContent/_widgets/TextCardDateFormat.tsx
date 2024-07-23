'use client';

import {FC, ReactElement, useMemo} from 'react';

interface Props {
  title: string;
  date: string;
}

const TextCardDateFormat: FC<Props> = (props): ReactElement => {
  const {title, date} = props;

  const formattedDate = useMemo(() => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }, [date]);

  return (
    <div className="flex items-center justify-start gap-2" title={`${title} ${formattedDate}`}>
      <span className="font-bold text-foreground/30">{title}</span>

      <span className="text-foreground/30">{formattedDate}</span>
    </div>
  );
};

export default TextCardDateFormat;
