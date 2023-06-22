import { useForm, Controller } from "react-hook-form"
import TextField from "@mui/material/TextField"
import FileLoader from "../FileLoader/FileLoader"
import { Alert, Box, Divider, Snackbar, Typography } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { useState } from "react"

const createValidFormData = (data, id) => {
    const isDataEmpty = Boolean(
        Object.values(data).filter((field) => field !== undefined).length
    )

    if (!isDataEmpty) {
        return null
    }

    const formData = new FormData()

    if (id) {
        formData.append("id", id)
    }

    for (const key in data) {
        if (typeof data[key] === "object") {
            formData.append("files", data[key])
        } else {
            data[key] !== undefined && formData.append([key], data[key])
        }
    }

    return formData
}

const ModelAddForm = () => {
    const [loading, setLoading] = useState(false)
    const [isSuccess, setSuccess] = useState(true)
    const [open, setOpen] = useState(false)

    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm()

    const onFormSubmit = async (data) => {
        const formData = createValidFormData(data)

        console.log(formData)

        setLoading(true)
        const response = await fetch("/api/model", {
            method: "POST",
            body: formData,
        })
        setLoading(false)
        setSuccess(response.ok)
        setOpen(true)

        if (response.ok) {
            reset()
        }

        console.log(response)
    }

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return
        }

        setOpen(false)
    }

    return (
        <>
            <Typography variant="h5" textAlign={"center"}>
                Добавьте новую модель
            </Typography>
            <Divider
                sx={{
                    margin: "15px 0",
                }}
            />
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <Controller
                        name="modelName"
                        control={control}
                        rules={{ required: "Введите название модели" }}
                        render={({ field: { onChange, value = "" } }) => (
                            <TextField
                                onChange={onChange}
                                value={value}
                                id="standard-basic"
                                label="Название модели *"
                                variant="filled"
                                sx={{ color: "#000" }}
                                helperText={errors.modelName?.message}
                                error={!!errors.modelName}
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
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",

                        gap: "20px",
                        m: "20px 0",
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Controller
                            name="modelFile"
                            control={control}
                            rules={{ required: "Выберете файл модели" }}
                            render={({ field: { onChange, value = "" } }) => (
                                <FileLoader
                                    setFile={onChange}
                                    file={value}
                                    title={"Файл модели *"}
                                    error={errors.modelFile}
                                />
                            )}
                        />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                    </Box>
                </Box>
                <LoadingButton
                    loading={loading}
                    fullWidth
                    variant="contained"
                    type="submit"
                    startIcon={false}
                >
                    Добавить модель
                </LoadingButton>
            </form>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={isSuccess ? "success" : "error"}
                    sx={{ width: "100%" }}
                >
                    {isSuccess
                        ? "Модель добавлена"
                        : "Произошла ошибка, попробуйте еще раз"}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModelAddForm
