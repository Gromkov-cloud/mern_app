import Box from "@mui/material/Box"

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"

const ModelAccordionThumb = ({ imgSrc }) => {
    return imgSrc ? (
        <img src={`/api/image/${imgSrc}`} alt="" />
    ) : (
        <Box
            width={"100%"}
            height={"150px"}
            sx={{
                backgroundColor: "#EBEBEB",
                position: "relative",
                cursor: "pointer",
            }}
        >
            <AddPhotoAlternateIcon
                sx={{
                    fontSize: "100px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            />
        </Box>
    )
}

export default ModelAccordionThumb
