import styles from './error.module.css';
import clsx from 'clsx';
import { ApiErrorResponse } from '../../api/clients';

interface ShowError {
    data?: ApiErrorResponse;
    extraClass?: string;
}

const Error = ({ extraClass = '', data }: ShowError) => {
    if (!data?.message && !data?.errors?.length) return null;
    return (
        <div role="alert" className={clsx(styles.error, extraClass)}>
            {data?.message}
            {data?.errors ? (
                <ul>
                    {data?.errors.map((error) => (
                        <li key={error.field}>{error.message}</li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
};

export default Error;
