import { OrbitControls } from "@react-three/drei"
import { Canvas, useLoader } from "@react-three/fiber"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const ModelPreview = ({ modelUrl }) => {
    console.log(modelUrl)
    let gltf = useLoader(GLTFLoader, modelUrl)

    return (
        <>
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight color="white" position={[0, 10, 5]} />
                <OrbitControls />
                <primitive object={gltf.scene} scale={1} />
            </Canvas>
        </>
    )
}

export default ModelPreview
