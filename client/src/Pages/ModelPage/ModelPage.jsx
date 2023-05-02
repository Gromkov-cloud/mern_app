import { useParams } from "react-router-dom"
import { Suspense } from "react"

import Menu from "../../components/Menu/Menu"
import DisplayMode from "../../components/DisplayMode/DisplayMode"
import Sidebar from "../../components/Sidebar/Sidebar"
import Model from "../../components/Model/Model"

const ModelPage = () => {
    const modelName = useParams().id
    return (
        <>
            <Menu />
            <DisplayMode />
            <Sidebar />
            {modelName ? (
                <Suspense fallback="loading...">
                    <Model id={modelName} />
                </Suspense>
            ) : (
                <h1>Model Page</h1>
            )}
        </>
    )
}
export default ModelPage
