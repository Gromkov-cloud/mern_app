import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Container,
    Divider,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Switch,
    TextField,
    Typography,
} from "@mui/material"
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted"
import AddCircleIcon from "@mui/icons-material/AddCircle"

import Menu from "../../components/Menu/Menu"

import { useEffect, useState } from "react"
import { NavLink, Route, Routes } from "react-router-dom"
import ModelAddForm from "../../components/ModelAddForm/ModelAddForm"
import ModelsList from "../../components/ModelsList/ModelsList"
import { Controller, useForm } from "react-hook-form"
import FileLoader from "../../components/FileLoader/FileLoader"
import ModelAccordion from "../../components/ModelAccordion/ModelAccordion"

const AdminPage = () => {
    const [models, setModels] = useState([])

    const getModels = async () => {
        const response = await fetch("/api/models")
        const data = await response.json()
        setModels(data)
    }

    useEffect(() => {
        getModels()
    }, [])

    const [selectedIndex, setSelectedIndex] = useState(0)

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index)
    }

    const Acomp = () => {
        console.log("Acomp")
        return <h1>acomp</h1>
    }

    return (
        <>
            <Container
                maxWidth={false}
                disableGutters={true}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <Menu />
                <Container maxWidth={false} sx={{ backgroundColor: "#EBEBEB" }}>
                    <Container maxWidth="xl" sx={{ padding: "80px 0" }}>
                        <Typography variant="h4">
                            Страница администрирования
                        </Typography>
                        <Typography variant="subtitle1">
                            Добавление и изменение моделей
                        </Typography>
                    </Container>
                </Container>
                <Container
                    maxWidth="false"
                    sx={(theme) => ({
                        backgroundColor: theme.palette.primary.main,
                        flexGrow: 3,
                    })}
                >
                    <Container maxWidth="xl" sx={{ paddingBottom: "30px" }}>
                        <Grid
                            container
                            columnSpacing={4}
                            sx={(theme) =>
                                // console.log(theme.palette)
                                ({
                                    color: "#000",
                                })
                            }
                        >
                            <Grid item xs={3}>
                                <Box
                                    sx={(theme) => ({
                                        backgroundColor: "#fff",
                                        padding: "20px 0",
                                        marginTop: "-30px",
                                    })}
                                >
                                    <Typography
                                        variant="h5"
                                        textAlign={"center"}
                                    >
                                        Меню
                                    </Typography>
                                    <Divider sx={{ marginTop: "10px" }} />
                                    <List component="nav">
                                        <ListItemButton
                                            selected={selectedIndex === 0}
                                            onClick={(event) =>
                                                handleListItemClick(event, 0)
                                            }
                                            LinkComponent={NavLink}
                                            to={"/admin"}
                                        >
                                            <ListItemIcon>
                                                <FormatListBulletedIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Список моделей" />
                                        </ListItemButton>
                                        <ListItemButton
                                            selected={selectedIndex === 1}
                                            onClick={(event) =>
                                                handleListItemClick(event, 1)
                                            }
                                            LinkComponent={NavLink}
                                            to={"add"}
                                        >
                                            <ListItemIcon>
                                                <AddCircleIcon />
                                            </ListItemIcon>
                                            <ListItemText primary="Добавить модель" />
                                        </ListItemButton>
                                    </List>
                                </Box>
                            </Grid>
                            <Grid item xs={9}>
                                <Box
                                    sx={(theme) => ({
                                        backgroundColor: "#fff",
                                        padding: "20px",
                                        marginTop: "-30px",
                                    })}
                                >
                                    <Routes>
                                        <Route
                                            path="/"
                                            element={
                                                <>
                                                    <Typography
                                                        variant="h5"
                                                        textAlign={"center"}
                                                    >
                                                        Выберете модель
                                                    </Typography>
                                                    <Divider
                                                        sx={{
                                                            margin: "15px 0",
                                                        }}
                                                    />
                                                    <ModelAccordion
                                                        models={models}
                                                    />
                                                </>
                                            }
                                        ></Route>
                                        <Route
                                            path="/add"
                                            element={<ModelAddForm />}
                                        ></Route>
                                    </Routes>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Container>
            </Container>
        </>
    )
}

export default AdminPage
