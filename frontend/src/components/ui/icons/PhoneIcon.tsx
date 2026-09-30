import { IIconProps } from '../input/icons/utils';
import { FC } from 'react';

const PhoneIcon: FC<IIconProps> = ({ fill = '#000000', width = '25px', height = '25px' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={fill}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.5 2H15.5C16.88 2 18 3.12 18 4.5V19.5C18 20.88 16.88 22 15.5 22H8.5C7.12 22 6 20.88 6 19.5V4.5C6 3.12 7.12 2 8.5 2ZM8.5 3.5C7.95 3.5 7.5 3.95 7.5 4.5V19.5C7.5 20.05 7.95 20.5 8.5 20.5H15.5C16.05 20.5 16.5 20.05 16.5 19.5V4.5C16.5 3.95 16.05 3.5 15.5 3.5H8.5ZM10.75 17H13.25A0.75 0.75 0 0 1 13.25 18.5H10.75A0.75 0.75 0 0 1 10.75 17Z"
            />
        </svg>
    );
};

export default PhoneIcon;
