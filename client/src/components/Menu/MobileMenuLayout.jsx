import { Box, IconButton, Menu, MenuItem } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import ViewInArRoundedIcon from "@mui/icons-material/ViewInArRounded"

import { NavLink } from "react-router-dom"
import { useState } from "react"

const MobileMenuLayout = ({ routes }) => {
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
                    {routes.map((route) => {
                        return (
                            <MenuItem
                                key={route.path}
                                onClick={handleCloseNavMenu}
                                component={NavLink}
                                to={route.path}
                                style={{
                                    color: "black",
                                    textDecoration: "none",
                                }}
                            >
                                {route.name}
                            </MenuItem>
                        )
                    })}
                </Menu>
            </Box>
            <ViewInArRoundedIcon
                fontSize="medium"
                sx={{
                    display: { xs: "flex", md: "none", flexGrow: 1 },
                    mr: 1,
                }}
            />
        </>
    )
}

export default MobileMenuLayout
