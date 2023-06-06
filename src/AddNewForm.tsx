import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import s from './styles/AddNewForm.module.css'

interface AddNewFormProps {
	addNewItem: (title: string) => void
}

export const AddNewForm: React.FC<AddNewFormProps> = (props) => {
	let [title, setTitle] = useState('')
	let [error, setError] = useState<string | null>(null)

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (e.charCode === 13) {
			addNewItem()
		}
	}

	const addNewItem = () => {
		let newTitle = title.trim()
		if (newTitle !== '') {
			props.addNewItem(newTitle /*props.id*/)
			setTitle('')
		} else {
			setError('Title is required')
		}
	}
	return (
		<div>
			<div>
				<input
					value={title}
					onChange={onChangeHandler}
					onKeyPress={onKeyPressHandler}
					className={error ? 'error' : ''}
				/>
				<button onClick={addNewItem}>+</button>
				{error && <div className="error-message">{error}</div>}
			</div>
		</div>
	)
}
