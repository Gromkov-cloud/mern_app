import { useForm, Controller } from "react-hook-form"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import FileLoader from "../FileLoader/FileLoader"
import { Box, Divider, Typography } from "@mui/material"

const ModelAddForm = () => {
    const {
        handleSubmit,
        control,

        formState: { errors },
    } = useForm()

    const onFormSubmit = async (data) => {
        const formData = new FormData()
        formData.append("files", data.modelFile)
        formData.append("files", data.modelThumbnail)
        formData.append("name", JSON.stringify(data.modelName))
        formData.append("description", JSON.stringify(data.modelDescription))

        console.log(formData)

        // const result = await fetch("/api/model", {
        //     method: "POST",
        //     body: formData,
        // })

        // console.log(await result.json())
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
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",

                        gap: "20px",
                        m: "20px 0",
                    }}
                >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                <Button fullWidth variant="contained" type="submit">
                    Добавить модель
                </Button>
            </form>
        </>
    )
}

export default ModelAddForm
