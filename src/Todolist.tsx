import React, { useState } from 'react'

type ButtonNameType = 'All' | 'Active' | 'Completed'
type TaskType = {
	id: number
	title: string
	isDone: boolean
}
type PropsType = {
	title: string
	tasks: Array<TaskType>
	removeTask: (taskID: number) => void
	/*filterTasks: (buttonName: ButtonNameType) => void*/
}

export function Todolist(props: PropsType) {
	const [filteredTasks, setFilteredTasks] = useState<ButtonNameType>('All')
	const filterTasks = (buttonName: ButtonNameType) => {
		setFilteredTasks(buttonName)
	}

	const box = () => {
		return filteredTasks === 'Active'
			? props.tasks.filter((el) => !el.isDone)
			: filteredTasks === 'Completed'
			? props.tasks.filter((el) => el.isDone)
			: props.tasks
	}

	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input />
				<button>+</button>
			</div>
			<ul>
				{box().map((el, index) => {
					return (
						<li key={el.id}>
							<button onClick={() => props.removeTask(el.id)}>
								X
							</button>
							<input type="checkbox" checked={el.isDone} />
							<span>{el.title}</span>
						</li>
					)
				})}
			</ul>
			<div>
				<button onClick={() => filterTasks('All')}>All</button>
				<button onClick={() => filterTasks('Active')}>Active</button>
				<button onClick={() => filterTasks('Completed')}>
					Completed
				</button>
			</div>
		</div>
	)
}
