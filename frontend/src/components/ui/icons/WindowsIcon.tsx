import { IIconProps } from '../input/icons/utils';
import { FC } from 'react';

const WindowsIcon: FC<Omit<IIconProps, 'fill'>> = ({ width = '25px', height = '25px' }) => {
    return (
        <svg
            height={height}
            width={width}
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
        >
            <polygon style={{ fill: '#90C300' }} points="242.526,40.421 512,0 512,239.832 242.526,239.832 " />
            <polygon style={{ fill: '#F8672C' }} points="0,75.453 206.596,44.912 206.596,242.526 0,242.526 " />
            <polygon style={{ fill: '#FFC400' }} points="242.526,471.579 512,512 512,278.456 242.526,278.456 " />
            <polygon style={{ fill: '#00B4F2' }} points="0,436.547 206.596,467.088 206.596,278.456 0,278.456 " />
        </svg>
    );
};

export default WindowsIcon;
