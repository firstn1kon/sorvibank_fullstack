import { IIconProps } from '../input/icons/utils';
import { FC } from 'react';

const HomeIcon: FC<IIconProps> = ({ fill = '#000000', width = '25px', height = '25px' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={fill}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.36 3.04A1 1 0 0 1 12.64 3.04L19.64 8.95A1 1 0 0 1 20 9.71L20 19A2 2 0 0 1 18 21L6 21A2 2 0 0 1 4 19L4 9.71A1 1 0 0 1 4.36 8.95ZM12 4.46L18.5 9.95L18.5 19A0.5 0.5 0 0 1 18 19.5L15 19.5L15 15.5A2 2 0 0 0 13 13.5L11 13.5A2 2 0 0 0 9 15.5L9 19.5L6 19.5A0.5 0.5 0 0 1 5.5 19L5.5 9.95ZM10.5 15.5A0.5 0.5 0 0 1 11 15L13 15A0.5 0.5 0 0 1 13.5 15.5L13.5 19.5L10.5 19.5Z"
            />
        </svg>
    );
};

export default HomeIcon;
