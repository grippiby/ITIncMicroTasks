import React, { useState } from 'react'

export const Task4 = () => {
	/*let a = 1*/
	const onClickHAndler = () => {
		setA(++a)
		console.log(a)
	}
	const onClickHAndler2 = () => {
		setA(0)
		console.log(a)
	}
	let [a, setA] = useState(1)
	return (
		<div>
			TASK 4<h1>{a}</h1>
			<button onClick={onClickHAndler}>Number</button>
			<button onClick={onClickHAndler2}>0</button>
		</div>
	)
}
