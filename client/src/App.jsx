import { Routes, Route } from "react-router-dom"

import RootPage from "./Pages/RootPage/RootPage"
import AdminPage from "./Pages/AdminPage/AdminPage"
import ModelPage from "./Pages/ModelPage/ModelPage"
import ModelAddPage from "./Pages/ModelPage/ModelAddPage"
import ModelSettingsPage from "./Pages/ModelSettingsPage/ModelSettingsPage"

import LoginPage from "./Pages/LoginPage/LoginPage"
import { useEffect } from "react"
import { observer } from "mobx-react-lite"
import authStore from "./mobx-store/auth-store"
import { CircularProgress } from "@mui/material"

const App = observer(() => {
    useEffect(() => {
        const checkAuth = async () => {
            const res = await authStore.checkAuth()
        }
        checkAuth()
    }, [])

    return authStore.loading ? (
        <CircularProgress
            sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
            }}
        />
    ) : (
        <>
            <Routes>
                <Route path="/admin/*" element={<AdminPage />} />
                <Route path="/model/:id" element={<ModelPage />} />
                <Route
                    path="/model-settings/:id"
                    element={<ModelSettingsPage />}
                />
                <Route path="/model-add" element={<ModelAddPage />} />
                <Route path="/model" element={<ModelPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<RootPage />} />
            </Routes>
        </>
    )
})

export default App
