import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material"
import { useState } from "react"
import authStore from "../../mobx-store/auth-store"
import { NavLink, useNavigate } from "react-router-dom"
import { observer } from "mobx-react-lite"

const UserMenu = observer(() => {
    const [anchorElUser, setAnchorElUser] = useState(null)
    const { isAuth } = authStore
    const navigate = useNavigate()

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget)
    }
    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleLogOut = (e) => {
        handleCloseUserMenu()
        authStore.logOut()
    }

    const userLinks = [
        {
            name: "Редактор моделей",
            route: "/admin",
            isProtected: true,
            onClick: handleCloseUserMenu,
        },
        {
            name: "Добавить модель",
            route: "/admin/add",
            isProtected: true,
            onClick: handleCloseUserMenu,
        },
    ]

    const MenuLink = ({ linkData }) => {
        return (
            <MenuItem
                key={linkData.route}
                onClick={linkData.onClick}
                component={NavLink}
                to={linkData.route}
                style={{
                    color: "black",
                    textDecoration: "none",
                }}
            >
                {linkData.name}
            </MenuItem>
        )
    }

    return (
        <>
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                    {isAuth &&
                        userLinks.map((menuLink) => {
                            return (
                                <MenuLink
                                    key={menuLink.route}
                                    linkData={menuLink}
                                />
                            )
                        })}
                    {isAuth ? (
                        <MenuLink
                            key={"/logout"}
                            linkData={{
                                name: "Выйти",
                                route: "/",
                                onClick: handleLogOut,
                            }}
                        />
                    ) : (
                        <MenuLink
                            key={"/login"}
                            linkData={{
                                name: "Войти",
                                route: "/login",
                                onClick: handleCloseUserMenu,
                            }}
                        />
                    )}
                </Menu>
            </Box>
        </>
    )
})

export default UserMenu
