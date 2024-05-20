import { Link as RemixLink } from '@remix-run/react';
import clsx from 'clsx';

import { getColor } from '~/utils/colors';

import RocketIcon from '../icons/Rocket';
import { Link } from '../Link';
import { Fragment } from 'react/jsx-runtime';

const Rockets = () => {
  return (
    <div className={'flex gap-4'}>
      {new Array(3).fill(0).map((_, i) => (
        <RocketIcon key={i} width={52} height={21} />
      ))}
    </div>
  );
};

const Headband = ({
  link = null,
  colorName = 'rPurple',
  margin = true,
  title = null,
  to = null,
}) => {
  const color = getColor(colorName);
  const classNames = clsx(
    'headband flex size-full items-center justify-evenly gap-8 text-nowrap pl-16 text-2xl'
  );

  return (
    <div
      className={clsx(
        `bg-${color}`,
        margin && 'my-12 sm:my-32',
        'flex h-[80px] w-dvw cursor-pointer border-y border-black'
      )}
    >
      {title && to ? (
        <RemixLink to={to} title={title} className={classNames}>
          {new Array(50).fill(0).map((_, i) => (
            <Fragment key={i} >
              <Rockets />
              <div key={`${title}-${i}`} className='flex items-center text-2xl'>{title}</div>
            </Fragment>
          ))}
        </RemixLink>
      ) : (
        <Link link={link} className={classNames}>
          {new Array(50).fill(0).map((_, i) => (
            <Fragment key={i}>
              <Rockets />
              <div key={`${title}-${i}`} className='flex items-center text-2xl'>{title}</div>
            </Fragment>
          ))}
        </Link>
      )}
    </div>
  );
};

export default Headband;
