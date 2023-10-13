import { useEffect, useState } from "react"

import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"

import ModelAccordionList from "./ModelAccordionList"
import ModelService from "../../services/ModelService"

const ModelAccordion = () => {
    const [models, setModels] = useState([])

    useEffect(() => {
        const fetchModels = async () => {
            const models = await ModelService.fetchModels()
            setModels(models.data)
        }
        fetchModels()
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
