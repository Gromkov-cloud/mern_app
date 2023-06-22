import { Container } from "@mui/material"
import LoginForm from "../../components/LoginForm/LoginForm"
import ResponsiveAppBar from "../../components/Menu/Menu"

const LoginPage = () => {
    return (
        <>
            <Container
                maxWidth={false}
                disableGutters={true}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <ResponsiveAppBar />
                <LoginForm />
            </Container>
        </>
    )
}

export default LoginPage
