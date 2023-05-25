import { Routes, Route } from "react-router-dom"

import RootPage from "./Pages/RootPage/RootPage"
import AdminPage from "./Pages/AdminPage/AdminPage"
import ModelPage from "./Pages/ModelPage/ModelPage"
import ModelAddPage from "./Pages/ModelPage/ModelAddPage"
import ModelSettingsPage from "./Pages/ModelSettingsPage/ModelSettingsPage"

import "./App.css"

function App() {
    return (
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
                <Route path="/" element={<RootPage />} />
            </Routes>
        </>
    )
}

export default App
