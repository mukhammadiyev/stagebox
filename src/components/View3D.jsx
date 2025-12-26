// View3D.jsx
import { OrbitControls, Stage, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function Model({ url, scale = 1 }) {
	const { scene } = useGLTF(url)
	const meshRef = useRef()
	
	// Use useFrame for continuous rotation based on time, not scroll
	useFrame((state, delta) => {
		if (meshRef.current) {
			// Rotate based on time delta (smooth and independent)
			// The rotation continues regardless of scrolling
			meshRef.current.rotation.y += delta * 0.5 // Adjust speed (0.5 radians per second)
			
			// OR use elapsed time for even smoother rotation:
			// meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.5
		}
	})
	
	return <primitive ref={meshRef} object={scene} scale={scale} />
}

function View3D({ object, sizes }) {
	// REMOVE ALL SCROLL EVENT LISTENERS
	// Don't even track scroll state
	
	return (
		<div className='w-[180px] 2xl:w-[700px] h-40 2xl:h-[550px] rounded-xl overflow-hidden bg-transparent flex items-center justify-center'>
			<Canvas 
				shadows 
				camera={{ position: [3, 3, 3], fov: 45 }}
				// Important: Use always frameloop
				frameloop="always"
			>
				<Stage environment='city' intensity={0.6}>
					<Model url={object} sizes={sizes} />
				</Stage>
				<OrbitControls
					enableZoom={false}
					enablePan={false}
					minPolarAngle={Math.PI / 2}
					maxPolarAngle={Math.PI / 2}
					minAzimuthAngle={-Infinity}
					maxAzimuthAngle={Infinity}
					autoRotate={false} // Disable OrbitControls autoRotate
					makeDefault
					enableDamping
					dampingFactor={0.05}
					enableRotate={false} // Disable user rotationnpm r
				/>
			</Canvas>
		</div>
	)
}

export default View3D