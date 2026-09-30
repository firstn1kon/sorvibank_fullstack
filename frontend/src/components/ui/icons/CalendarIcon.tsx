import { IIconProps } from '../input/icons/utils';
import { FC } from 'react';

const CalendarIcon: FC<IIconProps> = ({ fill = '#000000', width = '25px', height = '25px' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" height={height} fill={fill}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.5 4H18.5C19.8807 4 21 5.11929 21 6.5V19.5C21 20.8807 19.8807 22 18.5 22H5.5C4.11929 22 3 20.8807 3 19.5V6.5C3 5.11929 4.11929 4 5.5 4ZM4.5 8V19.5C4.5 20.0523 4.94772 20.5 5.5 20.5H18.5C19.0523 20.5 19.5 20.0523 19.5 19.5V8H4.5ZM7.25 2C7.25 1.58579 7.58579 1.25 8 1.25C8.41421 1.25 8.75 1.58579 8.75 2V4H7.25V2ZM15.25 2C15.25 1.58579 15.5858 1.25 16 1.25C16.4142 1.25 16.75 1.58579 16.75 2V4H15.25V2ZM7.25 10.75H8.75V12.25H7.25V10.75ZM11.25 10.75H12.75V12.25H11.25V10.75ZM15.25 10.75H16.75V12.25H15.25V10.75ZM7.25 15.25H8.75V16.75H7.25V15.25ZM11.25 15.25H12.75V16.75H11.25V15.25ZM15.25 15.25H16.75V16.75H15.25V15.25Z"
            />
        </svg>
    );
};

export default CalendarIcon;
