import help from '../icons/help.svg'
import like from '../icons/like.svg'
import box from '../icons/box.svg'

function CompanyAdvantages() {
	const advantages = [
		{
			title: 'Гарантируем качество товара',
			iconColor: '#002C6A',
			icon:like ,
			bgColor: '#B3C0D2',
		},
		{
			title: 'Поможем  подобрать размер',
			iconColor: '#2C830E',
			icon:help ,
			bgColor: '#CFEBC6',
		},
		{
			title: 'Быстро доставим покупку',
			iconColor: '#AD0808',
			icon: box,
			bgColor: '#FFE1E1',
		},
	]
	return (
		<div className='w-full container mx-auto'>
			<div className='w-full py-0 pb-2 2xl:py-16  px-8 lg:px-16 xl:px-25 2xl:px-30'>
				<div className='flex items-center justify-evenly flex-wrap'  >
					{advantages.map((adv, idx) => {
						return (
							<div className='w-[86px] 2xl:w-[280px] flex flex-col gap-3 2xl:gap-10 items-center' key={idx}>
								<div
									className={`h-11 2xl:h-36 w-11 2xl:w-36 rounded-full flex items-center justify-center`}
									style={{backgroundColor : adv.bgColor}}
								>
									<img src={adv.icon} alt="icon" className='h-6 2xl:h-22 w-6 2xl:w-22' />
								</div>
								<h3 className='w-full  text-wrap text-xs 2xl:text-4xl font-semibold font-montserrat text-center text-[#002C6A]' >{adv.title}</h3>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default CompanyAdvantages
