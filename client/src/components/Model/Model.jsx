import { useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Canvas } from "@react-three/fiber"
import { Environment, OrbitControls } from "@react-three/drei"
import { useParams } from "react-router-dom"

import styles from "./Model.module.css"

const Model = () => {
    const { id } = useParams()
    console.log(id)
    let gltf = useLoader(GLTFLoader, `/api/model/${id}`)

    return (
        <div className={styles.model_container}>
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight color="white" position={[0, 10, 5]} />
                <OrbitControls />
                <primitive object={gltf.scene} scale={1} />
            </Canvas>
        </div>
    )
}

export default Model
