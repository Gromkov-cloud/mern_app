import { Box, Typography } from "@mui/material"

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return "0 Bytes"

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = [
        "Bytes",
        "KiB",
        "MiB",
        "GiB",
        "TiB",
        "PiB",
        "EiB",
        "ZiB",
        "YiB",
    ]

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const prettifyDate = (date) => {
    const dt = new Date(date)

    const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr)
    return `${padL(dt.getMonth() + 1)}-${padL(
        dt.getDate()
    )}-${dt.getFullYear()} ${padL(dt.getHours())}:${padL(dt.getMinutes())}`
}

const getParamsList = (model) => [
    {
        name: "Название модели в хранилище",
        value: model.s3.model || "Название не указано",
    },
    {
        name: "название миниатюры в хранилище",
        value: model.s3.image || "Миниатюра не добавлена",
    },
    {
        name: "Размер",
        value: model.size ? formatBytes(model.size, 3) : "Размер неизвестен",
    },
    {
        name: "Дата добавления ММ-ДД-ГГ",
        value: model.date ? prettifyDate(model.date) : "Дата не указана",
    },
]

const ModelAccordionSecondInfo = ({ model }) => {
    const paramsList = getParamsList(model)

    return (
        <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {paramsList.map((param, index) => (
                <Box key={index}>
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
