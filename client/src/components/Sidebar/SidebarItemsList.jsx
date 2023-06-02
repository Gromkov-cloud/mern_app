import { useState } from "react"

import { NavLink } from "react-router-dom"

import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import AddCircleIcon from "@mui/icons-material/AddCircle"

const routesList = [
    {
        path: "/admin",
        name: "Список моделей",
        icon: <FormatListBulletedIcon />,
    },
    {
        path: "add",
        name: "Добавить модель",
        icon: <AddCircleIcon />,
    },
]

const SidebarItemsList = () => {
    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleListItemClick = (index) => {
        setSelectedIndex(index)
    }
    return (
        <List component="nav">
            {routesList.map((item, index) => {
                return (
                    <ListItemButton
                        key={index}
                        selected={selectedIndex === index}
                        onClick={(event) =>
                            handleListItemClick(event, { index })
                        }
                        LinkComponent={NavLink}
                        to={item.path}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItemButton>
                )
            })}
        </List>
    )
}

export default SidebarItemsList
