import { observer } from "mobx-react-lite"

import { AppBar, Container, Toolbar } from "@mui/material"

import UserMenu from "./UserMenu"
import MobileMenuLayout from "./MobileMenuLayout"
import DesktopMenuLayout from "./DesktopMenuLayout"

const ResponsiveAppBar = observer(() => {
    const routes = [
        {
            name: "Главная",
            path: "/",
        },
        {
            name: "Модели",
            path: "/model",
        },
    ]
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <MobileMenuLayout routes={routes} />
                    <DesktopMenuLayout routes={routes} />
                    <UserMenu />
                </Toolbar>
            </Container>
        </AppBar>
    )
})
export default ResponsiveAppBar
