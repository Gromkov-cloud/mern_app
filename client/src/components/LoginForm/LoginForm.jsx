import LoadingButton from "@mui/lab/LoadingButton/LoadingButton"
import {
    Alert,
    Box,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Snackbar,
    Stack,
    TextField,
} from "@mui/material"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { observer } from "mobx-react-lite"
import authStore from "../../mobx-store/auth-store"
import { useNavigate } from "react-router-dom"
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"

const LoginForm = observer(() => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
        watch,
    } = useForm()
    const navigate = useNavigate()

    const formWatch = watch()
    const alertDuration = 3000

    const [loading, setLoading] = useState(false)
    const [isBadCredentials, setIsBadCredentials] = useState(false)
    const [open, setOpen] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const isEmailValid = (email) => {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return emailRegex.test(email)
    }

    useEffect(() => {
        setIsBadCredentials(false)
    }, [formWatch.email, formWatch.password])

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return
        }

        setOpen(false)
        navigate("/admin")
    }

    const onFormSubmit = async (data) => {
        setIsBadCredentials(false)

        setLoading(true)
        const res = await authStore.logIn(data.email, data.password)
        setLoading(false)

        if (!res) {
            setOpen(true)
            reset()
            return
        }
        setIsBadCredentials(true)
    }

    return (
        <>
            <Stack
                direction="column"
                alignItems="center"
                spacing={2}
                sx={{ margin: "50px 15px 0" }}
            >
                <Box component="span" sx={{ fontSize: "24px" }}>
                    Авторизация
                </Box>

                <form
                    onSubmit={handleSubmit(onFormSubmit)}
                    style={{ width: "100%" }}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            maxWidth: "300px",
                            width: "100%",
                            margin: "0 auto",
                        }}
                    >
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: "Введите почту",
                                minLength: {
                                    value: 5,
                                    message:
                                        "Минимальная длинна почты 5 символов",
                                },
                                validate: (value) =>
                                    isEmailValid(value) ||
                                    "Введите корректный адресс почты",
                            }}
                            render={({ field: { onChange, value = "" } }) => (
                                <TextField
                                    onChange={onChange}
                                    value={value}
                                    id="outlined-basic"
                                    fullWidth
                                    label="Почта"
                                    variant="outlined"
                                    sx={{ color: "#000" }}
                                    helperText={
                                        errors.email?.message || "Введите почту"
                                    }
                                    error={!!errors.email || isBadCredentials}
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: "Введите пароль",
                                minLength: {
                                    value: 5,
                                    message:
                                        "Минимальная длинная пароля 5 символов",
                                },
                            }}
                            render={({ field: { onChange, value = "" } }) => (
                                <>
                                    <FormControl
                                        variant="outlined"
                                        error={
                                            !!errors.password ||
                                            isBadCredentials
                                        }
                                    >
                                        <InputLabel htmlFor="outlined-adornment-password">
                                            Пароль
                                        </InputLabel>
                                        <OutlinedInput
                                            onChange={onChange}
                                            value={value}
                                            id="outlined-adornment-password"
                                            label="Пароль"
                                            variant="outlined"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={
                                                            handleClickShowPassword
                                                        }
                                                        onMouseDown={
                                                            handleMouseDownPassword
                                                        }
                                                        edge="end"
                                                    >
                                                        {showPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            sx={{ color: "#000" }}
                                            aria-describedby="outlined-password-helper-text"
                                        />
                                        <FormHelperText id="outlined-password-helper-text">
                                            {errors.password?.message ||
                                                "Ведите пароль"}
                                        </FormHelperText>
                                    </FormControl>
                                </>
                            )}
                        />

                        <Box
                            component={"span"}
                            sx={{
                                textAlign: "center",
                                color: "#d32f2f",
                                margin: 0,
                            }}
                        >
                            {isBadCredentials
                                ? "Введены неправильные логин или пароль"
                                : ""}
                        </Box>

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
            <Snackbar
                open={open}
                autoHideDuration={alertDuration}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={"success"}
                    sx={{ width: "100%" }}
                >
                    Авторизация прошла успешно! Переходим на страницу
                    администрирования...
                </Alert>
            </Snackbar>
        </>
    )
})

export default LoginForm
