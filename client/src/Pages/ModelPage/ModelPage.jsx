import { useParams } from "react-router-dom"
import { Suspense } from "react"

import Menu from "../../components/Menu/Menu"
import DisplayMode from "../../components/DisplayMode/DisplayMode"
import Sidebar from "../../components/ModelsBar/ModelsBar"
import Model from "../../components/Model/Model"
import Container from "@mui/material/Container"
import CircularProgress from "@mui/material/CircularProgress"
import { alpha, styled } from "@mui/material/styles"

import styles from "./ModelPage.module.css"
import { Typography } from "@mui/material"

const ModelPageContainer = styled(Container)(() => ({
    background: "green",
    height: "100vh",
}))

const ModelPage = () => {
    const modelName = useParams().id

    const ModelProgress = () => {
        return (
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                }}
            >
                <CircularProgress sx={{}} />
            </div>
        )
    }

    const ModelPagePlaceholder = () => {
        return (
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                }}
            >
                <Typography variant="h6">Выберите модель</Typography>
            </div>
        )
    }

    return (
        <>
            <Menu />
            <Container maxWidth="xl" className={styles.model_frame}>
                <Sidebar />
                {modelName ? (
                    <Suspense fallback={<ModelProgress />}>
                        <Model id={modelName} />
                    </Suspense>
                ) : (
                    <ModelPagePlaceholder />
                )}
            </Container>
        </>
    )
}
export default ModelPage
