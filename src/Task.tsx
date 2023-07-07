import React, { ChangeEvent, useCallback } from 'react'
import { Checkbox } from '@mui/material'
import { EditableSpan } from './EditableSpan'
import IconButton from '@mui/material/IconButton/IconButton'
import { Delete } from '@mui/icons-material'
import { TaskType } from './Todolist'

interface TaskProps {
	changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
	changeTaskTitle: (
		taskId: string,
		newTitle: string,
		todolistId: string
	) => void
	removeTask: (taskId: string, todolistId: string) => void
	task: TaskType
	todoListId: string
}

export const Task: React.FC<TaskProps> = React.memo((props) => {
	const onClickHandler = useCallback(
		() => props.removeTask(props.task.id, props.todoListId),
		[props.removeTask, props.task.id, props.todoListId]
	)
	const onChangeHandler = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			let newIsDoneValue = e.currentTarget.checked
			props.changeTaskStatus(
				props.task.id,
				newIsDoneValue,
				props.todoListId
			)
		},
		[props.task.id, props.todoListId]
	)
	const onTitleChangeHandler = useCallback(
		(newValue: string) => {
			props.changeTaskTitle(props.task.id, newValue, props.todoListId)
		},
		[props.task.id, props.todoListId]
	)

	return (
		<div key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
			<Checkbox
				checked={props.task.isDone}
				color="primary"
				onChange={onChangeHandler}
			/>

			<EditableSpan
				value={props.task.title}
				onChange={onTitleChangeHandler}
			/>
			<IconButton onClick={onClickHandler}>
				<Delete />
			</IconButton>
		</div>
	)
})
