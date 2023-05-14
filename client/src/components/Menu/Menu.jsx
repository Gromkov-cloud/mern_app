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

const settings = ["Profile", "Account", "Dashboard", "Logout"]

function ResponsiveAppBar() {
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

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ViewInArRoundedIcon
                        fontSize="large"
                        sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                    />

                    <Box
                        sx={{
                            display: { xs: "flex", md: "none" },
                        }}
                    >
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
                            <MenuItem onClick={handleCloseNavMenu}>
                                <NavLink
                                    to={"/"}
                                    style={{
                                        color: "black",
                                        textDecoration: "none",
                                    }}
                                >
                                    Root
                                </NavLink>

                                {/* <Typography textAlign="center">Root</Typography> */}
                            </MenuItem>

                            <MenuItem>
                                <NavLink
                                    to={"/model"}
                                    style={{
                                        color: "black",
                                        textDecoration: "none",
                                    }}
                                >
                                    model
                                </NavLink>
                            </MenuItem>
                            <MenuItem>
                                <NavLink
                                    to={"/admin"}
                                    style={{
                                        color: "black",
                                        textDecoration: "none",
                                    }}
                                >
                                    admin
                                </NavLink>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <ViewInArRoundedIcon
                        fontSize="medium"
                        sx={{
                            display: { xs: "flex", md: "none", flexGrow: 1 },
                            mr: 1,
                        }}
                    />
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                        >
                            <NavLink
                                to={"/"}
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                }}
                            >
                                Root
                            </NavLink>
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                        >
                            <NavLink
                                to={"/model"}
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                }}
                            >
                                Models
                            </NavLink>
                        </Button>
                        <Button
                            onClick={handleCloseNavMenu}
                            sx={{ my: 2, color: "white", display: "block" }}
                        >
                            <NavLink
                                to={"/admin"}
                                style={{
                                    color: "white",
                                    textDecoration: "none",
                                }}
                            >
                                Admin
                            </NavLink>
                        </Button>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
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
                            <MenuItem onClick={handleCloseUserMenu}>
                                <NavLink
                                    to={"/"}
                                    style={{
                                        color: "black",
                                        textDecoration: "none",
                                    }}
                                >
                                    Root
                                </NavLink>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <NavLink
                                    to={"/model"}
                                    style={{
                                        color: "black",
                                        textDecoration: "none",
                                    }}
                                >
                                    model
                                </NavLink>
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                <NavLink
                                    to={"/admin"}
                                    style={{
                                        color: "black",
                                        textDecoration: "none",
                                    }}
                                >
                                    admin
                                </NavLink>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default ResponsiveAppBar
