import { IIconProps } from '../input/icons/utils';
import { FC } from 'react';

// иконка контурная: fill задаёт цвет обводки
const CloseIcon: FC<IIconProps> = ({ fill = 'currentColor', width = '20px', height = '20px' }) => {
    return (
        <svg viewBox="0 0 24 24" width={width} height={height} fill="none" stroke={fill} strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" />
        </svg>
    );
};

export default CloseIcon;
