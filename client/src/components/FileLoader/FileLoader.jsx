import { useRef } from "react"

import UploadFileSvg from "../svg/UploadFileSvg"

import styles from "./FileLoader.module.css"

const FileLoader = ({ setFile, file, title, error }) => {
    const inputRef = useRef(null)

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0])
        }
    }

    const handleChooseClick = () => {
        inputRef.current?.click()
    }

    return (
        <>
            <span className={styles.input_title}>{title}</span>
            <div className={styles.file_loader}>
                <input
                    type="file"
                    ref={inputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
                <button
                    type="button"
                    onClick={handleChooseClick}
                    className={styles.button}
                >
                    <UploadFileSvg width="24px" height="24px" />
                    Выбрать
                </button>
                {file?.name ? (
                    <span className={styles.file_name__active}>
                        {file.name}
                    </span>
                ) : (
                    <span className={styles.file_name}>Выберете файл...</span>
                )}
            </div>
            <span style={{ color: "#d32f2f" }}>{error?.message}</span>
        </>
    )
}

export default FileLoader
