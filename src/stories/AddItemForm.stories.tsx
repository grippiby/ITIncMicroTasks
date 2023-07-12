import type { Meta, StoryObj } from '@storybook/react'
import { AddItemForm, AddItemFormPropsType } from '../AddItemForm'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { IconButton, TextField } from '@mui/material'
import { AddBox } from '@mui/icons-material'
import { action } from '@storybook/addon-actions'
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
	title: 'TODOLIST/AddItemForm',
	component: AddItemForm,
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
	tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {
		/*backgroundColor: { control: 'color' },*/
		addItem: {
			description: 'button click',
			action: 'clicked',
		},
	},
}

export default meta
type Story = StoryObj<typeof AddItemForm>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

export const AddItemFormStory: Story = {
	// More on args: https://storybook.js.org/docs/react/writing-stories/args
	args: {
		addItem: action('button clicked inside form'),
	},
}

const Comp = (props: AddItemFormPropsType) => {
	let [title, setTitle] = useState('')
	let [error, setError] = useState<string | null>(null)

	const addItem = () => {
		if (title.trim() !== '') {
			props.addItem(title)
			setTitle('')
		} else {
			setError('Title is required')
		}
	}

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (error !== null) {
			setError(null)
		}
		if (e.charCode === 13) {
			addItem()
		}
	}

	return (
		<div>
			<TextField
				variant="outlined"
				error={!error}
				value={title}
				onChange={onChangeHandler}
				onKeyPress={onKeyPressHandler}
				label="Title"
				helperText={'Title is required'}
			/>
			<IconButton color="primary" onClick={addItem}>
				<AddBox />
			</IconButton>
		</div>
	)
}

export const AddItemError: Story = {
	render: (args) => <Comp addItem={action('clicked inside')} />,
}
