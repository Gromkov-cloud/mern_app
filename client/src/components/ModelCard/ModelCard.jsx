import { CubeSvg } from "../svg/CubeSvg"
import styles from "./ModelCard.module.css"

const ModelCard = () => {
    return (
        <div className={styles.model_card}>
            <div className={styles.model_card__thumb}>
                <CubeSvg width="50px" height="50px" />
            </div>
            <div className={styles.model_card__info}>
                <h2>model Name</h2>
            </div>
        </div>
    )
}

export default ModelCard
