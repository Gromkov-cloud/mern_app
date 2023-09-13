import { observer } from "mobx-react-lite"

import { AppBar, Container, Toolbar } from "@mui/material"
import ViewInArRoundedIcon from "@mui/icons-material/ViewInArRounded"

import UserMenu from "./UserMenu"
import MobileMenuLayout from "./MobileMenuLayout"
import DesktopMenuLayout from "./DesktopMenuLayout"

const ResponsiveAppBar = observer(() => {
    const routes = {
        mainLinks: [
            {
                name: "Главная",
                route: "/",
            },
            {
                name: "Модели",
                route: "/model",
            },
        ],
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ViewInArRoundedIcon
                        fontSize="medium"
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />
                    <MobileMenuLayout menuLinks={routes.mainLinks} />
                    <ViewInArRoundedIcon
                        fontSize="medium"
                        sx={{
                            display: { xs: "flex", md: "none", flexGrow: 1 },
                            mr: 1,
                        }}
                    />
                    <DesktopMenuLayout menuLinks={routes.mainLinks} />
                    <UserMenu menuLinks={routes.userLinks} />
                </Toolbar>
            </Container>
        </AppBar>
    )
})
export default ResponsiveAppBar
