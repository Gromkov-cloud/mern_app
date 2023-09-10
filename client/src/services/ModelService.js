import API from "../http"

export default class ModelService {
    static fetchModels = async () => {
        const res = await API.get("/models")
        return res
    }
}