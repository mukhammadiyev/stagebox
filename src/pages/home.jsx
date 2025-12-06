import { useParams } from 'react-router-dom'
import ShoeSlider3D from '../components/ShoeSlider3D'

function home() {
	const { category } = useParams()

	return (
		<div className='w-full mx-auto'>
			<ShoeSlider3D />
		</div>
	)
}

export default home
