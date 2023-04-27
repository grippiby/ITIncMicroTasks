import React from 'react'
type FooterPropsType = {
	title: string
}
export const Footer = (props: FooterPropsType) => {
	return (
		<>
			<div>hello myFOOTER</div>
			<div>{props.title}</div>
		</>
	)
}
