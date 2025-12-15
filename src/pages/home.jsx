import { useParams } from 'react-router-dom'
import CompanyAdvantages from '../components/CompanyAdvantages'
import ShoeSlider3D from '../components/ShoeSlider3D'
import ViewProductsSlider from '../components/ViewProductsSlider'

function home() {
	const { category } = useParams()

	return (
		<div className='w-full mx-auto'>
			<ShoeSlider3D />
			<ViewProductsSlider for={'shoes'} theme={'Лучшие из лучших'} />
			<CompanyAdvantages />
		</div>
	)
}

export default home
