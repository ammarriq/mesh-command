import { formatTime } from '@/lib/utils';

import Image from 'next/image';

interface UserMsgProps {
  time: string;
  user?: string;
  msg: string;
  splitScreenStyle?: boolean;
}

export function UserMsg({ msg, time, user = 'Boss', splitScreenStyle = false }: UserMsgProps) {
  return (
    <section className="flex flex-col max-w-2xl gap-1.5 ml-auto">
      {splitScreenStyle ? (
        <div className="flex justify-between items-center">
          <p className="flex items-center gap-2">
            <span className="font-medium text-primary">{user}</span>
            <Image
              src={'/users/2.jpg'}
              alt="user"
              width={20}
              height={20}
              className="bg-primary/10"
            />
          </p>
          <span className="text-xs text-text-secondary">{formatTime(time)}</span>
        </div>
      ) : (
        <div className="flex justify-between items-center ">
          <span className="text-xs text-text-secondary">{formatTime(time)}</span>
          <hgroup className="flex items-center gap-2">
            <h5 className="font-medium text-primary">{user}</h5>
            <div className="relative size-5 ">
              <Image
                src={'/users/2.jpg'}
                alt="user"
                width={20}
                height={20}
                className="bg-primary/10 size-5 object-cover object-top"
              />
            </div>
          </hgroup>
        </div>
      )}
      <p
        className={`${
          splitScreenStyle
            ? 'bg-light-bg text-text-primary px-[11px] py-3'
            : 'bg-primary text-white px-[11px] py-3'
        } rounded-xs shadow-[0_0_0_2px_rgba(29,201,160,0.2)]"`}
      >
        {msg}
      </p>
    </section>
  );
}
