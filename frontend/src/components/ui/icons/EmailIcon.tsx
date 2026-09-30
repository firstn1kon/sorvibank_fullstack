import { IIconProps } from '../input/icons/utils';
import { FC } from 'react';

const EmailIcon: FC<IIconProps> = ({ fill = '#000000', width = '25px', height = '25px' }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill={fill}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.5 4.5H19.5C20.88 4.5 22 5.62 22 7V17C22 18.38 20.88 19.5 19.5 19.5H4.5C3.12 19.5 2 18.38 2 17V7C2 5.62 3.12 4.5 4.5 4.5ZM5.6 6H18.4L12 10.7ZM3.5 6.32L12 12.56L20.5 6.32V17C20.5 17.55 20.05 18 19.5 18H4.5C3.95 18 3.5 17.55 3.5 17V6.32Z"
            />
        </svg>
    );
};

export default EmailIcon;
