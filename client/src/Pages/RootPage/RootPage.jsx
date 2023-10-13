import Menu from "../../components/Menu/Menu"
import PageHeader from "../../components/PageHeader/PageHeader"

const RootPage = () => {
    return (
        <>
            <Menu></Menu>
            <PageHeader
                title={"Главная страница"}
                subtitle={"Описание работы приложения"}
            />
        </>
    )
}

export default RootPage
