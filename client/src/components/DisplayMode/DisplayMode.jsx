import BarcodeSvg from "../svg/BarcodeSvg"
import { CubeSvg } from "../svg/CubeSvg"
import styles from "./DisplayMode.module.css"

const DisplayMode = () => {
    return (
        <div className={styles.display_mode}>
            <BarcodeSvg width="30px" height="30px" />
            <CubeSvg width="30px" height="30px" />
        </div>
    )
}

export default DisplayMode
