import { Controller, useForm } from "react-hook-form"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Switch from "@mui/material/Switch"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import FileLoader from "../FileLoader/FileLoader"
import ModelAccordionThumb from "./ModelAccordionThumb"
import { useState } from "react"
import { Alert, Snackbar } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton"

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

const ModelAccordionForm = ({ model, setDeleted, isDeleted }) => {
    const [saveSnackOpen, setSaveSnackOpen] = useState(false)
    const [isSaveSuccess, setSaveSuccess] = useState(true)
    const [deleteSnackOpen, setDeleteSnackOpen] = useState(false)
    const [isDeleteSuccess, setDeleteSuccess] = useState(true)
    const [isDeleteBtnLoading, setDeleteBtnLoading] = useState(false)
    const [isSaveBtnLoading, setSaveBtnLoading] = useState(false)

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

    const onFormSubmit = async (data) => {
        const formData = createValidFormData(data, model._id)

        console.log(formData)
        if (!formData) {
            console.log("no data")
            return
        }

        setSaveBtnLoading(true)
        const response = await fetch(`/api/model/update/${model._id}`, {
            method: "POST",
            body: formData,
        })
        setSaveBtnLoading(false)
        setSaveSuccess(response.ok)
        setSaveSnackOpen(true)

        console.log(await response.json())
    }

    const deleteBtnClickHandle = async (modelId) => {
        setDeleteBtnLoading(true)
        const response = await fetch(`/api/model/${modelId}`, {
            method: "DELETE",
        })
        setDeleteBtnLoading(false)
        setDeleteSuccess(response.ok)
        setDeleteSnackOpen(true)
        setDeleted(true)

        console.log(await response.body.json)
    }

    const handleSaveSnackClose = (event, reason) => {
        if (reason === "clickaway") {
            return
        }

        setSaveSnackOpen(false)
    }
    const handleDeleteSnackClose = (event, reason) => {
        if (reason === "clickaway") {
            return
        }

        setDeleteSnackOpen(false)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Grid container spacing={2}>
                    {/* MODEL NAME AND MODEL THUMB CONTAINER ---> */}
                    <Grid item xs={4}>
                        <Box>
                            {/* MODEL NAME INPUT ---> */}
                            <Controller
                                name="modelName"
                                control={control}
                                // rules={{
                                //     required: "Введите название",
                                // }}
                                render={({
                                    field: {
                                        onChange,
                                        value = model.name || "",
                                    },
                                }) => (
                                    <TextField
                                        onChange={onChange}
                                        value={value}
                                        id="standard-basic"
                                        label="Название модели"
                                        variant="outlined"
                                        sx={{
                                            color: "#000",
                                            width: "100%",
                                        }}
                                        helperText={errors.modelName?.message}
                                        error={!!errors.modelName}
                                    />
                                )}
                            />
                            {/* <---  MODEL NAME INPUT */}

                            {/* MODEL THUMB INPUT---> */}
                            <Typography
                                sx={(theme) => ({
                                    fontSize: "16px",
                                    color: theme.palette.text.secondary,
                                    marginTop: "10px",
                                })}
                            >
                                Миниатюра
                            </Typography>
                            <ModelAccordionThumb imgSrc={model.s3.image} />
                            {/* <---  MODEL THUMB INPUT*/}
                        </Box>
                    </Grid>
                    {/* <---  MODEL NAME AND MODEL THUMB CONTAINER */}

                    {/* MODEL DESCRIPTION INPUT CONTAINER ---> */}
                    <Grid item xs={8}>
                        <Controller
                            name="description"
                            control={control}
                            render={({
                                field: {
                                    onChange,
                                    value = model.description || "",
                                },
                            }) => (
                                <TextField
                                    onChange={onChange}
                                    value={value}
                                    id="standard-textarea"
                                    label="Описание модели"
                                    multiline
                                    rows={9}
                                    variant="outlined"
                                    sx={{ color: "#000", width: "100%" }}
                                />
                            )}
                        />
                    </Grid>
                    {/* <---  MODEL DESCRIPTION INPUT CONTAINER */}
                </Grid>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "flex-end",
                        gap: "20px",
                    }}
                >
                    {/* MODEL FILE INPUT ---> */}
                    <Box
                        sx={{
                            flexGrow: 2,
                            width: "max-content",
                            marginTop: "15px",
                        }}
                    >
                        <Controller
                            name="modelFile"
                            control={control}
                            render={({
                                field: {
                                    onChange,
                                    value = { name: model.fileName },
                                },
                            }) => (
                                <FileLoader
                                    setFile={onChange}
                                    file={value}
                                    title={"Изменить файл модели"}
                                />
                            )}
                        />
                    </Box>
                    {/* <---  MODEL FILE INPUT */}
                    {/* MODEL THUMB INPUT ---> */}
                    <Box
                        sx={{
                            flexGrow: 2,
                            width: "max-content",
                            marginTop: "15px",
                        }}
                    >
                        <Controller
                            name="thumbFile"
                            control={control}
                            render={({
                                field: {
                                    onChange,
                                    value = { name: model.imageName } || "",
                                },
                            }) => (
                                <FileLoader
                                    setFile={onChange}
                                    file={value}
                                    title={"Изменить миниатюру модели"}
                                />
                            )}
                        />
                    </Box>
                    {/* <---  MODEL THUMB INPUT */}

                    {/* SWITCHER ---> */}
                    <Box
                        sx={{
                            maxWidth: "max-content",
                            width: "100%",
                        }}
                    >
                        <Typography
                            sx={(theme) => ({
                                fontSize: "16px",
                                color: theme.palette.text.secondary,
                            })}
                        >
                            <Controller
                                name="isActive"
                                control={control}
                                render={({
                                    field: {
                                        onChange,
                                        value = model.isActive || false,
                                    },
                                }) => (
                                    <Switch
                                        // value="isActive"
                                        checked={value}
                                        onChange={onChange}
                                        name="isActive"
                                    />
                                )}
                            />
                            Активировать модель
                        </Typography>
                    </Box>
                    {/* <---  SWITCHER */}
                </Box>

                {/* MODEL DELETE BTN ---> */}
                <LoadingButton
                    loading={isDeleteBtnLoading}
                    fullWidth
                    variant="outlined"
                    sx={{ m: "15px 0" }}
                    onClick={() => deleteBtnClickHandle(model._id)}
                    disabled={isSaveBtnLoading || isDeleted}
                >
                    Удалить модель
                </LoadingButton>
                {/* <---  MODEL DELETE BTN */}

                {/* FORM SUBMIT BTN ---> */}
                <LoadingButton
                    loading={isSaveBtnLoading}
                    fullWidth
                    variant="contained"
                    type="submit"
                    disabled={isDeleteBtnLoading || isDeleted}
                >
                    Сохранить изменения
                </LoadingButton>
                {/* <---  FORM SUBMIT BTN */}
            </form>
            <Snackbar
                open={saveSnackOpen}
                autoHideDuration={6000}
                onClose={handleSaveSnackClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={handleSaveSnackClose}
                    severity={isSaveSuccess ? "success" : "error"}
                    sx={{ width: "100%" }}
                >
                    {isSaveSuccess
                        ? "Модель обновлена"
                        : "Произошла ошибка, попробуйте еще раз"}
                </Alert>
            </Snackbar>
            <Snackbar
                open={deleteSnackOpen}
                autoHideDuration={6000}
                onClose={handleDeleteSnackClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={handleDeleteSnackClose}
                    severity={isDeleteSuccess ? "success" : "error"}
                    sx={{ width: "100%" }}
                >
                    {isDeleteSuccess
                        ? "Модель успешно удалена"
                        : "Произошла ошибка, попробуйте еще раз"}
                </Alert>
            </Snackbar>
        </>
    )
}

export default ModelAccordionForm
