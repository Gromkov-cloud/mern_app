import { NavLink } from "react-router-dom"
import Menu from "../../components/Menu/Menu"
import ModelCard from "../../components/ModelCard/ModelCard"

import styles from "./AdminPage.module.css"
import ModelAddCard from "../../components/ModelCard/ModelAddCard"
import { useEffect, useState } from "react"

const AdminPage = () => {
    const [models, setModels] = useState([])

    const getModels = async () => {
        const response = await fetch("/api/models")
        const data = await response.json()
        setModels(data)
    }

    useEffect(() => {
        getModels()
    }, [])

    return (
        <>
            <Menu />
            <div className={styles.models_list}>
                {!models.length
                    ? "loading..."
                    : models.map((model) => {
                          return (
                              <NavLink
                                  to={`/model-settings/${model._id}`}
                                  className={styles.model_link}
                                  key={model._id}
                              >
                                  <ModelCard name={model.name} />
                              </NavLink>
                          )
                      })}

                <NavLink to="/model-add" className={styles.model_link}>
                    <ModelAddCard />
                </NavLink>
            </div>
        </>
    )
}

export default AdminPage
