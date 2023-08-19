import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from 'api/todolists-api'
import { Dispatch } from 'redux'
import { AppRootStateType } from 'app/store'

import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { appActions } from 'app/app-reducer'
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit'
import { todolistsAction } from 'features/TodolistsList/todolists-reducer'

const slice = createSlice({
	name: 'tasks',
	initialState: {} as TasksStateType,
	reducers: {
		removeTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
			const tasks4TodoList = state[action.payload.todolistId]

			const i = tasks4TodoList.findIndex((t) => t.id === action.payload.taskId)
			if (i !== -1) tasks4TodoList.splice(i, 1)
			/*return {
				...state,
				[action.payload.todolistId]: state[action.payload.todolistId].filter(
					(t) => t.id != action.payload.taskId,
				),
			}*/
		},
		addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
			console.log(current(state))
			state[action.payload.task.todoListId].unshift(action.payload.task)
		},
		updateTask: (
			state,
			action: PayloadAction<{
				taskId: string
				model: UpdateDomainTaskModelType
				todolistId: string
			}>,
		) => {
			const tasks4TodoList = state[action.payload.todolistId]
			const i = tasks4TodoList.findIndex((t) => t.id === action.payload.taskId)
			if (i !== -1) {
				tasks4TodoList[i] = { ...tasks4TodoList[i], ...action.payload.model }
			}
			/*	return {
					...state,
					[action.todolistId]: state[action.todolistId].map((t) =>
						t.id === action.taskId ? { ...t, ...action.model } : t,
					),
				}*/
		},
		setTasks: (state, action: PayloadAction<{ tasks: Array<TaskType>; todolistId: string }>) => {
			state[action.payload.todolistId] = action.payload.tasks
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(todolistsAction.addTodolist, (state, action) => {
				state[action.payload.todolist.id] = []
			})
			.addCase(todolistsAction.removeTodolist, (state, action) => {
				delete state[action.payload.id]
			})
			.addCase(todolistsAction.setTodolists, (state, action) => {
				action.payload.todolists.forEach((el) => (state[el.id] = []))
			})
	},
})
export const taskActions = slice.actions
export const taskReducer = slice.reducer

//ВНАЧАЛЕ ФОРМИРУЕМ СЛАЙС, ЗАТЕМ НЕЗАБЫВАЕМ ЭКСПОРТЫ

// thunks
export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
	dispatch(appActions.setAppStatus({ status: 'loading' }))
	todolistsAPI.getTasks(todolistId).then((res) => {
		const tasks = res.data.items
		dispatch(taskActions.setTasks({ tasks, todolistId }))
		dispatch(appActions.setAppStatus({ status: 'succeeded' }))
	})
}
export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
	todolistsAPI.deleteTask(taskId, todolistId).then((res) => {
		const action = taskActions.removeTask({ taskId, todolistId })
		dispatch(action)
	})
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
	dispatch(appActions.setAppStatus({ status: 'loading' }))
	todolistsAPI
		.createTask(todolistId, title)
		.then((res) => {
			if (res.data.resultCode === 0) {
				const task = res.data.data.item
				const action = taskActions.addTask({ task })
				dispatch(action)
				dispatch(appActions.setAppStatus({ status: 'succeeded' }))
			} else {
				handleServerAppError(res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}
export const updateTaskTC =
	(taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) =>
	(dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
		const state = getState()
		const task = state.tasks[todolistId].find((t) => t.id === taskId)
		if (!task) {
			//throw new Error("task not found in the state");
			console.warn('task not found in the state')
			return
		}

		const apiModel: UpdateTaskModelType = {
			deadline: task.deadline,
			description: task.description,
			priority: task.priority,
			startDate: task.startDate,
			title: task.title,
			status: task.status,
			...domainModel,
		}

		todolistsAPI
			.updateTask(todolistId, taskId, apiModel)
			.then((res) => {
				if (res.data.resultCode === 0) {
					const action = taskActions.updateTask({ taskId, model: domainModel, todolistId })
					dispatch(action)
				} else {
					handleServerAppError(res.data, dispatch)
				}
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}

// types
export type UpdateDomainTaskModelType = {
	title?: string
	description?: string
	status?: TaskStatuses
	priority?: TaskPriorities
	startDate?: string
	deadline?: string
}
export type TasksStateType = {
	[key: string]: Array<TaskType>
}

type ThunkDispatch = Dispatch
