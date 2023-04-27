import React from 'react'
type ButtonPropsType = {
	title: string
	callBack: () => void
}
export const UniversalButton = (props: ButtonPropsType) => {
	const onClickHandler = () => {
		props.callBack()
	}
	return (
		<>
			<button onClick={onClickHandler}>{props.title}</button>
		</>
	)
}
