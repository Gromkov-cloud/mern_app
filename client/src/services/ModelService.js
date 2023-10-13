import API from "../http"

export default class ModelService {
    static fetchModels = async (params) => {
        try {
            const res = await API.get(`/models${params ? params : ""}`)
            return res
        } catch (error) {
            console.log(error)
            return error.response
        }
    }

    static deleteModel = async (modelId) => {
        try {
            const res = await API.delete(`/model/${modelId}`)
            return res
        } catch (error) {
            console.log(error)
            return error.response
        }
    }

    static updateModel = async (modelId, data) => {
        try {
            const res = await API.post(`/model/update/${modelId}`, data)
            return res
        } catch (error) {
            console.log(error)
            return error.response
        }
    }

    static addModel = async (data) => {
        try {
            const res = await API.post("/model/add", data)
            return res
        } catch (error) {
            console.log(error)
            return error.response
        }
    }
}