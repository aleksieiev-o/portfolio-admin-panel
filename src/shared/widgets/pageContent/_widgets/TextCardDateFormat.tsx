'use client';

import {cn} from '@/lib/utils';
import {FC, ReactElement, useMemo} from 'react';

interface Props {
  title: string;
  date: string;
  variant: 'default' | 'muted';
}

const TextCardDateFormat: FC<Props> = (props): ReactElement => {
  const {title, date, variant} = props;

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

  const textStyle = useMemo(() => {
    switch (variant) {
      case 'default':
        return 'text-foreground';
      case 'muted':
        return 'text-foreground/30';
      default:
        return '';
    }
  }, [variant]);

  return (
    <div className="flex items-center justify-start gap-2" title={`${title} ${formattedDate}`}>
      <span className={cn(textStyle, 'font-bold')}>{title}</span>

      <span className={textStyle}>{formattedDate}</span>
    </div>
  );
};

export default TextCardDateFormat;
