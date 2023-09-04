import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from 'api/todolists-api'
import { Dispatch } from 'redux'

import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import { appActions } from 'app/app-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { todolistsAction } from 'features/TodolistsList/todolists-reducer'
import { createAppAsyncThunk } from 'utils/create-app-async-thunk'

const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
	'tasks/fetchTasks',
	async (todolistId, thunkAPI) => {
		const { dispatch, rejectWithValue } = thunkAPI
		try {
			dispatch(appActions.setAppStatus({ status: 'loading' }))
			const res = await todolistsAPI.getTasks(todolistId)
			const tasks = res.data.items
			dispatch(appActions.setAppStatus({ status: 'succeeded' }))
			return { tasks, todolistId }
		} catch (e) {
			handleServerNetworkError(e, dispatch)
			return rejectWithValue(null)
		}
	},
)

const addTask = createAppAsyncThunk<
	{ task: TaskType },
	{
		todolistId: string
		title: string
	}
>('tasks/addTask', async (arg, thunkAPI) => {
	const { dispatch, rejectWithValue } = thunkAPI
	const { todolistId, title } = arg
	try {
		dispatch(appActions.setAppStatus({ status: 'loading' }))
		const res = await todolistsAPI.createTask(todolistId, title)
		if (res.data.resultCode === 0) {
			const task = res.data.data.item
			dispatch(appActions.setAppStatus({ status: 'succeeded' }))
			return { task }
		} else {
			handleServerAppError(res.data, dispatch)
			return rejectWithValue(null)
		}
	} catch (err) {
		handleServerNetworkError(err, dispatch)
		return rejectWithValue(null)
	}
})

// @ts-ignore
const updateTask = createAppAsyncThunk<
	{
		taskId: string
		domainModel: UpdateDomainTaskModelType
		todolistId: string
	},
	{
		taskId: string
		domainModel: UpdateDomainTaskModelType
		todolistId: string
	}
>('task/updateTask', async (data, thunkAPI) => {
	const { dispatch, rejectWithValue, getState } = thunkAPI
	const { taskId, domainModel, todolistId } = data
	try {
		const task = getState().tasks[todolistId].find((t) => t.id === taskId)
		if (!task) {
			//throw new Error("task not found in the state");
			console.warn('task not found in the state')
			return rejectWithValue(null)
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
		const res = await todolistsAPI.updateTask(todolistId, taskId, apiModel)

		if (res.data.resultCode === 0) {
			return { taskId, todolistId, domainModel }
		} else {
			handleServerAppError(res.data, dispatch)
			return rejectWithValue(null)
		}
	} catch (err) {
		handleServerNetworkError(err, dispatch)
		return rejectWithValue(null)
	}
})

const slice = createSlice({
	name: 'tasks',
	initialState: {} as TasksStateType,
	reducers: {
		removeTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
			const tasks4TodoList = state[action.payload.todolistId]

			const i = tasks4TodoList.findIndex((t) => t.id === action.payload.taskId)
			if (i !== -1) tasks4TodoList.splice(i, 1)
		},

		clearTasks: () => {
			return {}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state[action.payload.todolistId] = action.payload.tasks
			})
			.addCase(addTask.fulfilled, (state, action) => {
				state[action.payload.task.todoListId].unshift(action.payload.task)
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				const tasks4TodoList = state[action.payload.todolistId]
				const i = tasks4TodoList.findIndex((t) => t.id === action.payload.taskId)
				if (i !== -1) {
					tasks4TodoList[i] = { ...tasks4TodoList[i], ...action.payload.domainModel }
				}
			})
			.addCase(todolistsAction.addTodolist, (state, action) => {
				state[action.payload.todolist.id] = []
			})
			.addCase(todolistsAction.removeTodolist, (state, action) => {
				delete state[action.payload.id]
			})
			.addCase(todolistsAction.setTodolists, (state, action) => {
				action.payload.todolists.forEach((el: any) => (state[el.id] = []))
			})
	},
})
export const taskActions = slice.actions
export const taskReducer = slice.reducer
export const tasksThunks = { fetchTasks, addTask, updateTask }

//ВНАЧАЛЕ ФОРМИРУЕМ СЛАЙС, ЗАТЕМ НЕЗАБЫВАЕМ ЭКСПОРТЫ

// thunks

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
	todolistsAPI.deleteTask(taskId, todolistId).then((res) => {
		const action = taskActions.removeTask({ taskId, todolistId })
		dispatch(action)
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
