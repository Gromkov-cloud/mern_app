import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

const PageTitle = () => {
    return (
        <>
            <Container maxWidth={false} sx={{ backgroundColor: "#EBEBEB" }}>
                <Container maxWidth="xl" sx={{ padding: "80px 0" }}>
                    <Typography variant="h4">
                        Страница администрирования
                    </Typography>
                    <Typography variant="subtitle1">
                        Добавление и изменение моделей
                    </Typography>
                </Container>
            </Container>
        </>
    )
}

export default PageTitle
