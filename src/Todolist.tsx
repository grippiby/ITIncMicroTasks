import React, { useCallback } from 'react'
import { FilterValuesType } from './App'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import IconButton from '@mui/material/IconButton/IconButton'
import { Delete } from '@mui/icons-material'
import { Button } from '@mui/material'
import { Task } from './Task'

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
	changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
	removeTodolist: (id: string) => void
	changeTodolistTitle: (id: string, newTitle: string) => void
	filter: FilterValuesType
	changeTaskTitle: (
		taskId: string,
		newTitle: string,
		todolistId: string
	) => void
}

export const Todolist = React.memo((props: PropsType) => {
	console.log('Todolist called')

	const addTask = useCallback(
		(title: string) => {
			props.addTask(title, props.id)
		},
		[props.id, props.addTask]
	)

	const removeTodolist = () => {
		props.removeTodolist(props.id)
	}
	const changeTodolistTitle = (title: string) => {
		props.changeTodolistTitle(props.id, title)
	}

	const onAllClickHandler = useCallback(
		() => props.changeFilter('all', props.id),
		[props.changeFilter, props.id]
	)
	const onActiveClickHandler = useCallback(
		() => props.changeFilter('active', props.id),
		[props.changeFilter, props.id]
	)
	const onCompletedClickHandler = useCallback(
		() => props.changeFilter('completed', props.id),
		[props.id, props.changeFilter]
	)

	let tasksForTodolist = props.tasks

	if (props.filter === 'active') {
		tasksForTodolist = props.tasks.filter((t) => t.isDone === false)
	}
	if (props.filter === 'completed') {
		tasksForTodolist = props.tasks.filter((t) => t.isDone === true)
	}

	return (
		<div>
			<h3>
				<EditableSpan
					value={props.title}
					onChange={changeTodolistTitle}
				/>
				<IconButton onClick={removeTodolist}>
					<Delete />
				</IconButton>
			</h3>
			<AddItemForm addItem={addTask} />
			<div>
				{tasksForTodolist.map((t) => (
					<Task
						task={t}
						changeTaskStatus={props.changeTaskStatus}
						changeTaskTitle={props.changeTaskTitle}
						removeTask={props.removeTask}
						todoListId={props.id}
						key={t.id}
					/>
				))}
			</div>
			<div>
				<Button
					variant={props.filter === 'all' ? 'outlined' : 'text'}
					onClick={onAllClickHandler}
					color={'inherit'}
				>
					All
				</Button>
				<Button
					variant={props.filter === 'active' ? 'outlined' : 'text'}
					onClick={onActiveClickHandler}
					color={'primary'}
				>
					Active
				</Button>
				<Button
					variant={props.filter === 'completed' ? 'outlined' : 'text'}
					onClick={onCompletedClickHandler}
					color={'secondary'}
				>
					Completed
				</Button>
			</div>
		</div>
	)
})
