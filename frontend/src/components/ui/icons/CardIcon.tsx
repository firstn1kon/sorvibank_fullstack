import { IIconProps } from '../input/icons/utils';
import { FC } from 'react';

const CardIcon: FC<IIconProps> = ({ fill = '#000000', width = '25px', height = '25px' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={fill}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.5 4.5H19.5C20.88 4.5 22 5.62 22 7V17C22 18.38 20.88 19.5 19.5 19.5H4.5C3.12 19.5 2 18.38 2 17V7C2 5.62 3.12 4.5 4.5 4.5ZM4.5 6C3.95 6 3.5 6.45 3.5 7V17C3.5 17.55 3.95 18 4.5 18H19.5C20.05 18 20.5 17.55 20.5 17V7C20.5 6.45 20.05 6 19.5 6H4.5ZM8.5 8.25A1.75 1.75 0 1 1 8.5 11.75A1.75 1.75 0 1 1 8.5 8.25ZM8.5 12.75C10.157 12.75 11.5 13.73 11.5 15V15.25C11.5 15.39 11.39 15.5 11.25 15.5H5.75C5.61 15.5 5.5 15.39 5.5 15.25V15C5.5 13.73 6.843 12.75 8.5 12.75ZM13.75 9.25H17.75A0.75 0.75 0 0 1 17.75 10.75H13.75A0.75 0.75 0 0 1 13.75 9.25ZM13.75 13.25H16.25A0.75 0.75 0 0 1 16.25 14.75H13.75A0.75 0.75 0 0 1 13.75 13.25Z"
            />
        </svg>
    );
};

export default CardIcon;
