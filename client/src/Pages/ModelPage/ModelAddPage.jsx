import Menu from "../../components/Menu/Menu"

import styles from "./ModelAddPage.module.css"
import ModelAddForm from "../../components/ModelAddForm/ModelAddForm"
import { Container } from "@mui/material"

const ModelPage = () => {
    return (
        <>
            <Menu />
            <Container maxWidth="md">
                <h1>model add page</h1>
                <ModelAddForm />
            </Container>
        </>
    )
}
export default ModelPage
