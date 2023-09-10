import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuIcon from "@mui/icons-material/Menu"
import Container from "@mui/material/Container"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import Tooltip from "@mui/material/Tooltip"
import MenuItem from "@mui/material/MenuItem"
import ViewInArRoundedIcon from "@mui/icons-material/ViewInArRounded"
import { NavLink } from "react-router-dom"
import authStore from "../../mobx-store/auth-store"
import { observer } from "mobx-react-lite"

const ResponsiveAppBar = observer(() => {
    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleLogOut = () => {
        handleCloseUserMenu()
        authStore.logOut()
    }

    const { isAuth } = authStore

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ViewInArRoundedIcon
                        fontSize="medium"
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />

                    <Box
                        sx={{
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        {/* BURGER ICON ---> */}
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        {/* <---  BURGER ICON */}

                        {/* MOBILE MENU ---> */}
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            <MenuItem
                                onClick={handleCloseNavMenu}
                                component={NavLink}
                                to={"/"}
                                style={{
                                    color: "black",
                                    textDecoration: "none",
                                }}
                            >
                                Главная
                            </MenuItem>

                            <MenuItem
                                onClick={handleCloseNavMenu}
                                component={NavLink}
                                to={"/model"}
                                style={{
                                    color: "black",
                                    textDecoration: "none",
                                }}
                            >
                                Модели
                            </MenuItem>
                            {!isAuth ? null : (
                                <MenuItem
                                    onClick={handleCloseNavMenu}
                                    component={NavLink}
                                    to={"/admin"}
                                    style={{
                                        color: "black",
                                        textDecoration: "none",
                                    }}
                                >
                                    Админка
                                </MenuItem>
                            )}
                        </Menu>
                        {/* <---  MOBILE MENU */}
                    </Box>

                    <ViewInArRoundedIcon
                        fontSize="medium"
                        sx={{
                            display: { xs: "flex", md: "none", flexGrow: 1 },
                            mr: 1,
                        }}
                    />
                    {/* DESKTOP MENU ---> */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                            component={NavLink}
                            to={"/"}
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            Главная
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                            component={NavLink}
                            to={"/model"}
                            style={{
                                color: "white",
                                textDecoration: "none",
                            }}
                        >
                            Модели
                        </Button>
                        {!isAuth ? null : (
                            <Button
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: "white", display: "block" }}
                                component={NavLink}
                                to={"/admin"}
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                }}
                            >
                                Админка
                            </Button>
                        )}
                    </Box>
                    {/* <---  DESKTOP MENU */}

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip>
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar alt="Remy Sharp" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {!isAuth ? (
                                <MenuItem
                                    onClick={handleCloseUserMenu}
                                    component={NavLink}
                                    to={"/login"}
                                    style={{
                                        color: "black",
                                        textDecoration: "none",
                                    }}
                                >
                                    Войти
                                </MenuItem>
                            ) : (
                                <MenuItem
                                    onClick={handleLogOut}
                                    component={NavLink}
                                    to={"/login"}
                                    style={{
                                        color: "black",
                                        textDecoration: "none",
                                    }}
                                >
                                    Выйти
                                </MenuItem>
                            )}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
})
export default ResponsiveAppBar
