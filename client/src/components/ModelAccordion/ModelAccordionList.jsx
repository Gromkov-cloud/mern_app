import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Divider,
    Typography,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ModelAccordionForm from "./ModelAccordionForm"

const ModelAccordionList = ({ models }) => {
    console.log(models)

    return models.map((model) => {
        return (
            <Accordion key={model._id}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">{model.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box>
                        <Divider
                            sx={{
                                margin: "0 0 15px",
                            }}
                        />
                        <Typography variant="h6" sx={{ margin: "0 0 15px" }}>
                            Общая информация
                        </Typography>
                        <ModelAccordionForm model={model} />
                    </Box>
                </AccordionDetails>
            </Accordion>
        )
    })
}

export default ModelAccordionList
