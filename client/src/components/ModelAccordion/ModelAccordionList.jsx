import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"

import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

import ModelAccordionForm from "./ModelAccordionForm"
import ModelAccordionSecondInfo from "./ModelAccordionSecondInfo"
import { useState } from "react"

const ModelAccordionList = ({ models }) => {
    return models.map((model) => {
        const [isDeleted, setDeleted] = useState(false)

        return (
            <Accordion key={model._id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">
                        {isDeleted
                            ? `${model.name || "Без названия"} (Удалено)`
                            : model.name || "Без названия"}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box>
                        {/* MAIN INFO ---> */}
                        <Divider
                            sx={{
                                margin: "0 0 15px",
                            }}
                        />
                        <Typography variant="h6" sx={{ margin: "0 0 15px" }}>
                            Основная информация
                        </Typography>

                        <ModelAccordionForm
                            model={model}
                            setDeleted={setDeleted}
                            isDeleted={isDeleted}
                        />
                        {/* <---  MAIN INFO */}

                        {/* SECOND INFO ---> */}
                        <Divider
                            sx={{
                                margin: "15px 0",
                            }}
                        />
                        <Typography variant="h6" sx={{ margin: "0 0 15px" }}>
                            Общая информация
                        </Typography>

                        <ModelAccordionSecondInfo model={model} />
                        {/* <---  SECOND INFO */}
                    </Box>
                </AccordionDetails>
            </Accordion>
        )
    })
}

export default ModelAccordionList
