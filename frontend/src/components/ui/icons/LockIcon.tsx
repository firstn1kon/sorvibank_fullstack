import { IIconProps } from '../input/icons/utils';
import { FC } from 'react';

const LockIcon: FC<IIconProps> = ({ fill = '#000000', width = '25px', height = '25px' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={fill}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.5 10H6.75V7A5.25 5.25 0 0 1 17.25 7V10H17.5C18.88 10 20 11.12 20 12.5V19.5C20 20.88 18.88 22 17.5 22H6.5C5.12 22 4 20.88 4 19.5V12.5C4 11.12 5.12 10 6.5 10ZM8.25 10V7A3.75 3.75 0 0 1 15.75 7V10H8.25ZM6.5 11.5C5.95 11.5 5.5 11.95 5.5 12.5V19.5C5.5 20.05 5.95 20.5 6.5 20.5H17.5C18.05 20.5 18.5 20.050 18.5 19.5V12.5C18.5 11.95 18.05 11.5 17.5 11.5H6.5ZM12 14.25A0.75 0.75 0 0 1 12.75 15V17A0.75 0.75 0 0 1 11.25 17V15A0.75 0.75 0 0 1 12 14.25Z"
            />
        </svg>
    );
};

export default LockIcon;
