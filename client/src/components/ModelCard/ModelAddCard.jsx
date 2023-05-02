import PlusSvg from "../svg/PlusSvg.jsx"
import styles from "./ModelCard.module.css"

const ModelAddCard = () => {
    return (
        <div className={styles.model_card}>
            <div className={styles.model_card__thumb}>
                <PlusSvg width="50px" height="50px" />
            </div>
            <div className={styles.model_card__info}>
                <h2>Добавить</h2>
            </div>
        </div>
    )
}

export default ModelAddCard
