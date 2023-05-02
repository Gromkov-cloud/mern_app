import { NavLink } from "react-router-dom"
import styles from "./Menu.module.css"
import LoginIcon from "../Login/LoginIcon"

const Menu = () => {
    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <ul className={styles.nav_list}>
                        <li className={styles.nav_item}>
                            <NavLink to={"/"} className={styles.nav_link}>
                                Root
                            </NavLink>
                        </li>
                        <li className={styles.nav_item}>
                            <NavLink to={"/model"} className={styles.nav_link}>
                                Model
                            </NavLink>
                        </li>
                        <li className={styles.nav_item}>
                            <NavLink to={"/admin"} className={styles.nav_link}>
                                Admin
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>
    )
}

export default Menu
