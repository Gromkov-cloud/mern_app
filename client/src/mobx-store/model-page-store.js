import { makeAutoObservable } from "mobx"

class ModelPageStore {
    modelsList = []
    isDisplayModeAR = false

    constructor() {
        makeAutoObservable(this)
    }

    setModelsList = (modelsList) => {
        this.modelsList = JSON.parse(JSON.stringify(modelsList))
    }
    setIsDisplayModeAR = (value) => {
        this.isDisplayModeAR = value
    }

    async fetchModels() {

    }

}

export default new ModelPageStore()