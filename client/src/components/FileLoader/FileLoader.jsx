import { useRef } from "react"
import styles from "./FileLoader.module.css"
import UploadFileSvg from "../svg/UploadFileSvg"

const FileLoader = ({ setFile, file, title }) => {
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
        <div>
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
        </div>
    )
}

export default FileLoader
