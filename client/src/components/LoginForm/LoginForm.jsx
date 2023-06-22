import LoadingButton from "@mui/lab/LoadingButton/LoadingButton"
import { Box, Button, Container, Stack, TextField } from "@mui/material"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import API from "../../http"
import AuthService from "../../services/AuthService"

const LoginForm = () => {
    const [loading, setLoading] = useState(false)
    const [isSuccess, setSuccess] = useState(true)
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm()

    const onFormSubmit = async (data) => {
        const res = await AuthService.login(data.email, data.password)
        if (!res.data) {
            console.log(res)
        }
        console.log(res.data)
    }

    return (
        <>
            <Stack
                direction="column"
                alignItems="center"
                spacing={2}
                sx={{ marginTop: "50px" }}
            >
                <Box component="span" sx={{ fontSize: "24px" }}>
                    Авторизация
                </Box>

                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Stack spacing={2}>
                        <Controller
                            name="email"
                            control={control}
                            rules={{ required: "Введите email" }}
                            render={({
                                field: {
                                    onChange,
                                    value = "gromkov.dev@gmail.ru",
                                },
                            }) => (
                                <TextField
                                    onChange={onChange}
                                    value={value}
                                    id="outlined-basic"
                                    label="email"
                                    variant="outlined"
                                    sx={{ color: "#000" }}
                                    helperText={errors.email?.message}
                                    error={!!errors.email}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: "Введите пароль" }}
                            render={({
                                field: { onChange, value = "gromkov-web2020" },
                            }) => (
                                <TextField
                                    type="password"
                                    onChange={onChange}
                                    value={value}
                                    id="outlined-basic"
                                    label="пароль"
                                    variant="outlined"
                                    sx={{ color: "#000" }}
                                    helperText={errors.password?.message}
                                    error={!!errors.password}
                                />
                            )}
                        />

                        <LoadingButton
                            loading={loading}
                            fullWidth
                            variant="contained"
                            type="submit"
                            startIcon={false}
                            disabled={!!Object.keys(errors).length}
                        >
                            Войти
                        </LoadingButton>
                    </Stack>
                </form>
            </Stack>
        </>
    )
}

export default LoginForm
