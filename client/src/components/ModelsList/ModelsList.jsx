import { useRef } from "react"
import { NavLink } from "react-router-dom"

import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"

import styles from "./ModelsList.module.css"

const ModelsList = ({ list, listBtnClickHandle }) => {
    const navLinkRef = useRef(null)

    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    maxHeight: "80vh",
                    overflow: "auto",
                    margin: "0 auto",
                }}
            >
                <List>
                    {list.map((model) => {
                        return (
                            <ListItem disablePadding key={model._id}>
                                <ListItemButton
                                    LinkComponent={NavLink}
                                    to={`/model/${model._id}`}
                                    onClick={listBtnClickHandle}
                                >
                                    {model.name}
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
        </>
    )
}

export default ModelsList
