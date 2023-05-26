import { Route, Routes } from "react-router-dom"

import Box from "@mui/material/Box"

import ModelAddForm from "../../components/ModelAddForm/ModelAddForm"
import ModelAccordion from "../../components/ModelAccordion/ModelAccordion"

const AdminPageContentPanel = () => {
    return (
        <Box
            sx={{
                backgroundColor: "#fff",
                padding: "20px",
                marginTop: "-30px",
            }}
        >
            <Routes>
                <Route path="/" element={<ModelAccordion />} />
                <Route path="/add" element={<ModelAddForm />} />
            </Routes>
        </Box>
    )
}

export default AdminPageContentPanel
