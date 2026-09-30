import { IIconProps } from '../input/icons/utils';
import { FC } from 'react';

const DevicesIcon: FC<IIconProps> = ({ fill = '#000000', width = '25px', height = '25px' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={fill}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 9A2 2 0 0 1 4 7L15 7A2 2 0 0 1 17 9L17 15.5A2 2 0 0 1 15 17.5L10.25 17.5L10.25 20.5L11.5 20.5A0.75 0.75 0 0 1 11.5 22L7.5 22A0.75 0.75 0 0 1 7.5 20.5L8.75 20.5L8.75 17.5L4 17.5A2 2 0 0 1 2 15.5ZM3.5 9A0.5 0.5 0 0 1 4 8.5L15 8.5A0.5 0.5 0 0 1 15.5 9L15.5 15.5A0.5 0.5 0 0 1 15 16L4 16A0.5 0.5 0 0 1 3.5 15.5ZM13.5 4A2 2 0 0 1 15.5 2L20 2A2 2 0 0 1 22 4L22 14A2 2 0 0 1 20 16L18.5 16L18.5 9A3.5 3.5 0 0 0 15 5.5L13.5 5.5ZM15 4A0.5 0.5 0 0 1 15.5 3.5L20 3.5A0.5 0.5 0 0 1 20.5 4L20.5 14A0.5 0.5 0 0 1 20 14.5L18.5 14.5L18.5 9A3.5 3.5 0 0 0 15 5.5Z"
            />
        </svg>
    );
};

export default DevicesIcon;
