import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import { FilterValuesType } from './App'
import { AddNewForm } from './AddNewForm'
import { EditableSpan } from './EditableSpan'

import {
	AppBar,
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	IconButton,
	List,
	ListItem,
	Toolbar,
	Typography,
} from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Menu } from '@mui/icons-material'
export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

type PropsType = {
	id: string
	title: string
	tasks: Array<TaskType>
	removeTask: (taskId: string, todolistId: string) => void
	changeFilter: (value: FilterValuesType, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	editTask: (value: string, taskId: string, todolistId: string) => void
	changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
	removeTodolist: (id: string) => void
	filter: FilterValuesType
	renameTodoList: (id: string, title: string) => void
}

export function Todolist(props: PropsType) {
	const addTask = (text: string) => {
		props.addTask(text, props.id)
	}
	const removeTodolist = () => props.removeTodolist(props.id)

	const onAllClickHandler = () => props.changeFilter('all', props.id)
	const onActiveClickHandler = () => props.changeFilter('active', props.id)
	const onCompletedClickHandler = () =>
		props.changeFilter('completed', props.id)
	const renameTodoList = (title: string) => {
		props.renameTodoList(props.id, title)
	}
	return (
		<div>
			<Typography
				variant={'h5'}
				align={'center'}
				fontWeight={'bolder'}
				typography={''}
			>
				<EditableSpan title={props.title} onChange={renameTodoList} />
				<Button onClick={removeTodolist}>
					<DeleteForeverIcon />
				</Button>
			</Typography>
			<AddNewForm addNewItem={addTask} />
			<List>
				{props.tasks.map((t) => {
					const onClickHandler = () =>
						props.removeTask(t.id, props.id)
					const onChangeHandler = (
						e: ChangeEvent<HTMLInputElement>
					) => {
						let newIsDoneValue = e.currentTarget.checked
						props.changeTaskStatus(t.id, newIsDoneValue, props.id)
					}
					const editTask = (value: string) => {
						props.editTask(value, t.id, props.id)
					}

					return (
						<ListItem
							divider
							disablePadding
							key={t.id}
							className={t.isDone ? 'is-done' : ''}
						>
							<Checkbox
								size="small"
								onChange={onChangeHandler}
								checked={t.isDone}
							/>
							<EditableSpan
								title={t.title}
								onChange={editTask}
							></EditableSpan>
							<IconButton>
								<DeleteForeverIcon
									color="primary"
									onClick={onClickHandler}
								/>
							</IconButton>
						</ListItem>
					)
				})}
			</List>
			<div>
				<Button
					variant="outlined"
					size="small"
					color={props.filter === 'all' ? 'secondary' : 'primary'}
					onClick={onAllClickHandler}
				>
					All
				</Button>
				<Button
					sx={{ ml: '5px' }}
					variant="outlined"
					size="small"
					color={props.filter === 'active' ? 'secondary' : 'primary'}
					onClick={onActiveClickHandler}
				>
					Active
				</Button>
				<Button
					sx={{ ml: '5px' }}
					variant={props.filter === 'completed' ? 'outlined' : 'text'}
					/*		color={
						props.filter === 'completed' ? 'secondary' : 'primary'
					}*/
					onClick={onCompletedClickHandler}
				>
					Completed
				</Button>
			</div>
		</div>
	)
}
