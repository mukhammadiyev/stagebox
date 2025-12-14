// // View3D.jsx
// import { OrbitControls, Stage, useGLTF } from '@react-three/drei'
// import { Canvas } from '@react-three/fiber'

// function Model({ url }) {
// 	const { scene } = useGLTF(url)
// 	return <primitive object={scene} scale={1.5} />
// }

// function View3D({ object , sizes }) {
// 	return (
// 		<div className={`w-[700px] h-[550px] rounded-xl overflow-hidden bg-black flex items-center justify-center`}>

// 		</div>
// 	)
// }

// export default View3D

import { OrbitControls, Stage, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

function Model({ url, scale = 1 }) {
	const { scene } = useGLTF(url)
	return <primitive object={scene} scale={scale} />
}

function View3D({ object, positions = [1, 1, 1] }) {
	return (
		<div className='w-[700px] h-[550px] rounded-xl overflow-hidden bg-transparent flex items-center justify-center'>
			<Canvas shadows camera={{ position: [3, 3, 3], fov: 45 }}>
				<Stage environment='city' intensity={0.6}>
					<Model url={object} />
				</Stage>
				<OrbitControls
					enableZoom={false}
					enablePan={false}
					minPolarAngle={Math.PI / 2} // locks vertical rotation
					maxPolarAngle={Math.PI / 2}
					minAzimuthAngle={-Infinity} // allow full 360° horizontal rotation
					maxAzimuthAngle={Infinity}
					autoRotate={true}
					autoRotateSpeed={3}
				/>
			</Canvas>
		</div>
	)
}

export default View3D
