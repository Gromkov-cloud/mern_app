import { NavLink } from "react-router-dom"
import Menu from "../../components/Menu/Menu"
import ModelCard from "../../components/ModelCard/ModelCard"

import styles from "./AdminPage.module.css"
import ModelAddCard from "../../components/ModelCard/ModelAddCard"

const AdminPage = () => {
    return (
        <>
            <Menu />
            <div className={styles.models_list}>
                <NavLink
                    to="/model-settings/model1"
                    className={styles.model_link}
                >
                    <ModelCard />
                </NavLink>
                <NavLink to="/model-add" className={styles.model_link}>
                    <ModelAddCard />
                </NavLink>
            </div>
        </>
    )
}

export default AdminPage
