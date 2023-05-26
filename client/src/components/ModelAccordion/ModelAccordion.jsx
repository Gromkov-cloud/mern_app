import { useEffect, useState } from "react"

import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"

import ModelAccordionList from "./ModelAccordionList"

const getModels = async (setData) => {
    const response = await fetch("/api/models")
    const data = await response.json()
    setData(data)
}

const ModelAccordion = () => {
    const [models, setModels] = useState([])

    useEffect(() => {
        getModels(setModels)
    }, [])

    return (
        <>
            {/* TITLE */}
            <Typography variant="h5" textAlign={"center"}>
                Выберете модель
            </Typography>
            <Divider
                sx={{
                    margin: "15px 0",
                }}
            />

            {/* ACCORDION CONTENT */}
            {!models.length ? (
                <Typography>Добавьте модели</Typography>
            ) : (
                <ModelAccordionList models={models} />
            )}
        </>
    )
}

export default ModelAccordion
