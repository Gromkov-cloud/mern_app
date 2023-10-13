import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"

import Menu from "../../components/Menu/Menu"
import AdminPageContentPanel from "./AdminPageContentPanel"
import PageTitle from "./PageTitle"
import { Box } from "@mui/material"

const AdminPage = () => {
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
                <Menu />
                <PageTitle />

                <Container
                    maxWidth="false"
                    sx={(theme) => ({
                        backgroundColor: theme.palette.primary.main,
                        flexGrow: 3,
                    })}
                >
                    <Container
                        maxWidth={"xl"}
                        sx={{
                            paddingBottom: "30px",
                            color: "#000",
                            margin: "0 auto",
                            padding: "0",
                        }}
                    >
                        <AdminPageContentPanel />
                    </Container>
                </Container>
            </Container>
        </>
    )
}

export default AdminPage
