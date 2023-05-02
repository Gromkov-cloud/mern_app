import Menu from "../../components/Menu/Menu"
import styles from "./ModelSettingsPage.module.css"

const ModelSettingsPage = () => {
    return (
        <>
            <Menu />
            <h1>Model info page</h1>
            <ul>
                <li>
                    <div className="model_info">
                        <div className="model_info__name">name</div>
                        <div className="model_info__link">link</div>
                        <div className="model_info__link">model desc</div>
                        <div className="model_info__link">date</div>
                        <div className="model_info__link">weight</div>
                        <div className="model_info__link">thumbnail</div>
                        <div className="model_info__link">activity</div>
                    </div>
                </li>
            </ul>
        </>
    )
}

export default ModelSettingsPage
