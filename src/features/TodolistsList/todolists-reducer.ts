import { todolistsAPI, TodolistType } from 'api/todolists-api'
import { Dispatch } from 'redux'
import { appActions, RequestStatusType } from 'app/app-reducer'
import { handleServerNetworkError } from 'utils/error-utils'
import { AppThunk } from 'app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
	name: 'todolists',
	initialState: [] as TodolistDomainType[],
	reducers: {
		addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
			state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' })
		},
		removeTodolist: (state, action: PayloadAction<{ id: string }>) => {
			/*return state.filter((tl) => tl.id != action.payload.id)*/
			const i = state.findIndex((todo) => todo.id === action.payload.id)
			if (i !== -1) state.splice(i, 1)
		},
		changeTodolistTitle: (state, action: PayloadAction<{ id: string; title: string }>) => {
			const i = state.findIndex((todo) => todo.id === action.payload.id)
			if (i !== -1) state[i].title = action.payload.title

			/*	const el = state.find((todo) => todo.id === action.payload.id)
				if(el){
									el.title=action.payload.title
				}*/
		},
		changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
			const el = state.find((todo) => todo.id === action.payload.id)
			if (el) {
				el.filter = action.payload.filter
			}
		},
		changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; status: RequestStatusType }>) => {
			const el = state.find((todo) => todo.id === action.payload.id)
			console.log()
			if (el) {
				el.entityStatus = action.payload.status
			}
		},
		setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
			//НЕЛЬЗЯ менять весь стейт, но можно ретурнуть пейлоадл
			/*state = action.payload.todolists*/
			return action.payload.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
		},
		clearTodoLists: () => {
			return []
		},
		// @ts-ignore
		logout: (state) => ({}),
	},
})

export const todolistsAction = slice.actions
export const todolistsReducer = slice.reducer
// thunks
export const fetchTodolistsTC = (): AppThunk => {
	return (dispatch) => {
		dispatch(appActions.setAppStatus({ status: 'loading' }))
		todolistsAPI
			.getTodolists()
			.then((res) => {
				dispatch(todolistsAction.setTodolists({ todolists: res.data }))
				dispatch(appActions.setAppStatus({ status: 'succeeded' }))
			})
			.catch((error) => {
				handleServerNetworkError(error, dispatch)
			})
	}
}
export const removeTodolistTC = (todolistId: string) => {
	return (dispatch: ThunkDispatch) => {
		//изменим глобальный статус приложения, чтобы вверху полоса побежала
		dispatch(appActions.setAppStatus({ status: 'loading' }))
		//изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
		dispatch(todolistsAction.changeTodolistEntityStatus({ id: todolistId, status: 'loading' }))
		todolistsAPI.deleteTodolist(todolistId).then((res) => {
			dispatch(todolistsAction.removeTodolist({ id: todolistId }))
			//скажем глобально приложению, что асинхронная операция завершена
			dispatch(appActions.setAppStatus({ status: 'succeeded' }))
		})
	}
}
export const addTodolistTC = (title: string) => {
	return (dispatch: ThunkDispatch) => {
		dispatch(appActions.setAppStatus({ status: 'loading' }))
		todolistsAPI.createTodolist(title).then((res) => {
			dispatch(todolistsAction.addTodolist({ todolist: res.data.data.item }))
			dispatch(appActions.setAppStatus({ status: 'succeeded' }))
		})
	}
}
export const changeTodolistTitleTC = (id: string, title: string) => {
	return (dispatch: Dispatch) => {
		todolistsAPI.updateTodolist(id, title).then((res) => {
			dispatch(todolistsAction.changeTodolistTitle({ id: id, title: title }))
		})
	}
}

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
	filter: FilterValuesType
	entityStatus: RequestStatusType
}
type ThunkDispatch = Dispatch
