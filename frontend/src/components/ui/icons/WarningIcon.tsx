import { IIconProps } from '../input/icons/utils';
import { FC } from 'react';

const WarningIcon: FC<IIconProps> = ({ fill = '#000000', width = '25px', height = '25px' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={fill}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2A10 10 0 1 1 12 22A10 10 0 1 1 12 2ZM12 3.5A8.5 8.5 0 1 0 12 20.5A8.5 8.5 0 1 0 12 3.5ZM11.25 7.75A0.75 0.75 0 0 1 12.75 7.75V13.25A0.75 0.75 0 0 1 11.25 13.25ZM12 15.5A1 1 0 1 1 12 17.5A1 1 0 1 1 12 15.5Z"
            />
        </svg>
    );
};

export default WarningIcon;
