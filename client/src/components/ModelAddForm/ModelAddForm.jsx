import { useForm, Controller } from "react-hook-form"
import TextField from "@mui/material/TextField"
import FileLoader from "../FileLoader/FileLoader"
import { Alert, Box, Divider, Grid, Snackbar, Typography } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { useState } from "react"
import ModelService from "../../services/ModelService"

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

        try {
            setLoading(true)
            const res = await ModelService.addModel(formData)

            if (!(res.status === 200)) {
                setSuccess(false)
                setOpen(true)
                return
            }

            setSuccess(true)
            setOpen(true)
            reset()
        } catch (error) {
            console.log(error)
            setSuccess(false)
            setOpen(true)
        } finally {
            setLoading(false)
        }
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
                </Box>

                <Grid
                    container
                    justifyContent="center"
                    gap={"15px"}
                    sx={{
                        m: "20px 0",
                    }}
                >
                    <Grid item>
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
                    </Grid>
                    <Grid item>
                        <Controller
                            name="modelQR"
                            control={control}
                            rules={{ required: "Выберете картинку QR кода" }}
                            render={({ field: { onChange, value = "" } }) => (
                                <FileLoader
                                    setFile={onChange}
                                    file={value}
                                    title={"QR код *"}
                                    error={errors.modelQR}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
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
