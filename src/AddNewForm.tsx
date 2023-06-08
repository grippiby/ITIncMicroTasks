import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import s from './styles/AddNewForm.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox'
import { Button, Grid, TextField } from '@mui/material'
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
			<Grid>
				<TextField
					placeholder={'Enter the text'}
					variant={'outlined'}
					size={'small'}
					value={title}
					onChange={onChangeHandler}
					onKeyPress={onKeyPressHandler}
					error={!!error}
					helperText={error}
					/*className={error ? 'error' : ''}*/
				/>
				<Button onClick={addNewItem}>
					<AddBoxIcon />
				</Button>
				{/*	{error && <div className="error-message">{error}</div>}*/}
			</Grid>
		</div>
	)
}
