import { Box, Typography } from "@mui/material"

const getParamsList = (model) => [
    {
        name: "Название в хранилище",
        value: model.s3.model || "Название не указано",
    },
    { name: "Размер", value: model.weight || "Размер не указан" },
    { name: "Дата добавление", value: model.date || "Дата не указана" },
]

const ModelAccordionSecondInfo = ({ model }) => {
    const paramsList = getParamsList(model)

    return (
        <Box sx={{ display: "flex", gap: "20px" }}>
            {paramsList.map((param) => (
                <Box>
                    <Typography
                        sx={(theme) => ({
                            fontSize: "16px",
                            color: theme.palette.text.secondary,
                        })}
                    >
                        {param.name}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "18px",
                        }}
                    >
                        {param.value}
                    </Typography>
                </Box>
            ))}
        </Box>
    )
}

export default ModelAccordionSecondInfo
