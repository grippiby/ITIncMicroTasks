import React, { MouseEvent } from 'react'
import { UniversalButton } from './UniversalButton'

export const Task3 = () => {
	/*	const myFirstSubscriber = (event: React.MouseEvent<HTMLButtonElement>) => {
		alert('hello')
	}
	const mySecondSubscriber = (event: MouseEvent<HTMLButtonElement>) => {
		alert('IVAN')
	}*/
	/*const onClickHandler = (name: string) => {
		return alert(name)
	}*/
	/*const foo1 = () => {
		return console.log('100200')
	}
	//
	const foo2 = (ev: number) => {
		return alert(ev)
	}*/
	const goToNext = () => {
		return alert('4toTo')
	}
	const goToNext2 = (name: string, age: number) => {
		return alert(`Hello ${name}, your age: ${age}`)
	}
	const goToNext3 = (name: string) => {
		return alert(name)
	}
	return (
		<div>
			{/*	<button onClick={(event) => alert('hello')}>
				MyYouTubeChanel-1
			</button>*/}
			{/*<button onClick={myFirstSubscriber}>MyYouTubeChanel-2</button>
			<button onClick={mySecondSubscriber}>MyYouTubeChanel-Ivan</button>*/}
			{/*<button onClick={(event) => onClickHandler('vasya')}>
				MyYouTubeChanel-Ivan
			</button>*/}
			{/*<button onClick={foo1}>1</button>
			<button onClick={() => foo2(100500)}>передаем цифры</button>*/}
			<UniversalButton
				title={'123'}
				callBack={goToNext}
			></UniversalButton>
			<UniversalButton
				title={'newButton'}
				callBack={() => goToNext2('Vasili!', 21)}
			></UniversalButton>
			<UniversalButton
				title={'Stupid?'}
				callBack={() => goToNext3('I`m a stupid button!!')}
			></UniversalButton>
		</div>
	)
}
