import { Controller, useForm } from "react-hook-form"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import Switch from "@mui/material/Switch"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

import FileLoader from "../FileLoader/FileLoader"
import ModelAccordionThumb from "./ModelAccordionThumb"

const lorem100 =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu iaculis dui, a pretium enim. Fusce non tellus tempor, vehicula mauris in, bibendum lorem. Etiam mollis lorem ac justo eleifend ornare. Etiam sollicitudin ultrices maximus. Quisque augue nisi, porttitor non dignissim sed, imperdiet et orci. Ut nibh libero, dictum ut urna sit amet, convallis ultricies massa. Sed auctor ex et risus vestibulum tincidunt. Pellentesque maximus nisi ac metus scelerisque, sed semper metus gravida. "

const ModelAccordionForm = ({ model }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm()

    const onFormSubmit = async (data) => {
        console.log(data)
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
                            <ModelAccordionThumb imgSrc={model.img} />
                            {/* <---  MODEL THUMB INPUT*/}
                        </Box>
                    </Grid>
                    {/* <---  MODEL NAME AND MODEL THUMB CONTAINER */}

                    {/* MODEL DESCRIPTION INPUT CONTAINER ---> */}
                    <Grid item xs={8}>
                        <Controller
                            name="modelDescription"
                            control={control}
                            render={({
                                field: { onChange, value = lorem100 },
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
                            render={({ field: { onChange, value = "" } }) => (
                                <FileLoader
                                    setFile={onChange}
                                    file={value}
                                    title={"Изменить файл модели"}
                                />
                            )}
                        />
                    </Box>
                    {/* <---  MODEL FILE INPUT */}

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
                            <Switch />
                            Активировать модель
                        </Typography>
                    </Box>
                    {/* <---  SWITCHER */}

                    {/* FORM SUBMIT BTN ---> */}
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{ width: "100%" }}
                    >
                        Сохранить изменения
                    </Button>
                    {/* <---  FORM SUBMIT BTN */}
                </Box>
            </form>
        </>
    )
}

export default ModelAccordionForm
