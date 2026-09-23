import styles from './dotLoader.module.css';

const DotLoader = ({ bg = '#000' }: { bg?: string }) => {
    return (
        <div className={styles['lds-ellipsis']}>
            <div style={{ background: bg }}></div>
            <div style={{ background: bg }}></div>
            <div style={{ background: bg }}></div>
            <div style={{ background: bg }}></div>
        </div>
    );
};

export default DotLoader;
