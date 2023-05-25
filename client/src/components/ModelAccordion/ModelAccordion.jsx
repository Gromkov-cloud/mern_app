import Typography from "@mui/material/Typography"

import ModelAccordionList from "./ModelAccordionList"

const ModelAccordion = ({ models }) => {
    return (
        <>
            {!models.length ? (
                <Typography>Добавьте модели</Typography>
            ) : (
                <ModelAccordionList models={models} />
            )}
        </>
    )
}

export default ModelAccordion
