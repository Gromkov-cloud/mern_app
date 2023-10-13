import { useParams } from "react-router-dom"
import { Suspense, useState } from "react"

import Menu from "../../components/Menu/Menu"
import Sidebar from "../../components/ModelsBar/ModelsBar"
import Model from "../../components/Model/Model"
import Container from "@mui/material/Container"
import CircularProgress from "@mui/material/CircularProgress"

import styles from "./ModelPage.module.css"
import { Typography } from "@mui/material"
import { observer } from "mobx-react-lite"
import modelPageStore from "../../mobx-store/model-page-store"
import ModelAR from "./ModelAR"

const ModelPage = observer(() => {
    const modelName = useParams().id
    const isDisplayModeAR = modelPageStore.isDisplayModeAR

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
            <Container
                maxWidth="false"
                disableGutters
                className={styles.model_frame}
            >
                <Sidebar />
                {modelName ? (
                    <>
                        {isDisplayModeAR ? (
                            <Suspense fallback={<ModelProgress />}>
                                <ModelAR />
                            </Suspense>
                        ) : (
                            <Suspense fallback={<ModelProgress />}>
                                <Model id={modelName} />
                            </Suspense>
                        )}
                    </>
                ) : (
                    <ModelPagePlaceholder />
                )}
            </Container>
        </>
    )
})
export default ModelPage
