import { useLoader } from "@react-three/fiber"
import styles from "./ModelAr.module.css"
import { useParams } from "react-router-dom"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useEffect, useState } from "react"
import API, { API_URL } from "../../http"

const ModelAR = () => {
    const { id } = useParams()

    return (
        <div className={styles.model_container}>
            <iframe
                width={"100%"}
                height={"100%"}
                scrolling="no"
                frameBorder="0"
                srcDoc={`
                        <!DOCTYPE html>
                        <html lang="ru">
                            <head>
                                <meta charset="UTF-8" />
                                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                <title>Document</title>
                                <script src="../src/assets/ar.js"></script>
                                <script src="../src/assets/gestures.js"></script>
                            </head>
                            <body>
                            <style> body{ margin-bottom: 0}</style>
                                <a-scene
                                    embedded
                                    arjs
                                    renderer="logarithmicDepthBuffer: true;"
                                    vr-mode-ui="enabled: false"
                                    gesture-detector
                                    id="scene"
                                >
                                    <!-- furnace -->
                                    <a-marker
                                        preset="custom"
                                        type="pattern"
                                        url="../src/assets/pattern.patt"
                                        raycaster="objects: .clickable"
                                        emitevents="true"
                                        cursor="fuse: false; rayOrigin: mouse;"
                                        id="Трубчатая печь"
                                    >
                                        <a-entity
                                            positon="0 0 0"
                                            scale="0.05 0.05 0.05"
                                            gltf-model="url(${API_URL}/model/${id})"
                                            gesture-handler
                                        >
                                        </a-entity>
                                    </a-marker>

                                    <a-entity light="type: ambient; color: #BBB"></a-entity>
                                    <a-entity
                                        light="type: directional; color: #FFF; intensity: 1.4"
                                        position="-0.5 1 1"
                                    ></a-entity>

                                    <a-entity camera></a-entity>
                                </a-scene>
                            </body>
                        </html>`}
            ></iframe>
        </div>
    )
}

export default ModelAR
