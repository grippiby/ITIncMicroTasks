import React, { useReducer } from 'react'
import './App.css'
import { TaskType, Todolist } from './Todolist'
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm'
import AppBar from '@mui/material/AppBar/AppBar'
import {
	Button,
	Container,
	Grid,
	IconButton,
	Paper,
	Toolbar,
	Typography,
} from '@mui/material'
import { Menu } from '@mui/icons-material'
import {
	AddTodoListAC,
	ChangeTodoListAC,
	ChangeTodoListFilterAC,
	RemoveTodoListAC,
	todolistsReducer,
} from './reducers/todolists-reducer'
import {
	addTaskAC,
	changeTaskStatusAC,
	changeTaskTitleAC,
	removeTaskAC,
	tasksReducer,
} from './reducers/tasks-reducer'

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

export type TasksStateType = {
	[key: string]: Array<TaskType>
}

function AppWithReducer() {
	let todolistId1 = v1()
	let todolistId2 = v1()

	let [todolists, dispatchTodoLists] = useReducer(todolistsReducer, [
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	])

	let [tasks, dispatchTasks] = useReducer(tasksReducer, {
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
		],
		[todolistId2]: [
			{ id: v1(), title: 'Milk', isDone: true },
			{ id: v1(), title: 'React Book', isDone: true },
		],
	})

	//Tasks
	function removeTask(id: string, todolistId: string) {
		dispatchTasks(removeTaskAC(id, todolistId))
	}

	function addTask(title: string, todolistId: string) {
		dispatchTasks(addTaskAC(title, todolistId))
	}

	function changeStatus(id: string, isDone: boolean, todolistId: string) {
		dispatchTasks(changeTaskStatusAC(id, isDone, todolistId))
	}

	function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
		dispatchTasks(changeTaskTitleAC(todolistId, id, newTitle))
	}

	//TodoLists

	function changeFilter(value: FilterValuesType, todolistId: string) {
		dispatchTodoLists(ChangeTodoListFilterAC(todolistId, value))
	}

	function removeTodolist(id: string) {
		dispatchTodoLists(RemoveTodoListAC(id))
		dispatchTasks(RemoveTodoListAC(id))
	}

	function changeTodolistTitle(id: string, title: string) {
		dispatchTodoLists(ChangeTodoListAC(id, title))
	}

	function addTodolist(title: string) {
		//Внимание!  AddTodoListAC внутри функция генерации! поэтому нужна переменная!
		const action = AddTodoListAC(title)
		dispatchTodoLists(action)
		dispatchTasks(action)
	}

	return (
		<div className="App">
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<Menu />
					</IconButton>
					<Typography variant="h6">News</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Grid container style={{ padding: '20px' }}>
					<AddItemForm addItem={addTodolist} />
				</Grid>
				<Grid container spacing={3}>
					{todolists.map((tl) => {
						let allTodolistTasks = tasks[tl.id]
						let tasksForTodolist = allTodolistTasks

						if (tl.filter === 'active') {
							tasksForTodolist = allTodolistTasks.filter(
								(t) => t.isDone === false
							)
						}
						if (tl.filter === 'completed') {
							tasksForTodolist = allTodolistTasks.filter(
								(t) => t.isDone === true
							)
						}

						return (
							<Grid key={tl.id} item>
								<Paper style={{ padding: '10px' }}>
									<Todolist
										key={tl.id}
										id={tl.id}
										title={tl.title}
										tasks={tasksForTodolist}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeTaskStatus={changeStatus}
										filter={tl.filter}
										removeTodolist={removeTodolist}
										changeTaskTitle={changeTaskTitle}
										changeTodolistTitle={
											changeTodolistTitle
										}
									/>
								</Paper>
							</Grid>
						)
					})}
				</Grid>
			</Container>
		</div>
	)
}

export default AppWithReducer
