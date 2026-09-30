import { IIconProps } from '../input/icons/utils';
import { FC } from 'react';

const LogoutIcon: FC<IIconProps> = ({ fill = '#FFD544', width = '25px', height = '25px' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={fill}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 5A2 2 0 0 1 5 3L12 3A2 2 0 0 1 14 5L14 7.25A0.75 0.75 0 0 1 12.5 7.25L12.5 5A0.5 0.5 0 0 0 12 4.5L5 4.5A0.5 0.5 0 0 0 4.5 5L4.5 19A0.5 0.5 0 0 0 5 19.5L12 19.5A0.5 0.5 0 0 0 12.5 19L12.5 16.75A0.75 0.75 0 0 1 14 16.75L14 19A2 2 0 0 1 12 21L5 21A2 2 0 0 1 3 19ZM9 12A0.75 0.75 0 0 1 9.75 11.25L18.44 11.25L16.5 9.31A0.75 0.75 0 0 1 17.56 8.25L21.03 11.72A0.4 0.4 0 0 1 21.03 12.28L17.56 15.75A0.75 0.75 0 0 1 16.5 14.69L18.44 12.75L9.75 12.75A0.75 0.75 0 0 1 9 12Z"
            />
        </svg>
    );
};

export default LogoutIcon;
