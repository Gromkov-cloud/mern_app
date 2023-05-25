import { useForm, Controller } from "react-hook-form"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import FileLoader from "../FileLoader/FileLoader"
import { useState } from "react"

import styles from "./ModelAddForm.module.css"

const ModelAddForm = () => {
    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm()

    const onFormSubmit = async (data) => {
        const formData = new FormData()
        formData.append("file", data.modelFile)
        formData.append("name", JSON.stringify(data.modelName))

        // const result = await fetch("/api/model", {
        //     method: "POST",
        //     body: formData,
        // })

        // console.log(result)
        // console.log(JSON.stringify(formData))
        console.log(data)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onFormSubmit)} className={styles.form}>
                <Controller
                    name="modelName"
                    control={control}
                    render={({ field: { onChange, value = "" } }) => (
                        <TextField
                            onChange={onChange}
                            value={value}
                            id="standard-basic"
                            label="Название модели"
                            variant="filled"
                            sx={{ color: "#000" }}
                            required
                        />
                    )}
                />
                <Controller
                    name="modelDescription"
                    control={control}
                    render={({ field: { onChange, value = "" } }) => (
                        <TextField
                            onChange={onChange}
                            value={value}
                            id="standard-textarea"
                            label="Описание модели"
                            multiline
                            rows={2}
                            variant="filled"
                            sx={{ color: "#000" }}
                        />
                    )}
                />

                <Controller
                    name="modelFile"
                    control={control}
                    render={({ field: { onChange, value = "" } }) => (
                        <FileLoader
                            setFile={onChange}
                            file={value}
                            title={"Файл модели *"}
                        />
                    )}
                />

                <Controller
                    name="modelThumbnail"
                    control={control}
                    render={({ field: { onChange, value = "" } }) => (
                        <FileLoader
                            setFile={onChange}
                            file={value}
                            title={"Изображение миниатюры"}
                        />
                    )}
                />
                <Button size="medium" variant="outlined" type="submit">
                    Добавить модель
                </Button>
            </form>
        </>
    )
}

export default ModelAddForm
