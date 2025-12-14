import { useParams } from 'react-router-dom'
import ShoeSlider3D from '../components/ShoeSlider3D'
import ViewProductsSlider from '../components/ViewProductsSlider'

function home() {
	const { category } = useParams()

	return (
		<div className='w-full mx-auto'>
			<ShoeSlider3D />
			<ViewProductsSlider
				for={'shoes'}
				type={'oneLine'}
				theme={'Лучшие из лучших'}
			/>
		</div>
	)
}

export default home
