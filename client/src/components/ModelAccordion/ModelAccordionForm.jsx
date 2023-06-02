import { Controller, useForm } from "react-hook-form"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Switch from "@mui/material/Switch"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import FileLoader from "../FileLoader/FileLoader"
import ModelAccordionThumb from "./ModelAccordionThumb"

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

const ModelAccordionForm = ({ model }) => {
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
        }

        const response = await fetch(`/api/model/update/${model._id}`, {
            method: "POST",
            body: formData,
        })

        console.log(await response.json())
    }

    const deleteBtnClickHandle = async (modelId) => {
        const result = await fetch(`/api/model/${modelId}`, {
            method: "DELETE",
        })
        console.log(await result.body.json)
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
                                name="name"
                                control={control}
                                render={({
                                    field: { onChange, value = model.name },
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
                                    value = model.description || null,
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
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{ m: "15px 0" }}
                    onClick={() => {
                        deleteBtnClickHandle(model._id)
                    }}
                >
                    Удалить модель
                </Button>
                {/* <---  MODEL DELETE BTN */}

                {/* FORM SUBMIT BTN ---> */}
                <Button
                    variant="contained"
                    type="submit"
                    sx={{ width: "100%" }}
                >
                    Сохранить изменения
                </Button>
                {/* <---  FORM SUBMIT BTN */}
            </form>
        </>
    )
}

export default ModelAccordionForm
