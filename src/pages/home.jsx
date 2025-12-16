import { useParams } from 'react-router-dom'
import BrandSlider from '../components/BrandSlider'
import CompanyAdvantages from '../components/CompanyAdvantages'
import MiniBlog from '../components/MiniBlog'
import ShoeSlider3D from '../components/ShoeSlider3D'
import ViewProductsSlider from '../components/ViewProductsSlider'

function home() {
	const { category } = useParams()

	return (
		<div className='w-full mx-auto'>
			<ShoeSlider3D />
			<ViewProductsSlider forPr={'mens-shoes'} theme={'Лучшие из лучших'} />
			<CompanyAdvantages />
			<MiniBlog />
			<BrandSlider />
		</div>
	)
}

export default home
