import { NavLink } from "react-router-dom"
import styles from "./Sidebar.module.css"

const Sidebar = () => {
    return (
        <>
            <div className={styles.sidebar}>
                <ul className={styles.models_list}>
                    <li className={styles.models_list__item}>
                        <NavLink
                            to={"/model/model1"}
                            className={styles.models_list__link}
                        >
                            Yoda
                        </NavLink>
                    </li>
                    <li className={styles.models_list__item}>
                        <NavLink
                            to={"/model/model2"}
                            className={styles.models_list__link}
                        >
                            water
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar
