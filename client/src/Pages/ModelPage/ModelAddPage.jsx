import { useState } from "react"
import FileLoader from "../../components/FileLoader/FileLoader"
import Menu from "../../components/Menu/Menu"

import styles from "./ModelAddPage.module.css"

const ModelPage = () => {
    const [model, setModel] = useState()
    const [image, setImage] = useState()

    const [modelName, setModelName] = useState("")
    const [modelDesc, setModelDesc] = useState("")

    const handleUploadClick = async () => {
        const formData = new FormData()
        formData.append("file", model)
        formData.append("name", JSON.stringify(modelName))

        const result = await fetch("/api/model", {
            method: "POST",
            body: formData,
        })

        console.log(result)
    }

    return (
        <>
            <Menu />
            <h1>model add page</h1>

            <div className={styles.model_add_form}>
                <div className={styles.model_add_form__required}>
                    <h1>Нобходимые данные</h1>
                    <div className={styles.model_add_form__content}>
                        <label>
                            Название модели
                            <input
                                type="text"
                                name=""
                                id=""
                                value={modelName}
                                onChange={(e) => {
                                    setModelName(e.target.value)
                                }}
                            />
                        </label>
                        <label htmlFor="">
                            модель
                            <FileLoader
                                setFile={setModel}
                                fileName={"Модель"}
                            />
                        </label>
                        <button onClick={handleUploadClick} disabled={!model}>
                            Загрузить модель
                        </button>
                    </div>
                </div>
                <div className={styles.model_add_form__optional}>
                    <h1>Опционально</h1>
                    <div className={styles.model_add_form__content}>
                        <label htmlFor="">
                            описание модели
                            <input
                                type="text"
                                name=""
                                id=""
                                value={modelDesc}
                                onChange={(e) => {
                                    setModelDesc(e.target.value)
                                }}
                            />
                        </label>
                        <label htmlFor="">
                            {" "}
                            миниатюра
                            <FileLoader
                                setFile={setImage}
                                fileName={"Миниатюру"}
                            />
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ModelPage
