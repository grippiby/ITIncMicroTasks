import { TasksStateType } from '../App'
import { v1 } from 'uuid'
import {
	AddTodoListActionType,
	RemoveTodoListActionType,
} from './todolists-reducer'

export type RemoveTaskActionType = {
	type: 'REMOVE-TASK'
	taskId: string
	todoListId: string
}
export type AddTaskActionType = {
	type: 'ADD-TASK'
	title: string
	todoListId: string
}
export type ChangeTaskStatusActionType = {
	type: 'CHANGE-TASK-STATUS'
	todoListId: string
	id: string
	status: boolean
}
export type ChangeTaskTitleActionType = {
	type: 'CHANGE-TASK-TITLE'
	todoListId: string
	id: string
	title: string
}

export type ActionType =
	| RemoveTaskActionType
	| AddTaskActionType
	| ChangeTaskStatusActionType
	| ChangeTaskTitleActionType
	| AddTodoListActionType
	| RemoveTodoListActionType

export const tasksReducer = (
	tasks: TasksStateType = {},
	action: ActionType
): TasksStateType => {
	switch (action.type) {
		case 'REMOVE-TASK':
			//достанем нужный массив по todolistId:
			let todolistTasks = tasks[action.todoListId]
			// перезапишем в этом объекте массив для нужного тудулиста отфилтрованным массивом:
			tasks[action.todoListId] = todolistTasks.filter(
				(t) => t.id !== action.taskId
			)
			// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
			return { ...tasks }
		case 'ADD-TASK':
			//пошаговое для понимания
			//Создадим копию целого объекта (назовем ее ААА)
			let stateCopy = { ...tasks }
			//Создадим копию массива с тасками
			let tasksInNewCopy = stateCopy[action.todoListId]
			//создадим новую таску
			let task = { id: v1(), title: action.title, isDone: false }
			// создадим массив ХХХ: кладем новая таска, затем деструктуризируем старый массив и кладем остальные таски
			let newArrayWithTasks = [task, ...tasksInNewCopy]
			//под нашу айди кладем (старый стираем, а новый добавляем) массив ХХХ! В объект ААА кладем массив ХХХ, вместо старого
			stateCopy[action.todoListId] = newArrayWithTasks
			//возвращаем объект ААА
			return stateCopy

		case 'CHANGE-TASK-STATUS':
			return {
				...tasks,
				[action.todoListId]: tasks[action.todoListId].map((el) =>
					el.id === action.id
						? {
								...el,
								isDone: action.status,
						  }
						: el
				),
			}

		case 'CHANGE-TASK-TITLE':
			/*// найдём нужную таску:
			let oldTask = tasks[action.todoListId].find(
				(t) => t.id === action.id
			)
			//изменим таску, если она нашлась
			if (oldTask) {
				oldTask.title = action.title
				// засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
				return { ...tasks }
			}*/
			//вверху мутировал стейт - не проходили тесты
			return {
				...tasks,
				[action.todoListId]: tasks[action.todoListId].map((el) =>
					el.id === action.id ? { ...el, title: action.title } : el
				),
			}

		case 'ADD-TODOLIST':
			/*	let newTodolistId = v1()
				let newTodolist: TodolistType = {
					id: newTodolistId,
					title: action.title,
					filter: 'all',
				}*/
			return { ...tasks, [action.todoListId]: [] }
		case 'REMOVE-TODOLIST':
			/*	let newState = { ...tasks }
				delete newState[action.id]
				return newState*/
			let {
				[action.id]: [],
				...rest
			} = tasks
			return rest
		default:
			return tasks
	}
}

export const removeTaskAC = (
	id: string,
	todolistId: string
): RemoveTaskActionType => {
	return {
		type: 'REMOVE-TASK',
		taskId: id,
		todoListId: todolistId,
	}
}
export const addTaskAC = (
	title: string,
	todoListId: string
): AddTaskActionType => {
	return {
		type: 'ADD-TASK',
		title: title,
		todoListId: todoListId,
	}
}

export const changeTaskStatusAC = (
	id: string,
	status: boolean,
	todoListId: string
): ChangeTaskStatusActionType => {
	return {
		type: 'CHANGE-TASK-STATUS',
		id: id,
		status: status,
		todoListId: todoListId,
	}
}
export const changeTaskTitleAC = (
	todoListId: string,
	id: string,
	title: string
): ChangeTaskTitleActionType => {
	return {
		type: 'CHANGE-TASK-TITLE',
		todoListId: todoListId,
		id: id,
		title: title,
	}
}
