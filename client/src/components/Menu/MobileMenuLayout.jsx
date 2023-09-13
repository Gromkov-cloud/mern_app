import { Box, IconButton, Menu, MenuItem } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { NavLink } from "react-router-dom"
import authStore from "../../mobx-store/auth-store"
import { useState } from "react"

const MobileMenuLayout = () => {
    const { isAuth } = authStore
    const [anchorElNav, setAnchorElNav] = useState(null)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }
    return (
        <>
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
            </Box>
        </>
    )
}

export default MobileMenuLayout
