import { useRef } from "react"
import styles from "./FileLoader.module.css"

const FileLoader = ({ setFile, fileName }) => {
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
            <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
            />
            <button onClick={handleChooseClick}>
                Выбрать {fileName ? fileName : "Файл"}
            </button>
        </>
    )
}

export default FileLoader
