import React, { ChangeEvent, useState } from 'react'
import s from './styles/EditableSpan.module.css'
import { log } from 'util'

export type EditableSpanProps = {
	title: string
	onChange: (newValue: string) => void
}

export const EditableSpan: React.FC<EditableSpanProps> = (props) => {
	const [editMode, setEditMode] = useState(false)
	const [value, setValue] = useState(props.title)
	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}
	const onDoubleClickHandler = () => {
		setEditMode(true)
		setValue(props.title)
	}
	const onBlurHandler = () => {
		setEditMode(false)
		props.onChange(value)
	}
	return (
		<>
			{editMode ? (
				<input
					value={value}
					autoFocus
					onChange={onChangeHandler}
					onBlur={onBlurHandler}
				/>
			) : (
				<span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
			)}
		</>
	)
}
