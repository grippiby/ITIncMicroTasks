import { FilterValuesType, TodolistType } from '../App'
import { v1 } from 'uuid'

export type RemoveTodoListActionType = {
	type: 'REMOVE-TODOLIST'
	id: string
}
export type AddTodoListActionType = {
	type: 'ADD-TODOLIST'
	title: string
}
export type ChangeTodoListTitleActionType = {
	type: 'CHANGE-TODOLIST-TITLE'
	title: string
	id: string
}
export type ChangeTodoListFilterAT = {
	type: 'CHANGE-TODOLIST-FILTER'
	filter: FilterValuesType
	id: string
}

export type ActionType =
	| RemoveTodoListActionType
	| AddTodoListActionType
	| ChangeTodoListTitleActionType
	| ChangeTodoListFilterAT

export const todolistsReducer = (
	todoLists: TodolistType[],
	action: ActionType
): TodolistType[] => {
	switch (action.type) {
		case 'REMOVE-TODOLIST':
			return todoLists.filter((tl) => tl.id !== action.id)
		case 'ADD-TODOLIST':
			let newTodolistId = v1()
			let newTodolist: TodolistType = {
				id: newTodolistId,
				title: action.title,
				filter: 'all',
			}

			return [newTodolist, ...todoLists]
		case 'CHANGE-TODOLIST-TITLE':
			return todoLists.map((el) =>
				el.id === action.id ? { ...el, title: action.title } : el
			)
		case 'CHANGE-TODOLIST-FILTER':
			return todoLists.map((el) =>
				el.id === action.id ? { ...el, filter: action.filter } : el
			)

		default:
			return todoLists
	}
}

export const RemoveTodoListAC = (id: string): RemoveTodoListActionType => {
	return {
		type: 'REMOVE-TODOLIST',
		id: id,
	}
}
export const AddTodoListAC = (
	id: string,
	title: string
): AddTodoListActionType => {
	return {
		type: 'ADD-TODOLIST',
		title: title,
	}
}

export const ChangeTodoListAC = (
	id: string,
	title: string
): ChangeTodoListTitleActionType => {
	return {
		type: 'CHANGE-TODOLIST-TITLE',
		id: id,
		title: title,
	}
}

export const ChangeTodoListFilterAC = (
	id: string,
	filter: FilterValuesType
): ChangeTodoListFilterAT => {
	return {
		type: 'CHANGE-TODOLIST-FILTER',
		id: id,
		filter: filter,
	}
}
