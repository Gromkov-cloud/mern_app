import { NavLink } from "react-router-dom"
import styles from "./ModelCard.module.css"

const ModelCard = ({ name, imgUrl, id }) => {
    return (
        <>
            <NavLink to={`/model-settings/${id}`}>
                <div
                    className={styles.card_container}
                    onClick={() => {
                        console.log("sosa")
                    }}
                >
                    <div className={styles.thumb_container}>
                        <img
                            className={styles.thumb_image}
                            src={imgUrl}
                            alt="QR код модели"
                        />
                    </div>
                    <div className={styles.name_container}>
                        <span className={styles.name}>{name}</span>
                    </div>
                </div>
            </NavLink>
        </>
    )
}

export default ModelCard
