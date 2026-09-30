import { IIconProps } from '../input/icons/utils';
import { FC } from 'react';

const AcceptIcon: FC<IIconProps> = ({ fill = '#000000', width = '25px', height = '25px' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={fill}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2A10 10 0 1 1 12 22A10 10 0 1 1 12 2ZM7.25 12.5A1 1 0 0 1 8.66 12.5L10.26 14.09A0.25 0.25 0 0 0 10.62 14.08L15.34 8.6A1 1 0 0 1 16.85 9.91L11.4 16.24A1.2 1.2 0 0 1 9.64 16.3L7.25 13.91A1 1 0 0 1 7.25 12.5Z"
            />
        </svg>
    );
};

export default AcceptIcon;
