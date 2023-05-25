import {
    Box,
    Button,
    Divider,
    Switch,
    TextField,
    Typography,
} from "@mui/material"
import { Controller, useForm } from "react-hook-form"
import FileLoader from "../FileLoader/FileLoader"

const ModelAccordionForm = ({ model }) => {
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
            <form onSubmit={handleSubmit(onFormSubmit)}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}
                >
                    <Box>
                        <Controller
                            name="modelName"
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
                                        width: "fit-content",
                                    }}
                                />
                            )}
                        />
                    </Box>

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

                    <Button size="medium" variant="outlined" type="submit">
                        Сохранить изменения
                    </Button>
                </Box>
            </form>
            <Typography
                sx={(theme) => ({
                    fontSize: "16px",
                    color: theme.palette.text.secondary,
                })}
            >
                Название
            </Typography>
            <Typography
                sx={(theme) => ({
                    fontSize: "18px",
                })}
            >
                {model.name}
            </Typography>
            <Typography
                sx={(theme) => ({
                    fontSize: "16px",
                    color: theme.palette.text.secondary,
                })}
            >
                Название в хранилище
            </Typography>
            <Typography
                sx={(theme) => ({
                    fontSize: "18px",
                })}
            >
                {model.s3.model}
            </Typography>
            <Typography
                sx={(theme) => ({
                    fontSize: "16px",
                    color: theme.palette.text.secondary,
                })}
            >
                Размер
            </Typography>
            <Typography
                sx={(theme) => ({
                    fontSize: "18px",
                })}
            >
                1.4 мб
            </Typography>
            <Typography
                sx={(theme) => ({
                    fontSize: "16px",
                    color: theme.palette.text.secondary,
                })}
            >
                Описание
            </Typography>
            <Typography
                sx={(theme) => ({
                    fontSize: "18px",
                })}
            >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Dolorem facilis omnis dignissimos eius amet numquam labore ipsum
                et. Ea voluptatem unde numquam id autem alias, consectetur,
                totam vel deleniti est hic earum obcaecati rerum maxime
                quisquam, quasi cum quidem? Quae animi et perspiciatis dolorem
                quasi quas, aliquam consequuntur ab nam odit adipisci aliquid,
                rerum hic, magni ducimus molestiae ipsum delectus! Asperiores
                assumenda neque reiciendis. Quam, totam explicabo. Saepe
                dolores, porro eum commodi odio harum veniam quaerat esse magnam
                minima nemo iste consectetur fugiat dicta incidunt quasi dolorum
                tempora! Perferendis consectetur iure, dignissimos magni nostrum
                ullam ipsam architecto neque earum id!
            </Typography>
            <Typography
                sx={(theme) => ({
                    fontSize: "16px",
                    color: theme.palette.text.secondary,
                })}
            >
                Миниатюра
            </Typography>
            <Typography
                sx={(theme) => ({
                    fontSize: "18px",
                })}
            >
                картинка
            </Typography>

            <Typography
                sx={(theme) => ({
                    fontSize: "16px",
                    color: theme.palette.text.secondary,
                })}
            >
                Дата добавления
            </Typography>
            <Typography
                sx={(theme) => ({
                    fontSize: "18px",
                })}
            >
                21.07.22
            </Typography>
            <Typography
                sx={(theme) => ({
                    fontSize: "16px",
                    color: theme.palette.text.secondary,
                })}
            >
                <Switch />
                Активировать модель
            </Typography>

            <Divider
                sx={{
                    margin: "15px 0",
                }}
            />
            <Typography variant="h6" sx={{ margin: "0 0 15px" }}>
                Редактирование
            </Typography>
        </>
    )
}

export default ModelAccordionForm
