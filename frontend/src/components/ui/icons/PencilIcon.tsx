import { IIconProps } from '../input/icons/utils';
import { FC } from 'react';

const PencilIcon: FC<IIconProps> = ({ fill = '#000000', width = '25px', height = '25px' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={fill}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.15 20.85L5.27 14.49L15.88 3.88A1 1 0 0 1 17.29 3.88L20.12 6.71A1 1 0 0 1 20.12 8.12L9.51 18.73ZM5.52 18.48L6.19 16.47L7.53 17.81ZM6.86 15.02L13.58 8.3L15.7 10.42L8.98 17.14ZM14.64 7.24L16.59 5.29L18.71 7.41L16.76 9.36Z"
            />
        </svg>
    );
};

export default PencilIcon;
