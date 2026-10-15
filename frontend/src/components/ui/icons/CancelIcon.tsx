import { IIconProps } from '../input/icons/utils';
import { FC } from 'react';

const CancelIcon: FC<IIconProps> = ({ fill = '#000000', width = '25px', height = '25px' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={fill}>
            <path d="M12 10.94L17.47 5.47A0.75 0.75 0 0 1 18.53 6.53L13.06 12L18.53 17.47A0.75 0.75 0 0 1 17.47 18.53L12 13.06L6.53 18.53A0.75 0.75 0 0 1 5.47 17.47L10.94 12L5.47 6.53A0.75 0.75 0 0 1 6.53 5.47Z" />
        </svg>
    );
};

export default CancelIcon;
