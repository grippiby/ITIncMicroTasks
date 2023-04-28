import React from 'react'
type NewComponentPropsType = {
	onClickHandler: Function
	currentMoney: { banknote: string; nominal: number; number: string }[]
}

export const NewComponent = ({
	currentMoney,
	onClickHandler,
}: NewComponentPropsType) => {
	return (
		<>
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
		</>
	)
}
