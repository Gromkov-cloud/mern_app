import { useState, useEffect } from "react"

import styles from "./ModelsBar.module.css"

import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown"
import { Container } from "@mui/material"

import ModelsList from "../ModelsList/ModelsList"
import DisplayMode from "../DisplayMode/DisplayMode"

const ModelsBar = () => {
    const [isDrawerOpen, setDrawerOpen] = useState(false)

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen)
    }

    const [models, setModels] = useState([])
    const getModels = async () => {
        const response = await fetch("/api/models")
        const data = await response.json()
        setModels(data)
    }

    useEffect(() => {
        getModels()
    }, [])

    return (
        <>
            <Container
                sx={{
                    position: "absolute",
                    bottom: "8px",
                    left: "50%",
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",

                    width: "max-content",
                    transform: "translate(-50%,0)",
                    zIndex: "2",
                }}
            >
                <Button
                    variant="contained"
                    onClick={toggleDrawer}
                    sx={{ minWidth: "fit-content" }}
                >
                    Выбрать модель
                </Button>
                <DisplayMode />
            </Container>

            <Drawer
                anchor={"bottom"}
                open={isDrawerOpen}
                onClose={toggleDrawer}
                PaperProps={{
                    sx: {
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    },
                }}
            >
                <ModelsList list={models} listBtnClickHandle={toggleDrawer} />
                <IconButton
                    aria-label="Закрыть"
                    onClick={toggleDrawer}
                    sx={{ width: "fit-content" }}
                >
                    <KeyboardDoubleArrowDownIcon />
                </IconButton>
            </Drawer>
        </>
    )
}

export default ModelsBar
