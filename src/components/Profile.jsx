import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
	const navigate = useNavigate()
	const [user, setUser] = useState({
		lastName: '',
		name: '',
		middleName: '',
		province: '',
		email: '',
		city: '',
		phone: '',
		street: '',
		house: '',
		password: '',
	})

	const [oldPassword, setOldPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const [savedPassword, setSavedPassword] = useState(null)
	const [initialUser, setInitialUser] = useState(null)

	// Load user from localStorage
	useEffect(() => {
		const stored = localStorage.getItem('userData')
		if (stored) {
			const parsed = JSON.parse(stored)
			setUser(parsed)
			setInitialUser(parsed)
			if (parsed.password) setSavedPassword(parsed.password)
		} else {
			// if first time user
			setInitialUser(user)
		}
	}, [])

	const handleSubmit = e => {
		e.preventDefault()

		// ---------- FIRST TIME USER ----------
		if (!savedPassword) {
			if (!newPassword || !repeatPassword) {
				alert('Введите новый пароль и повторите его')
				return
			}

			if (newPassword !== repeatPassword) {
				alert('Новый пароль и повторение не совпадают')
				return
			}

			const newUser = { ...user, password: newPassword }
			localStorage.setItem('userData', JSON.stringify(newUser))
			setSavedPassword(newPassword)
			alert('Аккаунт создан и данные сохранены')
			return
		}

		// ---------- USER ALREADY HAS PASSWORD ----------
		// Check old password
		if (oldPassword !== savedPassword) {
			alert('Старый пароль неверный')
			return
		}

		// Check new passwords
		if (newPassword !== repeatPassword) {
			alert('Новый пароль и повторение не совпадают')
			return
		}

		// Save everything (including updated password + form data)
		const updatedUser = { ...user, password: newPassword }
		localStorage.setItem('userData', JSON.stringify(updatedUser))
		setSavedPassword(newPassword)

		alert('Данные успешно сохранены')
		navigate('/')
	}

	// Helper to update text fields
	const updateField = (key, value) => {
		setUser(prev => ({ ...prev, [key]: value }))
	}

	const isChanged =
		initialUser && JSON.stringify(user) !== JSON.stringify(initialUser)

	return (
		<div className='flex  flex-1  p-8 '>
			<form onSubmit={handleSubmit} className='w-full flex flex-col gap-15'>
				<div className='w-full flex gap-20'>
					<div className='flex-1 flex flex-col gap-8'>
						<p className=' text-2xl text-[#002C6A] font-montserrat font-semibold '>
							Личные данные
						</p>

						<input
							type='text'
							placeholder='Фамилия'
							value={user.lastName}
							onChange={e => updateField('lastName', e.target.value)}
							className='border-b-3 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0 placeholder:text-2xl text-2xl'
						/>

						<input
							type='text'
							placeholder='Имя'
							value={user.name}
							onChange={e => updateField('name', e.target.value)}
							className='border-b-3 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0 placeholder:text-2xl text-2xl'
						/>

						<input
							type='text'
							placeholder='Отчество'
							value={user.middleName}
							onChange={e => updateField('middleName', e.target.value)}
							className='border-b-3 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0 placeholder:text-2xl text-2xl'
						/>
					</div>

					<div className='flex-1 flex flex-col gap-8'>
						<p className=' text-2xl text-[#002C6A] font-montserrat font-semibold '>
							Изменить пароль
						</p>

						{savedPassword && (
							<input
								type='password'
								placeholder='Старый пароль'
								value={oldPassword}
								onChange={e => setOldPassword(e.target.value)}
								className='border-b-3 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0 placeholder:text-2xl text-2xl'
							/>
						)}

						<input
							type='password'
							placeholder='Новый пароль'
							value={newPassword}
							onChange={e => setNewPassword(e.target.value)}
							className='border-b-3 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0 placeholder:text-2xl text-2xl'
						/>

						<input
							type='password'
							placeholder='Повторите пароль'
							value={repeatPassword}
							onChange={e => setRepeatPassword(e.target.value)}
							className='border-b-3 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0 placeholder:text-2xl text-2xl'
						/>
					</div>
				</div>

				<div className='w-full flex flex-col gap-10'>
					<p className=' text-2xl text-[#002C6A] font-montserrat font-semibold '>
						Адрес доставки и контакты
					</p>

					<div className='w-full grid grid-cols-2 gap-x-20 gap-y-8 '>
						<input
							type='text'
							placeholder='Провинция'
							value={user.province}
							onChange={e => updateField('province', e.target.value)}
							className='border-b-3 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0 placeholder:text-2xl text-2xl'
						/>

						<input
							type='email'
							placeholder='Электронная почта'
							value={user.email}
							onChange={e => updateField('email', e.target.value)}
							className='border-b-3 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0 placeholder:text-2xl text-2xl'
						/>

						<input
							type='text'
							placeholder='Город'
							value={user.city}
							onChange={e => updateField('city', e.target.value)}
							className='border-b-3 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0 placeholder:text-2xl text-2xl'
						/>

						<input
							type='text'
							placeholder='Номер телефона'
							value={user.phone}
							onChange={e => updateField('phone', e.target.value)}
							className='border-b-3 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0 placeholder:text-2xl text-2xl'
						/>

						<input
							type='text'
							placeholder='Улица'
							value={user.street}
							onChange={e => updateField('street', e.target.value)}
							className='border-b-3 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0 placeholder:text-2xl text-2xl'
						/>

						<input
							type='text'
							placeholder='Дом'
							value={user.house}
							onChange={e => updateField('house', e.target.value)}
							className='border-b-3 border-[#002C6A] outline-none pt-1 pb-2 pr-3 pl-0 placeholder:text-2xl text-2xl'
						/>
					</div>
				</div>

				<button
					disabled={!isChanged}
					className={`bg-[#FF1818] text-2xl text-white px-13 py-7 rounded-full transition w-max
    ${
			!isChanged
				? 'opacity-50 cursor-not-allowed'
				: ' border-2 border-[#FF1818] cursor-pointer'
		}`}
				>
					Сохранить изменения
				</button>
			</form>
		</div>
	)
}

export default Profile
