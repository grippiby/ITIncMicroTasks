import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import { FilterValuesType } from './App'
import { AddNewForm } from './AddNewForm'
import { EditableSpan } from './EditableSpan'

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
			<h3>
				<EditableSpan title={props.title} onChange={renameTodoList} />
				<button onClick={removeTodolist}>x</button>
			</h3>
			<AddNewForm addNewItem={addTask} />
			<ul>
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
						<li key={t.id} className={t.isDone ? 'is-done' : ''}>
							<input
								type="checkbox"
								onChange={onChangeHandler}
								checked={t.isDone}
							/>
							<EditableSpan
								title={t.title}
								onChange={editTask}
							></EditableSpan>

							<button onClick={onClickHandler}>x</button>
						</li>
					)
				})}
			</ul>
			<div>
				<button
					className={props.filter === 'all' ? 'active-filter' : ''}
					onClick={onAllClickHandler}
				>
					All
				</button>
				<button
					className={props.filter === 'active' ? 'active-filter' : ''}
					onClick={onActiveClickHandler}
				>
					Active
				</button>
				<button
					className={
						props.filter === 'completed' ? 'active-filter' : ''
					}
					onClick={onCompletedClickHandler}
				>
					Completed
				</button>
			</div>
		</div>
	)
}
