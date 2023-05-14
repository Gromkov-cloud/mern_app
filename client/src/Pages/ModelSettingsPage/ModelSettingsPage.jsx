import { useParams } from "react-router-dom"
import Menu from "../../components/Menu/Menu"
import Model from "../../components/Model/Model"
import styles from "./ModelSettingsPage.module.css"
import { Suspense, useEffect, useState } from "react"

const ModelSettingsPage = () => {
    const [modelInfo, setModelInfo] = useState({})
    const id = useParams().id

    const getModelInfo = async () => {
        const response = await fetch(`/api/model-info/${id}`)
        const info = await response.json()
        setModelInfo(info)
    }

    useEffect(() => {
        getModelInfo()
    }, [])

    const deleteBtnHandler = async () => {
        const response = await fetch(`/api/model-delete/${modelInfo._id}`, {
            method: "POST",
        })
        const data = await response.json()
        console.log(data)
    }

    return (
        <>
            <Menu />
            <h1>Model settings page</h1>
            <ul>
                <li>
                    {!modelInfo.name ? (
                        "Loading..."
                    ) : (
                        <div className="model_info">
                            <div className="model_info__name">
                                {modelInfo.name}
                            </div>
                            <div className="model_info__link">
                                {modelInfo.s3.model}
                            </div>
                            <div className="model_info__link">model desc</div>
                            <div className="model_info__link">date</div>
                            <div className="model_info__link">weight</div>
                            <div className="model_info__link">thumbnail</div>
                            <div className="model_info__link">activity</div>
                            <button onClick={deleteBtnHandler}>Удалить</button>
                        </div>
                    )}
                </li>
                <Suspense fallback={"Loading..."}>
                    <div
                        className="model_container"
                        style={{
                            position: "relative",
                            width: "500px",
                            height: "400px",
                        }}
                    >
                        <Model />
                    </div>
                </Suspense>
            </ul>
        </>
    )
}

export default ModelSettingsPage
