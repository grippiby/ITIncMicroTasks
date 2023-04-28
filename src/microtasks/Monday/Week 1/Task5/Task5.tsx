import React, { useState } from 'react'
import './App.css'
import { NewComponent } from './NewComponent'
type FilterType = 'all' | 'usd' | 'rub'
export function Task5() {
	const [money, setMoney] = useState([
		{ banknote: 'dollar', nominal: 100, number: ' a1234567890' },
		{ banknote: 'dollar', nominal: 50, number: ' z1234567890' },
		{ banknote: 'ruble', nominal: 100, number: ' w1234567890' },
		{ banknote: 'dollar', nominal: 100, number: ' e1234567890' },
		{ banknote: 'dollar', nominal: 50, number: ' c1234567890' },
		{ banknote: 'ruble', nominal: 100, number: ' r1234567890' },
		{ banknote: 'dollar', nominal: 50, number: ' x1234567890' },
		{ banknote: 'ruble', nominal: 50, number: ' v1234567890' },
	])
	/*	let currentMoney = money.filter((el) => {
		return el.banknote === 'dollar'
	})*/
	const [nameButton, setNameButton] = useState<FilterType>('all')

	let currentMoney = money
	if (nameButton === 'usd') {
		currentMoney = money.filter((el) => el.banknote === 'dollar')
	}
	if (nameButton === 'rub') {
		currentMoney = money.filter((el) => {
			return el.banknote === 'ruble'
		})
	}
	const onClickHandler = (elem: FilterType): void => {
		setNameButton(elem)
	}

	return (
		<NewComponent
			onClickHandler={onClickHandler}
			currentMoney={currentMoney}
		/>

		/*	<>
			<ul>
				{currentMoney.map((objFromMoneyArr, index) => {
					return (
						<li key={index}>
							<span> {objFromMoneyArr.banknote}</span>
							<span> {objFromMoneyArr.nominal}</span>
							<span> {objFromMoneyArr.number}</span>
						</li>
					)
				})}
			</ul>
			<div>
				<button onClick={() => onClickHandler('all')}>All</button>
				<button onClick={() => onClickHandler('usd')}>Dollars</button>
				<button onClick={() => onClickHandler('rub')}>Rubles</button>
			</div>
		</>*/
	)
}
