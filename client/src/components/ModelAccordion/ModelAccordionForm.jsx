import { Controller, useForm } from "react-hook-form"

import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Switch from "@mui/material/Switch"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import FileLoader from "../FileLoader/FileLoader"
import ModelAccordionThumb from "./ModelAccordionThumb"
import { Suspense, useState } from "react"
import { Alert, Snackbar } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton"
import ModelService from "../../services/ModelService"
import ModelPreview from "../ModelPreview/ModelPreview"
import { API_URL } from "../../http"

const Popup = ({
    text,
    isPopupOpen,
    setPopupOpen,
    severity,
    position,
    duration,
}) => {
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return
        }
        setPopupOpen(false)
    }
    return (
        <Snackbar
            open={isPopupOpen}
            autoHideDuration={duration || 6000}
            onClose={handleClose}
            anchorOrigin={
                position
                    ? { ...position }
                    : { vertical: "bottom", horizontal: "right" }
            }
        >
            <Alert
                onClose={handleClose}
                severity={severity || "error"}
                sx={{ width: "100%" }}
            >
                {text}
            </Alert>
        </Snackbar>
    )
}

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
    const [isNameSaveBtnLoading, setNameSaveBtnLoading] = useState(false)
    const [isDeleteBtnLoading, setDeleteBtnLoading] = useState(false)
    const [isSaveBtnLoading, setSaveBtnLoading] = useState(false)

    const [popupText, setPopupText] = useState("")
    const [isPopupOpen, setPopupOpen] = useState(false)
    const [popupSeverity, setPopupSeverity] = useState("success")
    const [modelUrl, setModelUrl] = useState()

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

    const onFormSubmit = async (data) => {
        console.log(data)
        const formData = createValidFormData(data, model._id)

        if (!formData) {
            console.log("no data")
            return
        }

        try {
            setSaveBtnLoading(true)
            const response = await ModelService.updateModel(model._id, formData)
            if (!(response.status === 200)) {
                popupHandlerOpen(
                    "Модель не удалось обновить, попробуйте позже",
                    "error"
                )
                return
            }

            popupHandlerOpen("Модель успешно обновлена!", "success")
        } catch (error) {
            console.log(error.response)
            popupHandlerOpen(
                "Модель не удалось обновить, попробуйте позже",
                "error"
            )
        } finally {
            setSaveBtnLoading(false)
        }
    }

    const deleteBtnClickHandle = async (modelId) => {
        try {
            setDeleteBtnLoading(true)
            const response = await ModelService.deleteModel(modelId)
            if (!(response.status === 200)) {
                setDeleteSuccess(false)
                return
            }
            popupHandlerOpen("Модель успешно удалена", "success")
            setDeleted(true)
        } catch (error) {
            console.log(error.response)
            popupHandlerOpen(
                "При удалении произошла ошибка, попробуйте позже",
                "error"
            )
        } finally {
            setDeleteBtnLoading(false)
        }
    }

    const popupHandlerOpen = (text, severity) => {
        setPopupText(text)
        setPopupSeverity(severity)
        setPopupOpen(true)
    }

    return (
        <>
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                    }}
                >
                    <Controller
                        name="modelName"
                        control={control}
                        render={({
                            field: { onChange, value = model.name || "" },
                        }) => (
                            <TextField
                                onChange={onChange}
                                value={value}
                                id="standard-basic"
                                variant="outlined"
                                label="Название модели на сайте"
                                helperText={errors.modelName?.message}
                                error={!!errors.modelName}
                                sx={{
                                    color: "#000",
                                    width: "100%",
                                }}
                            />
                        )}
                    />
                    <LoadingButton
                        loading={isNameSaveBtnLoading}
                        fullWidth
                        variant="contained"
                        sx={{ height: "100%" }}
                        onClick={() => console.log("haloworld")}
                        disabled={false}
                    >
                        Сохранить название модели
                    </LoadingButton>
                    <Box sx={{ width: "fit-content", margin: "0 auto" }}>
                        <Typography
                            sx={(theme) => ({
                                fontSize: "16px",
                                color: theme.palette.text.secondary,
                                marginTop: "10px",
                            })}
                        >
                            QR код
                        </Typography>
                        <Box sx={{ maxWidth: "300px" }}>
                            {model._id ? (
                                <img
                                    src={`${API_URL}/model-qr/${model._id}`}
                                    alt="qr код"
                                />
                            ) : (
                                "Добавьте QR код"
                            )}
                        </Box>
                    </Box>
                    {/* <input
                        type="file"
                        onChange={(e) => {
                            setModelUrl(URL.createObjectURL(e.target.files[0]))
                            console.log(e.target.files)
                        }}
                    />
                    {modelUrl ? (
                        <Suspense fallback={"await..."}>
                            <ModelPreview modelUrl={modelUrl} />
                        </Suspense>
                    ) : (
                        "change the model"
                    )} */}
                    <LoadingButton
                        // loading={isNameSaveBtnLoading}
                        fullWidth
                        variant="outlined"
                        onClick={() => console.log("haloworld")}
                        disabled={false}
                    >
                        Изменить QR код
                    </LoadingButton>
                    <LoadingButton
                        // loading={isNameSaveBtnLoading}
                        fullWidth
                        variant="outlined"
                        onClick={() => console.log("haloworld")}
                        disabled={false}
                    >
                        Предпросмотр файла 3D модели
                    </LoadingButton>
                    <LoadingButton
                        // loading={isNameSaveBtnLoading}
                        fullWidth
                        variant="outlined"
                        onClick={() => console.log("haloworld")}
                        disabled={false}
                    >
                        Изменить файл 3D модели
                    </LoadingButton>
                    <LoadingButton
                        // loading={isNameSaveBtnLoading}
                        fullWidth
                        variant="outlined"
                        onClick={() => console.log("haloworld")}
                        disabled={false}
                    >
                        Активировать модель
                    </LoadingButton>
                    <LoadingButton
                        loading={isDeleteBtnLoading}
                        fullWidth
                        variant="contained"
                        onClick={() => deleteBtnClickHandle(model._id)}
                        disabled={isSaveBtnLoading || isDeleted}
                    >
                        Удалить модель
                    </LoadingButton>
                </Box>
                <Grid
                    container
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                        gap: "20px",
                        margin: "20px 0 0 0",
                    }}
                >
                    {/* MODEL FILE INPUT ---> */}
                    <Grid
                        item
                        sx={{
                            flexGrow: 2,
                            maxWidth: "fit-content",
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
                    </Grid>
                    {/* <---  MODEL FILE INPUT */}
                    {/* MODEL THUMB INPUT ---> */}
                    <Grid
                        item
                        sx={{
                            flexGrow: 2,
                            maxWidth: "fit-content",
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
                                    title={"Изменить qr код модели"}
                                />
                            )}
                        />
                    </Grid>
                    {/* <---  MODEL THUMB INPUT */}

                    {/* SWITCHER ---> */}
                    <Grid item>
                        <Grid
                            container
                            justifyContent={"center"}
                            alignItems={"center"}
                            direction={"column"}
                            sx={{
                                maxWidth: "max-content",
                                width: "100%",
                                borderRadius: "5px",
                                border: "1px solid gray",
                            }}
                        >
                            <Typography
                                sx={(theme) => ({
                                    fontSize: "16px",
                                    color: theme.palette.text.secondary,
                                    borderBottom: "1px solid gray",
                                    padding: "5px",
                                })}
                            >
                                Активировать модель
                            </Typography>
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
                        </Grid>
                    </Grid>

                    {/* <---  SWITCHER */}
                </Grid>
            </form>
            <Popup
                text={popupText}
                isPopupOpen={isPopupOpen}
                setPopupOpen={setPopupOpen}
                severity={popupSeverity}
            />
        </>
    )
}

export default ModelAccordionForm
