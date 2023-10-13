import styles from "./PageHeader.module.css"

const PageHeader = ({ title, subtitle }) => {
    return (
        <>
            {title ? <h1 className={styles.title}>{title}</h1> : null}
            {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </>
    )
}

export default PageHeader
