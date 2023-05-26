import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"

import Menu from "../../components/Menu/Menu"
import Sidebar from "../../components/Sidebar/Sidebar"
import AdminPageContentPanel from "./AdminPageContentPanel"
import PageTitle from "./PageTitle"

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

                {/* SIDEBAR, CONTENT PANEL */}
                <Container
                    maxWidth="false"
                    sx={(theme) => ({
                        backgroundColor: theme.palette.primary.main,
                        flexGrow: 3,
                    })}
                >
                    <Container maxWidth="xl" sx={{ paddingBottom: "30px" }}>
                        <Grid
                            container
                            columnSpacing={4}
                            sx={{
                                color: "#000",
                            }}
                        >
                            <Grid item xs={3}>
                                <Sidebar />
                            </Grid>
                            <Grid item xs={9}>
                                <AdminPageContentPanel />
                            </Grid>
                        </Grid>
                    </Container>
                </Container>
            </Container>
        </>
    )
}

export default AdminPage
