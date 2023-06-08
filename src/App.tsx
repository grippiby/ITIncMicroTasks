import React, { useState } from 'react'
import './App.css'
import { TaskType, Todolist } from './Todolist'
import { v1 } from 'uuid'
import { AddNewForm } from './AddNewForm'
import {
	AppBar,
	Button,
	Container,
	Grid,
	IconButton,
	Paper,
	Toolbar,
	Typography,
} from '@mui/material'
import { Menu } from '@mui/icons-material'

export type FilterValuesType = 'all' | 'active' | 'completed'
type TodolistType = {
	id: string
	title: string
	filter: FilterValuesType
}

type TasksStateType = {
	[key: string]: Array<TaskType>
}

function App() {
	let todolistId1 = v1()
	let todolistId2 = v1()
	let [todolists, setTodolists] = useState<Array<TodolistType>>([
		{ id: todolistId1, title: 'What to learn', filter: 'all' },
		{ id: todolistId2, title: 'What to buy', filter: 'all' },
	])
	let [tasks, setTasks] = useState<TasksStateType>({
		[todolistId1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
		],
		[todolistId2]: [
			{ id: v1(), title: 'Milk', isDone: true },
			{ id: v1(), title: 'React Book', isDone: true },
		],
	})
	function editTask(value: string, taskId: string, todolistId: string) {
		let todolistTasks = tasks[todolistId]
		tasks[todolistId] = todolistTasks.map((el) =>
			el.id === taskId ? { ...el, title: value } : el
		)
		setTasks({ ...tasks })
	}

	function removeTask(id: string, todolistId: string) {
		//достанем нужный массив по todolistId:
		let todolistTasks = tasks[todolistId]
		// перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
		tasks[todolistId] = todolistTasks.filter((t) => t.id != id)
		// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
		setTasks({ ...tasks })
	}
	function addTask(title: string, todolistId: string) {
		let task = { id: v1(), title: title, isDone: false }
		//достанем нужный массив по todolistId:
		let todolistTasks = tasks[todolistId]
		// перезапишем в этом объекте массив для нужного тудулиста копией, добавив в начало новую таску:
		tasks[todolistId] = [task, ...todolistTasks]
		// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
		setTasks({ ...tasks })
	}
	function changeStatus(id: string, isDone: boolean, todolistId: string) {
		//достанем нужный массив по todolistId:
		let todolistTasks = tasks[todolistId]
		// найдём нужную таску:
		let task = todolistTasks.find((t) => t.id === id)
		//изменим таску, если она нашлась
		if (task) {
			task.isDone = isDone
			// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
			setTasks({ ...tasks })
		}
	}
	function changeFilter(value: FilterValuesType, todolistId: string) {
		let todolist = todolists.find((tl) => tl.id === todolistId)
		if (todolist) {
			todolist.filter = value
			setTodolists([...todolists])
		}
	}
	function removeTodolist(id: string) {
		// засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
		// eslint-disable-next-line eqeqeq
		setTodolists(todolists.filter((tl) => tl.id != id))
		// удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
		delete tasks[id] // удаляем св-во из объекта... значением которого являлся массив тасок
		// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
		setTasks({ ...tasks })
	}
	function addNewTodoList(title: string) {
		let newTodoId = v1()
		setTodolists([{ id: newTodoId, title, filter: 'all' }, ...todolists])
		setTasks({ ...tasks, [newTodoId]: [] })
	}
	function renameTodoList(id: string, title: string) {
		todolists.map((el) => {
			if (el.id === id) {
				el.title = title
			}
		})
		setTodolists([...todolists])
	}
	return (
		<div className="App">
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<Menu />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
					>
						TodoLists
					</Typography>

					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>

			<Container fixed>
				<Grid container sx={{ p: '10px 0' }}>
					<AddNewForm addNewItem={addNewTodoList} />
				</Grid>
				<Grid container spacing={6}>
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
							<Grid item key={tl.id}>
								<Paper sx={{ padding: '15px' }} elevation={8}>
									<Todolist
										id={tl.id}
										title={tl.title}
										renameTodoList={renameTodoList}
										tasks={tasksForTodolist}
										editTask={editTask}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeTaskStatus={changeStatus}
										filter={tl.filter}
										removeTodolist={removeTodolist}
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

export default App
