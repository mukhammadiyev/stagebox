import { useLocation, useNavigate, useParams } from 'react-router-dom'
import BrandSlider from '../components/BrandSlider'
import CompanyAdvantages from '../components/CompanyAdvantages'
import MiniBlog from '../components/MiniBlog'
import ShoeSlider3D from '../components/ShoeSlider3D'
import ViewProductsSlider from '../components/ViewProductsSlider'

function home() {
	const { category } = useParams()
	const location = useLocation()
	const navigate = useNavigate()

	const categoryMap = {
		clothes: 'mens-shirts',
		crosses: 'mens-shoes',
		accesories: 'womens-bags',
	}

	const currentCategory = categoryMap[category] || 'mens-shoes'

	return (
		<div className='w-full mx-auto'>
			<ShoeSlider3D />
			<ViewProductsSlider
				key={location.pathname}
				forPr={currentCategory}
				theme={'Лучшие из лучших'}
			/>
			<CompanyAdvantages />
			<MiniBlog />
			<BrandSlider />
		</div>
	)
}

export default home
