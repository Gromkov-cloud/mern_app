import { API_URL } from "../../http"

const ModelQr = ({ modelId }) => {
    console.log(modelId)
    return (
        <>
            <img src={`${API_URL}/model-qr/${modelId}`}></img>
        </>
    )
}

export default ModelQr
