import { NavLink } from "react-router-dom"
import styles from "./Breadcrumbs.module.css"

const Breadcrumbs = ({ paths }) => {
    return (
        <>
            <nav className={styles.breadcrumbs_container}>
                <ul className={styles.breadcrumbs_list}>
                    {paths.map((path, index) => (
                        <li key={index}>
                            <NavLink
                                to={path.url}
                                className={styles.breadcrumbs_link}
                            >
                                {path.label}
                            </NavLink>
                            <span> / </span>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}

export default Breadcrumbs
